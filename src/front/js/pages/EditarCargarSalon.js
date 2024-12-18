import React, { useState } from "react";

export const EditarCargarSalon = () => {
    // Estado inicial del salón
    const [salon, setSalon] = useState({
        imagenPrincipal: "https://via.placeholder.com/400x200",
        descripcion:
            "Indicado para todo tipo de eventos, reuniones, cócteles, almuerzos y cenas. Proyector, pantalla y servicio de amplificación de audio.",
        detalles: {
            proyectores: 2,
            salas: 2,
            capacidad: 200,
        },
    });

    const [editMode, setEditMode] = useState(false);

    // Manejar cambios en los campos
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (["proyectores", "salas", "capacidad"].includes(name)) {
            setSalon((prevSalon) => ({
                ...prevSalon,
                detalles: {
                    ...prevSalon.detalles,
                    [name]: value,
                },
            }));
        } else {
            setSalon((prevSalon) => ({
                ...prevSalon,
                [name]: value,
            }));
        }
    };

    // Guardar los cambios
    const handleSave = () => {
        setEditMode(false);
        alert("Cambios guardados");
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Salón Anda</h2>

            {/* Imagen principal */}
            <div className="d-flex justify-content-center mb-4">
                {editMode ? (
                    <input
                        type="text"
                        className="form-control"
                        name="imagenPrincipal"
                        value={salon.imagenPrincipal}
                        onChange={handleChange}
                    />
                ) : (
                    <img
                        src={salon.imagenPrincipal}
                        alt="Salón principal"
                        className="img-fluid rounded"
                    />
                )}
            </div>

            {/* Información extra */}
            <div>
                <h3 className="fw-bold">Reuniones y eventos</h3>
                {editMode ? (
                    <textarea
                        className="form-control mb-3"
                        name="descripcion"
                        value={salon.descripcion}
                        onChange={handleChange}
                        rows="3"
                    />
                ) : (
                    <p className="text-muted">{salon.descripcion}</p>
                )}
                <div className="row text-center">
                    <div className="col-4">
                        {editMode ? (
                            <input
                                type="number"
                                className="form-control"
                                name="proyectores"
                                value={salon.detalles.proyectores}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <h4 className="fw-bold">{salon.detalles.proyectores}</h4>
                                <p className="text-muted">Proyectores</p>
                            </>
                        )}
                    </div>
                    <div className="col-4">
                        {editMode ? (
                            <input
                                type="number"
                                className="form-control"
                                name="salas"
                                value={salon.detalles.salas}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <h4 className="fw-bold">{salon.detalles.salas}</h4>
                                <p className="text-muted">Sala(s) de reuniones</p>
                            </>
                        )}
                    </div>
                    <div className="col-4">
                        {editMode ? (
                            <input
                                type="number"
                                className="form-control"
                                name="capacidad"
                                value={salon.detalles.capacidad}
                                onChange={handleChange}
                            />
                        ) : (
                            <>
                                <h4 className="fw-bold">{salon.detalles.capacidad}</h4>
                                <p className="text-muted">Personas</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Botones de Modificar, Cancelar, Guardar */}
            <div className="row mt-4">
                {editMode ? (
                    <>
                        <div className="col-md-6">
                            <button
                                type="button"
                                className="btn btn-dark w-100"
                                onClick={handleSave}
                                aria-label="Guardar cambios"
                            >
                                Guardar
                            </button>
                        </div>
                        <div className="col-md-6">
                            <button
                                type="button"
                                className="btn btn-light w-100"
                                onClick={() => setEditMode(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="col-md-12">
                        <button
                            type="button"
                            className="btn btn-dark w-100"
                            onClick={() => setEditMode(true)}
                        >
                            Modificar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
