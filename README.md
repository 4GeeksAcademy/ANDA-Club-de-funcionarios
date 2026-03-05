# ANDA - Club de Funcionarios

Aplicacion web para funcionarios de ANDA que integra:

- Reserva de salones y espacios para eventos.
- Gestion de biblioteca y prestamos de libros.
- Paneles diferenciados para usuarios y administradores.

## Stack Tecnologico

- Frontend: React 19 + Webpack + Bootstrap
- Backend: Flask + SQLAlchemy + Flask-Migrate + JWT
- Base de datos: SQLite (local por defecto) o PostgreSQL (deploy)
- Ejecucion local backend: Pipenv

## Requisitos

- Node.js `>=16` (recomendado: 18 o 20)
- npm
- Python `3.11.x` (segun `Pipfile`)
- Pipenv

## Configuracion Inicial

1. Clonar repositorio:

```bash
git clone https://github.com/4GeeksAcademy/ANDA-Club-de-funcionarios.git
cd ANDA-Club-de-funcionarios
```

2. Instalar dependencias frontend:

```bash
npm install
```

3. Instalar dependencias backend:

```bash
python -m pipenv install
```

4. Crear archivo `.env`:

- Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

- macOS/Linux:

```bash
cp .env.example .env
```

5. Revisar variables minimas en `.env`:

```env
DATABASE_URL=sqlite:///database.db
FLASK_APP=src/app.py
FLASK_DEBUG=1
JWT_SECRET_KEY=dev_jwt_secret_change_me
BACKEND_URL=http://127.0.0.1:3001
```

Nota: Si `BACKEND_URL` falta en frontend, la app muestra una pantalla de configuracion en lugar del contenido principal.

## Ejecutar en Local

1. Levantar backend (puerto `3001`):

```bash
python -m pipenv run start
```

2. En otra terminal, levantar frontend (puerto `3000`):

```bash
npm run start
```

3. Abrir en navegador:

- Frontend: `http://127.0.0.1:3000`
- Backend (ejemplo endpoint): `http://127.0.0.1:3001/api/hello`

## Base de Datos y Migraciones

Comandos disponibles (definidos en `Pipfile`):

```bash
python -m pipenv run init
python -m pipenv run migrate
python -m pipenv run upgrade
python -m pipenv run downgrade
```

## Build Frontend

```bash
npm run build
```

Salida en `dist/`.

## Deploy

- Procfile/Render usan gunicorn:

```bash
gunicorn wsgi --chdir ./src/
```

- `render.yaml` y `Procfile` ya incluyen el comando de arranque.

## Estructura del Proyecto

```text
ANDA-Club-de-funcionarios/
|-- src/
|   |-- api/        # modelos, rutas y logica backend
|   |-- front/      # aplicacion React
|   |-- app.py      # app Flask principal
|   `-- wsgi.py     # entrypoint para gunicorn
|-- migrations/
|-- public/
|-- dist/
|-- package.json
|-- Pipfile
|-- .env.example
`-- README.md
```

## Troubleshooting Rapido

- `pipenv: command not found`: usar `python -m pipenv ...` o agregar Pipenv al `PATH`.
- Frontend carga pero no consume API: confirmar `BACKEND_URL` en `.env`.
- Errores de DB en local: asegurar `DATABASE_URL=sqlite:///database.db` y correr `python -m pipenv run upgrade`.

## Contribuir

1. Crear rama:

```bash
git checkout -b feature/mi-cambio
```

2. Hacer cambios y commit.
3. Abrir Pull Request.

## Licencia

MIT.
