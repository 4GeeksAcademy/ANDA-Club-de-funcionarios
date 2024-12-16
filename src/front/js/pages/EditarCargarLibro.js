import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { LibroCard } from "../component/LibroCard";
import { useNavigate } from "react-router-dom";

export const EditarCargarLibro = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!store.libros || store.libros.length === 0) {
            actions.fetchLibros();
        }
    }, []);

    return (
        <div className="container mt-4">
            <h2>Editar / Subir Libro</h2>
            <button
                className="btn btn-primary"
                onClick={() => navigate("/panel-admin/subir-libro")}
            >
                Subir +
            </button>

            <table className="table table-striped">
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
                    {store.libros && store.libros.length > 0 ? (
                        store.libros.map((libro) => (
                            <LibroCard
                                key={libro.id}
                                libro={libro}
                                onDelete={(id) => actions.deleteLibro(id)} // Borrar libro
                                onEdit={(id) => console.log("Editar libro con ID:", id)} // Editar libro
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay libros disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};