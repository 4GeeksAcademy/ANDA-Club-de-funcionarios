import React from "react";
import { useNavigate } from "react-router-dom";

export const LibroCard = ({ book }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/subir_libro/${book.id}`);
    };

    const handleDelete = () => {
        alert(`Eliminar el libro: ${book.titulo}`);
    };

    return (
        <div className="card shadow-sm">
            <img
                src={book.miniatura || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={book.titulo}
            />
            <div className="card-body">
                <h5 className="card-title">{book.titulo}</h5>
                <p className="card-text">
                    <strong>Autor:</strong> {book.autor}
                </p>
                <p className="card-text">
                    <strong>Estado:</strong>{" "}
                    <span className={`badge ${book.estado === "Live" ? "bg-success" : "bg-secondary"}`}>
                        {book.estado}
                    </span>
                </p>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-dark btn-sm" onClick={handleEdit}>
                        Modificar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        Borrar
                    </button>
                </div>
            </div>
        </div>
    );
};