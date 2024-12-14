import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextApp } from "../store/appContext";
import { Link } from "react-router-dom";

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
            alert("Las contraseñas no coinciden");
            return;
        }

        const userData = {
            user_name: formData.user_name,
            email: formData.email,
            password: formData.password
        };
        console.log("Datos enviados al backend:", userData);
        const success = await actions.registerUser(userData);

        if (success) {
            alert("Registro exitoso");
            navigate("/login");
        } else {
            alert("Error al registrar. Intenta nuevamente.");
        }
    };

    return (
        <form className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }} onSubmit={handleSubmit}>
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
                    <div className="d-flex justify-content-start mb-4">
                        <h5>Registrarse</h5>
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Mail:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Ingrese su mail"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
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
                    <div className="mb-4">
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
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: '#3865e5',
                            color: 'white'
                        }}
                    >
                        Regístrate
                    </button>
                    <div className="d-flex justify-content-center mt-4">
                        <Link to="/login">
                            <span className="card-link">¿Ya tienes una cuenta? Iniciar sesión</span>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    );
};