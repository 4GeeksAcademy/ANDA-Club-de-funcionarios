"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reservations, Books, UserProfiles, Books_reservations
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import get_jwt_identity, jwt_required, create_access_token

import pendulum

api = Blueprint('api', __name__)
bcrypt = Bcrypt()
# Allow CORS requests to this API
CORS(api)

# -----------------------------------------------------------------
# ADMINISTRATIVE ROUTES
# Rutas que requieren permisos de administrador para gestionar usuarios
# -----------------------------------------------------------------

@api.route('/admin/pending-users', methods=['GET'])
@jwt_required()
def get_pending_users():
    """
    Devuelve una lista de usuarios con estado 'en_revision'.
    Solo accesible para administradores autenticados.
    """
    # Obtener el ID del usuario autenticado desde el token JWT
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    
    # Verificar que el usuario actual exista y sea administrador
    if not current_user or current_user.role != 'admin':
        
        return jsonify({"msg": "Unauthorized"}), 403

    # Consultar todos los usuarios cuyo estado sea 'en_revision'
    pending_users = User.query.filter_by(status='en_revision').all()

    # Si no hay usuarios pendientes, devolver un mensaje
    if not pending_users:
        return jsonify({"msg": "No pending users found"}), 200

    # Devolver la lista de usuarios pendientes serializados
    return jsonify([user.serialize() for user in pending_users]), 200


@api.route('/admin/users/<int:user_id>/status', methods=['PATCH'])
@jwt_required()
def update_user_status(user_id):
    """
    Actualiza el estado de un usuario.
    Solo accesible para administradores autenticados.
    """
    # Obtener el ID del usuario autenticado desde el token JWT
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    # Verificar que el usuario actual exista y sea administrador
    if not current_user or current_user.role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403

    # Buscar al usuario al que se le quiere cambiar el estado por su ID
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Verificar que se envíe un cuerpo en la petición y que contenga el campo 'status'
    body = request.get_json()
    if not body or 'status' not in body:
        return jsonify({"error": "Status field is required"}), 400
    
    # Obtener el nuevo estado desde el cuerpo de la petición
    new_status = body.get('status')
    
    # Validar que el nuevo estado sea válido ('activo' o 'en_revision')
    if new_status not in ['activo', 'en_revision']:
        return jsonify({"error": "Invalid status"}), 400
    
    # Verificar si el estado ya está establecido para evitar cambios innecesarios
    if user.status == new_status:
        return jsonify({"message": "User status is already set to the specified value"}), 200
    
    # Actualizar el estado del usuario y guardar los cambios en la base de datos
    user.status = new_status
    db.session.commit()
    
    # Confirmar que el cambio de estado fue exitoso
    return jsonify({"message": "User status updated successfully"}), 200

# -----------------------------------------------------------------
# USER PROFILE MANAGEMENT ROUTES
# Rutas para gestionar los perfiles de usuarios
# -----------------------------------------------------------------

