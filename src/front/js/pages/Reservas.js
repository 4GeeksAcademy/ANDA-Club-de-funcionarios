import React, { useState } from "react";
import { DateTime } from "luxon"; // Trabaja con zonas horarias
import DatePicker from "react-datepicker"; // Selector de fechas
import { es } from "date-fns/locale"; // Localización en español
import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate
import "react-datepicker/dist/react-datepicker.css"; // Estilos de React Datepicker
import Libros from "../../img/Libros.png";

export const Reservas = () => {
  const [startDate, setStartDate] = useState(null); // Fecha de inicio
  const [endDate, setEndDate] = useState(null); // Fecha de fin
  const navigate = useNavigate();

  // Función para formatear la fecha con `Luxon` y zona horaria de Uruguay
  const formatDateLuxon = (date) => {
    if (!date) return "";
    const zonaUruguay = DateTime.fromJSDate(date).setZone("America/Montevideo");
    return zonaUruguay.toFormat("yyyy/MM/dd"); // Cambiar formato a yyyy/MM/dd
  };

  // Confirmación de reserva
  const handleConfirm = () => {
    if (startDate && endDate) {
      const formattedStart = formatDateLuxon(startDate);
      const formattedEnd = formatDateLuxon(endDate);

      alert(`Reserva confirmada desde ${formattedStart} hasta ${formattedEnd}`);
    } else {
      alert("Por favor selecciona un rango de fechas.");
    }
  };

  // Calcular el rango permitido para las fechas
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Día actual
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Primer día del mes
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Un meses en curso

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
          alt="Decoración del banner"
          style={{ maxHeight: "120px" }}
        />
      </div>

      {/* Contenido principal */}
      <div className="container mt-4 mb-5">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="card h-100">
              <img
                src="https://via.placeholder.com/300x600"
                alt="Portada del libro"
                className="card-img-top img-fluid"
                style={{
                  objectFit: "cover",
                  maxHeight: "600px",
                }}
              />
              <div className="card-body">
                <button
                  className="btn btn-secondary btn-sm w-100"
                  onClick={() => navigate("/biblioteca")}
                >
                  Anterior
                </button>
              </div>
            </div>
          </div>

          {/* Detalles del libro */}
          <div className="col-12 col-md-7 col-lg-8">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body">
                <h5 className="mb-4">Detalles</h5>
                <div className="mb-4">
                  <strong>Título:</strong> El Principito
                </div>
                <div className="mb-4">
                  <strong>Sinopsis:</strong> Un piloto que viaja solo tiene que aterrizar en medio de un desierto para arreglar una avería de su avioneta. Allí, en medio de la nada, aparece un niño que le pide que le dibuje un cordero... y poco a poco, a base de preguntas, le va contando su propia historia: la historia de un planeta minúsculo, su casa, una preciosa flor que brotó orgullosa, la historia de sus volcanes y de los temibles baobabs. Y también la historia de su viaje, de los planetas por los que pasó y las personas que conoció.
                </div>
                <div className="mb-4">
                  <strong>Autor:</strong> Antoine de Saint-Exupéry
                </div>
                <div className="mb-4">
                  <strong>Género:</strong> Cuento
                </div>
                <div className="mb-4">
                  <strong>Desde:</strong>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={today} // Inicio desde el día actual
                    maxDate={endOfMonth} // Fin del mes
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha"
                    locale={es} // Localización en ESP
                  />
                </div>
                <div className="mb-4">
                  <strong>Hasta:</strong>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || today} // Desde la fecha de inicio o el día actual
                    maxDate={endOfMonth} // Fin del mes
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha"
                    locale={es} // Localización en ESP
                  />
                </div>
                <div className="mb-4">
                  <strong>ISBN:</strong> 314046407X
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleConfirm}
                >
                  Resrevar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4" style={{ height: "20px" }}></div>
    </div>
  );
};
