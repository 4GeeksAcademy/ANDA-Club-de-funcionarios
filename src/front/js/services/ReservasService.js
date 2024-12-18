const BASE_URL = process.env.BACKEND_URL + '/api/reservations'; // Cambia esto por la URL real de tu API

// Obtener el token de autenticación desde el almacenamiento (localStorage, contexto, etc.)
const getAuthToken = () => {
    return localStorage.getItem('token');  // Suponiendo que el token está almacenado en localStorage
}

// Configuración común para todas las solicitudes
const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}



// Obtener todas las reservas (GET)
export const getReservas = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'GET',
            headers: getHeaders(),  // Agrega el header Authorization
        });

        if (!response.ok) {
            throw new Error('Error al obtener las reservas');
        }

        return await response.json();  // Devuelve las reservas en formato JSON
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};

// Crear una nueva reserva (POST)
export const crearReserva = async (reservaData) => {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: getHeaders(),  // Agrega el header Authorization
            body: JSON.stringify(reservaData),  // Cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error('Error al crear la reserva');
        }

        return await response.json();  // Devuelve los datos de la nueva reserva
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};

// Obtener una reserva por ID (GET)
export const getReservaById = async (reservationId) => {
    try {
        const response = await fetch(`${BASE_URL}/${reservationId}`, {
            method: 'GET',
            headers: getHeaders(),  // Agrega el header Authorization
        });

        if (!response.ok) {
            throw new Error('Error al obtener la reserva');
        }

        return await response.json();  // Devuelve la reserva en formato JSON
    } catch (error) {
        console.error('Error al obtener la reserva:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};

// Actualizar una reserva (PUT)
export const actualizarReserva = async (reservationId, reservaData) => {
    try {
        const response = await fetch(`${BASE_URL}/${reservationId}`, {
            method: 'PUT',
            headers: getHeaders(),  // Agrega el header Authorization
            body: JSON.stringify(reservaData),  // Cuerpo de la solicitud con los datos de la reserva actualizada
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la reserva');
        }

        return await response.json();  // Devuelve los datos de la reserva actualizada
    } catch (error) {
        console.error('Error al actualizar la reserva:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};

// Eliminar una reserva (DELETE)
export const eliminarReserva = async (reservationId) => {
    try {
        const response = await fetch(`${BASE_URL}/${reservationId}`, {
            method: 'DELETE',
            headers: getHeaders(),  // Agrega el header Authorization
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la reserva');
        }

        return await response.json();  // Devuelve la respuesta del backend (usualmente un mensaje de éxito)
    } catch (error) {
        console.error('Error al eliminar la reserva:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};
