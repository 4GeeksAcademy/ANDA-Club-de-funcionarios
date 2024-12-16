import React, { useState } from "react";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import salon_logo_ from "../../img/salon_logo_.png";

export const SecondEventView = () => {
  const [startDate, setStartDate] = useState(null);
  const [horaInicio, setHoraInicio] = useState(""); // Estado para la hora de inicio
  const [horaFin, setHoraFin] = useState(""); // Estado para la hora de fin
  const [cantidadInvitados, setCantidadInvitados] = useState(1); // Estado para cantidad de invitados

  const formatDateLuxon = (date) => {
    if (!date) return "";
    const zonaUruguay = DateTime.fromJSDate(date).setZone("America/Montevideo");
    return zonaUruguay.toFormat("yyyy/MM/dd");
  };

  const handleConfirm = () => {
    if (startDate && horaInicio && horaFin && cantidadInvitados) {
      const formattedDate = formatDateLuxon(startDate);
      alert(
        `Reserva confirmada para el ${formattedDate} desde ${horaInicio} hasta ${horaFin} para ${cantidadInvitados} invitados.`
      );
    } else {
      alert("Por favor completa todos los campos.");
    }
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Generar las opciones de horas (de 00:00 a 23:30, en incrementos de 30 minutos)
  const generateHourOptions = () => {
    const options = [];
    for (let i = 0; i < 24; i++) {
      const hour = i.toString().padStart(2, "0");
      options.push(`${hour}:00`, `${hour}:30`);
    }
    return options;
  };

  return (
    <div className="d-flex flex-column" style={{ height: "100%" }}>
      <div
        className="text-white py-3 px-4 d-flex align-items-center justify-content-between"
        style={{
          backgroundColor: "#3865E5",
          width: "100%",
          height: "150px",
        }}
      >
        <div>
          <h2 className="mb-1">Planifica tu evento con nosotros</h2>
          <p className="card-title">Selecciona día y margen de horas que necesites y confirma tu evento.</p>
        </div>
        <img
          src="https://www.segurosaludglobal.cl/sites/default/files/inline-images/qqsmartart2.png"
          style={{ maxHeight: "150px" }}
          alt="Evento"
        />
      </div>
      <div className="container mt-4 mb-">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="card h-auto">
              <img
                src={salon_logo_}
                className="card-img-top img-fluid"
                alt="Imagen de evento"
              />
            </div>
            <div className="card-body">
                <button
                  className="btn btn-secondary btn-sm w-100"
                  onClick={() => navigate("/eventos")}
                >
                  Anterior
                </button>
              </div>
          </div>

          

          <div className="col-12 col-md-7 col-lg-8">
            <div className="card h-100 d-flex flex-column">
              <div className="card-body">
                <h3 className="mb-4">Reservar:</h3>
                <div className="mb-4">
                  <strong>Dirección:</strong>
                  <input type="text" className="form-control" placeholder="Ingresa la dirección" />
                </div>
                <div className="mb-4">
                  <strong>Tipo de evento:</strong>
                  <input type="text" className="form-control" placeholder="Ingresa el tipo de evento" />
                </div>
                <div className="mb-4">
                  <strong>Cantidad de invitados:</strong>
                  <input
                    type="number"
                    className="form-control"
                    min="1"
                    max="500"
                    value={cantidadInvitados}
                    onChange={(e) => setCantidadInvitados(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <strong>Hora inicio:</strong>
                  <select
                    className="form-select"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                  >
                    <option value="">Selecciona hora</option>
                    {generateHourOptions().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <strong>Hora finalización:</strong>
                  <select
                    className="form-select"
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                  >
                    <option value="">Selecciona hora</option>
                    {generateHourOptions().map((hora) => (
                      <option key={hora} value={hora}>
                        {hora}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <strong>Fecha:</strong>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    minDate={today}
                    maxDate={endOfMonth}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha"
                    locale={es}
                  />
                </div>
                <div>
                  <button
                    onClick={handleConfirm}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#3865e5",
                      color: "white",
                      marginTop: "1rem",
                    }}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4" style={{ height: "20px" }}></div>
    </div>
  );
};


