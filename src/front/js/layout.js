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
import PanelUsuario from "./pages/Paneldeusuario";
import { Login } from "./component/login";
import { HistorialUser } from "./pages/HistorialUser";
import { TuPerfilUser } from "./pages/TuperfilUser";
import { Register } from "./component/register";
import { Recover_account1 } from "./component/recover_account1";
import { Recover_account2 } from "./component/recover_account2";
import { Demo } from "./pages/demo";
import { CalendarioEventosUser } from "./pages/CalendarioEventosUser";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";

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

    const role = "admin";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="d-flex flex-column h-100">
            <ScrollToTop>
                {mostrarNavbar() && <Navbar />}  {/* Solo mostrar Navbar si mostrarNavbar es true */}

                <div className="d-flex flex-grow-1">
                    <div className="flex-grow-1 p-0">
                        <Routes>
                            {/* Panel de admin con sus rutas hijas correspondientes */}
                            <Route element={<PanelAdministrador />} path="/panel-admin">
                                <Route index element={<Navigate to="perfil-administrador" />} />
                                <Route element={<TuPerfil />} path="perfil-administrador" />
                                <Route element={<EditarCargarLibro />} path="editar-cargar-libro" />
                                <Route element={<SubirLibro />} path="subir-libro" />
                                <Route element={<EditarCargarSalon />} path="editar-cargar-salon" />
                                <Route element={<AdministradorUsuarios />} path="administrador-usuarios" />
                            </Route>

                            {/* Rutas para el manejo de registro, login y recuperar contraseña */}
                            <Route element={<Login />} path="/login" />
                            <Route element={<Register />} path="/register" />
                            <Route element={<Recover_account1 />} path="/recover-account1" />
                            <Route element={<Recover_account2 />} path="/recover-account2" />

                            {/* Panel de Usuario con sus rutas hijas correspondientes */}
                            <Route element={<PanelUsuario />} path="panel-de-usuario">
                                <Route element={<TuPerfilUser />} path="perfil-usuario" />
                                <Route element={<HistorialUser />} path="historial" />
                                <Route element={<CalendarioEventosUser />} path="calendario-eventos" />
                            </Route>

                            {/* Otras rutas */}
                            <Route element={<Home />} path="/" />
                            <Route element={<About />} path="/about" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                    </div>
                </div>
            </ScrollToTop>
        </div>
    );
};

export default injectContext(Layout);
