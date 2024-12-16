import React from "react";

export const LibroCard = ({ libro, onDelete, onEdit }) => {
  if (!libro) {
    console.warn("Libro no definido:", libro);
    return null; // Evitar fallos si libro es undefined
  }

  const { id, title, author, book_gender, miniatura } = libro;

  return (
    <tr>
      <td>
        <img
          src={miniatura || "https://via.placeholder.com/150"}
          alt="Miniatura del libro"
          style={{ width: "50px", height: "50px" }}
        />
      </td>
      <td>{title || "Título no disponible"}</td>
      <td>{author || "Autor no disponible"}</td>
      <td>{book_gender || "Género no disponible"}</td>
      <td>
        <button className="btn btn-primary btn-sm" onClick={() => onEdit(id)}>
          Modificar
        </button>
        <button
          className="btn btn-danger btn-sm ms-2"
          onClick={() => onDelete(id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};
