# AI Coding Agent Instructions for ANDA Club de Funcionarios

## Architecture Overview
This is a full-stack web application for ANDA employees to manage space reservations and book loans. It consists of:
- **Frontend**: React.js with React Router, Flux state management, Bootstrap styling, Webpack bundling
- **Backend**: Flask API with SQLAlchemy ORM, JWT authentication, PostgreSQL database
- **Deployment**: Render.com with Gunicorn, database migrations via Flask-Migrate

Key components:
- User authentication with role-based access (user/admin)
- Admin approval workflow for new registrations
- Space reservation system (Reservations model)
- Online library with book loans (Books, Books_reservations models)
- User profiles with personal information

## Critical Workflows
### Development Setup
1. **Backend**: `pipenv install` then `pipenv run start` (runs on port 3001)
2. **Frontend**: `npm install` then `npm start` (runs on port 3000, proxies to backend)
3. **Database**: `pipenv run migrate` and `pipenv run upgrade` for schema changes
4. **Environment**: Copy `.env.example` to `.env`, set `BACKEND_URL=http://localhost:3001` for local dev

### Build & Deploy
- **Frontend build**: `npm run build` outputs to `public/bundle.js`
- **Backend deploy**: Uses `Procfile` with `gunicorn wsgi --chdir ./src/`
- **Database reset**: `pipenv run reset_db` runs `docs/assets/reset_migrations.bash`

## Project-Specific Patterns
### Authentication & Authorization
- New users register with `status='en_revision'`, require admin approval to become `status='activo'`
- JWT tokens expire after 365 days (configured in `app.py`)
- Protected routes check `store.user?.role` in React components
- Admin routes in `api/routes.py` prefixed with `/admin/`

### API Communication
- Frontend uses `process.env.BACKEND_URL` for all API calls (set in `.env`)
- Flux actions handle async API requests with try/catch error handling
- Example: `fetch(`${process.env.BACKEND_URL}/api/login`, {...})`

### Data Models & Relationships
- `User` ↔ `UserProfiles` (1:1), `Reservations` (1:many), `Books_reservations` (1:many)
- `Reservations` links users to spaces/events
- `Books_reservations` handles book loan transactions
- Use `pendulum.now("UTC")` for timestamps in models

### Code Organization
- Backend routes in `src/api/routes.py`, auth endpoints in `src/app.py`
- React components in `src/front/js/component/`, pages in `src/front/js/pages/`
- Flux actions grouped by feature (adminActions, bookActions, etc.)
- Spanish variable names and comments throughout codebase

### Styling & UI
- Bootstrap classes used extensively, custom CSS in `src/front/styles/`
- Responsive design with mobile-first approach
- Toast notifications via `sonner` library

## Common Pitfalls
- Always check user `status` and `role` before granting access
- Database URL must replace `postgres://` with `postgresql://` for SQLAlchemy
- Frontend build outputs to `public/` directory, served statically by Flask
- CORS enabled globally in Flask app for development

## Key Files to Reference
- `src/api/models.py`: Data models and relationships
- `src/api/routes.py`: API endpoints and business logic
- `src/front/js/store/flux.js`: State management and API actions
- `src/front/js/layout.js`: Route definitions and protection
- `Pipfile`: Backend dependencies and scripts
- `package.json`: Frontend dependencies and build scripts</content>
<parameter name="filePath">c:\Users\Fede\Documents\DEV\ANDA\ANDA-Club-de-funcionarios\.github\copilot-instructions.md