// src/pages/Search.jsx
import { useState, useEffect } from 'react';

const Search = () => {
  // Lista de departamentos (puedes obtenerlos de una API o base de datos)
  const [departments, setDepartments] = useState([]);

  // Simulamos datos de departamentos (en un escenario real, estos llegarían desde una API)
  useEffect(() => {
    setDepartments([
      { id: 1, title: 'Departamento 1', description: 'Ubicación central, 2 recámaras', price: 1000 },
      { id: 2, title: 'Departamento 2', description: 'Cerca de parques, 1 recámara', price: 800 },
      { id: 3, title: 'Departamento 3', description: 'Zona tranquila, 3 recámaras', price: 1200 },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Buscar Departamentos</h1>
      
      {/* Filtros de búsqueda (opcional) */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
      </div>

      {/* Lista de departamentos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold">{dept.title}</h2>
            <p>{dept.description}</p>
            <p className="font-bold text-xl mt-2">${dept.price} / mes</p>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded">Ver más</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
