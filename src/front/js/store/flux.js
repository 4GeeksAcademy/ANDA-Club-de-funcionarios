const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            libros: [],
            reservas: [],
            userProfiles: [],
            user: null,
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
        },

        actions: {

            // --RESTAURAR SESIÓN--
            restoreSession: (token, user) => {
                // Guarda el token y usuario en el localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // Actualiza el store con el usuario recuperado
                setStore({ user: user });
            },

            // --CERRAR SESIÓN--
            logoutUser: () => {
                // Elimina los datos de sesión
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setStore({ user: null });
            },

            // --LOGUEARSE--
            loginUser: async (email, password) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });
                    if (response.ok) {
                        const data = await response.json();
                        localStorage.setItem("token", data.access_token);
                        localStorage.setItem("user", JSON.stringify(data.user));
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

            // --REGISTRAR NUEVO USUARIO--
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

            // --ACCIONES DE ADMINISTRACION--
            adminActions: {

                // --OBTENER USUARIOS EN ESTADO DE "en_revision"--
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

                // --ACTUALIZAR ESTADO DE LOS USUARIOS--
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

                // --OBTENER USUARIOS CON ESTADO "activo"--
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

            // --FETCH DE LIBROS--
            fetchLibros: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/books`);
                    if (response.ok) {
                        const libros = await response.json();
                        setStore({ libros });
                        console.log("Libros cargados:", libros);
                    } else {
                        console.error("Error al obtener libros:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud de libros:", error);
                }
            },

            // --CARGAR/EDITAR NUEVO LIBRO--
            addOrUpdateLibro: async (libro) => {
                try {
                    // console.log("Payload final enviado al backend:", libro);
                    const method = libro.id ? "PUT" : "POST";
                    const endpoint = libro.id
                        ? `${process.env.BACKEND_URL}/api/books/${libro.id}`
                        : `${process.env.BACKEND_URL}/api/books`;

                    const response = await fetch(endpoint, {
                        method,
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(libro),
                    });

                    if (response.ok) {
                        getActions().fetchLibros();
                        console.log("Libro guardado correctamente");
                        return true;
                    } else {
                        console.error("Error al guardar el libro:", await response.text());
                        return false;
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            },
            // GUARDAR LIBRO
            addLibro: async (libro) => {
                try {
                    console.log("Payload final enviado al backend:", libro)

                    const response = await fetch(`${process.env.BACKEND_URL}api/books`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: libro,
                    });

                    if (response.ok) {
                        getActions().fetchLibros();
                        console.log("Libro guardado correctamente");
                        return true;
                    } else {
                        console.error("Error al guardar el libro:", await response.text());
                        return false;
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                    return false;
                }
            },

            // --OBTENER DETALLES DE LIBRO POR ID--
            getBookDetails: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/books/${id}`);
                    if (response.ok) {
                        const book = await response.json();
                        console.log("Detalles del libro:", book);
                        return book;
                    } else {
                        console.error("Error al obtener detalles del libro:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // --ELIMINAR LIBRO--
            deleteLibro: async (bookId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/books/${bookId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (response.ok) {
                        getActions().fetchLibros();
                        console.log("Libro eliminado correctamente");
                    } else {
                        console.error("Error al eliminar el libro:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // --FETCH DE RESERVAS--
            fetchReservas: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/book-reservations`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ book_id: id })
                    });

                    if (response.ok) {
                        const reservas = await response.json();
                        setStore({ reservas });
                        console.log("Reservas cargadas:", reservas);
                    } else {
                        console.error("Error al obtener reservas:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud de reservas:", error);
                }
            },

            // --CREAR NUEVA RESERVA--
            createReserva: async (bookId) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/book-reservations`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify({ book_id: bookId }),
                    });

                    if (response.ok) {
                        getActions().fetchReservas();
                        console.log("Reserva creada correctamente");
                    } else {
                        console.error("Error al crear la reserva:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // --CANCELAR RESERVA--
            returnReserva: async (reservationId) => {
                try {
                    const response = await fetch(
                        `${process.env.BACKEND_URL}/api/book-reservations/${reservationId}`,
                        {
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                            },
                        }
                    );

                    if (response.ok) {
                        getActions().fetchReservas();
                        console.log("Libro devuelto correctamente");
                    } else {
                        console.error("Error al devolver el libro:", await response.text());
                    }
                } catch (error) {
                    console.error("Error en la solicitud:", error);
                }
            },

            // Obtener todos los perfiles de usuario (GET /user-profiles)
            fetchUserProfiles: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user-profiles`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ userProfiles: data });
                        console.log("Perfiles cargados:", data);
                    } else {
                        console.error("Error al cargar perfiles");
                    }
                } catch (error) {
                    console.error("Error en la solicitud de perfiles:", error);
                }
            },

            // Obtener perfil de un usuario específico (GET /user-profiles/:id)
            fetchUserProfileById: async (id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user-profiles/${id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        console.error("Error al obtener perfil del usuario");
                        return null;
                    }
                } catch (error) {
                    console.error("Error en la solicitud de perfil específico:", error);
                    return null;
                }
            },

            // Crear un perfil de usuario (POST /user-profiles)
            createUserProfile: async (profile) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/user-profiles`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(profile),
                    });
                    if (response.ok) {
                        const newProfile = await response.json();
                        getActions().fetchUserProfiles();
                        return newProfile;
                    } else {
                        console.error("Error al crear perfil");
                    }
                } catch (error) {
                    console.error("Error en la creación del perfil:", error);
                }
            },

            // Actualizar un perfil de usuario (PUT /user-profiles/:id)
            updateUserProfile: async (user_id, profile) => {
                try {
                    console.log("ID del usuario a actualizar:", user_id);
                    console.log("Datos enviados al backend:", JSON.stringify(profile));

                    const url = `${process.env.BACKEND_URL}/api/user-profiles/${user_id}`;
                    console.log("URL de la petición:", url);

                    const response = await fetch(url, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                        body: JSON.stringify(profile),
                    });

                    if (response.ok) {
                        const updatedProfile = await response.json();
                        console.log("Perfil actualizado correctamente:", updatedProfile);
                        return updatedProfile;
                    } else {
                        const error = await response.json();
                        console.error("Error al actualizar perfil:", error.msg || "Error desconocido");
                        return null;
                    }
                } catch (error) {
                    console.error("Error en la actualización del perfil:", error);
                    return null;
                }
            },


            getMessage: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await response.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error al cargar el mensaje desde el backend", error);
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
