import React, { useState, useEffect, useContext } from "react";
import getState from "./flux.js";

// Inicialización del contexto global
export const Context = React.createContext(null);

// Hook para consumir el contexto
export const useContextApp = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContextApp debe usarse dentro de un proveedor de Contexto.");
    }
    return context;
};

// HOC para inyectar el contexto en componentes
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions },
                    }),
            })
        );

        useEffect(() => {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

            if (token && user) {
                state.actions.restoreSession(token, user);
                console.log("Sesión restaurada correctamente.");
            } else {
                console.log("No se encontró sesión activa.");
            }
        }, []);

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default injectContext;