import React, { useState} from "react";
import { Link } from "react-router-dom";

 const SidebarUser = () => {
      const [isCollapsed, setIsCollapsed] = useState(false);
    
      const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
      };
      
    return (
        <nav
          className="text-white d-flex flex-column"
            style={{ 
                backgroundColor: "#3865e5", width: "250px", minHeight: "100vh",  
            }}
        >
            <div className="p-3">
                {/* Encabezado del Sidebar */}    
            </div>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item">
                    <Link to="/perfil-usuario" className="nav-link text-white">
                        <i className="bi bi-person-circle me-2"></i> Tu Perfil
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/mis-reservas" className="nav-link text-white">
                        <i className="bi bi-calendar-event me-2"></i> Mis reservas
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/historial" className="nav-link text-white">
                        <i className="bi bi-clock-history me-2"></i> Historial
                    </Link>
                </li>
            </ul>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button className="btn btn-link text-danger nav-link">
                        <i className="bi bi-box-arrow-right me-2"></i> Cerrar Sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default SidebarUser;