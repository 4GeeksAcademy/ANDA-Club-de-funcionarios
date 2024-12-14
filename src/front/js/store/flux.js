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
			user: null,
		},



		actions: {

			loginUser: async (email, password) => {
				try {
					console.log("Datos enviados al backend:", { email, password });
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});
					if (response.ok) {
						const data = await response.json();
						localStorage.setItem("token", data.access_token); // Guarda el token en localStorage
						setStore({ user: data.user }); // Guarda la información del usuario en el store
						return true;
					} else {
						console.error("Error al iniciar sesión");
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud de login:", error);
					return false;
				}
			},
			
			registerUser: async (userData) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(userData),
					});
			
					if (response.ok) {
						const data = await response.json();
						console.log("Usuario registrado exitosamente:", data);
						return true;
					} else {
						const errorData = await response.json();
						console.error("Error al registrar el usuario:", errorData.msg);
						return false;
					}
				} catch (error) {
					console.error("Error en la solicitud de registro:", error);
					return false;
				}
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

    		}
		}
	};
};

export default getState;
