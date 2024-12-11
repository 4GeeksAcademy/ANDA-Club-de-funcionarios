
import click
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    
    # -----------------------------------------------------------------
    # ADMIN USER CREATION COMMAND
    # -----------------------------------------------------------------
    @app.cli.command("create-admin")
    def create_admin():
        """
        Comando para crear un usuario administrador.
        Este comando permite la creación de un usuario administrador predeterminado en el sistema.
        """
        from flask_bcrypt import Bcrypt
        bcrypt = Bcrypt()

        print("Starting the creation of an administrator user...")

        admin_email = "admin@anda.com.uy"
        admin_password = "adminpass"

        with app.app_context():
            existing_admin = User.query.filter_by(email=admin_email).first()
            if existing_admin:
                print(f"Admin user with email {admin_email} already exists. Skipping creation.")
                return

            admin = User(
                user_name="admin",
                email=admin_email,
                password_hash=bcrypt.generate_password_hash(admin_password).decode('utf-8'),
                role="admin",
                status="activo"
            )

            db.session.add(admin)
            try:
                db.session.commit()
                print(f"Administrator user created successfully with email: {admin_email}")
            except Exception as e:
                db.session.rollback()
                print(f"Error occurred while creating the administrator user: {e}")