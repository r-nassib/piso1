export type Inmueble = {
    id: string;
    provincia: string;
    precio: number;
    habitaciones: number;
};

export function filtrarPorPrecio(
    inmuebles: Inmueble[],
    precioMin: number,
    precioMax: number
): Inmueble[] {
    return inmuebles.filter(
        (i) => i.precio >= precioMin && i.precio <= precioMax
    );
}