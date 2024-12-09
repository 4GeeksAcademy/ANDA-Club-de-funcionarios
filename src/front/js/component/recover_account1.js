import React from "react";
import { Link } from "react-router-dom";

export const Recover_account1 = () => {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card col-11 col-sm-8 col-md-6 col-lg-4 p-4" style={{ minHeight: "500px", position: 'relative' }}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="card-title mb-0">Recuperar contraseña </h3>
                        <img
                            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
                            alt="Icono"
                            style={{
                                width: '70px',
                                height: '70px',
                            }}
                        />
                    </div>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="username" className="form-label">Recuperar contraseña</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="usuario@ejemplo.com"
                                style={{ marginBottom: '20px' }}
                            />
                        </div>
                        <Link to="/recover_account2">
                            <button
                                type="submit"
                                className="btn w-100"
                                style={{
                                    backgroundColor: '#3865e5',
                                    color: 'white'
                                }}
                            >
                                Continuar
                            </button>
                        </Link>
                    </form>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/login">
                            <a href="#" className="card-link">¿Ya tienes una cuenta? Iniciar sesión</a>
                        </Link>

                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/register">
                            <a href="#" className="card-link">¿No tienes cuenta? Regístrate</a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};