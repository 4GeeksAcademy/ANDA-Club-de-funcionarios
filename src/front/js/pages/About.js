import React from 'react';
import logoANDA from "../../img/logo-ANDA.png";
import Interrogacion from '../../img/Interrogacion.png';
import "../../styles/about.css"; // Importamos estilos adicionales

const About = () => {
  return (
    <div className="about-container">
      {/* Logo centrado con efecto hover */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        <a href="/">
          <img src={logoANDA} alt="ANDA Logo" className="about-logo" />
        </a>
      </div>

      {/* Navbar con efecto */}
      <nav className="navbar custom-navbar">
        <div className="container">
          <a className="navbar-brand" href="#"></a>
        </div>
      </nav>

      {/* Formulario con imagen */}
      <div className="container py-5">
        <div className="about-translucent-form row align-items-center g-4">
          {/* Sección de texto */}
          <div className="col-12 col-lg-7 p-4 a">
            <h1 className="fw-bold mb-4 about-title">¿Qué es el Club de Funcionarios?</h1>
            <p>
              El Club de Funcionarios de ANDA es una plataforma diseñada para facilitar la gestión de reservas de locales
              para eventos y préstamos de libros. Aquí podrás organizar tus actividades de manera fácil y eficiente,
              además de disfrutar de múltiples beneficios exclusivos.
            </p>
            <h5 className="fw-bold mb-3">¿Cómo usar nuestra plataforma?</h5>
            <p>
              <strong>Reserva un local:</strong> Ve a la sección de eventos, selecciona una fecha disponible y agrega una descripción del tipo de evento.
            </p>
            <p>
              <strong>Préstamo de libros:</strong> Accede a la biblioteca, elige un libro y realiza tu reserva. Consulta tu historial para ver todas tus reservas y préstamos en un sólo lugar.
            </p>

            <h4 className="mt-4 mb-3 fw-bold">Preguntas Frecuentes</h4>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                    ¿Cómo reservo un salón para eventos?
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show">
                  <div className="accordion-body">
                    Dirígete a la sección Eventos en la barra superior de tu perfil y consulta la disponibilidad del salón en el calendario.
                    Si no está disponible, serás notificado ni bien se encuentre disponible o te facilitaremos otras fechas disponibles vía mail o whapp.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                    ¿Qué pasa si no devuelvo un libro a tiempo?
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    El préstamo de libros es de un mes a partir de la fecha que fue retirado. Serás notificado vía mail sobre el período de tu préstamo.
                    Una vez vencido el plazo para la devolución, podrás comunicarte vía mail o WhatsApp avisando la demora.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                    ¿Cómo puedo cancelar una reserva?
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse">
                  <div className="accordion-body">
                    Podrás cancelar tus reservas en cualquier momento desde el Panel de Usuario, en la sección Mis Reservas.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen alineada a la derecha */}
          <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end">
            <img
              src={Interrogacion}
              alt="Signo de pregunta"
              className="img-fluid about-image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;