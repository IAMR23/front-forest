// src/pages/UploadDepartment.jsx
import { useState } from 'react';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para subir el departamento
    console.log('Departamento subido:', { title, description, price });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">Subir Departamento</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Subir Departamento
        </button>
      </form>
    </div>
  );
};

export default Upload;
