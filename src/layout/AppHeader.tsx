import { Link } from "react-router";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useBalance } from "../context/BalanceContext";

const AppHeader: React.FC = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { balance } = useBalance();
  const handleLogout = async () => {
    try {
      await signOut(); // Cierra sesión en Clerk
      navigate("/signin"); // Redirige al usuario
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <header className="bg-white shadow-md mb-2">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Hola, {user?.firstName} </h1>

        {/* Navegación - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Saldo */}
          <span
            className={`font-semibold ${
              balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            Capital:{" "}
            {`$ ${new Intl.NumberFormat("es-ES", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            }).format(balance)}`}
          </span>

          {/* Mi perfil */}
          <Link
            to="/profile-user"
            className="px-4 py-2 text-gray-700 hover:text-blue-600"
          >
            Mi perfil
          </Link>

          {/* Botón de salir */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
          >
            Salir
            <FiLogOut className="w-5 h-5" />
          </button>
        </nav>

        {/* Menú hamburguesa en móviles */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 focus:outline-none"
          >
            {/* Icono de menú */}
            <svg
              className="w-6 h-6 transition-transform duration-300 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-2 py-4">
            {/* Saldo en móviles */}
            <li
              className={`font-semibold ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              Capital:{" "}
              {`$ ${new Intl.NumberFormat("es-ES", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              }).format(balance)}`}
            </li>
            <li>
              <Link
                to="/profile-user"
                className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Mi perfil
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition"
              >
                Salir
                <FiLogOut className="w-5 h-5" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
