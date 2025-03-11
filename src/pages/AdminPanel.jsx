import React from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-[#D813F2] mb-4">Bienvenido</h1>
      <h2 className="text-2xl font-semibold text-[#9D1DF2] mb-8">
        Panel Administrativo
      </h2>

      <div className="flex space-x-4">
        {/* Tarjeta Gestionar Cuentas */}
        <div
          className="w-1/2 bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
          onClick={() => handleNavigate("/gestionar-cuentas")}
        >
          <h2 className="text-2xl font-semibold text-[#7F6DF2] mb-2">
            Gestionar Cuentas
          </h2>
          <p className="text-gray-600">Administra las cuentas de los usuarios.</p>
        </div>

        {/* Tarjeta Gestionar Departamentos */}
        <div
          className="w-1/2 bg-white p-6 rounded-xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
          onClick={() => handleNavigate("/gestionar-departamentos")}
        >
          <h2 className="text-2xl font-semibold text-[#7F6DF2] mb-2">
            Gestionar Departamentos
          </h2>
          <p className="text-gray-600">Administra los departamentos de la organización.</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
