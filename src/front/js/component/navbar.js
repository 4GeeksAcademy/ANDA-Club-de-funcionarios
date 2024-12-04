import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header>
      {/* Navbar principal */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img
              src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
              alt="Anda"
              style={{ width: "70px" }}
            />
          </Link>

          <div className="d-flex align-items-center">
            {/* Botón para el menú hamburguesa */}
            <button
              className="navbar-toggler me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Notificaciones */}
            <button className="btn btn-link text-dark d-lg-none">
              <i className="fas fa-bell"></i>
            </button>

            {/* Dropdown para Admin (solo para pantallas pequeñas) */}
            <div className="dropdown d-lg-none">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButtonMobile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin001
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButtonMobile"
              >
                <li>
                  <Link to="/perfil" className="dropdown-item">
                    Perfil
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item text-danger">
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Menú completo (colapsable) */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                <Link to="/" className="nav-link active">
                  Panel de usuario
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/biblioteca" className="nav-link">
                  Biblioteca
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/eventos" className="nav-link">
                  Eventos
                </Link>
              </li>
            </ul>

            {/* Íconos (solo para pantallas grandes) */}
            <div className="d-none d-lg-flex align-items-center">
              <button className="btn btn-link text-dark">
                <i className="fas fa-bell"></i>
              </button>
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin001
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link to="/perfil" className="dropdown-item">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-danger">
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Banner negro */}
        <div className="bg-dark text-white text-start py-3 px-4">
          <h1 className="mb-1">Panel de administrador</h1>
          <p className="mb-0">Perfil para gestionar tus salones y/o libros.</p>
        </div>
      </header>
    );
  };



