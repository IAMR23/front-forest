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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#D813F2] mb-6 text-center">
          Iniciar Sesión
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full border border-[#7F6DF2] rounded-lg p-3 focus:ring-2 focus:ring-[#9D1DF2] outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full border border-[#7F6DF2] rounded-lg p-3 focus:ring-2 focus:ring-[#9D1DF2] outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D813F2] text-white py-3 px-6 rounded-lg hover:bg-[#9D1DF2] transition duration-300 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
