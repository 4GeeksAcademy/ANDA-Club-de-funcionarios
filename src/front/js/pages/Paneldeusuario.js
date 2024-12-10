import React from "react";
import SidebarUser from "../component/SidebarUser";
import { Outlet } from "react-router-dom";

 const PanelUsuario = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div
        className="bg-primary text-white text-start py-3 px-4"
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="mb-1">Panel de usuario</h1>
        <p className="mb-0">
          Aquí tienes todo lo que necesitas para gestionar tus eventos y libros.
        </p>
      </div>
      <div className="d-flex flex-grow-1">
        <SidebarUser />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PanelUsuario;