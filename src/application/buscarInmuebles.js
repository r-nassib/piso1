"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarInmuebles = buscarInmuebles;
const inmuebles_1 = require("../domain/inmuebles");
function buscarInmuebles(repo, filtros) {
    const todos = repo.findAll();
    return (0, inmuebles_1.filtrarInmuebles)(todos, filtros);
}
//# sourceMappingURL=buscarInmuebles.js.map