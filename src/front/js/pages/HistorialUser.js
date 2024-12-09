import React from "react";

export const HistorialUser = () => {
    return (
        <div className="container mt-4">
            <h2>Historial de Reservas</h2>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar..."
                />
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Correo Electrónico</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tortor</td>
                        <td>CNR</td>
                        <td>alexander.folsy@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Gabon</td>
                        <td>GAB</td>
                        <td>alexander.folsy@gmail.com</td>
                    </tr>
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#">
                            1
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            2
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#">
                            3
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};