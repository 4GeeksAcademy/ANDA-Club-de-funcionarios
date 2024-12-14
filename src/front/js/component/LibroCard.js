import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const LibroCard = ({ book }) => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleEdit = () => {
        navigate(`/panel-admin/subir-libro/${book.id}`);
    };

    const handleDelete = () => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar el libro: ${book.titulo}?`)) {
            actions.deleteLibro(book.id);
            alert("Libro eliminado exitosamente.");
        }
    };

    return (
        <tr>
            <td>
                <img
                    src={book.miniatura || "https://via.placeholder.com/150"}
                    alt={book.titulo}
                    style={{ height: "50px", objectFit: "cover" }}
                />
            </td>
            <td>{book.titulo}</td>
            <td>{book.autor}</td>
            <td>{book.genero}</td>

            <td>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={handleEdit}>
                    Modificar
                </button>
                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                    Borrar
                </button>
            </td>
        </tr>
    );
};

