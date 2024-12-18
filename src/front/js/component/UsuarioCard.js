import React from "react";

const UsuarioCard = ({ usuario, onAprobar, onRechazar, onInactivar }) => {
    return (
        <tr>
            <td>{usuario.nombre}</td>
            <td>{usuario.apellido}</td>
            <td>{usuario.documento}</td>
            <td>{usuario.correo}</td>
            <td>
                <div className="d-flex gap-2">
                    {/* Botón Aprobar */}
                    <button
                        className="btn btn-sm btn-dark"
                        onClick={() => onAprobar(usuario.id)}
                        disabled={usuario.estado !== "pendiente"}
                    >
                        Aprobar
                    </button>
                    {/* Botón Rechazar */}
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onRechazar(usuario.id)}
                        disabled={usuario.estado !== "pendiente"}
                    >
                        Rechazar
                    </button>
                    {/* Botón Inactivar */}
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onInactivar(usuario.id)}
                        disabled={usuario.estado === "pendiente" || usuario.estado === "rechazado"}
                    >
                        Inactivar
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default UsuarioCard;
