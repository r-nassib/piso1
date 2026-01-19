import { useState, useEffect } from 'react';
import './App.css';

interface Inmueble {
  id: string;
  ciudad: string;
  precio: number;
  titulo: string;
}

function App() {
  // Search states
  const [ciudad, setCiudad] = useState('');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const [searchId, setSearchId] = useState('');

  // Data states
  const [inmuebles, setInmuebles] = useState<Inmueble[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Load all properties on mount
  useEffect(() => {
    fetchInmuebles();
  }, []);

  const fetchInmuebles = async (searchParams?: URLSearchParams) => {
    setLoading(true);
    setError(null);
    setInmuebles([]);

    try {
      const query = searchParams ? `?${searchParams.toString()}` : '';
      const response = await fetch(`http://localhost:3000/api/v1/inmuebles${query}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error en la búsqueda');
      }

      const data = await response.json();
      setInmuebles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (ciudad) params.append('ciudad', ciudad);
    if (precioMin) params.append('precioMin', precioMin);
    if (precioMax) params.append('precioMax', precioMax);

    await fetchInmuebles(params);
  };

  const handleSearchById = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId) return;

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Buscador de Inmuebles</h1>
      </header>

      <main>
        <section className="search-section">
          <div className="search-card">
            <h2>Filtrar Inmuebles</h2>
            <form onSubmit={handleSearch}>
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  value={ciudad}
                  onChange={(e) => setCiudad(e.target.value)}
                  placeholder="Ej: Granada"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Precio Mín (€)</label>
                  <input
                    type="number"
                    value={precioMin}
                    onChange={(e) => setPrecioMin(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="form-group">
                  <label>Precio Máx (€)</label>
                  <input
                    type="number"
                    value={precioMax}
                    onChange={(e) => setPrecioMax(e.target.value)}
                    placeholder="Sin límite"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </form>
          </div>

          <div className="search-card">
            <h2>Buscar por ID</h2>
            <form onSubmit={handleSearchById}>
              <div className="form-group">
                <label>ID del Inmueble</label>
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="ID..."
                />
              </div>
              <button type="submit" disabled={loading || !searchId}>
                Buscar por ID
              </button>
            </form>
          </div>
        </section>

        {error && <div className="error-message">{error}</div>}

        <section className="results-section">
          <h2>Resultados ({inmuebles.length})</h2>
          {inmuebles.length === 0 && !loading && !error ? (
            <p className="no-results">No se encontraron resultados.</p>
          ) : (
            <div className="inmuebles-grid">
              {inmuebles.map((inmueble) => (
                <div key={inmueble.id} className="inmueble-card">
                  <h3>{inmueble.titulo}</h3>
                  <p className="location">📍 {inmueble.ciudad}</p>
                  <p className="price">{inmueble.precio.toLocaleString()} €</p>
                  <small>ID: {inmueble.id}</small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
