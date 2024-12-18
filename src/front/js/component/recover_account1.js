import React from "react";
import { Link } from "react-router-dom";
import "../../styles/recover_account1.css"; // Importar los estilos

export const Recover_account1 = () => {
    return (
        <div className="recover-form d-flex justify-content-center align-items-center">
            <div className="card recover-card col-11 col-sm-8 col-md-6 col-lg-4 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="card-title mb-0">Recuperar contraseña</h3>
                    <img
                        src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
                        alt="Icono"
                        className="recover-logo"
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
                        />
                    </div>
                    <Link to="/recover-account2">
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Continuar
                        </button>
                    </Link>
                </form>
                <div className="text-center mt-4">
                    <Link to="/login" className="recover-link">
                        ¿Ya tienes una cuenta? Iniciar sesión
                    </Link>
                </div>
                <div className="text-center mt-2">
                    <Link to="/register" className="recover-link">
                        ¿No tienes cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </div>
    );
};
