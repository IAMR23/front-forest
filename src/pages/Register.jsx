// src/pages/RegisterLandlord.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardamos el estado del arrendador (en este caso, los datos)
    const landlordData = {
      name,
      email,
      password,
      phone,
      address
    };
    localStorage.setItem('role', 'landlord');
    localStorage.setItem('landlordData', JSON.stringify(landlordData));
    // Aquí deberías implementar lógica de registro real
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Registrar Arrendador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          placeholder="Dirección"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
