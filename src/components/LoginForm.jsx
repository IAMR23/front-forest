import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    console.log("Iniciando sesión con:", credentials);
    alert("Inicio de sesión exitoso (simulación)");
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 ">Email</label>
          <input 
            type="email" 
            name="email" 
            value={credentials.email} 
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
            value={credentials.password} 
            onChange={handleChange} 
            className="w-full border rounded p-2 bg-white" 
            required 
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
