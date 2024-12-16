import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/");
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (path) => setActiveLink(path);

  const handleLogout = () => {
    actions.logoutUser();
    navigate("/");
  };

  useEffect(() => {
    if (!store.user?.role) return;

    if (store.user.role === "admin" && location.pathname === "/") {
      navigate("/panel-admin/perfil-administrador");
    } else if (store.user.role === "user" && location.pathname === "/") {
      navigate("/panel-de-usuario/perfil-usuario");
    }
  }, [store.user?.role, location.pathname, navigate]);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
        <div className="container-fluid">
          {/* Logo */}
          <Link
            to={
              store.user?.role === "admin"
                ? "/panel-admin/perfil-administrador"
                : store.user?.role === "user"
                ? "/panel-de-usuario/perfil-usuario"
                : "/"
            }
            className="navbar-brand"
          >
            <img
              src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
              alt="Anda"
              style={{ width: "100px" }}
            />
          </Link>

          {/* Contenedor para botón hamburguesa y dropdown */}
          <div className="d-flex align-items-center ms-auto order-2 order-lg-3">
            {/* Botón hamburguesa */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Dropdown */}
            <div className="dropdown ms-2">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {store.user?.username || "Usuario"}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link
                    to={
                      store.user?.role === "admin"
                        ? "/panel-admin/perfil-administrador"
                        : "/panel-de-usuario/perfil-usuario"
                    }
                    className="dropdown-item"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item text-primary"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Contenido del navbar */}
          <div
            className="collapse navbar-collapse order-3 order-lg-2"
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item">
                <Link
                  to="/panel-de-usuario/perfil-usuario"
                  className={`nav-link ${
                    activeLink === "/panel-de-usuario" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleLinkClick("/panel-de-usuario")}
                >
                  Usuario
                </Link>
              </li>
              {store.user?.role === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/panel-admin/perfil-administrador"
                    className={`nav-link ${
                      activeLink === "/panel-admin" ? "fw-bold" : ""
                    }`}
                    onClick={() => handleLinkClick("/panel-admin")}
                  >
                    Administrador
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to="/biblioteca"
                  className={`nav-link ${
                    activeLink === "/biblioteca" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleLinkClick("/biblioteca")}
                >
                  Biblioteca
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/eventos"
                  className={`nav-link ${
                    activeLink === "/eventos" ? "fw-bold" : ""
                  }`}
                  onClick={() => handleLinkClick("/eventos")}
                >
                  Eventos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};






