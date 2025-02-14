import { Link } from 'react-router-dom';
const Nav = ({ isLandlord }) => {
  return (
    <nav className="bg-blue-700 p-4 shadow-lg w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo o nombre de la inmobiliaria */}
        <div className="text-white font-bold text-2xl">
          <Link to="/" className="hover:text-gray-300 transition-colors">Inmobiliaria</Link>
        </div>
        
        {/* Menú de navegación */}
        <div className="flex space-x-6">
          {/* Botón de Buscar Departamento */}
          {!isLandlord && (
            <Link to="/search" className="text-white hover:text-gray-300 transition-colors">Buscar Departamento</Link>
          )}

          {/* Si no es arrendador, mostrar el botón Soy Arrendador */}
          {!isLandlord && (
            <div className="relative">
              <button className="text-white hover:text-gray-300 transition-colors">
                Soy Arrendador
              </button>
              {/* Submenú de Soy Arrendador */}
              <div className="absolute bg-white text-blue-700 shadow-lg rounded-lg mt-2 p-2">
                <Link to="/register" className="block text-sm py-1 hover:bg-gray-200 px-4 transition-colors">
                  Registrarse
                </Link>
                <Link to="/login" className="block text-sm py-1 hover:bg-gray-200 px-4 transition-colors">
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
