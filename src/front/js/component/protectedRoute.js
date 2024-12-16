import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextApp } from '../store/appContext';

const ProtectedRoute = ({ children, requiredRole }) => {
    const { store } = useContextApp();
    const navigate = useNavigate();

    useEffect(() => {
        // Esperar hasta que el estado de user sea definido
        if (store.user === null) return;

        // Redirigir si no hay usuario o no tiene el rol requerido
        if (!store.user || store.user.role !== requiredRole) {
            navigate("/"); // Redirigir al login o home
        }
    }, [store.user, navigate, requiredRole]);

    // Renderiza solo si el usuario está definido y tiene el rol correcto
    if (store.user === null) {
        return <div>Cargando...</div>; // Muestra un loader mientras se verifica
    }

    return store.user && store.user.role === requiredRole ? children : null;
};

export { ProtectedRoute };
