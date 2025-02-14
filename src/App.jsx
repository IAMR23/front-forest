// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import Upload from './pages/Upload';
import Search from './pages/Search';

function App() {
  const isLandlord = localStorage.getItem('role') === 'landlord';

  return (
    <Router>
      <Nav isLandlord={isLandlord} />
      <Routes>
        <Route path="/" element={<h1>Bienvenido a la Inmobiliaria</h1>} />
        <Route path="/search" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={isLandlord ? <Upload /> : <h1>No tienes permiso para ver esta página.</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
