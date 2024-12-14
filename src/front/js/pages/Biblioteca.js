import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Libros from "../../img/Libros.png";

export const Biblioteca = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook para navegación

  const libros = [
    {
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      descripcion: "Un cuento poético y filosófico para todas las edades.",
      imagen:
        "https://i.pinimg.com/originals/7a/96/63/7a966326d7ad1f97db804f9778f0ea00.png",
    },
    {
      titulo: "El pollo Pepe",
      autor: "Nick Denchfield y Ant Parker",
      descripcion: "Un divertido libro para los más pequeños.",
      imagen:
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSUZMCQN9eg6op3KwG9wICsii2pFX_Uo-_7UYtwZAlvk1lZ3bRo6IPxlWdxrbAH6py2-R58EiC-ipz5zqvy7g9eRM7JEm28RIwPgpe9jeDKKjPO4VF57wWl0rBxII9XLaLC1ofyYEUiiw/s1600/El_pollo_Pepe-Denchfield_Nick-9788434856813.jpg",
    },
    {
      titulo: "Cuentos Clásicos",
      autor: "Varios Autores",
      descripcion: "Una colección de los cuentos más populares.",
      imagen:
        "https://images.cdn2.buscalibre.com/fit-in/360x360/7e/06/7e06b177478cf3c10aa7763cf559ade1.jpg",
    },
    {
      titulo: "Hamlet",
      autor: "William Shakespeare",
      descripcion: "Una de las obras más famosas del teatro clásico.",
      imagen:
        "https://images.cdn3.buscalibre.com/fit-in/360x360/73/5d/735d483955e1b07e81c917dc1a65c14b.jpg",
    },
    {
      titulo: "La divina comedia",
      autor: "Dante Alighieri",
      descripcion: "Un viaje alegórico a través del Infierno, el Purgatorio y el Paraíso.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ujmnyP-m70zH4BjnzQd2zndi3pG4rIvFqA&s",
    },
    {
      titulo: "IT",
      autor: "Stephen King",
      descripcion: "Una novela de terror sobre un grupo de amigos y un ser maligno.",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNybo7By9gjah4p2E5LrndvyH8hVx4QyyE9A&s",
    },
  ];

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
          {libros.map((libro, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={libro.imagen}
                  className="card-img-top img-fluid"
                  style={{
                    height: "180px",
                    objectFit: "cover",
                  }}
                  alt={`Portada del libro ${libro.titulo}`}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{libro.titulo}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{libro.autor}</h6>
                  <p className="card-text small text-secondary">
                    {libro.descripcion}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => navigate("/biblioteca/reservas")}
                    >
                      Ver más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4" style={{ height: "10px" }}></div>
    </div>
  );
};





