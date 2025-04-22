ANDA - Club de Funcionarios
Plataforma web desarrollada para los funcionarios de ANDA, que permite gestionar la reserva de espacios para eventos y el préstamo de libros en una biblioteca en línea, todo mediante una interfaz adaptada a la estética institucional de ANDA.

Tabla de Contenidos
Descripción

Tecnologías Utilizadas

Instalación y Configuración

Backend (Flask)

Frontend (React)

Uso de la Aplicación

Estructura del Proyecto

Contribuciones

Licencia

Autores

Recursos Adicionales

Descripción
Este proyecto tiene como objetivo proporcionar a los funcionarios de ANDA una herramienta eficiente para:

Reservar espacios: Gestión de reservas de salones y otros espacios para eventos internos.

Préstamo de libros: Sistema de biblioteca en línea que permite solicitar y gestionar préstamos de libros disponibles.

La plataforma busca optimizar la organización interna y fomentar el acceso a recursos culturales y educativos entre los funcionarios.

Tecnologías Utilizadas
Frontend:

React.js

Webpack

Bootstrap (opcional, según diseño)

Backend:

Python 3.10

Flask

SQLAlchemy

Pipenv

Base de Datos:

PostgreSQL (recomendado)

Soporte para SQLite y MySQL

Despliegue:

Render

Heroku (opcional)

Instalación y Configuración
Backend (Flask)
Clonar el repositorio:

bash
Copiar
Editar
git clone https://github.com/4GeeksAcademy/ANDA-Club-de-funcionarios.git
cd ANDA-Club-de-funcionarios
Instalar dependencias:

bash
Copiar
Editar
pipenv install
Configurar variables de entorno:

Copiar el archivo .env.example y renombrarlo a .env. Luego, editar las variables según la configuración local.

bash
Copiar
Editar
cp .env.example .env
Configurar la base de datos:

Definir la variable DATABASE_URL en el archivo .env con la cadena de conexión correspondiente. Ejemplos:

PostgreSQL:

bash
Copiar
Editar
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
SQLite:

ini
Copiar
Editar
DATABASE_URL=sqlite:///test.db
Inicializar la base de datos:

bash
Copiar
Editar
pipenv run migrate
pipenv run upgrade
Ejecutar el servidor:

bash
Copiar
Editar
pipenv run start
Frontend (React)
Instalar dependencias:

bash
Copiar
Editar
npm install
Iniciar el servidor de desarrollo:

bash
Copiar
Editar
npm run start
La aplicación estará disponible en http://localhost:3000.

Uso de la Aplicación
Una vez iniciados ambos servidores (frontend y backend), los usuarios pueden:

Iniciar sesión: Acceder con credenciales proporcionadas.

Reservar espacios: Seleccionar fechas y horarios disponibles para eventos.

Solicitar libros: Buscar y solicitar préstamos de libros disponibles en la biblioteca.

Administrar reservas y préstamos: Visualizar, modificar o cancelar solicitudes según permisos.

Estructura del Proyecto
csharp
Copiar
Editar
ANDA-Club-de-funcionarios/
├── .devcontainer/
├── .github/
├── .vscode/
├── dist/
├── docs/
├── migrations/
├── public/
├── src/
│   ├── api/
│   ├── front/
│   └── ...
├── .env.example
├── Pipfile
├── Pipfile.lock
├── package.json
├── README.md
└── ...
src/api/: Código fuente del backend (Flask).

src/front/: Código fuente del frontend (React).

migrations/: Archivos de migración de la base de datos.

public/: Archivos estáticos públicos.

docs/: Documentación adicional.

Contribuciones
Las contribuciones son bienvenidas. Para colaborar:

Realizar un fork del repositorio.

Crear una nueva rama:

bash
Copiar
Editar
git checkout -b feature/nueva-funcionalidad
Realizar los cambios y confirmar los commits.

Enviar un pull request detallando las modificaciones.

Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más información.

Autores
Equipo de Desarrollo de 4Geeks Academy

Colaboradores: Lista de colaboradores

Recursos Adicionales
4Geeks Academy

Documentación de React

Documentación de Flask

SQLAlchemy ORM
