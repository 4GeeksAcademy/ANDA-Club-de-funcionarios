import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/");
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav
        className={`bg-dark text-white sidebar d-flex flex-column ${isCollapsed ? "collapsed" : ""}`}
        style={{
          width: isCollapsed ? "80px" : "250px",
          transition: "width 0.3s ease-in-out",
          minHeight: "100vh", // Extiende hasta abajo
          position: "relative",
        }}
      >
        {/* Botón para colapsar/expandir */}
        <button
          className="btn btn-link text-white"
          onClick={toggleCollapse}
          style={{
            textAlign: "start",
            margin: "10px 0",
          }}
        >
          <i className={`fas ${isCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>

        {/* Lista de navegación */}
        <ul className="nav flex-column flex-grow-1">
          <li className="nav-item">
            <Link to="perfil-administrador" className="nav-link text-white text-start">
              <i className="fas fa-user"></i>
              {!isCollapsed && <span className="ms-2">Tu Perfil</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="editar-cargar-libro" className="nav-link text-white text-start">
              <i className="fa-solid fa-book-open"></i>
              {!isCollapsed && <span className="ms-2">Editar y/o cargar libro</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="editar-cargar-salon" className="nav-link text-white text-start">
              <i className="fa-regular fa-calendar"></i>
              {!isCollapsed && <span className="ms-2">Editar salón</span>}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="administrador-usuarios" className="nav-link text-white text-start">
              <i className="fa-solid fa-users-gear"></i>
              {!isCollapsed && <span className="ms-2">Administrador de usuarios</span>}
            </Link>
          </li>
        </ul>

        {/* Cerrar Sesión */}
        <ul className="nav flex-column mt-auto">
          <li className="nav-item">
            <button
              className="btn btn-link text-danger nav-link text-start"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              {!isCollapsed && <span className="ms-2">Cerrar Sesión</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
