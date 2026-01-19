"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InmuebleNoEncontradoError = exports.InvalidFilterError = void 0;
exports.validarFiltros = validarFiltros;
exports.filtrarInmuebles = filtrarInmuebles;
class InvalidFilterError extends Error {
}
exports.InvalidFilterError = InvalidFilterError;
class InmuebleNoEncontradoError extends Error {
}
exports.InmuebleNoEncontradoError = InmuebleNoEncontradoError;
function validarFiltros(filtros) {
    const { precioMin, precioMax } = filtros;
    if (precioMin !== undefined &&
        precioMax !== undefined &&
        precioMin > precioMax) {
        throw new InvalidFilterError("precioMin no puede ser mayor que precioMax");
    }
    if (precioMin !== undefined && precioMin < 0) {
        throw new InvalidFilterError("precioMin no puede ser negativo");
    }
    if (precioMax !== undefined && precioMax < 0) {
        throw new InvalidFilterError("precioMax no puede ser negativo");
    }
}
function filtrarInmuebles(inmuebles, filtros) {
    validarFiltros(filtros);
    const { ciudad, precioMin, precioMax } = filtros;
    return inmuebles.filter((i) => {
        if (ciudad && i.ciudad.toLowerCase() !== ciudad.toLowerCase()) {
            return false;
        }
        if (precioMin !== undefined && i.precio < precioMin) {
            return false;
        }
        if (precioMax !== undefined && i.precio > precioMax) {
            return false;
        }
        return true;
    });
}
//# sourceMappingURL=inmuebles.js.map