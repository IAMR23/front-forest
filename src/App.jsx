import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import SearchResults from "./pages/SearchResults";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import DepartamentoForm from "./components/DepartamentoForm";
import MisDepartamentos from "./components/MisDepartamentos";
import DetallesDepartamento from "./components/DetallesDepartamento";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow w-full p-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/propiedad/:id" element={<PropertyDetail />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/buscar" element={<SearchResults />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<RegistrationForm />} />
            <Route path="/crear/departamento" element={<DepartamentoForm />} />
            <Route path="/misdepartamentos" element={<MisDepartamentos />} />
            <Route
              path="/misdepartamentos/:id"
              element={<DetallesDepartamento />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
