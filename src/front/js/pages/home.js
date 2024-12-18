import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/login.css";
import logoANDA from "../../img/logo-ANDA.png";
import manos from "../../img/manos.png";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const navigate = useNavigate();

    // Manejar la transición al Login
    const handleAccessClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate("/login");
        }, 1000); // Tiempo sincronizado con la animación
    };

    // Manejar la transición al About
    const handleMoreInfoClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate("/about");
        }, 1000); // Tiempo sincronizado con la animación
    };

    return (
        <div className={`home-container ${isTransitioning ? "transitioning" : ""}`}>
            {/* Header con el logo */}
            <header className="home-header">
                <img src={logoANDA} alt="ANDA Logo" className="home-logo" />
            </header>

            {/* Navbar */}
            <nav className="navbar custom-navbar">
                <div className="container">
                    <a className="navbar-brand" href="#"></a>
                </div>
            </nav>

            {/* Sección Hero */}
            <section className="hero-section container py-5">
                <div className="row align-items-center">
                    {/* Imagen a la derecha */}
                    <div className="col-lg-6 order-lg-2 text-center">
                        <img
                            src={manos}
                            alt="Manos Unidas"
                            className="img-fluid hands-image"
                            loading="lazy"
                        />
                    </div>

                    {/* Texto e interacción */}
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="hero-title fw-bold">Club de Funcionarios</h1>
                        <p className="hero-subtitle">¡Disfruta de los beneficios pensados para ti!</p>
                        <div className="d-flex gap-3 justify-content-center justify-content-lg-start">
                            <button className="btn btn-primary btn-lg" onClick={handleAccessClick}>
                                Acceder
                            </button>
                            <button
                                className="btn btn-outline-primary btn-lg"
                                onClick={handleMoreInfoClick}
                            >
                                Más información
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
