import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getReservas, crearReserva, getReservaById, actualizarReserva, eliminarReserva } from '../services/ReservasService';

export const CrearEditarEvento = () => {
    // Estados para los valores de los inputs
    const [nombreEvento, setNombreEvento] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [evento, setEvento] = useState(null); // Estado global para el objeto evento
    const { id } = useParams(); // Obtener el ID de la URL

    const navigate = useNavigate();

    // Función para convertir fechas a formato ISO 8601
    const convertirAISO8601 = (fecha, hora = '00:00:00') => {
        const [year, month, day] = fecha.split('-');
        return new Date(`${year}-${month}-${day}T${hora}Z`).toISOString();
    };

    // Obtener el evento a editar si existe un ID
    useEffect(() => {
        if (id) {
            const cargarEvento = async () => {
                try {
                    const reserva = await getReservaById(id); // Obtener el evento por ID
                    setNombreEvento(reserva.event_name);
                    setFechaInicio(reserva.start_time.split('T')[0]); // Extraemos solo la fecha
                    setFechaFin(reserva.end_time.split('T')[0]);
                    setEvento(reserva); // Almacenar el evento
                } catch (error) {
                    console.error("Error al cargar el evento:", error);
                }
            };
            cargarEvento();
        }
    }, [id]);

    // Maneja el envío del formulario
    const manejarSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Validación básica
        if (!nombreEvento || !fechaInicio || !fechaFin) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        if (new Date(fechaInicio) > new Date(fechaFin)) {
            alert('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        // Convertir fechas al formato ISO 8601
        const fechaInicioISO = convertirAISO8601(fechaInicio);
        const fechaFinISO = convertirAISO8601(fechaFin);

        const eventoBody = {
            "event_name": nombreEvento,
            "start_time": fechaInicioISO,
            "end_time": fechaFinISO
        };

        if (id) {
            // Si estamos editando, usamos la función actualizarReserva
            try {
                await actualizarReserva(id, eventoBody);
                alert('Evento editado exitosamente.');
                navigate('/reservas'); // Redirigir a la lista de reservas
            } catch (error) {
                console.error("Error al editar el evento:", error);
                alert('Hubo un error al editar el evento.');
            }
        } else {
            // Si no existe ID, creamos un nuevo evento
            try {
                await crearReserva(eventoBody);
                alert('Evento creado exitosamente.');
                navigate('/reservas'); // Redirigir a la lista de reservas
            } catch (error) {
                console.error("Error al crear el evento:", error);
                alert('Hubo un error al crear el evento.');
            }
        }

        // Limpiar los campos después de guardar
        setNombreEvento('');
        setFechaInicio('');
        setFechaFin('');

        navigate("/panel-de-usuario/calendario-eventos");
    };

    return (
        <div>
            <h2>{id ? 'Editar' : 'Crear'} Evento</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label htmlFor="nombreEvento">Nombre del evento:</label>
                    <input
                        type="text"
                        id="nombreEvento"
                        value={nombreEvento}
                        onChange={(e) => setNombreEvento(e.target.value)}
                        placeholder="Ingresa el nombre del evento"
                    />
                </div>

                <div>
                    <label htmlFor="fechaInicio">Fecha de inicio:</label>
                    <input
                        type="date"
                        id="fechaInicio"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="fechaFin">Fecha de fin:</label>
                    <input
                        type="date"
                        id="fechaFin"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                    />
                </div>

                <button type="submit">{id ? 'Guardar Cambios' : 'Crear Evento'}</button>
            </form>

            {/* Mostrar el objeto evento si existe */}
            {evento && (
                <div>
                    <h3>Evento Guardado:</h3>
                    <p><strong>Nombre:</strong> {evento.event_name}</p>
                    <p><strong>Fecha de Inicio:</strong> {evento.start_time}</p>
                    <p><strong>Fecha de Fin:</strong> {evento.end_time}</p>
                </div>
            )}
        </div>
    );
};
