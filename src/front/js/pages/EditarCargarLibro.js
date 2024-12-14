import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { LibroCard } from "../component/LibroCard";

export const EditarCargarLibro = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Editar / Subir Libro</h2>
            <div className="d-flex justify-content-between mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/panel-admin/subir-libro")}
                >
                    Subir +
                </button>
                <span className="text-muted">Has creado {store.libros.length} publicaciones</span>
            </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Miniatura</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Género</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {store.libros.length > 0 ? (
                        store.libros.map((libro, index) => (
                            <LibroCard key={index} book={libro} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                No hay libros cargados. Agrega uno nuevo con el botón "Subir +".
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
