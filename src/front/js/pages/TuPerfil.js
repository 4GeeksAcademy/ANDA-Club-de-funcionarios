import React, { useState, useEffect } from "react";
import { useContextApp } from "../store/appContext";

export const TuPerfil = () => {
    const { store, actions } = useContextApp();
    const [perfil, setPerfil] = useState({
        first_name: "",
        last_name: "",
        email: store.user?.email || "",
        identification: "",
        department: "",
        sector: "",
        phone_number: "",
        birth_date: "",
        address: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [perfilExiste, setPerfilExiste] = useState(false);

    // Función auxiliar para construir el payload
    const buildProfilePayload = (userId) => ({
        user_id: userId,
        first_name: perfil.first_name?.trim() || undefined,
        last_name: perfil.last_name?.trim() || undefined,
        email: perfil.email?.trim() || undefined,
        identification: perfil.identification?.trim() || undefined,
        address: perfil.address?.trim() || undefined,
        phone_number: perfil.phone_number?.trim() || undefined,
        birth_date: perfil.birth_date || undefined,
        department: perfil.department?.trim() || undefined,
        sector: perfil.sector?.trim() || undefined,
    });

    // Cargar perfil al montar el componente
    useEffect(() => {
        const loadProfile = async () => {
            const userId = store.user?.id; // ID del usuario logueado
            if (userId) {
                const profile = await actions.fetchUserProfileById(userId);
                if (profile) {
                    console.log("Perfil cargado correctamente:", profile);
                    setPerfil({ ...profile, email: store.user.email });
                    setPerfilExiste(true);
                } else {
                    console.warn("Perfil no encontrado, iniciando nuevo.");
                    setPerfil((prev) => ({ ...prev, email: store.user.email }));
                    setPerfilExiste(false);
                }
            }
        };
        loadProfile();
    }, [store.user, actions]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name !== "email") { // Evita cambios en el email
            setPerfil((prevPerfil) => ({ ...prevPerfil, [name]: value }));
        }
    };

    // Crear perfil
    const handleCreateProfile = async () => {
        const userId = store.user?.id;

        if (!userId) {
            alert("Error: No se encontró el ID del usuario.");
            return;
        }

        const newProfile = buildProfilePayload(userId);
        console.log("Enviando perfil al backend:", newProfile);

        const result = await actions.createUserProfile(newProfile);

        if (result) {
            console.log("Perfil creado:", result);
            setPerfil(result); // Guarda el perfil con su ID
            setPerfilExiste(true);
            setEditMode(false);
            alert("Perfil creado exitosamente.");
        } else {
            alert("Error al crear el perfil.");
        }
    };

    // Actualizar perfil
    const handleUpdateProfile = async () => {
        const userId = store.user?.id; // Aquí debe ser el ID del usuario, no del perfil
    
        if (!userId) {
            alert("Error: No se encontró el ID del usuario.");
            return;
        }
    
        const updatedProfile = {
            first_name: perfil.first_name?.trim() || undefined,
            last_name: perfil.last_name?.trim() || undefined,
            email: perfil.email?.trim() || undefined,
            identification: perfil.identification?.trim() || undefined,
            address: perfil.address?.trim() || undefined,
            phone_number: perfil.phone_number?.trim() || undefined,
            birth_date: perfil.birth_date || undefined,
            department: perfil.department?.trim() || undefined,
            sector: perfil.sector?.trim() || undefined,
        };
    
        console.log("Datos a enviar al backend:", updatedProfile);
    
        const result = await actions.updateUserProfile(userId, updatedProfile);
        if (result) {
            console.log("Perfil actualizado exitosamente:", result);
            setPerfil(result);
            setEditMode(false);
            alert("Perfil actualizado exitosamente.");
        } else {
            alert("Error al actualizar el perfil.");
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="text-left p-4">Perfil de Administrador</h4>
            <form className="bg-white p-3 shadow rounded">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label">Nombre *</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={perfil.first_name || ""}
                            onChange={handleChange}
                            disabled={perfilExiste && !editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">Apellido *</label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={perfil.last_name || ""}
                            onChange={handleChange}
                            disabled={perfilExiste && !editMode}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo Electrónico *</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={perfil.email || ""}
                            readOnly
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="identification" className="form-label">Cédula de Identidad *</label>
                        <input
                            type="text"
                            name="identification"
                            className="form-control"
                            value={perfil.identification || ""}
                            onChange={handleChange}
                            disabled={perfilExiste && !editMode}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="department" className="form-label">Departamento</label>
                        <input
                            type="text"
                            name="department"
                            className="form-control"
                            value={perfil.department || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="sector" className="form-label">Sector</label>
                        <input
                            type="text"
                            name="sector"
                            className="form-control"
                            value={perfil.sector || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="birth_date" className="form-label">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="birth_date"
                            className="form-control"
                            value={perfil.birth_date || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone_number" className="form-label">Teléfono</label>
                        <input
                            type="text"
                            name="phone_number"
                            className="form-control"
                            value={perfil.phone_number || ""}
                            onChange={handleChange}
                            disabled={!editMode}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={perfil.address || ""}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>

                <div className="d-flex justify-content-end">
                    {!perfilExiste ? (
                        <button type="button" className="btn btn-primary" onClick={handleCreateProfile}>
                            Crear Perfil
                        </button>
                    ) : editMode ? (
                        <>
                            <button type="button" className="btn btn-success me-2" onClick={handleUpdateProfile}>
                                Guardar
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <button type="button" className="btn btn-primary me-2" onClick={() => setEditMode(true)}>
                            Modificar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};
