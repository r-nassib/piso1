"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inmuebles_1 = require("./inmuebles");
describe("filtrarInmuebles", () => {
    const inmuebles = [
        { id: "1", ciudad: "Granada", precio: 500, titulo: "Piso centro" },
        { id: "2", ciudad: "Madrid", precio: 900, titulo: "Apartamento sol" },
        { id: "3", ciudad: "Granada", precio: 1200, titulo: "Ático lujo" },
    ];
    it("Devuelve solo los inmuebles dentro del rango de precio", () => {
        const resultado = (0, inmuebles_1.filtrarInmuebles)(inmuebles, {
            precioMin: 600,
            precioMax: 1000,
        });
        expect(resultado).toHaveLength(1);
        expect(resultado[0].id).toBe("2");
    });
});
//# sourceMappingURL=inmuebles.test.js.map