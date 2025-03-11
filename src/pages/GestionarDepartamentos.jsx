import React, { useEffect, useState } from "react";
import { obtenerDepartamentosPorVerificar } from "../services/departamentServices";

function GestionarDepartamentos() {
  const [departamentos, setDepartamentos] = useState([]);
  const [error, setError] = useState(null);

  const fetchDepartamentos = async () => {
    try {
      const data = await obtenerDepartamentosPorVerificar();
      setDepartamentos(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const handleAprobar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/aprobar/departamento/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchDepartamentos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRechazar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/desaprobar/departamento/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      fetchDepartamentos();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <h2 className="text-3xl font-bold text-[#D813F2] mb-6 text-center">
        Gestionar Departamentos
      </h2>

      {departamentos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {departamentos.map((departamento) => (
            <div
              key={departamento._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Imagen principal centrada y más grande */}
              <div className="flex justify-center items-center overflow-hidden h-64 bg-gray-200">
                {departamento.fotos && departamento.fotos.length > 0 ? (
                  <img
                    src={departamento.fotos[0]}
                    alt={`Foto de ${departamento.titulo}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-gray-500">Sin imágenes</p>
                )}
              </div>

              {/* Información del departamento */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#7F6DF2] mb-2">
                  {departamento.titulo}
                </h3>
                <p className="text-gray-600 mb-4">{departamento.descripcion}</p>
                <p className="text-[#D813F2] text-xl font-bold mb-4">
                  ${departamento.precio}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Ubicación:</strong> {departamento.ubicacion}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Habitaciones:</strong> {departamento.habitaciones}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Condiciones:</strong> {departamento.condiciones}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Fecha de Publicación:</strong>{" "}
                  {departamento.fechaPublicacion
                    ? new Date(departamento.fechaPublicacion).toLocaleDateString()
                    : "No disponible"}
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

                {/* Botones de Aprobar y Rechazar */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleAprobar(departamento._id)}
                    className="bg-[#D813F2] text-white px-4 py-2 rounded-lg hover:bg-[#9D1DF2] transition duration-300"
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => handleRechazar(departamento._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-4">
          No hay departamentos pendientes de aprobación.
        </p>
      )}
    </div>
  );
}

export default GestionarDepartamentos;
