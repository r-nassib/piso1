"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("./app");
const app = (0, app_1.createApp)();
describe("API search-service - inmuebles", () => {
    it("GET /health devuelve 200", async () => {
        const res = await (0, supertest_1.default)(app).get("/health");
        expect(res.status).toBe(200);
        expect(res.body.status).toBe("ok");
    });
    it("GET /api/v1/inmuebles devuelve lista por defecto", async () => {
        const res = await (0, supertest_1.default)(app).get("/api/v1/inmuebles");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it("filtra por ciudad", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/api/v1/inmuebles")
            .query({ ciudad: "Granada" });
        expect(res.status).toBe(200);
        expect(res.body.every((i) => i.ciudad === "Granada")).toBe(true);
    });
    it("filtra por rango de precio", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/api/v1/inmuebles")
            .query({ precioMin: 600, precioMax: 1000 });
        expect(res.status).toBe(200);
        expect(res.body.every((i) => i.precio >= 600 && i.precio <= 1000)).toBe(true);
    });
    it("devuelve 400 si precioMin > precioMax", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/api/v1/inmuebles")
            .query({ precioMin: 1000, precioMax: 500 });
        expect(res.status).toBe(400);
        expect(res.body.error).toBeDefined();
    });
    it("GET /api/v1/inmuebles/:id devuelve 404 si no existe", async () => {
        const res = await (0, supertest_1.default)(app).get("/api/v1/inmuebles/999");
        expect(res.status).toBe(404);
    });
    it("GET /api/v1/inmuebles/:id devuelve 200 si existe", async () => {
        const res = await (0, supertest_1.default)(app).get("/api/v1/inmuebles/1");
        expect(res.status).toBe(200);
        expect(res.body.id).toBe("1");
    });
});
//# sourceMappingURL=app.test.js.map