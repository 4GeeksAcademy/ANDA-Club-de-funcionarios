import React from "react";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import Administrador from "../../img/Administrador.png";
import "../../styles/PanelAdministrador.css";

export const PanelAdministrador = () => {
  return (
    <div className="admin-panel-container">
      {/* Banner superior */}
      <div className="admin-panel-banner">
        <div>
          <h4 className="mb-1 title-admin">Panel de administrador</h4>
          <p className="mb-0">
            Aprueba funcionario/as, gestiona el salón para eventos y la reserva o préstamo de libros.
          </p>
        </div>
        <img src={Administrador} alt="Decoración" />
      </div>

      {/* Contenido principal */}
      <div className="admin-panel-content">
        <Sidebar />
        <div className="admin-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
