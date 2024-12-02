"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt

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
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user or current_user.role != 'admin':
        return jsonify({"msg": "Unauthorized"}), 403

    pending_users = User.query.filter_by(status='en_revision').all()
    if not pending_users:
        return jsonify({"msg": "No pending users found"}), 200

    return jsonify([user.serialize() for user in pending_users]), 200


@api.route('/admin/users/<int:user_id>/status', methods=['PATCH'])
@jwt_required()
def update_user_status(user_id):
    """
    Actualiza el estado de un usuario.
    Solo accesible para administradores.
    """
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    
    if not current_user or current_user.role != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    body = request.get_json()
    if not body or 'status' not in body:
        return jsonify({"error": "Status field is required"}), 400
    
    new_status = body.get('status')
    if new_status not in ['activo', 'en_revision']:
        return jsonify({"error": "Invalid status"}), 400
    
    if user.status == new_status:
        return jsonify({"message": "User status is already set to the specified value"}), 200
    
    user.status = new_status
    db.session.commit()
    
    return jsonify({"message": "User status updated successfully"}), 200


# -----------------------------------------------------------------
# AUTHENTICATION ROUTES
# Rutas de autenticación de usuarios (registro y login)
# -----------------------------------------------------------------

@api.route('/register', methods=['POST'])
def register():
    """
    Registra un nuevo usuario con estado inicial 'en_revision'.
    """
    data = request.get_json()

    # Validar que se envíen los campos requeridos
    if not data or not data.get('user_name') or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Username, email, and password are required"}), 400

    # Verificar que el email no exista en la base de datos
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already exists"}), 400

    # Crear un nuevo usuario con el estado 'en_revision'
    new_user = User(
        user_name=data['user_name'],
        email=data['email'],
        password_hash=bcrypt.generate_password_hash(data['password']).decode('utf-8'),
        role='user',  # Por defecto, el rol es 'user'
        status='en_revision'  # El estado inicial es 'en_revision'
    )

    # Guardar el usuario en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User registered successfully. Awaiting admin approval."}), 201


@api.route('/login', methods=['POST'])
def login():
    """
    Autentica al usuario y genera un token de acceso JWT.
    Solo usuarios con estado 'activo' pueden iniciar sesión.
    """
    data = request.get_json()

    # Validar que se envíen el email y la contraseña
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email and password are required"}), 400

    # Buscar al usuario por email
    user = User.query.filter_by(email=data['email']).first()

    # Validar si el usuario no existe o su contraseña no coincide
    if not user or not bcrypt.check_password_hash(user.password_hash, data['password']):
        return jsonify({"msg": "Invalid email or password"}), 401

    # Verificar el estado del usuario
    if user.status != 'activo':
        return jsonify({"msg": "User is not authorized to log in"}), 403

    # Generar el token de acceso
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "msg": "Login successful",
        "access_token": access_token,
        "user": user.serialize()
    }), 200


# -----------------------------------------------------------------
# EXAMPLE ROUTE
# -----------------------------------------------------------------

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
