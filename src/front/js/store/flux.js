const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white",
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white",
                },
            ],
            user: null,
        },

        actions: {
            loginUser: async (email, password) => {
                try {
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

            // Acciones de administración
            adminActions: {
                getUsersPending: async function () {
                    try {
                        const response = await fetch(
                            `${process.env.BACKEND_URL}/api/admin/pending-users`,
                            {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                                },
                            }
                        );

                        if (response.ok) {
                            const usersPending = await response.json();
                            console.log("Usuarios Pendientes:", usersPending); 
                            return usersPending; 
                        } else {
                            console.error("Error al obtener usuarios pendientes:", await response.text());
                            return [];
                        }
                    } catch (error) {
                        console.error("Error en la solicitud:", error);
                        return [];
                    }
                },

                updateUserStatus: async function (userId, status) {
                    try {
                        const response = await fetch(`${process.env.BACKEND_URL}/api/admin/users/${userId}/status`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                            body: JSON.stringify({ status }),
                        });

                        if (response.ok) {
                            return true; // La actualización fue exitosa
                        } else {
                            console.error("Error al actualizar el estado del usuario:", await response.text());
                            return false;
                        }
                    } catch (error) {
                        console.error("Error en la solicitud:", error);
                        return false;
                    }
                },

                getUsersActive: async function () {
                    try {
                        const response = await fetch(`${process.env.BACKEND_URL}/api/admin/users-active`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        });
                        if (response.ok) {
                            const data = await response.json();
                            return data; // Devuelve el array de usuarios activos
                        } else {
                            console.error("Error al obtener usuarios activos");
                            return [];
                        }
                    } catch (error) {
                        console.error("Error en la solicitud:", error);
                        return [];
                    }
                },
            },

            logoutUser: () => {
                setStore({ user: null }); // Al cerrar sesión, eliminamos la información del usuario
                localStorage.removeItem("token"); // Elimina el token del localStorage
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
        },
    };
};

export default getState;
