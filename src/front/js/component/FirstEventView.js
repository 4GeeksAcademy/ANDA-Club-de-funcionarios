import React from "react";
import { Link } from "react-router-dom";

export const FirstEventView = () => {
  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      <div
        className="text-white text-start py-3 px-4"
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          backgroundColor: '#3865e5',
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
          >
            Planifica tu evento con nosotros
          </h3>
        </div>
        <img
          src="https://www.segurosaludglobal.cl/sites/default/files/inline-images/qqsmartart2.png"
          style={{
            width: "150px",
            height: "auto",
          }}
        />
      </div>

      <div
        className="card mb-3"
        style={{
          height: "100vh",
          backgroundImage: "url('https://img.freepik.com/vector-gratis/fondo-brillo-azul-marino-realista_23-2150036758.jpg?semt=ais_hybrid')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "10px",
          position: "relative",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          <h4
            className="card-title"
            style={{
              textShadow: "0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(255, 255, 255, 0.7), 0 0 45px rgba(255, 255, 255, 0.6)",
            }}
          >
            Organiza tu evento de manera ágil y rápida.
          </h4>

          <p
            className="card-text"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
            }}
          >
            Selecciona una fecha disponible en nuestro calendario.
          </p>
          <Link to="/reservar-evento">
            <div className="d-grid gap-2 d-md-block">
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  backgroundColor: "#3865e5",
                  color: "white",
                }}
              >
                Reservar
              </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
