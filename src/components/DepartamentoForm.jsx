import { useState } from "react";
import { createDepartamento } from "../services/departamentServices";

function DepartamentoForm() {
  const [formData, setFormData] = useState({
    titulo: "Prueba",
    descripcion: "Prueba",
    precio: "120",
    ubicacion: "Quito",
    habitaciones: "3",
    caracteristicas: "Muchas, cosas, interesantes",
    condiciones: "",
  });

  const [fotos, setFotos] = useState([]); // Guardar archivos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFotos([...e.target.files]); // Guardar los archivos seleccionados
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      fotos.forEach((file) => {
        formDataToSend.append("fotos", file);
      });

      await createDepartamento(formDataToSend);
      setSuccess("Departamento registrado exitosamente.");

      setFormData({
        titulo: "",
        descripcion: "",
        precio: "",
        ubicacion: "",
        habitaciones: "",
        caracteristicas: "",
        condiciones: "",
      });
      setFotos([]);
    } catch (error) {
      setError(
        error.response?.data?.message || "Error al registrar el departamento."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registrar Departamento</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Precio</label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">
            Número de Habitaciones
          </label>
          <input
            type="number"
            name="habitaciones"
            value={formData.habitaciones}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">
            Características (separadas por coma)
          </label>
          <input
            type="text"
            name="caracteristicas"
            value={formData.caracteristicas}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Condiciones</label>
          <textarea
            name="condiciones"
            value={formData.condiciones}
            onChange={handleChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Subir Fotos (JPG)</label>
          <input
            type="file"
            accept="image/jpeg"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded p-2 bg-white text-gray-900"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}

export default DepartamentoForm;
