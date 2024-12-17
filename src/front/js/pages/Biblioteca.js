import React, { useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Libros from "../../img/Libros.png";

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
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      {/* Banner superior */}
      <div
        className="text-white py-3 px-4 d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "#3865E5",
          width: "100%",
          height: "150px",
        }}
      >
        <div>
          <h1 className="mb-1">Biblioteca</h1>
          <p className="mb-0">
            Consultá nuestro amplio catálogo de libros para reserva en línea.
          </p>
        </div>
        <img
          src={Libros}
          className="img-fluid"
          style={{ maxHeight: "150px" }}
          alt="Decoración del banner"
        />
      </div>

      {/* Info biblioteca */}
      <div className="container mt-4">
        <div className="row g-3">
          {store.libros.length > 0 ? (
            store.libros.map((libro, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={libro.miniatura || "https://via.placeholder.com/150"}
                    className="card-img-top img-fluid"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                    alt={`Portada del libro ${libro.titulo}`}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-primary">{libro.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {libro.author}
                    </h6>
                    <p className="card-text small text-secondary">
                      {libro.book_gender || "Género no especificado"}
                    </p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button
                        className="btn btn-outline-primary mt-auto"
                        onClick={() => navigate(`reservas/${libro.id}`)}
                      >
                        Ver más
                      </button>
                    </div>
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
      <div className="mt-4" style={{ height: "10px" }}></div>
    </div>
  );
};
