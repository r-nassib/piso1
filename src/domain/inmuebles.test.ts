import { filtrarPorPrecio, Inmueble } from "./inmuebles";

describe("filtrarPorPrecio", () => {
    const inmuebles: Inmueble[] = [
        { id: "1", provincia: "Granada", precio: 500, habitaciones: 2 },
        { id: "2", provincia: "Madrid", precio: 900, habitaciones: 3 },
        { id: "3", provincia: "Granada", precio: 1200, habitaciones: 4 },
    ];

    it("Devuelve solo los inmuebles dentro del rango de precio", () => {
        const resultado = filtrarPorPrecio(inmuebles, 600, 1000);

        expect(resultado).toHaveLength(1);
        expect(resultado[0]!.id).toBe("2");
    });
});