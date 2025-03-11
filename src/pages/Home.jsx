import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { obtenerDepartamentos } from "../services/departamentServices";
import { useNavigate } from "react-router-dom";

function Home() {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Obtener filtros desde la URL
  const filtros = {
    precioMax: searchParams.get("precioMax") || "",
    ubicacion: searchParams.get("ubicacion") || "",
    habitaciones: searchParams.get("habitaciones") || "",
  };

  const fetchDepartamentos = async () => {
    try {
      const data = await obtenerDepartamentos();
      setDepartamentos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  // Función para actualizar los filtros en la URL
  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams);
  };

  // Filtrar departamentos según la URL
  const departamentosFiltrados = departamentos.filter((departamento) => {
    return (
      (filtros.precioMax === "" || departamento.precio <= Number(filtros.precioMax)) &&
      (filtros.ubicacion === "" || departamento.ubicacion.toLowerCase().includes(filtros.ubicacion.toLowerCase())) &&
      (filtros.habitaciones === "" || departamento.habitaciones === Number(filtros.habitaciones))
    );
  });

  const handleVerDetalles = (id) => {
    navigate(`/verdepartamento/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar de filtros */}
      <aside className="w-72 bg-[#7F6DF2] p-6 rounded-xl shadow-lg m-6 text-white">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>

        <label className="font-medium">Precio máximo:</label>
        <input
          type="number"
          placeholder="Ej: 500"
          className="w-full p-2 border border-[#D813F2] rounded-md bg-white text-black mb-4"
          value={filtros.precioMax}
          onChange={(e) => handleFilterChange("precioMax", e.target.value)}
        />

        <label className="font-medium">Ubicación:</label>
        <input
          type="text"
          placeholder="Ej: Quito"
          className="w-full p-2 border border-[#D813F2] rounded-md bg-white text-black mb-4"
          value={filtros.ubicacion}
          onChange={(e) => handleFilterChange("ubicacion", e.target.value)}
        />

        <label className="font-medium">N° de habitaciones:</label>
        <input
          type="number"
          placeholder="Ej: 3"
          className="w-full p-2 border border-[#D813F2] rounded-md bg-white text-black"
          value={filtros.habitaciones}
          onChange={(e) => handleFilterChange("habitaciones", e.target.value)}
        />
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8">
        {error && <p className="text-red-500 text-center">{error}</p>}

        {departamentosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {departamentosFiltrados.map((departamento) => (
              <div key={departamento._id} className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-xl mx-auto">
                {/* Imágenes más grandes y centradas */}
                <div className="flex justify-center overflow-x-auto p-4">
                  {departamento.fotos.map((foto, index) => (
                    <img
                      key={index}
                      src={foto}
                      alt={`Foto ${index + 1} de ${departamento.titulo}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>

                {/* Información */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-teal-700 mb-4">
                    {departamento.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{departamento.descripcion}</p>
                  <p className="text-gray-800 text-xl font-bold mb-4">
                    ${departamento.precio}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Ubicación:</strong> {departamento.ubicacion}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Habitaciones:</strong> {departamento.habitaciones}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Características:</strong>
                  </p>
                  <ul className="list-disc list-inside mb-2">
                    {departamento.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="text-gray-600">
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                  <p className="text-gray-600 mb-2">
                    <strong>Condiciones:</strong> {departamento.condiciones}
                  </p>
                  <p className="text-gray-600 mb-2">
                    <strong>Fecha de Publicación:</strong> {new Date(departamento.fechaPublicacion).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleVerDetalles(departamento._id)}
                    className="w-full bg-[#D813F2] text-white py-3 px-6 rounded-lg hover:bg-[#9D1DF2] transition duration-300 text-lg font-semibold"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg mt-6">
            No hay departamentos que coincidan con los filtros.
          </p>
        )}
      </main>
    </div>
  );
}

export default Home;
