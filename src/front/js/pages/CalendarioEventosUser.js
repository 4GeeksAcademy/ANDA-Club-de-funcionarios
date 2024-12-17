import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { getReservas, crearReserva, getReservaById, actualizarReserva, eliminarReserva } from '../services/ReservasService';

export const CalendarioEventosUser = () => {

    const location = useLocation();
    const navigate = useNavigate(); // Hook para navegación


    const [reservas, setReservas] = useState([]); // Estado para manejar la carga de datos
    const [error, setError] = useState(null);  // Estado para manejar errores

    // Función para cargar las reservas
    const cargarReservas = async () => {
        try {

            const data = await getReservas();  // Llamada al servicio
            setReservas(data);  // Actualizar el estado con las reservas obtenidas
        } catch (error) {
            console.error(error);
        }
    };

    const deleteReserva = async (idReserva) => {

        await eliminarReserva(idReserva);
        await cargarReservas();
    };

    useEffect(() => {
        cargarReservas();  // Llamar a la función cuando el componente se monte
    }, []);

    return (
        <div className="container mt-4">
            <h2>Reservas Activas</h2>
            <Link to={`/reservar-evento`} className="btn btn-primary">
                Realizar Reserva
            </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Correo Electrónico</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map(reserva => (

                        <tr>
                            <td>{reserva.event_name}</td>
                            <td>Salón</td>
                            <td>{reserva.user_email}</td>
                            <td>
                                <button onClick={() => deleteReserva(reserva.id)} className="btn btn-danger">Cancelar</button>
                                <Link to={`/reservar-evento/${reserva.id}`} className="btn btn-primary">
                                    Editar
                                </Link>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
};