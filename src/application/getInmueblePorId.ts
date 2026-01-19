import {
    Inmueble,
    InmuebleNoEncontradoError,
} from "../domain/inmuebles";
import { InmuebleRepository } from "../infrastructure/inmueble.repository.inmemory";

export function getInmueblePorId(
    repo: InmuebleRepository,
    id: string
): Inmueble {
    const encontrado = repo.findById(id);
    if (!encontrado) {
        throw new InmuebleNoEncontradoError(`No se encontró inmueble con id=${id}`);
    }
    return encontrado;
}
