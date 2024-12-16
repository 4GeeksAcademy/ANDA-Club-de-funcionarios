import React from "react";
import { SidebarUser } from "../component/SidebarUser";
import { Outlet } from "react-router-dom";
import bannerImage from "../../img/panel_de_funcionario.png"

const PanelUsuario = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
  <div
    className="text-white text-start py-3 px-4"
    style={{
      backgroundSize: "contain",
      backgroundPosition: "center 100%",
      backgroundColor: "#3865e5",
      width: "100%",
      height: "120px", // Adjust for a smaller banner
      position: "relative", // Enable positioning for child elements
    }}
  >
    <img src={bannerImage}
      className="img-fluid"
      alt="People"
      style={{
        display: "block",
        position: "absolute",
        backgroundrepeat: "no-repeat",
        right: "5px", 
        height: "240px", 
        bottom: "-119px",
        objectFit: "contain",
        clipPath: "inset(0 0 50% 0)"
      }}
    />
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
