"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("../../infrastructure/logger");
const inmuebles_1 = require("../../domain/inmuebles");
const inmueble_repository_inmemory_1 = require("../../infrastructure/inmueble.repository.inmemory");
const getInmueblePorId_1 = require("../../application/getInmueblePorId");
const buscarInmuebles_1 = require("../../application/buscarInmuebles");
const repo = new inmueble_repository_inmemory_1.InMemoryInmuebleRepository();
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    // Logs por petición
    app.use((0, pino_http_1.default)({
        logger: logger_1.logger,
        autoLogging: true,
    }));
    app.use(express_1.default.json());
    // Healthcheck
    app.get("/health", (req, res) => {
        res.status(200).json({ status: "ok" });
    });
    // GET /api/v1/inmuebles/:id  → obtener por id
    app.get("/api/v1/inmuebles/:id", (req, res, next) => {
        try {
            const { id } = req.params;
            const inmueble = (0, getInmueblePorId_1.getInmueblePorId)(repo, id);
            res.status(200).json(inmueble);
        }
        catch (err) {
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
            const resultado = (0, buscarInmuebles_1.buscarInmuebles)(repo, filtros);
            res.status(200).json(resultado);
        }
        catch (err) {
            next(err);
        }
    });
    // Manejo de errores de dominio → códigos HTTP
    app.use((err, req, res, _next) => {
        if (err instanceof inmuebles_1.InvalidFilterError) {
            req.log?.warn({ err }, "Error de filtros de búsqueda");
            return res.status(400).json({ error: err.message });
        }
        if (err instanceof inmuebles_1.InmuebleNoEncontradoError) {
            req.log?.info({ err }, "Inmueble no encontrado");
            return res.status(404).json({ error: err.message });
        }
        req.log?.error({ err }, "Error inesperado en la API");
        return res.status(500).json({ error: "Error interno del servidor" });
    });
    return app;
}
//# sourceMappingURL=app.js.map