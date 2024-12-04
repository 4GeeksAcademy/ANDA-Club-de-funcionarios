import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <nav
            className="bg-dark text-white sidebar d-flex flex-column"
            style={{ width: "250px", minHeight: "100vh" }}
        >
            <div className="p-3">
                {/* Encabezado del Sidebar */}
                <h5 className="text-center">Perfil Admin</h5>
            </div>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item">
                    <Link to="/perfil_administrador" className="nav-link text-white">
                        <i className="fas fa-user me-2"></i> Tu Perfil
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/editar_cargar_libro" className="nav-link text-white">
                        <i className="fa-solid fa-book-open me-2"></i> Editar y/o cargar libro
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/editar_cargar_salon" className="nav-link text-white">
                        <i className="fa-regular fa-calendar me-2"></i> Editar y/o cargar salón
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/administrador_usuarios" className="nav-link text-white">
                    <i class="fa-solid fa-users-gear me-2"></i> Administrador de usuarios
                    </Link>
                </li>
            </ul>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/configuracion" className="nav-link text-white">
                        <i className="fas fa-cog me-2"></i> Configuración
                    </Link>
                </li>
                <li className="nav-item">
                    <button className="btn btn-link text-danger nav-link">
                        <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};
