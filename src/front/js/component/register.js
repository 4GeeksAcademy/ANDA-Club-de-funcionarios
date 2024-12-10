import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card col-11 col-sm-8 col-md-6 col-lg-4 p-4" style={{ minHeight: "500px", position: 'relative' }}>
                    <div className="d-flex justify-content-between align-items-center ">
                        <img className="mx-auto"
                            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
                            alt="Icono"
                            style={{
                                width: '70px',
                                height: '70px',

                            }}
                        />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between flex-grow-1">
                        <form>

                            <div className="d-flex justify-content-start mb-4">
                                <h5>Registrarse</h5>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="username" className="form-label">Nombre:</label>
                                <input type="text" className="form-control" id="username" placeholder="Ingrese su nombre" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Mail:</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingrese su mail" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Contraseña:</label>
                                <input type="password" className="form-control" id="password" placeholder="Ingrese su contraseña" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Reingrese la contraseña:</label>
                                <input type="password" className="form-control" id="password" placeholder="Reingrese la contraseña" />
                            </div>
                            <Link to="/">
                                <button
                                    type="submit"
                                    className="btn w-100"
                                    style={{
                                        backgroundColor: '#3865e5',
                                        color: 'white'
                                    }}
                                >
                                    Regístarte
                                </button>
                            </Link>
                        </form>
                        <div className="d-flex justify-content-center mt-4">
                            <Link to="/login">
                                <a href="#" className="card-link">¿Ya tienes una cuenta? Iniciar sesión</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};