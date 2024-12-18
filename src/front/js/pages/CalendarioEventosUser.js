import React, { useEffect, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const CalendarioEventosUser = () => {
    const { store, actions } = useContext(Context); // Acceso al store y a las acciones del flux
    const navigate = useNavigate();
    // Función para cargar las reservas
    const cargarReservas = async () => {
        await actions.fetchReservasEvent(); // Llamada a la acción del flux
    };
    // Función para eliminar una reserva
    const deleteReserva = async (idReserva) => {
        await actions.deleteReserva(idReserva); // Llamada a la acción del flux
        await cargarReservas(); // Recargar las reservas actualizadas
    };
    // Cargar reservas cuando el componente se monte
    useEffect(() => {
        cargarReservas();
    }, []);
    return (
        <div className="container mt-4">
            <h2>Reservas Activas</h2>
            <Link to={`/reservar-evento`} className="btn btn-primary mb-3">
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
                    {store.reservas && store.reservas.length > 0 ? (
                        store.reservas.map(reserva => (
                            <tr key={reserva.id}>
                                <td>{reserva.event_name}</td>
                                <td>Salón</td>
                                <td>{reserva.user_email}</td>
                                <td>
                                    <button
                                        onClick={() => deleteReserva(reserva.id)}
                                        className="btn btn-danger me-2"
                                    >
                                        Cancelar
                                    </button>
                                    <Link to={`/reservar-evento/${reserva.id}`} className="btn btn-primary">
                                        Editar
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No hay reservas activas.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
