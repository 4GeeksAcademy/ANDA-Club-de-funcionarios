from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Inicializa las extensiones sin app
db = SQLAlchemy()
bcrypt = Bcrypt()