import React, { useState, useEffect, useContext } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

// Función personalizada para acceder al contexto
export const useContextApp = () => {
	const context = useContext(Context);
	if (!context) {
		throw new Error("useContextApp debe ser usado dentro de un proveedor de Context");
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
};

export default injectContext;

