import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import About from "./pages/About";
import { TuPerfil } from "./pages/TuPerfil";
import { EditarCargarLibro } from "./pages/EditarCargarLibro";
import { SubirLibro } from "./pages/SubirLibro";
import { PanelAdministrador } from "./component/PanelAdministrador";
import { EditarCargarSalon } from "./pages/EditarCargarSalon";
import { AdministradorUsuarios } from "./pages/AdministradorUsuarios";
import PanelUsuario from "./pages/PanelUsuario";
import { Login } from "./component/login";
import { HistorialUser } from "./pages/HistorialUser";
import { TuPerfilUser } from "./pages/TuperfilUser";
import { Register } from "./component/register";
import { Recover_account1 } from "./component/recover_account1";
import { Recover_account2 } from "./component/recover_account2";
import { Demo } from "./pages/demo";
import { CalendarioEventosUser } from "./pages/CalendarioEventosUser";
import { Biblioteca } from "./pages/Biblioteca";
import { Reservas } from "./pages/Reservas";

import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

import { ProtectedRoute } from './component/protectedRoute';




const Layout = () => {
    const location = useLocation();  // Usamos useLocation para obtener la ruta actual

    // Rutas donde no se debe mostrar el Navbar
    const noNavbarRoutes = [
        "/login",
        "/register",
        "/recover-account1",
        "/recover-account2",
        "/",
        "/about"    // No mostrar Navbar en la ruta /about
    ];

    // Función que determina si debemos mostrar el Navbar
    const mostrarNavbar = () => {
        return !noNavbarRoutes.includes(location.pathname);  // Si la ruta no está en noNavbarRoutes, muestra el Navbar
    };

    // Asumimos que `role` es recuperado del contexto o del estado del usuario, es solo un ejemplo
    const role = "admin";  // Este valor debería venir del contexto de autenticación del usuario

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="d-flex flex-column h-100">
            <ScrollToTop>
                {mostrarNavbar() && <Navbar />}  {/* Solo mostrar Navbar si mostrarNavbar es true */}

                <div className="d-flex flex-grow-1">
                    <div className="flex-grow-1 p-0">
                        <Routes>
                            {/* Rutas protegidas para el panel de administración */}
                            <Route path="/panel-admin" element={
                                <ProtectedRoute requiredRole="admin" userRole={role}> {/* Envia el role del usuario */}
                                    <PanelAdministrador />
                                </ProtectedRoute>
                            }>
                                <Route index element={<Navigate to="perfil-administrador" />} />
                                <Route path="perfil-administrador" element={<TuPerfil />} />
                                <Route path="editar-cargar-libro" element={<EditarCargarLibro />} />
                                <Route path="subir-libro" element={<SubirLibro />} />
                                <Route path="editar-cargar-salon" element={<EditarCargarSalon />} />
                                <Route path="administrador-usuarios" element={<AdministradorUsuarios />} />
                            </Route>

                            {/* Rutas para el manejo de registro, login y recuperar contraseña */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/recover-account1" element={<Recover_account1 />} />
                            <Route path="/recover-account2" element={<Recover_account2 />} />

                            {/* Panel de Usuario con sus rutas hijas correspondientes */}
                            <Route path="panel-de-usuario" element={<PanelUsuario />}>
                                <Route path="perfil-usuario" element={<TuPerfilUser />} />
                                <Route path="historial" element={<HistorialUser />} />
                                <Route path="calendario-eventos" element={<CalendarioEventosUser />} />
                            </Route>

                            {/* Biblioteca con sus rutas hijas correspondientes */}
                            <Route element={<Biblioteca />} path="biblioteca">
                                <Route element={<Reservas />} path="reservas" />
                            </Route>

                            {/* Otras rutas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/demo" element={<Demo />} />
                            <Route path="/single/:theid" element={<Single />} />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </div>
                </div>
            </ScrollToTop>
        </div>
    );
};

export default injectContext(Layout);
