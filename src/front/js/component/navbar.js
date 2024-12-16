import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [activeLink, setActiveLink] = useState("/"); // Estado para rastrear el enlace activo

  const handleLinkClick = (path) => {
    setActiveLink(path); // Actualiza el enlace activo al hacer clic
  };
  //

  //    const {store} = useContext(Context)
  //    const navigate = useNavigate()
  //    const { location } = useLocation()

  //    const admminRoutes = ['/edit/users', '/dashboard/admin', '/add/book', '/user/profile']

  //   useEffect(()=>{
  //       if(store.user.role != 'admin' && adminRoutes.includes(location.pathname)){
  //           navigate("/user/dashboard")   (lo redirijo a cualquier pagina)
  //       }
  //   },[location])

  //  return (<div>
  //       { store.user.role == 'admin" && <AdminButton /> }     (para ocultar el elemento que quiera, por ejemplo el boton admin)

  //   </div>)
  //}



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
              style={{ width: "100px" }}
            />
          </Link>

          {/* Menú hamburguesa para pantallas pequeñas */}
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

          {/* Contenido del navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              {/* Enlaces principales */}
              <li className="nav-item">
                
                <Link
                  to="panel-de-usuario/perfil-usuario"
                  className={`nav-link ${activeLink === "/" ? "fw-bold" : ""}`}
                  onClick={() => handleLinkClick("/panel-de-usuario")}
                >
                  Usuario
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/panel-admin/perfil-administrador"
                  className={`nav-link ${activeLink === "/" ? "fw-bold" : ""}`}
                  onClick={() => handleLinkClick("/panel-admin")}
                >
                  Administrador
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/biblioteca"
                  className={`nav-link ${activeLink === "/biblioteca" ? "fw-bold" : ""
                    }`}
                  onClick={() => handleLinkClick("/biblioteca")}
                >
                  Biblioteca
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/eventos"
                  className={`nav-link ${activeLink === "/eventos" ? "fw-bold" : ""
                    }`}
                  onClick={() => handleLinkClick("/eventos")}
                >
                  Eventos
                </Link>
              </li>
            </ul>

            {/* Íconos y menú desplegable */}
            <div className="d-flex align-items-center">
              {/* Notificaciones */}
              <button className="btn btn-link text-dark me-3">
                <i className="fas fa-bell"></i>
              </button>
              {/* Dropdown de usuario */}
              <div className="dropdown">
                <button
                  className="btn btn-dark dropdown-toggle align-center"
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
                    <button className="dropdown-item text-primary">
                      Cerrar Sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </header>
  );
};





