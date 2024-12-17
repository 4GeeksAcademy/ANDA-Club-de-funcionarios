import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "sonner";

export const SubirLibro = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

   const [libro, setLibro] = useState({
        title: "",
        author: "",
        summary: "",
        book_gender: ""
    });

    useEffect(() => {
        if (id) {
            const libroExistente = store.libros.find((libro) => libro.id === parseInt(id));
            if (libroExistente) {
                setLibro(libroExistente);
            }
        }
    }, [id, store.libros]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro({ ...libro, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLibro({ ...libro, miniatura: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGuardar = async () => {
        console.log("Payload antes de enviarlo al backend:", libro);
        const success = await actions.addOrUpdateLibro(libro);
    
        if (success) {
            toast.success("¡Libro guardado exitosamente!"); // Mensaje de éxito
            navigate("/panel-admin/editar-cargar-libro");
        } else {
            toast.error("Error al guardar el libro. Intente nuevamente."); // Mensaje de error
        }
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/panel-admin/editar-cargar-libro")}
            >
                Atrás
            </button>
            <h2 className="mb-4">{id ? "Editar Libro" : "Subir Libro"}</h2>
            <div className="card p-4 shadow-sm">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label>Título</label>
                        <input
                            type="text"
                            name="title"
                            value={libro.title}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Autor</label>
                        <input
                            type="text"
                            name="author"
                            value={libro.author}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Género</label>
                        <select
                            name="book_gender"
                            value={libro.book_gender}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Seleccionar</option>
                            <option value="Biografía">Biografía</option>
                            <option value="Cuento">Cuento</option>
                            <option value="Novela">Novela</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label>Resumen</label>
                        <textarea
                            name="summary"
                            value={libro.summary}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-12">
                        <label>Miniatura</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {libro.miniatura && (
                            <div className="mt-3">
                                <img
                                    src={libro.miniatura}
                                    alt="Vista previa de la miniatura"
                                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                                />
                            </div>
                        )}
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleGuardar}>
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};
