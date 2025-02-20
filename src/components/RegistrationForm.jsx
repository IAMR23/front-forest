import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'arrendatario'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de envío de datos a la API
    console.log("Registrando usuario:", formData);
    alert("Usuario registrado exitosamente (simulación)");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Nombre</label>
          <input 
            type="text" 
            name="nombre" 
            value={formData.nombre} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Contraseña</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tipo de usuario</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white"
          >
            <option value="arrendatario">Arrendatario</option>
            <option value="arrendador">Arrendador</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
