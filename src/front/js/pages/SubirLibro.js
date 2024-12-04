import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SubirLibro = () => {
    const [nombre, setNombre] = useState("");
    const [autor, setAutor] = useState("");
    const [resumen, setResumen] = useState("");
    const [archivo, setArchivo] = useState(null);
    const navigate = useNavigate(); 

    const handleArchivoChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleGuardar = () => {
        console.log({
            nombre,
            autor,
            resumen,
            archivo,
        });
        alert("Libro guardado exitosamente");
    };

    return (
        <div className="container">
            {/* Botón "Atrás" */}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate("/editar_cargar_libro")}
            >
                Atrás
            </button>

            <h2 className="mb-4">Editar / Subir Libro</h2>
            <div className="card shadow-sm p-4 mb-4">
                {/* Formulario */}
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Autor</label>
                    <input
                        type="text"
                        className="form-control"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Resumen</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={resumen}
                        onChange={(e) => setResumen(e.target.value)}
                    ></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleGuardar}>
                    Guardar
                </button>
            </div>

            {/* Carga de imágenes */}
            <div className="card shadow-sm p-4">
                <h5>Carga de imágenes</h5>
                <p className="text-muted">
                    Añadir documentos aquí, puedes cargar hasta 1 documento máximo.
                </p>
                <div
                    className="border rounded p-4 text-center"
                    style={{ borderStyle: "dashed" }}
                >
                    <input
                        type="file"
                        id="archivoInput"
                        style={{ display: "none" }}
                        onChange={handleArchivoChange}
                    />
                    <label htmlFor="archivoInput" className="btn btn-outline-primary">
                        Explorar archivos
                    </label>
                    {archivo && (
                        <p className="mt-3">
                            Archivo cargado: <strong>{archivo.name}</strong>
                        </p>
                    )}
                </div>
                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-secondary me-2">Cancelar</button>
                    <button className="btn btn-primary">Cargar</button>
                </div>
            </div>
        </div>
    );
};

