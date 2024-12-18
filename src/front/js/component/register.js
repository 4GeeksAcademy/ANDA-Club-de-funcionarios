import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextApp } from "../store/appContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../../styles/register.css"; // Importar el archivo CSS

export const Register = () => {
    const { actions } = useContextApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        const userData = {
            user_name: formData.user_name,
            email: formData.email,
            password: formData.password
        };
        const success = await actions.registerUser(userData);

        if (success) {
            toast.success("Registro exitoso");
            navigate("/login");
        } else {
            toast.error("Error al registrar. Intenta nuevamente.");
        }
    };

    return (
        <form
            className="register-form d-flex justify-content-center align-items-center"
            onSubmit={handleSubmit}
        >
            <div className="card register-card col-11 col-sm-8 col-md-6 col-lg-4 p-4">
                <div className="text-center mb-4">
                    <img
                        src="https://logoteca.uy/wp-content/uploads/sites/3/2024/09/Logo-ANDA.svg"
                        alt="Icono"
                        className="register-logo"
                    />
                </div>
                <div className="card-body">
                    <h5 className="text-center mb-4">Registrarse</h5>
                    <div className="mb-3">
                        <label htmlFor="user_name" className="form-label">Nombre:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="user_name"
                            placeholder="Ingrese su nombre"
                            value={formData.user_name}
                            onChange={handleChange}
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Reingrese la contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Reingrese la contraseña"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Regístrate
                    </button>
                    <div className="text-center mt-3">
                        <Link to="/login" className="register-link">
                            ¿Ya tienes una cuenta? Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};
