import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerDepartamentosPorArrendador } from "../services/departamentServices";

function MisDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await obtenerDepartamentosPorArrendador();
        setDepartamentos(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDepartamentos();
  }, []);

  // Función para manejar el clic en el botón
  const handleVerDetalles = (id) => {
    navigate(`/misdepartamentos/${id}`); // Redirige a la página de detalles
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-bold mb-6">Mis Departamentos</h2>
      {departamentos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {departamentos.map((departamento) => (
            <div
              key={departamento._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Imágenes */}
              <div className="flex overflow-x-auto p-2">
                {departamento.fotos.map((foto, index) => (
                  <img
                    key={index}
                    src={foto}
                    alt={`Foto ${index + 1} de ${departamento.titulo}`}
                    className="w-32 h-32 object-cover rounded-lg mr-2"
                  />
                ))}
              </div>

              {/* Contenido de la card */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {departamento.titulo}
                </h3>
                <p className="text-gray-600 mb-2">{departamento.descripcion}</p>
                <p className="text-gray-700 font-bold mb-2">
                  ${departamento.precio}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Ubicación:</strong> {departamento.ubicacion}
                </p>
                <p className="text-gray-600 mb-2">
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
                  <strong>Fecha de Publicación:</strong>{" "}
                  {new Date(departamento.fechaPublicacion).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Aprobado:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      departamento.aprobado ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {departamento.aprobado ? "Sí" : "No"}
                  </span>
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Disponible:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      departamento.disponible
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {departamento.disponible ? "Sí" : "No"}
                  </span>
                </p>

                {/* Botón para ver detalles */}
                <button
                  onClick={() => handleVerDetalles(departamento._id)}
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No tienes departamentos publicados.</p>
      )}
    </div>
  );
}

export default MisDepartamentos;
