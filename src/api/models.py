from flask_sqlalchemy import SQLAlchemy
import pendulum


db = SQLAlchemy()

def lazy_utc_now():
    return pendulum.now("UTC")  # Función para manejar la fecha y hora en UTC
 

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=False)
    role = db.Column(db.Enum('user', 'admin', name='role_enum'), default='user', nullable=False)
    status = db.Column(db.Enum('activo', 'en_revision', name='role_status'), default='en_revision', nullable=False)
    created_at = db.Column(db.DateTime, default=lazy_utc_now) 
    updated_at = db.Column(db.DateTime, default=lazy_utc_now, onupdate=lazy_utc_now)
   
    # relacion con Reservations
    reservations = db.relationship('Reservations', back_populates='user')
    #relacion con books_reservations
    books_reservations = db.relationship('Books_reservations', back_populates='user')
    

    def __repr__(self):
        return f'<User {self.user_name}>'

    def serialize(self):
        return {
        "id": self.id,
        "username": self.user_name,
        "email": self.email,
        "role": self.role,
        "status": self.status,
        "created_at": self.created_at.isoformat() if self.created_at else None,
        "updated_at": self.updated_at.isoformat() if self.updated_at else None
    }

class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=lazy_utc_now)
    updated_at = db.Column(db.DateTime, default=lazy_utc_now, onupdate=lazy_utc_now)

    #Relacion inversa con User
    user = db.relationship('User', back_populates = 'reservations')

    def __repr__(self):
        return f'<Reservations {self.event_name}>'
    
    def serialize(self): #serialice
        return {
            "id": self.id, 
            "event_name": self.event_name,
            "user_id": self.user_id, 
            "start_time": self.start_time, 
            "end_time": self.end_time, 
            "created_at": self.created_at.isoformat() if self.created_at else None, 
            "updated_at": self.updated_at.isoformat() if self.updated_at else None, 
        }



class Books(db.Model): 
    id= db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(255), nullable=False)
    author= db.Column(db.String(255), nullable=False)
    book_gender = db.Column(db.Enum(
        'Novela', 'Cuento', 'Fantasía', 'Ciencia_Ficción', 'Romántico', 'Aventura', 
        'Histórico', 'Biografía', 'Documental', 'Poesía', 'Teatro', 'Terror', 
        name='book_gender_enum'), nullable=False)
    # Campo availability como Boolean (True: Disponible, False: No disponible)
    availability= db.Column(db.Boolean, default=True, nullable=False)
    created_at= db.Column(db.DateTime, default=lazy_utc_now)
    updated_at= db.Column(db.DateTime, default=lazy_utc_now, onupdate=lazy_utc_now)
    
    #relacion con Books_reservations
    books_reservations = db.relationship('Books_reservations', back_populates='book')


    # Método de representación del objeto para facilitar la depuración
    def __repr__(self): 
        return f'<Books {self.title} by {self.author}'

    # Método para serializar convierte el objeto Books en un diccionario que se puede convertir a JSON
    def serialize(self): 
        return {
            "id": self.id, 
            "title": self.title, 
            "author": self.author, 
            "book_gender": self.book_gender, 
            "availability": self.availability, 
            "created_at": self.created_at.isoformat() if self.created_at else None, 
            "updated_at": self.updated_at.isoformat() if self.updated_at else None

        }



class Books_reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id')) 
    reserved_at = db.Column(db.DateTime, default=lazy_utc_now)
    returned_at = db.Column(db.DateTime, default=None, onupdate=lazy_utc_now)
    
    #relacion inversa con User
    user = db.relationship('User', back_populates = 'books_reservations')
    #relacion inversa con books
    book = db.relationship('Books', back_populates='books_reservations')
    

    def __repr__(self):
        return f'<Books_reservations {self.book_id}>'

    def serialize(self): 
        return {
            "id": self.id,
            "book_id": self.book_id, 
            "user_id": self.user_id, 
            "reserved_at": self.reserved_at.isoformat() if self.reserved_at else None,
            "returned_at": self.returned_at.isoformat() if self.returned_at else None, 
        }
