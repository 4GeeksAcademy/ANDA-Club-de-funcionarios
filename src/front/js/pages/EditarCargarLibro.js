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

            {/* Botón para subir un nuevo libro */}
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-dark"
                    onClick={() => navigate("/panel_admin/subir_libro")}
                >
                    Subir +
                </button>
            </div>

            {/* Vista de libros cargados */}
            <div className="row">
                {store.libros && store.libros.length > 0 ? (
                    store.libros.map((libro, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4 mb-4">
                            <LibroCard libro={libro} />
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted">
                        No hay libros cargados. Agrega uno nuevo con el botón "Subir +".
                    </div>
                )}
            </div>
        </div>
    );
};
