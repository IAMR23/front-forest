import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import DepartamentoForm from "./components/DepartamentoForm";
import MisDepartamentos from "./components/MisDepartamentos";
import DetallesDepartamento from "./components/DetallesDepartamento";
import GestionarCuentas from "./pages/GestionarCuentas";
import GestionarDepartamentos from "./pages/GestionarDepartamentos";
import DepartamentoCard from "./components/DepartamentoCard";

function App() {
  // 🔹 Estado global de autenticación
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  useEffect(() => {
    // 🔹 Verificar si hay un token guardado
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuth({ isAuthenticated: true, role: decodedToken.role });
      } catch (error) {
        console.error("Error al decodificar el token", error);
        localStorage.removeItem("token"); // Elimina el token si es inválido
        setAuth({ isAuthenticated: false, role: null });
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* 🔹 Pasamos auth y setAuth a Navbar para manejar autenticación */}
        <Navbar auth={auth} setAuth={setAuth} />
        <main className="flex-grow w-full p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* 🔹 Pasamos setAuth a LoginForm para actualizar estado tras login */}
            <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
            <Route path="/registro" element={<RegistrationForm />} />
            <Route path="/crear/departamento" element={<DepartamentoForm />} />
            <Route path="/misdepartamentos" element={<MisDepartamentos />} />
            <Route
              path="/misdepartamentos/:id"
              element={<DetallesDepartamento />}
            />
            <Route path="/gestionar-cuentas" element={<GestionarCuentas />} />
            <Route
              path="/gestionar-departamentos"
              element={<GestionarDepartamentos />}
            />
            <Route path="/verdepartamento/:id" element={<DepartamentoCard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