@api.route('/user-profiles', methods=['GET'])
@jwt_required()
def get_user_profiles():
    """
    Obtiene todos los perfiles de usuarios registrados en el sistema,
    incluyendo los usuarios activos sin perfiles creados.
    Solo accesible para administradores.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario actual sea administrador
    if not current_user or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    # Obtener perfiles creados
    profiles = UserProfiles.query.all()

    # Obtener usuarios activos que no tienen un perfil
    active_users_without_profiles = (
        User.query.outerjoin(UserProfiles, User.id == UserProfiles.user_id)
        .filter(UserProfiles.id.is_(None), User.status == 'activo')
        .all()
    )

    # Combinar perfiles serializados con usuarios activos sin perfiles
    result = (
        [profile.serialize() for profile in profiles] +
        [
            {
                "id": user.id,
                "first_name": None,
                "last_name": None,
                "email": user.email,
                "identification": None,
                "address": None,
                "phone_number": None,
                "birth_date": None,
                "department": None,
                "sector": None,
                "status": user.status,
                "created_at": user.created_at.isoformat() if user.created_at else None,
                "updated_at": user.updated_at.isoformat() if user.updated_at else None,
            }
            for user in active_users_without_profiles
        ]
    )

    return jsonify(result), 200


@api.route('/user-profiles/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_profile(user_id):
    """
    Obtiene el perfil de un usuario específico por su ID.
    Requiere autenticación.
    """

    # Verificar que el usuario actual sea el mismo que el del perfil o administrador
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if user_id != int(current_user_id) and (not current_user or current_user.role != 'admin'):
        return jsonify({"msg": "You are not authorized to view this profile"}), 403
    
    # Query para obtener el perfil asociado al usuario especificado
    profile = UserProfiles.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({"msg": "User profile not found"}), 404

    return jsonify(profile.serialize()), 200


@api.route('/user-profiles', methods=['POST'])
@jwt_required()
def create_user_profile():
    """
    Crea un nuevo perfil para un usuario.
    Requiere autenticación.
    """
    data = request.get_json()

    # Validar campos requeridos
    if not data or not data.get('user_id') or not data.get('first_name') or not data.get('last_name'):
        return jsonify({"msg": "user_id, first_name, and last_name are required"}), 400
    
    # Verificar que el usuario actual sea el mismo que el del perfil o administrador
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if data['user_id'] != int(current_user_id) and (not current_user or current_user.role != 'admin'):
        return jsonify({"msg": "You are not authorized to create this profile"}), 403
    
    # Verificar que el usuario exista
    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"msg": "User not found"}), 404

    # Crear nuevo perfil
    new_profile = UserProfiles(
        user_id=data['user_id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data.get('email'),
        identification=data.get('identification'),
        address=data.get('address'),
        phone_number=data.get('phone_number'),
        birth_date=data.get('birth_date'),
        department=data.get('department'),
        sector=data.get('sector')
    )

    # Guardar en la base de datos
    db.session.add(new_profile)
    db.session.commit()

    return jsonify(new_profile.serialize()), 201


@api.route('/user-profiles/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user_profile(user_id):
    """
    Actualiza el perfil de un usuario existente.
    Requiere autenticación.
    """
    # Verificar que el usuario actual sea el mismo que el del perfil o administrador
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if user_id != int(current_user_id) and (not current_user or current_user.role != 'admin'):
        return jsonify({"msg": "You are not authorized to update this profile"}), 403
    
    # Query para obtener el perfil asociado al usuario especificado
    profile = UserProfiles.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({"msg": "User profile not found"}), 404
    
    # Actualizar los campos del perfil
    data = request.get_json()
    profile.first_name = data.get('first_name', profile.first_name)
    profile.last_name = data.get('last_name', profile.last_name)
    profile.email = data.get('email', profile.email)
    profile.identification = data.get('identification', profile.identification)
    profile.address = data.get('address', profile.address)
    profile.phone_number = data.get('phone_number', profile.phone_number)
    profile.birth_date = data.get('birth_date', profile.birth_date)
    profile.department = data.get('department', profile.department)
    profile.sector = data.get('sector', profile.sector)

    db.session.commit()

    return jsonify(profile.serialize()), 200

# -----------------------------------------------------------------
# RESERVATION MANAGEMENT ROUTES
# Rutas para gestionar las reservas de locales
# -----------------------------------------------------------------

@api.route('/reservations', methods=['GET'])
@jwt_required()
def get_all_reservations():
    """
    Obtiene todas las reservas registradas en el sistema.
    Solo usuarios autenticados pueden acceder.
    """
    # Obtener el usuario autenticado
    current_user_id = get_jwt_identity()
    reservations = Reservations.query.filter_by(user_id=current_user_id).all()

    # Serializar y devolver las reservas
    return jsonify([reservation.serialize() for reservation in reservations]), 200


@api.route('/reservations', methods=['POST'])
@jwt_required()
def create_reservation():
    """
    Crea una nueva reserva en el sistema.
    Requiere que el usuario esté autenticado.
    """
    data = request.get_json()

    # Validar campos obligatorios
    if not data or not data.get('event_name') or not data.get('start_time') or not data.get('end_time'):
        return jsonify({"msg": "Event name, start_time, and end_time are required"}), 400

    # Crear nueva reserva
    new_reservation = Reservations(
        event_name=data['event_name'],
        user_id=get_jwt_identity(),
        start_time=pendulum.parse(data['start_time']),
        end_time=pendulum.parse(data['end_time'])
    )

    # Guardar en la base de datos
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify(new_reservation.serialize()), 201


@api.route('/reservations/<int:reservation_id>', methods=['PUT'])
@jwt_required()
def update_reservation(reservation_id):
    """
    Actualiza una reserva existente.
    Requiere que el usuario esté autenticado.
    """
    reservation = Reservations.query.get(reservation_id)
    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404
    
    # Verificar que el usuario actual sea el mismo que realizó la reserva
    current_user_id = get_jwt_identity()
    if reservation.user_id != int(current_user_id):
        return jsonify({"msg": "You are not authorized to update this reservation"}), 403
    
    # Validar campos y actualizar
    data = request.get_json()
    reservation.event_name = data.get('event_name', reservation.event_name)
    reservation.start_time = pendulum.parse(data.get('start_time', reservation.start_time.isoformat()))
    reservation.end_time = pendulum.parse(data.get('end_time', reservation.end_time.isoformat()))

    db.session.commit()

    return jsonify(reservation.serialize()), 200


@api.route('/reservations/<int:reservation_id>', methods=['GET'])
@jwt_required()
def get_reservation_details(reservation_id):
    """
    Obtiene los detalles de una reserva específica.
    Requiere autenticación.
    """
    reservation = Reservations.query.get(reservation_id)
    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404

    # Verificar que el usuario actual sea el mismo que realizó la reserva
    current_user_id = get_jwt_identity()
    if reservation.user_id != int(current_user_id):
        return jsonify({"msg": "You are not authorized to view this reservation"}), 403
    
    return jsonify(reservation.serialize()), 200


@api.route('/reservations/<int:reservation_id>', methods=['DELETE'])
@jwt_required()
def cancel_reservation(reservation_id):
    """
    Cancela una reserva existente.
    Requiere autenticación.
    """
    reservation = Reservations.query.get(reservation_id)
    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404

    # Verificar que el usuario actual sea el mismo que realizó la reserva
    current_user_id = get_jwt_identity()
    if reservation.user_id != int(current_user_id):
        return jsonify({"msg": "You are not authorized to delete this reservation"}), 403
    
    db.session.delete(reservation)
    db.session.commit()

    return jsonify({"msg": "Reservation deleted successfully"}), 200

# -----------------------------------------------------------------
# LIBRARY MANAGEMENT ROUTES
# Rutas para gestionar los libros en la biblioteca
# -----------------------------------------------------------------

@api.route('/books', methods=['GET'])
def get_all_books():
    """
    Lista todos los libros disponibles en la biblioteca.
    """
    books = Books.query.filter_by(availability=True).all()
    return jsonify([book.serialize() for book in books]), 200


@api.route('/books/<int:book_id>', methods=['GET'])
def get_book_details(book_id):
    """
    Obtiene los detalles de un libro específico.
    """
    book = Books.query.get(book_id)
    if not book:
        return jsonify({"msg": "Book not found"}), 404

    return jsonify(book.serialize()), 200


@api.route('/books', methods=['POST'])
@jwt_required()
def add_new_book():
    """
    Agrega un nuevo libro al catálogo.
    Solo accesible para administradores.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario actual sea administrador
    if not current_user or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    data = request.get_json()
    if not data or not data.get('title') or not data.get('author') or not data.get('book_gender'):
        return jsonify({"msg": "Title, author, and book_gender are required"}), 400

    new_book = Books(
        title=data['title'],
        author=data['author'],
        book_gender=data['book_gender']
    )

    db.session.add(new_book)
    db.session.commit()

    return jsonify(new_book.serialize()), 201


