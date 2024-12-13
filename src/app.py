"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import timedelta
from dotenv import load_dotenv # Cargar variables de entorno
# from models import Person

#importo decorador necesario para proteger rutas 
from functools import wraps 
form flask_jwt_extended import get_jwt_identity 


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
load_dotenv()
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY') # Clave secreta en .env
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=365)  # Configura 1 año de expiración para el token
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object

# -----------------------------------------------------------------
# AUTHENTICATION ROUTES
# Rutas de autenticación de usuarios (registro y login)  
# -----------------------------------------------------------------

@app.route('/api/register', methods=['POST'])
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


@app.route('/api/login', methods=['POST'])
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
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "msg": "Login successful",
        "access_token": access_token,
        "user": user.serialize()
    }), 200




#-----------------------------------------------------------------------
# Decorador para verificar si el usuario tiene el rol de administrador
#------------------------------------------------------------------------

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # Obtener el ID del usuario actual desde el token JWT
        current_user_id = get_jwt_identity()
        # Buscar al usuario en la base de datos por su ID
        user = User.query.get(current_user_id)

        # Verificar si el usuario es un administrador
        if user and user.role != 'admin':
            # Si no es un admin, devolver un error de acceso denegado
            return jsonify({"msg": "Acceso denegado: Solo administradores"}), 403

        # Si el usuario es un admin, ejecutar la ruta protegida
        return fn(*args, **kwargs)

    return wrapper

#Aplicar el decorador admin_required a las rutas de administración protegidas

@app.route('/panel-admin', methods=['GET'])
@jwt_required()  # Requiere que el usuario esté autenticado con un token JWT
@admin_required  # Verifica que el usuario tenga el rol 'admin'
def panel_admin():
    return jsonify({"msg": "Bienvenido al Panel de Administrador!"}), 200

@app.route('/perfil-administrador', methods=['GET'])
@jwt_required()
@admin_required
def perfil_administrador():
    return jsonify({"msg": "Bienvenido a tu Perfil de Administrador!"}), 200

@app.route('/editar-cargar-libro', methods=['GET'])
@jwt_required()
@admin_required
def editar_cargar_libro():
    return jsonify({"msg": "Acceso para editar o cargar un libro!"}), 200

@app.route('/subir-libro', methods=['GET'])
@jwt_required()
@admin_required
def subir_libro():
    return jsonify({"msg": "Sube el libro aquí!"}), 200

@app.route('/editar-cargar-salon', methods=['GET'])
@jwt_required()
@admin_required
def editar_cargar_salon():
    return jsonify({"msg": "Acceso para editar o cargar salón!"}), 200

@app.route('/administrador-usuarios', methods=['GET'])
@jwt_required()
@admin_required
def administrador_usuarios():
    return jsonify({"msg": "Administración de usuarios!"}), 200



# -----------------------------------------------------------------
# Manejo de errores
# -----------------------------------------------------------------

@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
