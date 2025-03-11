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
    <nav className="bg-[#383673] text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-2xl font-bold text-[#D813F2]">
          ESPEroom
        </Link>
        <div className="space-x-4">
          <Link to="/home" className="hover:text-[#D813F2] transition">
            Inicio
          </Link>

          {/* Mostrar Dashboard solo si el usuario no es admin */}
          {auth.isAuthenticated && auth.role !== "arrendatario" && auth.role !== "admin" && (
            <Link to="/dashboard" className="hover:text-[#D813F2] transition">
              Dashboard
            </Link>
          )}

          {/* Mostrar Admin solo si el usuario es admin */}
          {auth.isAuthenticated && auth.role === "admin" && (
            <Link to="/admin" className="hover:text-[#D813F2] transition">
              Admin
            </Link>
          )}

          {/* Si no está autenticado, mostrar Login y Registro */}
          {!auth.isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-[#D813F2] transition">
                Login
              </Link>
              <Link to="/registro" className="hover:text-[#D813F2] transition">
                Registro
              </Link>
            </>
          )}

          {/* Mostrar botón de Cerrar Sesión solo si está autenticado */}
          {auth.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="bg-[#D813F2] px-4 py-2 rounded-lg hover:bg-[#9D1DF2] transition"
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
