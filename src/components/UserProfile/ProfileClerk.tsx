import { Link } from "react-router";
import { UserProfile } from "@clerk/clerk-react";
import { FaArrowLeft } from "react-icons/fa";

const ProfilePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        flexDirection: "column",
      }}
    >
      {/* Contenedor para la flecha y el perfil */}
      <div style={{ width: "100%", display: "flex", alignItems: "center" }}>
        {/* Enlace con flecha hacia la izquierda */}
        <Link
          to="/"
          className="text-gray-800 flex items-center gap-2 text-lg font-semibold transition-colors hover:text-primary"
          style={{
            padding: "10px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <FaArrowLeft /> {/* Icono de flecha */}
          Volver
        </Link>
      </div>

      {/* Componente de perfil de usuario */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default ProfilePage;
