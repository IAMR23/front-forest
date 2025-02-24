import React, { useEffect, useState } from 'react';
import MisDepartamentos from '../components/MisDepartamentos';

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // Aquí deberías obtener la información real del usuario.
      // Ejemplo: const data = await getUser();
      // En este ejemplo se simula brevemente la obtención de datos.
      const data = { name: 'Juan Pérez', role: 'arrendador' };
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg text-gray-600">Bienvenido, {user.name}</p>
      </header>
      
      <section className="mb-8">
        <MisDepartamentos />
      </section>
    </div>
  );
}

export default Dashboard;
