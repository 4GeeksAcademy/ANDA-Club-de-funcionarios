import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContextApp } from '../store/appContext';


// Componente que protege las rutas que solo deben ser accesibles por administradores
const ProtectedRoute = ({ children, requiredRole }) => {
    const { store } = useContextApp();  // Obtener el rol del usuario desde el contexto
    const navigate = useNavigate();
    const { location } = useLocation();  // Obtener la ruta actual

    useEffect(() => {
        // Si el rol del usuario no coincide con el requerido, redirige a otra página
        if (!store.user || store.user.role !== requiredRole) {
            navigate("/");  // Redirigir al home
        }
    }, [store.user.role, location, navigate]);

    return store.user && store.user.role === requiredRole ? children : null;  // Si el usuario tiene el rol correcto, renderiza el contenido protegido
};


export { ProtectedRoute };
