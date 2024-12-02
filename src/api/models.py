from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), unique=False, nullable=False)
    role = db.Column(db.Enum('user', 'admin', name='role_enum'), default='user', nullable=False)
    status = db.Column(db.Enum('activo', 'en_revision', name='role_status'), default='en_revision', nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(pytz.utc)) # Importe libreria pytz para obtener la hora UTC
    updated_at = db.Column(db.DateTime, default=datetime.now(pytz.utc), onupdate=datetime.now(pytz.utc))
   
    # relacion con Reservations
    reservations = db.relationship('Reservations', back_populates='user')
    #relacion con books_reservations
    books_reservations = db.relationship('Book_reservations', back_populates='user')

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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', nullable=False)) 
    sart_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(pytz.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(putz.utc), onupdate=datetime.now(pytz.utc))

    #Relacion inversa con User
    user = db.relationship('User', back_populates = 'reservations')

    def __repr__(self):
        return f'<Reservations {self.event_name}>'
    
    def serialize(self): #serialice
        return {
            "id": self.id, 
            "event_name": self.event_name,
            "user_id": self.user_id, 
            "satrt_time": self.satrt_time, 
            "end_time": self.end_time, 
            "created_at": self.created_at.isoformat() if self.created_at else None, 
            "updated_at": self.updated_at.isoformat() if self.updated_at else None, 
        }

class Books_reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id', nullable = False))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', nullable = False)) 
    reserved_at = db.Column(db.DateTime, default=datetime.now(pytz.utc))
    returned_at = db.Column(db.DateTime, default=datetime.now(putz.utc), onupdate=datetime.now(pytz.utc))
    
    #relacion inversa con User
    user = db.relationship('User', back_populates = 'books_reservations')


    def __repr__(self):
        return f'<Books_reservations {self.book_id}>'

    def serialize(self): 
        return {
            "id": self.id,
            "book_id": self.book_id, 
            "user_id": self.user_id, 
            "reserved_at": self.reserved_at.isoformat() if self.created_at else None, 
            "returned_at": self.returned_at.isoformat() if self.returned_at else None, 
        }
    


