import React, { useState } from "react";

export const TuPerfilUser = () => {
    const [perfil, setPerfil] = useState({
        nombre: "Michael",
        apellido: "Browk",
        departamento: "Montevideo",
        sector: "-",
        cedula: "5.778.958-1",
        rol: "-",
        direccion: "-",
        telefono: "-",
        correo: "michaelb02@correo.com",
    });

    const [editMode, setEditMode] = useState(false);
    const [perfilOriginal, setPerfilOriginal] = useState(perfil); // perfil original: Guarda y copia del estado original

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setPerfil((prevPerfil) => ({
            ...prevPerfil,
            [id]: value,
        }));
    };

    //handleEdit: habilita el modo edición y guardar el estado original
    const handleEdit = () => {
        setPerfilOriginal(perfil); // perfilOriginal guarda el estado actual
        setEditMode(true); // Activa el modo edición
    };

    // Guardar cambios
    const handleSave = () => {
        setEditMode(false);
        alert("Datos del perfil guardados correctamente");
    };

    // Cancelar cambios: con handleCancel
    const handleCancel = () => {
        setPerfil(perfilOriginal); // Restaura el estado original
        setEditMode(false);
    };

    return (
        <div className="container mt-4">
            <h4 className="text-left p-4">Perfil de usuario</h4>
            <form className="bg-white p-3 shadow rounded">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            value={perfil.nombre}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            value={perfil.apellido}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="departamento" className="form-label">Departamento</label>
                        <select
                            className="form-select"
                            id="departamento"
                            value={perfil.departamento}
                            onChange={handleChange}
                            disabled={!editMode}
                        >
                            <option>Montevideo</option>
                            <option>Canelones</option>
                            <option>Colonia</option>
                            <option>Durazno</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <input
                            type="text"
                            className="form-control"
                            id="sector"
                            value={perfil.sector}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="cedula" className="form-label">Cédula de Identidad</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cedula"
                            value={perfil.cedula}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rol"
                            value={perfil.rol}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input
                            type="text"
                            className="form-control"
                            id="direccion"
                            value={perfil.direccion}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input
                            type="text"
                            className="form-control"
                            id="telefono"
                            value={perfil.telefono}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            value={perfil.correo}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                {/* Botones */}
                <div className="d-flex justify-content-end">
                    {editMode ? (
                        <>
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-primary me-2"
                            onClick={handleEdit}
                        >
                            Modificar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

