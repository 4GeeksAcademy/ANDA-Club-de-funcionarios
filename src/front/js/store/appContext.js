import React, { useState, useEffect, useContext } from "react";
import getState from "./flux.js";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// Función para usar el contexto en los componentes
export const useContextApp = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("useContextApp debe usarse dentro de un proveedor de Contexto.");
    }
    return context;
};

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
            // Recuperar usuario y token del localStorage
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user")); // Guarda el usuario en JSON

			if (token && user) {
				state.actions.restoreSession(token, user);
			} else {
				state.actions.logoutUser(); // Asegura que el usuario se desloguee si no hay token
			}

            state.actions.getMessage();
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