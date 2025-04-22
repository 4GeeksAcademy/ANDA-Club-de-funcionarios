<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>ANDA - Club de Funcionarios</h1>

  <p>Plataforma web desarrollada para los funcionarios de ANDA, que permite gestionar la reserva de espacios para eventos y el préstamo de libros en una biblioteca en línea, todo mediante una interfaz adaptada a la estética institucional de ANDA.</p>

  <h2>Tabla de Contenidos</h2>
  <ul>
    <li><a href="#descripción">Descripción</a></li>
    <li><a href="#tecnologías-utilizadas">Tecnologías Utilizadas</a></li>
    <li><a href="#instalación-y-configuración">Instalación y Configuración</a></li>
    <li><a href="#uso-de-la-aplicación">Uso de la Aplicación</a></li>
    <li><a href="#estructura-del-proyecto">Estructura del Proyecto</a></li>
    <li><a href="#contribuciones">Contribuciones</a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#autores">Autores</a></li>
    <li><a href="#recursos-adicionales">Recursos Adicionales</a></li>
  </ul>

  <h2 id="descripción">Descripción</h2>
  <p>Este proyecto tiene como objetivo proporcionar a los funcionarios de ANDA una herramienta eficiente para:</p>
  <ul>
    <li><strong>Reservar espacios</strong>: Gestión de reservas de salones y otros espacios para eventos internos.</li>
    <li><strong>Préstamo de libros</strong>: Sistema de biblioteca en línea que permite solicitar y gestionar préstamos de libros disponibles.</li>
  </ul>
  <p>La plataforma busca optimizar la organización interna y fomentar el acceso a recursos culturales y educativos entre los funcionarios.</p>

  <h2 id="tecnologías-utilizadas">Tecnologías Utilizadas</h2>
  <ul>
    <li><strong>Frontend:</strong> <a href="https://reactjs.org/">React.js</a>, <a href="https://webpack.js.org/">Webpack</a>, <a href="https://getbootstrap.com/">Bootstrap</a> (opcional)</li>
    <li><strong>Backend:</strong> <a href="https://www.python.org/">Python 3.10</a>, <a href="https://flask.palletsprojects.com/">Flask</a>, <a href="https://www.sqlalchemy.org/">SQLAlchemy</a>, <a href="https://pipenv.pypa.io/en/latest/">Pipenv</a></li>
    <li><strong>Base de Datos:</strong> <a href="https://www.postgresql.org/">PostgreSQL</a>, SQLite, MySQL</li>
    <li><strong>Despliegue:</strong> <a href="https://render.com/">Render</a>, <a href="https://www.heroku.com/">Heroku</a> (opcional)</li>
  </ul>

  <h2 id="instalación-y-configuración">Instalación y Configuración</h2>

  <h3>Backend (Flask)</h3>
  <ol>
    <li><strong>Clonar el repositorio:</strong><br>
      <code>git clone https://github.com/4GeeksAcademy/ANDA-Club-de-funcionarios.git</code><br>
      <code>cd ANDA-Club-de-funcionarios</code>
    </li>
    <li><strong>Instalar dependencias:</strong><br>
      <code>pipenv install</code>
    </li>
    <li><strong>Configurar variables de entorno:</strong><br>
      <code>cp .env.example .env</code>
    </li>
    <li><strong>Configurar la base de datos:</strong><br>
      <pre>
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/nombre_basedatos
      </pre>
    </li>
    <li><strong>Inicializar la base de datos:</strong><br>
      <code>pipenv run migrate</code><br>
      <code>pipenv run upgrade</code>
    </li>
    <li><strong>Ejecutar el servidor:</strong><br>
      <code>pipenv run start</code>
    </li>
  </ol>

  <h3>Frontend (React)</h3>
  <ol>
    <li><strong>Instalar dependencias:</strong><br>
      <code>npm install</code>
    </li>
    <li><strong>Iniciar el servidor de desarrollo:</strong><br>
      <code>npm run start</code><br>
      <p>La aplicación estará disponible en <a href="http://localhost:3000">http://localhost:3000</a>.</p>
    </li>
  </ol>

  <h2 id="uso-de-la-aplicación">Uso de la Aplicación</h2>
  <ul>
    <li><strong>Iniciar sesión</strong>: Acceder con credenciales proporcionadas.</li>
    <li><strong>Reservar espacios</strong>: Seleccionar fechas y horarios disponibles para eventos.</li>
    <li><strong>Solicitar libros</strong>: Buscar y solicitar préstamos de libros disponibles.</li>
    <li><strong>Administrar reservas y préstamos</strong>: Visualizar, modificar o cancelar solicitudes según permisos.</li>
  </ul>

  <h2 id="estructura-del-proyecto">Estructura del Proyecto</h2>
  <pre>
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
  </pre>

  <h2 id="contribuciones">Contribuciones</h2>
  <p>Las contribuciones son bienvenidas. Para colaborar:</p>
  <ol>
    <li>Realizar un fork del repositorio.</li>
    <li>Crear una nueva rama:<br><code>git checkout -b feature/nueva-funcionalidad</code></li>
    <li>Realizar los cambios y confirmar los commits.</li>
    <li>Enviar un pull request detallando las modificaciones.</li>
  </ol>

  <h2 id="licencia">Licencia</h2>
  <p>Este proyecto está bajo la Licencia <a href="https://opensource.org/licenses/MIT">MIT</a>.</p>

  <h2 id="autores">Autores</h2>
  <ul>
    <li><strong>Equipo de Desarrollo de 4Geeks Academy</strong></li>
    <li><strong>Colaboradores:</strong> <a href="https://github.com/4GeeksAcademy/ANDA-Club-de-funcionarios/graphs/contributors">Ver lista</a></li>
  </ul>

  <h2 id="recursos-adicionales">Recursos Adicionales</h2>
  <ul>
    <li><a href="https://4geeksacademy.com/">4Geeks Academy</a></li>
    <li><a href="https://reactjs.org/docs/getting-started.html">Documentación de React</a></li>
    <li><a href="https://flask.palletsprojects.com/en/2.0.x/">Documentación de Flask</a></li>
    <li><a href="https://docs.sqlalchemy.org/en/14/">SQLAlchemy ORM</a></li>
  </ul>
</body>
</html>
