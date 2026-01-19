"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInmueblePorId = getInmueblePorId;
const inmuebles_1 = require("../domain/inmuebles");
function getInmueblePorId(repo, id) {
    const encontrado = repo.findById(id);
    if (!encontrado) {
        throw new inmuebles_1.InmuebleNoEncontradoError(`No se encontró inmueble con id=${id}`);
    }
    return encontrado;
}
//# sourceMappingURL=getInmueblePorId.js.map