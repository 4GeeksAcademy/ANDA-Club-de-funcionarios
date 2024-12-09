import React, { useState } from "react";

export const TuPerfil = () => {
    const [perfil, setPerfil] = useState({
        nombre: "Juan",
        apellido: "Pérez",
        departamento: "Montevideo",
        fechaNacimiento: "1990-01-01",
        cedula: "4.123.456-7",
        codigoPostal: "12345",
        direccion: "Calle Falsa 123",
        sector: "Administración",
        telefono: "099123456",
        email: "juan.perez@correo.com",
    });

    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPerfil((prevPerfil) => ({
            ...prevPerfil,
            [id]: value,
        }));
    };

    const handleSave = () => {
        setEditMode(false);
        alert("Cambios guardados");
    };

    return (
        <div className="container-fluid mt-5">
            <h2 className="mb-4 text-center">Perfil de Administrador</h2>
            <form className="bg-white p-3 shadow rounded">
                <div className="row g-3">
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
                    <div className="col-md-6">
                        <label htmlFor="departamento" className="form-label">Departamento</label>
                        <select
                            id="departamento"
                            className="form-select"
                            value={perfil.departamento}
                            onChange={handleChange}
                            disabled={!editMode}
                        >
                            <option>Artigas</option>
                            <option>Canelones</option>
                            <option>Colonia</option>
                            <option>Durazno</option>
                            <option>Flores</option>
                            <option>Florida</option>
                            <option>Lavalleja</option>
                            <option>Maldonado</option>
                            <option>Montevideo</option>
                            <option>Paysandú</option>
                            <option>Río Negro</option>
                            <option>Rivera</option>
                            <option>Rocha</option>
                            <option>Salto</option>
                            <option>San José</option>
                            <option>Soriano</option>
                            <option>Tacuarembo</option>
                            <option>Treinta y Tres</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            className="form-control"
                            id="fechaNacimiento"
                            value={perfil.fechaNacimiento}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
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
                        <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                        <input
                            type="text"
                            className="form-control"
                            id="codigoPostal"
                            value={perfil.codigoPostal}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
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
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <select
                            id="sector"
                            className="form-select"
                            value={perfil.sector}
                            onChange={handleChange}
                            disabled={!editMode}
                        >
                            <option>Administración</option>
                            <option>Recursos Humanos</option>
                            <option>Comercial</option>
                            {/* agregar los sectores que falten */}
                        </select>
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
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={perfil.email}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>
                <div className="row mt-4">
                    {editMode ? (
                        <>
                            <div className="col-6">
                                <button
                                    type="button"
                                    className="btn btn-dark w-100"
                                    onClick={handleSave}
                                >
                                    Guardar
                                </button>
                            </div>
                            <div className="col-6">
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
                        <div className="col-12">
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
            </form>
        </div>
    );
};

