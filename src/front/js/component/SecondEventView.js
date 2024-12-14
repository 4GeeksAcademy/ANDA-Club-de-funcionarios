import React, { useState } from "react";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import { useNavigate, Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export const SecondEventView = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  const formatDateLuxon = (date) => {
    if (!date) return "";
    const zonaUruguay = DateTime.fromJSDate(date).setZone("America/Montevideo");
    return zonaUruguay.toFormat("yyyy/MM/dd");
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      const formattedStart = formatDateLuxon(startDate);
      const formattedEnd = formatDateLuxon(endDate);
      alert(`Reserva confirmada desde ${formattedStart} hasta ${formattedEnd}`);
    } else {
      alert("Por favor selecciona un rango de fechas.");
    }
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

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
        />
      </div>
      <div className="container mt-4 mb-5">
        <div className="row align-items-stretch">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="card h-auto">
              <img
                src="https://media.istockphoto.com/id/165591664/es/vector/fiesta-multitud.jpg?s=612x612&w=0&k=20&c=f8H5rJsWvhYJzgHSrvWO8B2aOTcfwMnHn18Cyha8zvc="
                className="card-img-top img-fluid"
                style={{
                  objectFit: "auto",
                  maxHeight: "auto",
                }}
              />
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
                  <input type="text" className="form-control" placeholder="Ingresa la cantidad de invitados" />
                </div>
                <div className="mb-4">
                  <strong>Hora inicio:</strong>
                  <input type="text" className="form-control" placeholder="Ingresa la de hora de comienzo " />
                  <div>
                    <strong>Hora finalización:</strong>
                    <input type="text" className="form-control" placeholder="Ingresa la hora de finalización" />
                  </div>
                </div>


                <div className="mb-4" >
                  <strong>Fecha:</strong>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={today}
                    maxDate={endOfMonth}
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Selecciona fecha"
                    locale={es}
                  />
                  <div>
                    <Link to="/segunda-vista-evento">
                      <div className="d-grid gap-2 d-md-block">
                        <button
                          className="btn btn-primary"
                          type="button"
                          style={{
                            backgroundColor: "#3865e5",
                            color: "white",
                            marginTop: "1rem"
                          }}
                        >
                          Confirmar
                        </button>
                      </div>
                    </Link>
                  </div>

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


