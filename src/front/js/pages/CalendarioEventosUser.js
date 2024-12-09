import React from "react";

export const CalendarioEventosUser = () => {
    return (
        <div className="container mt-4">
            <h2>Reservas Activas</h2>
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
                    <tr>
                        <td>El Principito</td>
                        <td>Libro</td>
                        <td>alexander.folsy@gmail.com</td>
                        <td>
                            <button className="btn btn-danger">Cancelar</button>
                        </td>
                    </tr>
                    <tr>
                        <td>Delux</td>
                        <td>Salón</td>
                        <td>alexander.folsy@gmail.com</td>
                        <td>
                            <button className="btn btn-danger">Cancelar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};