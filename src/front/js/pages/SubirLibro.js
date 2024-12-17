import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { toast } from "sonner";


const initialLibroState = {
    title: "",
    author: "",
    summary: "",
    book_gender: "",
    miniatura: ""
}

export const SubirLibro = () => {
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const navigate = useNavigate();

    const [libro, setLibro] = useState(initialLibroState);

    useEffect(() => {
        if (id) {
            const libroExistente = store.libros.find((libro) => libro.id === parseInt(id));
            if (libroExistente) {
                setLibro(libroExistente);
            }
        }
    }, [id, store.libros]);

    const handleChange = ({ target }) => {

        setLibro({
            ...libro,
            [target.name]: target.value
        });
    };


    const handleGuardar = async () => {

        // crear una instancia de formData
        const formData = new FormData()
        formData.append("title", libro.title)
        formData.append("author", libro.author)
        formData.append("summary", libro.summary)
        formData.append("book_gender", libro.book_gender)
        formData.append("miniatura", libro.miniatura)



        const success = await actions.addLibro(formData);

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
                            onChange={(event) => {
                                setLibro({ ...libro, miniatura: event.target.files[0] })
                            }}
                        />
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleGuardar}>
                        Guardar deimian
                    </button>
                </div>
            </div>
        </div>
    );
};
