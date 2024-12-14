const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null, // añado el campo `user` que contendrá la información del usuario
		},



		actions: {
			// Función para iniciar sesión
			loginUser: (user) => {
				// Esta acción recibirá un objeto `user` (por ejemplo: { role: "admin", name: "John" })
				setStore({ user });  // Guardamos el usuario en el store
			},

			// Función para cerrar sesión
			logoutUser: () => {
				setStore({ user: null });  // Al cerrar sesión, eliminamos la información del usuario
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

    };
};

export default getState;
