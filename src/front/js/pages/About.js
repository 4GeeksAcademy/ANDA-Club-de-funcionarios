import React from 'react'
import logoANDA from "../../img/logo-ANDA.png";
import Interrogacion from '../../img/Interrogacion.png';
const About = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
        <a href='/'>
          <img src={logoANDA} alt="Bootstrap" width="100rem" height="auto" />
        </a>
      </div>

      <nav className="navbar" style={{ backgroundColor: '#eef2ff', height: '3rem' }}>
        <div className="container">
          <a className="navbar-brand" href="#"></a>
        </div>
      </nav>

      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 d-flex justify-content-end">
            <img src={Interrogacion} className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes" width="700" height="500" loading="lazy" />
          </div>
          <div className="col-lg-6">
            <h6 className="display-1 fw-bold lh-1 mb-3"
              style={{ color: '#3865e5', fontSize: '4rem' }}>¿Qué es ANDA <i>Plus</i>?</h6>

            <p><strong>ANDA <i>Plus</i></strong> es una plataforma diseñada para sus funcionario/as
              que facilita la reserva en línea de un salón para eventos así como también el préstamo de libros.
              Aquí podrás organizar actividades de manera fácil y eficiente, además de contar con otros beneficios exclusivos.</p>

            <h5 style={{ color: '#3865e5', fontSize: '1.5rem', marginBottom: '1rem' }}>¿Cómo usar nuestra plataforma?</h5>

            <strong> Reserva un local:</strong>

            <p> Ve a la sección de eventos, selecciona una fecha disponible y agrega una descripción del tipo de evento.</p>

            <strong>Préstamo de libros: </strong>

            <p>Accede a la biblioteca, elige un libro y realiza tu reserva.
              Consultá tu historial para ver todas tus reservas y préstamos en un sólo lugar.</p>

            <h5 className="mt-5 mb-4">Preguntas Frecuentes</h5>

            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne" style={{ borderColor: "#3865e5" }}>
                    ¿Como reservo un evento?
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" style={{ borderColor: "#3865e5" }}>
                  <div className="accordion-body">
                    Respuesta 1
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                    ¿Que pasa si no devuelvo un libro a tiempo?
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                  <div className="accordion-body">
                    Respuesta 2
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                    ¿Como puedo cancelar una reserva?
                  </button>
                </h2>
                <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                  <div className="accordion-body">
                    Respuesta 3
                  </div>
                </div>
              </div>
            </div>

          </div>


        </div>



      </div>

    </div>
  )
}

export default About