import { Inmueble } from "../domain/inmuebles";
export interface InmuebleRepository {
    findById(id: string): Inmueble | null;
    findAll(): Inmueble[];
}
export declare class InMemoryInmuebleRepository implements InmuebleRepository {
    private data;
    constructor(data?: Inmueble[]);
    findById(id: string): Inmueble | null;
    findAll(): Inmueble[];
}
//# sourceMappingURL=inmueble.repository.inmemory.d.ts.map