import React from "react";

export const AdministradorUsuarios = () => {
  return (
    <div className="container">
      <h2 className="mb-4">Administrador de Usuarios</h2>
      <div className="card shadow-sm p-4">
        {/* Tabla de usuarios */}
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Documento de identidad</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Estado del usuario</th>
            </tr>
          </thead>
          <tbody>
            {/* Ejemplo de filas (puedes mapear datos dinámicos aquí) */}
            {Array.from({ length: 10 }).map((_, index) => (
              <tr key={index}>
                <td>Nombre {index + 1}</td>
                <td>Apellido {index + 1}</td>
                <td>5.778.986-{index + 1}</td>
                <td>correo{index + 1}@correo.com</td>
                <td>
                  <div className="d-flex justify-content-start">
                    <button className="btn btn-sm btn btn-dark me-2">Aprobar</button>
                    <button className="btn btn-sm btn-danger me-2">Rechazar</button>
                    <button className="btn btn-sm btn-secondary">Inactivar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
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
