export type Inmueble = {
    id: string;
    ciudad: string;
    precio: number;
    titulo: string;
};
export declare class InvalidFilterError extends Error {
}
export declare class InmuebleNoEncontradoError extends Error {
}
export type FiltrosBusqueda = {
    ciudad?: string | undefined;
    precioMin?: number | undefined;
    precioMax?: number | undefined;
};
export declare function validarFiltros(filtros: FiltrosBusqueda): void;
export declare function filtrarInmuebles(inmuebles: Inmueble[], filtros: FiltrosBusqueda): Inmueble[];
//# sourceMappingURL=inmuebles.d.ts.map