import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">
          ESPE Alojamiento
        </Link>
        <div className="space-x-4">
          <Link to="/home">Inicio</Link>
          <Link to="/buscar">Buscar</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
