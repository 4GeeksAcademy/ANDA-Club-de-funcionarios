import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import { toast } from "sonner";

export const Reservas = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [bookDetails, setBookDetails] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  // Calcular el rango permitido para las fechas
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Día actual
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Un meses en curso

  // Función para formatear la fecha con `Luxon` y zona horaria de Uruguay
  const formatDateLuxon = (date) => {
    if (!date) return "";
    const zonaUruguay = DateTime.fromJSDate(date).setZone("America/Montevideo");
    return zonaUruguay.toFormat("yyyy/MM/dd"); // Cambiar formato a yyyy/MM/dd
  };

  // Fetch de los detalles del libro al cargar el componente
  useEffect(() => {
    const fetchBookDetails = async () => {
      const details = await actions.getBookDetails(id); // Fetch de los detalles del libro
      if (details) {
        setBookDetails(details);
      } else {
        toast.error("No se encontraron los detalles del libro.");
      }
    };
    fetchBookDetails();
  }, [id, actions]);

  const handleReserve =async() => {
    if (startDate && endDate) {
      if (bookDetails.availability) {
        const formattedStart = formatDateLuxon(startDate);
        const formattedEnd = formatDateLuxon(endDate);
        const response=await actions.fetchReservas(id)
        //alert(`Reserva confirmada desde ${formattedStart} hasta ${formattedEnd}`);
      } else {
        toast.error("El libro no está disponible para reserva.");
      }
    } else {
      toast.error("Por favor selecciona un rango de fechas.");
    }
};

  return (
    <div className="container mt-4">
      {bookDetails ? (
        <div className="row">
          <div className="col-md-4">
            <img
              src="https://via.placeholder.com/300x600"
              alt={bookDetails.title}
              className="img-fluid"
            />
            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => navigate("/biblioteca")}
            >
              Anterior
            </button>
          </div>
          <div className="col-md-8">
            <h3>Detalles</h3>
            <p>
              <strong>Título:</strong> {bookDetails.title}
            </p>
            <p>
              <strong>Autor:</strong> {bookDetails.author}
            </p>
            <p>
              <strong>Género:</strong> {bookDetails.book_gender}
            </p>
            <p>
              <strong>Disponibilidad:</strong>{" "}
              {bookDetails.availability ? "Sí" : "No"}
            </p>

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

            {/* Botón de reserva con lógica de disponibilidad */}
            <button
              className={`btn ${
                bookDetails.availability ? "btn-primary" : "btn-secondary"
              } w-100`}
              onClick={()=>handleReserve()}
              disabled={!bookDetails.availability} // Deshabilita si el libro no está disponible
            >
              {bookDetails.availability ? "Reservar" : "No disponible"}
            </button>
          </div>
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
};