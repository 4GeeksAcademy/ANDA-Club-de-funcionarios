import React from "react";

export const EditarCargarSalon = () => {
    return (
        <div className="container">
            <h2 className="mb-4">Editar / Subir Salón</h2>
            <div className="card shadow-sm p-4">

                {/* Botón para subir un nuevo libro */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-dark" onClick={() => window.location.href = "/subir_libro"}>Subir +
                </button>
                </div>

                {/* Tabla de libros */}
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th scope="col">Miniatura</th>
                            <th scope="col">Título</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Ejemplos de filas */}
                        <tr>
                            <td>
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="Miniatura"
                                    className="img-thumbnail"
                                    style={{ width: "50px" }}
                                />
                            </td>
                            <td>Salón 1</td>
                            <td>
                                <span className="badge bg-success">Live</span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn btn-dark me-2">Modificar</button>
                                <button className="btn btn-sm btn-danger">Borrar</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <img
                                    src="https://via.placeholder.com/50"
                                    alt="Miniatura"
                                    className="img-thumbnail"
                                    style={{ width: "50px" }}
                                />
                            </td>
                            <td>Salón 2</td>
                            <td>
                                <span className="badge bg-secondary">Offline</span>
                            </td>
                            <td>
                                <button className="btn btn-sm btn btn-dark me-2">Modificar</button>
                                <button className="btn btn-sm btn-danger">Borrar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* Hojas de paginas */}
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <button className="page-link">1</button>
                        </li>
                     </ul>
                </nav>
            </div>
        </div>
    );
};
