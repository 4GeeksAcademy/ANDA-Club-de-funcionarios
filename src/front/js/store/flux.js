const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            libros: [] // Almacena la lista de libros
        },
        actions: {
            // Inicializa libros con datos de ejemplo o carga desde un backend
            initializeBooks: () => {
                const initialBooks = [
                    {
                        id: 1,
                        titulo: "El Principito",
                        autor: "Antoine de Saint-Exupéry",
                        isbn: "978-1234567890",
                        resumen: "Un cuento filosófico sobre un joven príncipe.",
                        miniatura: "https://via.placeholder.com/150",
                        genero: "Cuento",
                        estado: "Live"
                    }
                ];
                setStore({ libros: initialBooks });
            },

            // Agregar o actualizar un libro
            addOrUpdateLibro: (nuevoLibro) => {
                const store = getStore();
                const librosActualizados = store.libros.some(libro => libro.id === nuevoLibro.id)
                    ? store.libros.map(libro => (libro.id === nuevoLibro.id ? nuevoLibro : libro))
                    : [...store.libros, { ...nuevoLibro, id: store.libros.length + 1 }];
                setStore({ libros: librosActualizados });
            },

            // Eliminar un libro
            deleteLibro: (libroId) => {
                const store = getStore();
                const librosFiltrados = store.libros.filter(libro => libro.id !== libroId);
                setStore({ libros: librosFiltrados });
            }
        }
    };
};

export default getState;
