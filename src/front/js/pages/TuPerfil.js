import React from "react";

export const TuPerfil = () => {
    return (
        <div className="container">
            <h2 className="mb-4">Perfil de Usuario</h2>
            <form>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Nombre" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" id="apellido" placeholder="Apellido" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="departamento" className="form-label">Departamento</label>
                        <select id="departamento" className="form-select">
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
                        <input type="date" className="form-control" id="fechaNacimiento" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="cedula" className="form-label">Cédula de Identidad</label>
                        <input type="text" className="form-control" id="cedula" placeholder="Cédula de Identidad" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="codigoPostal" className="form-label">Código Postal</label>
                        <input type="text" className="form-control" id="codigoPostal" placeholder="Código Postal" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="direccion" className="form-label">Dirección</label>
                        <input type="text" className="form-control" id="direccion" placeholder="Dirección" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <select id="departamento" className="form-select">
                            <option>Administración</option>
                            <option>Recursos Humanos</option>
                            <option>Comercial</option>
                            <option>Gerencia</option>
                        </select>
                       
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="text" className="form-control" id="telefono" placeholder="Teléfono" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Correo Electrónico" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-dark w-100">Modificar</button>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-light w-100">Aceptar</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

