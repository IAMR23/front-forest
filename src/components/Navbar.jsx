import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({ isAuthenticated: true, role: decodedToken.role });
      } catch (error) {
        console.error("Error al decodificar el token", error);
        localStorage.removeItem("token");
        setAuth({ isAuthenticated: false, role: null });
      }
    }
  }, [setAuth]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ isAuthenticated: false, role: null });
    navigate("/home");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-xl font-bold">
          ESPE Alojamiento
        </Link>
        <div className="space-x-4">
          <Link to="/home">Inicio</Link>

          {/* Mostrar "Buscar" solo si NO es arrendador */}
          {(!auth.isAuthenticated || auth.role !== "arrendador") && (
            <Link to="/buscar">Buscar</Link>
          )}

          {/* Mostrar "Dashboard" solo si NO es arrendatario */}
          {auth.isAuthenticated && auth.role !== "arrendatario" && (
            <Link to="/dashboard">Dashboard</Link>
          )}

          {/* Mostrar "Admin" solo si NO es arrendador y NO es arrendatario */}
          {auth.isAuthenticated && auth.role !== "arrendador" && auth.role !== "arrendatario" && (
            <Link to="/admin">Admin</Link>
          )}

          {/* Mostrar "Login" y "Registro" solo si NO está autenticado */}
          {!auth.isAuthenticated && <Link to="/login">Login</Link>}
          {!auth.isAuthenticated && <Link to="/registro">Registro</Link>}

          {/* Mostrar "Cerrar Sesión" solo si está autenticado */}
          {auth.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
