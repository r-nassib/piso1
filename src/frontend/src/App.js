import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './App.css';
function App() {
    // Search states
    const [ciudad, setCiudad] = useState('');
    const [precioMin, setPrecioMin] = useState('');
    const [precioMax, setPrecioMax] = useState('');
    const [searchId, setSearchId] = useState('');
    // Data states
    const [inmuebles, setInmuebles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setInmuebles([]);
        try {
            const params = new URLSearchParams();
            if (ciudad)
                params.append('ciudad', ciudad);
            if (precioMin)
                params.append('precioMin', precioMin);
            if (precioMax)
                params.append('precioMax', precioMax);
            const response = await fetch(`http://localhost:3000/api/v1/inmuebles?${params.toString()}`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error en la búsqueda');
            }
            const data = await response.json();
            setInmuebles(data);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSearchById = async (e) => {
        e.preventDefault();
        if (!searchId)
            return;
        setLoading(true);
        setError(null);
        setInmuebles([]);
        try {
            const response = await fetch(`http://localhost:3000/api/v1/inmuebles/${searchId}`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error al buscar por ID');
            }
            const data = await response.json();
            setInmuebles([data]); // Wrap single result in array
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "container", children: [_jsx("header", { children: _jsx("h1", { children: "Buscador de Inmuebles" }) }), _jsxs("main", { children: [_jsxs("section", { className: "search-section", children: [_jsxs("div", { className: "search-card", children: [_jsx("h2", { children: "Filtrar Inmuebles" }), _jsxs("form", { onSubmit: handleSearch, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Ciudad" }), _jsx("input", { type: "text", value: ciudad, onChange: (e) => setCiudad(e.target.value), placeholder: "Ej: Granada" })] }), _jsxs("div", { className: "form-row", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Precio M\u00EDn (\u20AC)" }), _jsx("input", { type: "number", value: precioMin, onChange: (e) => setPrecioMin(e.target.value), placeholder: "0" })] }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Precio M\u00E1x (\u20AC)" }), _jsx("input", { type: "number", value: precioMax, onChange: (e) => setPrecioMax(e.target.value), placeholder: "Sin l\u00EDmite" })] })] }), _jsx("button", { type: "submit", disabled: loading, children: loading ? 'Buscando...' : 'Buscar' })] })] }), _jsxs("div", { className: "search-card", children: [_jsx("h2", { children: "Buscar por ID" }), _jsxs("form", { onSubmit: handleSearchById, children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "ID del Inmueble" }), _jsx("input", { type: "text", value: searchId, onChange: (e) => setSearchId(e.target.value), placeholder: "ID..." })] }), _jsx("button", { type: "submit", disabled: loading || !searchId, children: "Buscar por ID" })] })] })] }), error && _jsx("div", { className: "error-message", children: error }), _jsxs("section", { className: "results-section", children: [_jsxs("h2", { children: ["Resultados (", inmuebles.length, ")"] }), inmuebles.length === 0 && !loading && !error ? (_jsx("p", { className: "no-results", children: "No se encontraron resultados." })) : (_jsx("div", { className: "inmuebles-grid", children: inmuebles.map((inmueble) => (_jsxs("div", { className: "inmueble-card", children: [_jsx("h3", { children: inmueble.titulo }), _jsxs("p", { className: "location", children: ["\uD83D\uDCCD ", inmueble.ciudad] }), _jsxs("p", { className: "price", children: [inmueble.precio.toLocaleString(), " \u20AC"] }), _jsxs("small", { children: ["ID: ", inmueble.id] })] }, inmueble.id))) }))] })] })] }));
}
export default App;
//# sourceMappingURL=App.js.map