@api.route('/books/<int:book_id>', methods=['PUT'])
@jwt_required()
def edit_book(book_id):
    """
    Edita la información de un libro.
    Solo accesible para administradores.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario actual sea administrador
    if not current_user or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    book = Books.query.get(book_id)
    if not book:
        return jsonify({"msg": "Book not found"}), 404

    data = request.get_json()
    book.title = data.get('title', book.title)
    book.author = data.get('author', book.author)
    book.book_gender = data.get('book_gender', book.book_gender)
    book.availability = data.get('availability', book.availability)

    db.session.commit()

    return jsonify(book.serialize()), 200


@api.route('/books/<int:book_id>', methods=['DELETE'])
@jwt_required()
def delete_book(book_id):
    """
    Elimina un libro del catálogo.
    Solo accesible para administradores.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)

    # Verificar que el usuario actual sea administrador
    if not current_user or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    book = Books.query.get(book_id)
    if not book:
        return jsonify({"msg": "Book not found"}), 404

    db.session.delete(book)
    db.session.commit()

    return jsonify({"msg": "Book deleted successfully"}), 200

# -----------------------------------------------------------------
# BOOK RESERVATION ROUTES
# Rutas para gestionar las reservas de libros
# -----------------------------------------------------------------

@api.route('/book-reservations', methods=['POST'])
@jwt_required()
def reserve_book():
    """
    Realiza una reserva de un libro.
    Requiere autenticación.
    """
    data = request.get_json()

    # Validar campos requeridos
    if not data or not data.get('book_id'):
        return jsonify({"msg": "Book ID is required"}), 400

    # Verificar que el libro exista
    book = Books.query.get(data['book_id'])
    if not book:
        return jsonify({"msg": "Book not found"}), 404

    # Verificar que el libro esté disponible
    if not book.availability:
        return jsonify({"msg": "Book is not available"}), 400

    # Crear reserva de libro
    book_reservation = Books_reservations(
        book_id=data['book_id'],
        user_id=get_jwt_identity(),
        reserved_at=pendulum.now("UTC")
    )

    # Marcar el libro como no disponible
    book.availability = False

    # Guardar en la base de datos
    db.session.add(book_reservation)
    db.session.commit()

    return jsonify({"msg": "Book reserved successfully", "reservation": book_reservation.serialize()}), 201


