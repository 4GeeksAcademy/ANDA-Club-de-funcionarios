import React, { useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Libros from "../../img/Libros.png";
import "../../styles/biblioteca.css"; // Importamos los estilos interactivos

export const Biblioteca = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  // Cargar libros desde el backend al montar el componente
  useEffect(() => {
    actions.fetchLibros();
  }, []);

  // Renderizar solo el Outlet en las rutas hijas
  if (location.pathname !== "/biblioteca") {
    return (
      <div className="d-flex flex-column" style={{ height: "100%" }}>
        <Outlet />
      </div>
    );
  }

  return (
    <div className="biblioteca-container">
      {/* Banner superior */}
      <div className="biblioteca-banner d-flex flex-column flex-md-row align-items-center justify-content-between">
        <div className="banner-text text-center text-md-start">
          <h1 className="banner-title">Biblioteca</h1>
          <p>Consultá nuestro amplio catálogo de libros para reserva en línea.</p>
        </div>
        <div className="banner-image-container">
          <img
            src={Libros}
            className="banner-image"
            alt="Decoración del banner"
          />
        </div>
      </div>

      {/* Info biblioteca */}
      <div className="container mt-5">
        <div className="row g-4">
          {store.libros.length > 0 ? (
            store.libros.map((libro, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card libro-card shadow-sm">
                  <img
                    src={libro.miniatura || "https://via.placeholder.com/150"}
                    className="card-img-top libro-imagen"
                    alt={`Portada del libro ${libro.titulo}`}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="libro-titulo">{libro.title}</h5>
                    <h6 className="libro-autor text-muted">{libro.author}</h6>
                    <p className="libro-genero">
                      {libro.book_gender || "Género no especificado"}
                    </p>
                    <button
                      className="btn btn-outline-primary mt-auto libro-boton"
                      onClick={() => navigate(`reservas/${libro.id}`)}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-muted">
              No hay libros disponibles en la biblioteca.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
