import React, { useState } from "react";

export const AdministradorUsuarios = () => {
    const [usuarios, setUsuarios] = useState(
        Array.from({ length: 2 }).map((_, index) => ({
            id: index + 1,
            nombre: `Nombre ${index + 1}`,
            apellido: `Apellido ${index + 1}`,
            documento: `5.778.986-${index + 1}`,
            correo: `correo${index + 1}@correo.com`,
            estado: "pendiente", // Estados iniciales: "pendiente"
        }))
    );

    const handleAprobar = (id) => {
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
                usuario.id === id ? { ...usuario, estado: "aprobado" } : usuario
            )
        );
    };

    const handleRechazar = (id) => {
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
                usuario.id === id ? { ...usuario, estado: "rechazado" } : usuario
            )
        );
    };

    const handleInactivar = (id) => {
        setUsuarios((prevUsuarios) =>
            prevUsuarios.map((usuario) =>
                usuario.id === id ? { ...usuario, estado: "inactivo" } : usuario
            )
        );
    };

    return (
        <div
            className="container-fluid px-2 px-md-3 mt-4"
            style={{
                maxWidth: "100%",
                overflowX: "hidden",
                boxSizing: "border-box",
            }}
        >
            <h2 className="mb-4 text-center">Administrador de Usuarios</h2>
            {/* Table container */}
            <div className="table-responsive">
                <table className="table table-hover table-bordered table-sm align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ minWidth: "100px" }}>Nombre</th>
                            <th style={{ minWidth: "100px" }}>Apellido</th>
                            <th style={{ minWidth: "120px" }}>Documento</th>
                            <th style={{ minWidth: "200px" }} className="text-break">
                                Correo
                            </th>
                            <th style={{ minWidth: "180px" }} className="text-center">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.documento}</td>
                                <td className="text-break">{usuario.correo}</td>
                                <td>
                                    <div className="d-flex flex-wrap justify-content-center gap-1">
                                        {usuario.estado === "pendiente" && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-dark"
                                                    onClick={() => handleAprobar(usuario.id)}
                                                >
                                                    Aprobar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleRechazar(usuario.id)}
                                                >
                                                    Rechazar
                                                </button>
                                            </>
                                        )}
                                        {usuario.estado === "aprobado" && (
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() => handleInactivar(usuario.id)}
                                            >
                                                Inactivar
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


