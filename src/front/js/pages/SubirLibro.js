import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const SubirLibro = () => {
    const { store } = useContext(Context);
    const { id } = useParams(); // Obtener ID 
    const navigate = useNavigate();

    const [libro, setLibro] = useState({
        titulo: "",
        autor: "",
        isbn: "",
        resumen: "",
        miniatura: null,
        genero: "",
    });

    useEffect(() => {
        if (id) {
            const libroExistente = store.books.find((book) => book.id === parseInt(id));
            if (libroExistente) {
                setLibro(libroExistente);
            }
        }
    }, [id, store.books]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro({ ...libro, [name]: value });
    };

    const handleFileChange = (e) => {
        setLibro({ ...libro, miniatura: e.target.files[0] });
    };

    const handleGuardar = () => {
        console.log("Libro guardado:", libro);
        alert("Libro guardado exitosamente");
        navigate("/panel_admin/editar_cargar_libro");
    };

    return (
        <div className="container-fluid px-3 mt-4">
            {/* Botón Atrás */}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/panel_admin/editar_cargar_libro")}
            >
                Atrás
            </button>

            {/* Título principal */}
            <h2 className="mb-4">{id ? "Editar Libro" : "Subir Libro"}</h2>

            {/* Formulario */}
            <div className="card shadow-sm p-4" style={{ maxWidth: "700px", margin: "0 auto" }}>
                <div className="row g-3">
                    {/* Título y Autor */}
                    <div className="col-md-6">
                        <label htmlFor="titulo" className="form-label">
                            Título
                        </label>
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            className="form-control"
                            value={libro.titulo}
                            onChange={handleChange}
                            placeholder="Ingrese el título del libro"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="autor" className="form-label">
                            Autor
                        </label>
                        <input
                            type="text"
                            name="autor"
                            id="autor"
                            className="form-control"
                            value={libro.autor}
                            onChange={handleChange}
                            placeholder="Ingrese el autor del libro"
                        />
                    </div>

                    {/* ISBN y Género */}
                    <div className="col-md-6">
                        <label htmlFor="isbn" className="form-label">
                            ISBN
                        </label>
                        <input
                            type="text"
                            name="isbn"
                            id="isbn"
                            className="form-control"
                            value={libro.isbn}
                            onChange={handleChange}
                            placeholder="Ingrese el ISBN del libro"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="genero" className="form-label">
                            Género
                        </label>
                        <select
                            name="genero"
                            id="genero"
                            className="form-select"
                            value={libro.genero || ""}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Seleccione un género
                            </option>
                            <option value="Biografía">Biografía</option>
                            <option value="Ensayo">Ensayo</option>
                            <option value="Comedia">Comedia</option>
                            <option value="Cuento">Cuento</option>
                            <option value="Novela">Novela</option>
                            <option value="Sátira">Sátira</option>
                            <option value="Tragedia">Tragedia</option>
                        </select>
                    </div>

                    {/* Resumen */}
                    <div className="col-12">
                        <label htmlFor="resumen" className="form-label">
                            Resumen
                        </label>
                        <textarea
                            name="resumen"
                            id="resumen"
                            className="form-control"
                            rows="3"
                            value={libro.resumen}
                            onChange={handleChange}
                            placeholder="Ingrese un breve resumen del libro"
                        ></textarea>
                    </div>

                    {/* Miniatura */}
                    <div className="col-12">
                        <label htmlFor="miniatura" className="form-label">
                            Miniatura
                        </label>
                        <input
                            type="file"
                            id="miniatura"
                            className="form-control"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                <button className="btn btn-primary w-100 mt-4" onClick={handleGuardar}>
                    Guardar
                </button>
            </div>
        </div>
    );
};
