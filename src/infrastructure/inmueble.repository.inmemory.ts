import { Inmueble } from "../domain/inmuebles";

export interface InmuebleRepository {
    findById(id: string): Inmueble | null;
    findAll(): Inmueble[];
}

const INMUEBLES_DEMO: Inmueble[] = [
    { id: "1", ciudad: "Granada", precio: 600, titulo: "Piso 2 hab cerca del centro" },
    { id: "2", ciudad: "Madrid", precio: 1200, titulo: "Estudio en Lavapiés" },
    { id: "3", ciudad: "Granada", precio: 900, titulo: "Ático con terraza" },
    { id: "4", ciudad: "Barcelona", precio: 1500, titulo: "Loft en Gracia" },
    { id: "5", ciudad: "Sevilla", precio: 700, titulo: "Apartamento en Triana" },
    { id: "6", ciudad: "Granada", precio: 500, titulo: "Habitación estudiante Zaidín" },
    { id: "7", ciudad: "Madrid", precio: 2000, titulo: "Piso lujo Salamanca" },
    { id: "8", ciudad: "Valencia", precio: 850, titulo: "Piso cerca playa" },
    { id: "9", ciudad: "Málaga", precio: 1100, titulo: "Apartamento centro histórico" },
    { id: "10", ciudad: "Bilbao", precio: 950, titulo: "Piso reformado Casco Viejo" },
];

export class InMemoryInmuebleRepository implements InmuebleRepository {
    constructor(private data: Inmueble[] = INMUEBLES_DEMO) { }

    findById(id: string): Inmueble | null {
        return this.data.find((i) => i.id === id) ?? null;
    }

    findAll(): Inmueble[] {
        return [...this.data];
    }
}