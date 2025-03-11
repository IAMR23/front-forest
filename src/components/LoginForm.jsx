import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userServices";
import { jwtDecode } from "jwt-decode";

function LoginForm({ setAuth }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);

      const decodedToken = jwtDecode(response.token);
      const userRole = decodedToken.role; // 🔹 Extrae el rol del token

      localStorage.setItem("role", userRole);
      setAuth({ isAuthenticated: true, role: userRole });

      // 🔹 Redirigir según el rol
      if (userRole === "arrendador") {
        navigate("/dashboard");
      } else if (userRole === "arrendatario") {
        navigate("/home");
      } else {
        navigate("/admin"); // 🔹 En caso de rol no identificado, redirigir a inicio
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
