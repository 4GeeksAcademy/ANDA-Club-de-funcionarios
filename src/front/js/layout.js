import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Toaster } from "sonner"; // Notificaciones
import injectContext, { Context } from "./store/appContext";

// Componentes y páginas
import { Home } from "./pages/home";
import About from "./pages/About";
import { TuPerfil } from "./pages/TuPerfil";
import { EditarCargarLibro } from "./pages/EditarCargarLibro";
import { SubirLibro } from "./pages/SubirLibro";
import { ModificarLibro } from "./pages/ModificarLibro";
import { PanelAdministrador } from "./component/PanelAdministrador";
import { EditarCargarSalon } from "./pages/EditarCargarSalon";
import { AdministradorUsuarios } from "./pages/AdministradorUsuarios";
import PanelUsuario from "./pages/PanelUsuario";
import { Login } from "./component/login";
import { HistorialUser } from "./pages/HistorialUser";
import { TuPerfilUser } from "./pages/TuPerfilUser";
import { Register } from "./component/register";
import { Recover_account1 } from "./component/recover_account1";
import { Recover_account2 } from "./component/recover_account2";
import { Demo } from "./pages/demo";
import { CalendarioEventosUser } from "./pages/CalendarioEventosUser";
import { Biblioteca } from "./pages/Biblioteca";
import { Reservas } from "./pages/Reservas";
import { FirstEventView } from "./component/FirstEventView";
import { SecondEventView } from "./component/SecondEventView";
import { Single } from "./pages/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ProtectedRoute } from "./component/protectedRoute";

const Layout = () => {
    const location = useLocation(); // Ubicación actual
    const { store } = React.useContext(Context);
    const role = store.user?.role || "guest";

    // Rutas donde no se debe mostrar el Navbar
    const noNavbarRoutes = [
        "/login",
        "/register",
        "/recover-account1",
        "/recover-account2",
        "/",
        "/about"
    ];

    // Determinar si mostramos el Navbar
    const mostrarNavbar = () => {
        return !noNavbarRoutes.includes(location.pathname);
    };

    // Validar si falta el BACKEND_URL
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div className="d-flex flex-column h-100">
            {/* Toaster para notificaciones */}
            <Toaster position="top-center" richColors />
            <ScrollToTop />

            {/* Mostrar Navbar si corresponde */}
            {mostrarNavbar() && <Navbar />}

            {/* Contenido Principal */}
            <div className="flex-grow-1">
                <TransitionGroup component="div" className="flex-grow-1">
                    <CSSTransition key={location.pathname} classNames="fade" timeout={300}>
                        <div className="flex-grow-1">
                            <Routes location={location}>
                                {/* Rutas protegidas */}
                                <Route path="/panel-admin" element={
                                    <ProtectedRoute requiredRole="admin" userRole={role}>
                                        <PanelAdministrador />
                                    </ProtectedRoute>
                                }>
                                    <Route index element={<Navigate to="perfil-administrador" />} />
                                    <Route path="perfil-administrador" element={<TuPerfil />} />
                                    <Route path="editar-cargar-libro" element={<EditarCargarLibro />} />
                                    <Route path="modificar-libro/:id" element={<ModificarLibro />} />
                                    <Route path="subir-libro" element={<SubirLibro />} />
                                    <Route path="subir-libro/:id" element={<SubirLibro />} />
                                    <Route path="editar-cargar-salon" element={<EditarCargarSalon />} />
                                    <Route path="administrador-usuarios" element={<AdministradorUsuarios />} />
                                </Route>

                                {/* Rutas públicas */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/recover-account1" element={<Recover_account1 />} />
                                <Route path="/recover-account2" element={<Recover_account2 />} />
                                <Route path="/panel-de-usuario" element={<PanelUsuario />}>
                                    <Route index element={<Navigate to="perfil-usuario" />} />
                                    <Route path="perfil-usuario" element={<TuPerfilUser />} />
                                    <Route path="historial" element={<HistorialUser />} />
                                    <Route path="mis-reservas" element={<CalendarioEventosUser />} />
                                </Route>
                                <Route path="/biblioteca" element={<Biblioteca />}>
                                    <Route path="reservas/:id" element={<Reservas />} />
                                </Route>
                                <Route path="/eventos" element={<FirstEventView />} />
                                <Route path="/reservar-evento" element={<SecondEventView />} />

                                {/* Otras rutas */}
                                <Route path="/" element={<Home />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/demo" element={<Demo />} />
                                <Route path="/single/:theid" element={<Single />} />
                                <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
                            </Routes>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </div>

            {/* Footer siempre al final */}
            <Footer />
        </div>
    );
};

export default injectContext(Layout);
