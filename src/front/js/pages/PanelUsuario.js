import React from "react";
import { SidebarUser } from "../component/SidebarUser";
import { Outlet } from "react-router-dom";
import UsuarioBanner from "../../img/panel_de_funcionario.png";

const PanelUsuario = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      {/* Encabezado del panel */}
      <div
        className="text-white py-3 px-4 d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "#3865e5", 
          width: "100%",
          height: "150px",
          overflow: "hidden", // Evita que la imagen desborde
        }}
      >
        {/* Contenido del encabezado */}
        <div>
          <h4 className="mb-1">Panel de usuario</h4>
          <p className="mb-0">
            Aquí tienes todo lo que necesitas para gestionar tus eventos y libros.
          </p>
        </div>

        {/* Imagen del banner ajustada a la derecha */}
        <img
          src={UsuarioBanner}
          alt="Decoración usuario"
          style={{
            height: "150px", // Ajuste de altura para que coincida con el encabezado
            objectFit: "cover", // Ajusta la imagen sin distorsionarla
          }}
        />
      </div>

      {/* Contenido principal */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar del usuario */}
        <SidebarUser />

        {/* Área de salida de rutas anidadas */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PanelUsuario;

