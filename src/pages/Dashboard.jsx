// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/api';

function Dashboard() {
  // Simulación de usuario. Cambia "arrendador" por "arrendatario" para ver la otra vista.
  const [user, setUser] = useState({
    name: 'Juan Pérez',
    role: 'arrendador' // o "arrendatario"
  });

  // Estado para las propiedades publicadas (para arrendadores)
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Simula la obtención de propiedades publicadas por el arrendador
    async function fetchProperties() {
      const data = await getProperties();
      setProperties(data);
    }
    if (user.role === 'arrendador') {
      fetchProperties();
    }
  }, [user.role]);

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg text-gray-600">Bienvenido, {user.name}</p>
      </header>

      {user.role === 'arrendador' && (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Mis Publicaciones</h2>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <p>
                No tienes publicaciones.{' '}
                <Link to="/nueva-publicacion" className="text-blue-600 hover:underline">
                  Crear publicación
                </Link>
              </p>
            )}
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mensajes Recientes</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p>Aún no tienes mensajes.</p>
            </div>
          </section>
        </>
      )}

      {user.role === 'arrendatario' && (
        <>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Propiedades Favoritas</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p>Aún no tienes propiedades favoritas.</p>
            </div>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Historial de Búsquedas</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p>No hay historial de búsquedas.</p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mensajes</h2>
            <div className="bg-white p-4 rounded shadow-md">
              <p>Aún no tienes mensajes.</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
