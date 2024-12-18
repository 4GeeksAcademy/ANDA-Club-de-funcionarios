import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="footer bg-transparent text-center py-4">
    <div className="container">
      {/* Información principal */}
      <div className="mb-3">
        <span className="text-muted">
          © {new Date().getFullYear()} ANDA Uruguay. Todos los derechos reservados.
        </span>
      </div>

      {/* Redes sociales */}
      <div className="d-flex justify-content-center gap-3">
        <a
          href="https://anda.com.uy/servicios-en-linea/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fas fa-globe fa-lg"></i>
        </a>
        <a
          href="https://www.facebook.com/ANDAOficial/?locale=es_LA"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-facebook fa-lg"></i>
        </a>
        <a
          href="https://www.instagram.com/anda_uy/reels/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <i className="fab fa-instagram fa-lg"></i>
        </a>
      </div>
    </div>
  </footer>
);
