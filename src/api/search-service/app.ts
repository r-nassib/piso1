import express, { Request, Response, NextFunction } from "express";
import pinoHttp from "pino-http";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";
import { logger } from "../../infrastructure/logger";
import {
    InvalidFilterError,
    InmuebleNoEncontradoError,
} from "../../domain/inmuebles";
import {
    InMemoryInmuebleRepository,
} from "../../infrastructure/inmueble.repository.inmemory";
import { getInmueblePorId } from "../../application/getInmueblePorId";
import { buscarInmuebles } from "../../application/buscarInmuebles";

const repo = new InMemoryInmuebleRepository();

export function createApp() {
    const app = express();
    app.use(cors());

    // Swagger UI
    try {
        const swaggerDocument = yaml.load(path.join(process.cwd(), "docs", "openapi.yaml"));
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } catch (error) {
        console.error("No se pudo cargar la documentación OpenAPI:", error);
    }


    // Logs por petición
    app.use(
        pinoHttp({
            logger,
            autoLogging: true,
        })
    );

    app.use(express.json());

    // Healthcheck
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "ok" });
    });

    // GET /api/v1/inmuebles/:id  → obtener por id
    app.get("/api/v1/inmuebles/:id", (req, res, next) => {
        try {
            const { id } = req.params;
            const inmueble = getInmueblePorId(repo, id);
            res.status(200).json(inmueble);
        } catch (err) {
            next(err);
        }
    });

    // GET /api/v1/inmuebles?ciudad=Granada&precioMin=500&precioMax=1000
    app.get("/api/v1/inmuebles", (req, res, next) => {
        try {
            const { ciudad, precioMin, precioMax } = req.query;

            const filtros = {
                ciudad: ciudad ? String(ciudad) : undefined,
                precioMin: precioMin !== undefined ? Number(precioMin) : undefined,
                precioMax: precioMax !== undefined ? Number(precioMax) : undefined,
            };

            const resultado = buscarInmuebles(repo, filtros);
            res.status(200).json(resultado);
        } catch (err) {
            next(err);
        }
    });

    // Manejo de errores de dominio → códigos HTTP
    app.use(
        (err: any, req: Request, res: Response, _next: NextFunction) => {
            if (err instanceof InvalidFilterError) {
                req.log?.warn({ err }, "Error de filtros de búsqueda");
                return res.status(400).json({ error: err.message });
            }

            if (err instanceof InmuebleNoEncontradoError) {
                req.log?.info({ err }, "Inmueble no encontrado");
                return res.status(404).json({ error: err.message });
            }

            req.log?.error({ err }, "Error inesperado en la API");
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    );

    return app;
}