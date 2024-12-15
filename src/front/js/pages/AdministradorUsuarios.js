import React, { useState, useEffect } from "react";

export const AdministradorUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [loading, setLoading] = useState(true); // Estado de carga

    // Fetch para obtener perfiles de usuario
    const fetchUsuarios = async () => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/user-profiles`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Usuarios obtenidos:", data);

                // Formatear datos para el frontend
                const usuariosTransformados = data.map((user) => ({
                    id: user.id,
                    nombre: user.first_name || "Nombre no proporcionado",
                    apellido: user.last_name || "Apellido no proporcionado",
                    documento: user.identification || "Documento no proporcionado",
                    correo: user.email,
                    estado: user.status || "en_revision", // Ajustar estado según el backend
                }));

                setUsuarios(usuariosTransformados);
            } else {
                console.error(
                    "Error al obtener usuarios:",
                    await response.text()
                );
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        } finally {
            setLoading(false); // Termina la carga
        }
    };

    // Actualiza el estado de un usuario
    const updateUserStatus = async (id, nuevoEstado) => {
        try {
            const response = await fetch(
                `${process.env.BACKEND_URL}/api/admin/users/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ status: nuevoEstado }),
                }
            );
            if (response.ok) {
                // Actualizar el estado local de usuarios
                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) =>
                        usuario.id === id ? { ...usuario, estado: nuevoEstado } : usuario
                    )
                );
            } else {
                console.error("Error al actualizar el estado del usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    // Manejar cambio de estado (activo/en_revision)
    const handleEstadoChange = (id, nuevoEstado) => {
        updateUserStatus(id, nuevoEstado);
    };

    // Cargar usuarios al montar el componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    if (loading) {
        return <div className="text-center">Cargando usuarios...</div>;
    }

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
            {/* Contenedor de la tabla */}
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
                                        {usuario.estado === "en_revision" && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-dark"
                                                    onClick={() =>
                                                        handleEstadoChange(usuario.id, "activo")
                                                    }
                                                >
                                                    Activar
                                                </button>
                                            </>
                                        )}
                                        {usuario.estado === "activo" && (
                                            <button
                                                className="btn btn-sm btn-secondary"
                                                onClick={() =>
                                                    handleEstadoChange(usuario.id, "en_revision")
                                                }
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
