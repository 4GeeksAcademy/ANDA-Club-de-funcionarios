
import click
from flask_bcrypt import Bcrypt
from api.models import db, User

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    command_bcrypt = Bcrypt(app)
    
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

    @app.cli.command("create-admin")
    def create_admin():
        """Create a default admin user for testing and development."""
        User.create_default_admin()

    @app.cli.command("reset-user-password")
    @click.argument("email")
    @click.argument("new_password")
    @click.option("--activate", is_flag=True, help="Set the user status to activo.")
    def reset_user_password(email, new_password, activate):
        """Reset an existing user's password."""
        user = User.query.filter_by(email=email).first()

        if not user:
            raise click.ClickException(f"User not found: {email}")

        user.password_hash = command_bcrypt.generate_password_hash(new_password).decode("utf-8")

        if activate:
            user.status = "activo"

        db.session.commit()
        click.echo(f"Password reset for {email}")
