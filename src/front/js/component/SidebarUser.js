import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarUser = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav
      className={`bg- text-white sidebar d-flex flex-column ${isCollapsed ? "collapsed" : ""
        }`}
      style={{
        backgroundColor: "#3865e5",
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
          <Link to="perfil-usuario" className="nav-link text-white text-left">
            <i className="fas fa-user"></i>
            {!isCollapsed && <span className="ms-2">Tu Perfil</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/biblioteca" className="nav-link text-white text-left">
            <i className="fa-solid fa-book-open"></i>
            {!isCollapsed && <span className="ms-2">Reservar libro</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="reservar-salon" className="nav-link text-white text-left">
            <i className="fa-regular fa-calendar"></i>
            {!isCollapsed && <span className="ms-2">Reservar salón</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="mis-reservas" className="nav-link text-white text-left">
            <i className="fa-regular fa-calendar-days"></i>
            {!isCollapsed && <span className="ms-2">Mis reservas</span>}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="historial" className="nav-link text-white text-left">
            <i className="fa fa-history" aria-hidden="true"></i>
            {!isCollapsed && <span className="ms-2">Historial</span>}
          </Link>
        </li>
      </ul>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="btn btn-link text-light nav-link text-left">
            <i className="fas fa-sign-out"></i>
            {!isCollapsed && <span className="ms-2">Cerrar Sesión</span>}
          </button>
        </li>
      </ul>
    </nav>
  );
};
