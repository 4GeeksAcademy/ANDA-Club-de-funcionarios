import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/FirstEventView.css";

export const FirstEventView = () => {
  useEffect(() => {
    // Script básico para agregar partículas interactivas
    const container = document.querySelector(".event-background");

    const handleMouseMove = (e) => {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.left = `${e.clientX}px`;
      container.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1000); // Elimina el destello después de 1 segundo
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="event-container">
      {/* Banner superior */}
      <div className="event-banner d-flex align-items-center justify-content-between">
        <div>
          <h3>Planifica tu evento con nosotros</h3>
        </div>
        <img
          src="https://www.segurosaludglobal.cl/sites/default/files/inline-images/qqsmartart2.png"
          className="event-banner-image"
          alt="Eventos"
        />
      </div>

      {/* Fondo interactivo */}
      <div className="event-background">
        <div className="event-content text-center">
          <h4 className="event-title">
            Organiza tu evento de manera ágil y rápida.
          </h4>
          <p className="event-subtitle">
            Selecciona una fecha disponible en nuestro calendario.
          </p>
          <Link to="/reservar-evento">
            <button className="btn btn-primary event-button">Reservar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};