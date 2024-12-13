import React from "react";

export const TuPerfilUser = () => {
    return (
        <div className="container mt-4 align-center">
            <h4 className="text-left p-4">Perfil de usuario</h4>
            <form>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Michael" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" placeholder="Browk" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="departamento" className="form-label">Departamento</label>
                        <select className="form-select" id="departamento">
                            <option value="Montevideo">Montevideo</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <input type="text" className="form-control" id="sector" placeholder="-" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="cedula" className="form-label">Cédula de Identidad</label>
                        <input type="text" className="form-control" id="cedula" placeholder="5.778.958-1" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="rol" className="form-label">Rol</label>
                        <input type="text" className="form-control" id="rol" placeholder="-" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" placeholder="-" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" id="telefono" placeholder="-" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="correo" placeholder="michaelb02@correo.com" />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary me-2">Modificar</button>
                    <button type="submit" className="btn btn-secondary">Aceptar</button>
                </div>
            </form>
        </div>
    );
};