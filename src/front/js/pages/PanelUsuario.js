import React from "react";
import SidebarUser from "../component/SidebarUser"; // Ensure the path is correct
import { Outlet } from "react-router-dom";

const PanelUsuario = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div
        className="text-white text-start py-3 px-4"
        style={{
          backgroundColor: "#3865e5", 
          width: "100%",
          height: "100px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h3 className="mb-1">Panel de usuario</h3>
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
