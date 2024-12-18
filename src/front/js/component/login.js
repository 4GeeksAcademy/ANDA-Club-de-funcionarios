import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextApp } from "../store/appContext";
import { toast } from "sonner";
import "../../styles/login.css"; // Estilos del formulario

export const Login = () => {
    const { actions } = useContextApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const success = await actions.loginUser(formData.email, formData.password);

        if (success) {
            toast.success("Inicio de sesión exitoso 🎉");
            navigate("/panel-de-usuario");
        } else {
            toast.error("Credenciales incorrectas. Intenta nuevamente.");
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card login-card col-11 col-sm-8 col-md-6 col-lg-4 p-4">
                    <div className="text-center mb-4">
                        <img
                            src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
                            alt="Icono"
                            className="login-logo"
                        />
                    </div>
                    <div className="card-body">
                        <h5 className="text-center mb-4">Iniciar sesión</h5>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Ingrese su correo"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Ingrese su contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Acceder
                        </button>
                        <div className="text-center mt-3">
                            <a href="/recover-account1" className="card-link">Recuperar contraseña</a>
                        </div>
                        <div className="text-center mt-2">
                            <a href="/register" className="card-link">¿No tienes cuenta? Regístrate</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};
