import {
    FiltrosBusqueda,
    Inmueble,
    filtrarInmuebles,
} from "../domain/inmuebles";
import { InmuebleRepository } from "../infrastructure/inmueble.repository.inmemory";

export function buscarInmuebles(
    repo: InmuebleRepository,
    filtros: FiltrosBusqueda
): Inmueble[] {
    const todos = repo.findAll();
    return filtrarInmuebles(todos, filtros);
}