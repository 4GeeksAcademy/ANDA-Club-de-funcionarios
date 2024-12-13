import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`bg-dark text-white sidebar d-flex flex-column ${isCollapsed ? "collapsed" : ""
        }`}
      style={{
        width: isCollapsed ? "80px" : "250px",
        transition: "width 0.3s ease-in-out",
        minHeight: "100%",

      }}
    >
      {/* Botón para colapsar/expandir */}
      <button
        className="btn btn-link text-white"
        onClick={toggleCollapse}
        style={{
          textAlign: "center",
          margin: "10px 0",
        }}
      >
        <i className={`fas ${isCollapsed ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
      </button>

      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item">
          <Link to="perfil_administrador" className="nav-link text-white text-center">
            <i className="fas fa-user"></i>
            {!isCollapsed && <span className="ms-2">Tu Perfil</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="editar_cargar_libro" className="nav-link text-white text-center">
            <i className="fa-solid fa-book-open"></i>
            {!isCollapsed && <span className="ms-2">Editar y/o cargar libro</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="editar_cargar_salon" className="nav-link text-white text-center">
            <i className="fa-regular fa-calendar"></i>
            {!isCollapsed && <span className="ms-2">Editar salón</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="administrador_usuarios" className="nav-link text-white text-center">
            <i className="fa-solid fa-users-gear"></i>
            {!isCollapsed && <span className="ms-2">Administrador de usuarios</span>}
          </Link>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="btn btn-link text-danger nav-link text-center">
            <i className="fas fa-sign-out-alt"></i>
            {!isCollapsed && <span className="ms-2">Cerrar Sesión</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
};
