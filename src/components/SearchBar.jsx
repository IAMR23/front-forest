import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Redirige a la página de búsqueda con parámetros de consulta
    navigate(`/buscar?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex mb-4">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Buscar alojamiento..."
        className="flex-grow p-2 border rounded-l bg-white"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-r">
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
