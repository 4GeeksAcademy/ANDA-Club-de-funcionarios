import React, { useState, useEffect } from "react";
import { useContextApp } from "../store/appContext";

export const TuPerfil = () => {
    const { store, actions } = useContextApp();
    const [perfil, setPerfil] = useState({
        first_name: "",
        last_name: "",
        email: "",
        identification: "",
        department: "",
        sector: "",
        phone_number: "",
        birth_date: "",
        address: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [perfilExiste, setPerfilExiste] = useState(false);

    // Verificar si el perfil existe al cargar
    useEffect(() => {
        const loadProfile = async () => {
            const userId = store.user?.id;
            if (userId) {
                const profile = await actions.fetchUserProfileById(userId);
                if (profile) {
                    setPerfil(profile);
                    setPerfilExiste(true);
                } else {
                    setPerfilExiste(false);
                }
            }
        };
        loadProfile();
    }, [store.user, actions]);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerfil((prevPerfil) => ({ ...prevPerfil, [name]: value }));
    };

    // Crear perfil si no existe
    const handleCreateProfile = async () => {
        const userId = store.user?.id;
    
        if (!userId) {
            alert("Error: No se encontró el ID del usuario.");
            return;
        }
    
        const newProfile = {
            user_id: userId,
            first_name: perfil.first_name,
            last_name: perfil.last_name,
            email: perfil.email,
            identification: perfil.identification,
            address: perfil.address || "",
            phone_number: perfil.phone_number || "",
            birth_date: perfil.birth_date || "",
            department: perfil.department || "",
            sector: perfil.sector || "",
        };
    
        console.log("Enviando perfil al backend:", newProfile);
        const result = await actions.createUserProfile(newProfile);
    
        if (result) {
            console.log("Perfil creado:", result);
            setPerfil(result);  // Asegúrate de que el id del perfil sea recibido y guardado
            setPerfilExiste(true);
            setEditMode(false);
            alert("Perfil creado exitosamente.");
        } else {
            alert("Error al crear el perfil. Verifica los datos e intenta de nuevo.");
        }
    };

    return (
        <div className="container mt-4">
            <h4 className="text-left p-4">Perfil de Administrador</h4>
            <form className="bg-white p-3 shadow rounded">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="first_name" className="form-label">
                            Nombre <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={perfil.first_name || ""}
                            onChange={handleChange}
                            disabled={perfilExiste}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="last_name" className="form-label">
                            Apellido <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={perfil.last_name || ""}
                            onChange={handleChange}
                            disabled={perfilExiste}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={perfil.email || ""}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="identification" className="form-label">
                            Cédula de Identidad <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="identification"
                            className="form-control"
                            value={perfil.identification || ""}
                            onChange={handleChange}
                            disabled={perfilExiste}
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
                            <button type="button" className="btn btn-success me-2" onClick={() => setEditMode(false)}>
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
