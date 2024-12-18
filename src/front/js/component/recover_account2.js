import React from "react";
import { Link } from "react-router-dom";
import "../../styles/recover_account2.css"; // Importar los estilos

export const Recover_account2 = () => {
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
                        <label htmlFor="email" className="form-label">Mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="usuario@ejemplo.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="newPassword" className="form-label">Nueva contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            placeholder="*****"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="form-label">Repetir contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="*****"
                        />
                    </div>
                    <Link to="/">
                        <button type="submit" className="btn btn-primary w-100">
                            Continuar
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};