@api.route('/book-reservations/<int:reservation_id>', methods=['PUT'])
@jwt_required()
def return_book(reservation_id):
    """
    Marca un libro como devuelto.
    Requiere autenticación.
    """
    # Obtener el usuario actual
    current_user_id = get_jwt_identity()

    # Verificar que la reserva exista
    reservation = Books_reservations.query.get(reservation_id)
    if not reservation:
        return jsonify({"msg": "Reservation not found"}), 404

    # Verificar que el usuario sea el mismo que realizó la reserva
    if reservation.user_id != int(current_user_id):
        return jsonify({"msg": "You are not authorized to return this book"}), 403

    # Verificar que el libro exista
    book = Books.query.get(reservation.book_id)
    if not book:
        return jsonify({"msg": "Book not found"}), 404
    
    # Verificar si el libro ya fue devuelto
    if reservation.returned_at:
        return jsonify({"msg": "The book is already returned"}), 400
    
    # Actualizar estado de la reserva y el libro
    reservation.returned_at = pendulum.now("UTC")
    book.availability = True

    # Guardar cambios
    db.session.commit()

    return jsonify({"msg": "Book returned successfully", "reservation": reservation.serialize()}), 200

# -----------------------------------------------------------------
# EXAMPLE ROUTE
# -----------------------------------------------------------------

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
