import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextApp } from "../store/appContext";

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
            alert("Inicio de sesión exitoso");
            navigate("/panel-de-usuario"); 
        } else {
            alert("Credenciales incorrectas. Intenta nuevamente.");
        }
    };

    return (
        <form className="navbar navbar-light bg-light" onSubmit={handleSubmit}>
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
                        <div className="d-flex justify-content-start mb-4">
                            <h5>Iniciar sesión</h5>
                        </div>
                        <div className="mb-4">
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
                        <button
                            type="submit"
                            className="btn w-100"
                            style={{
                                backgroundColor: '#3865e5',
                                color: 'white'
                            }}
                        >
                            Acceder
                        </button>
                        <div className="d-flex justify-content-center mt-4">
                            <a href="/recover-account1" className="card-link">Recuperar contraseña</a>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <a href="/register" className="card-link">¿No tienes cuenta? Regístrate</a>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};