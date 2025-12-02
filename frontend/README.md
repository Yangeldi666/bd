# DB Admin Project (Demo)

Stack: Postgres + Node.js (Express, Sequelize) + React + Tailwind

## Setup (local)
1. Clone repo and enter folder.
2. Copy backend/.env.example to backend/.env and set DATABASE_URL if needed.
3. Start Postgres (use docker-compose or local Postgres).
   - Option A: `docker-compose up db` (starts only DB)
   - Option B (all): `docker-compose up` (starts db, backend, frontend)
4. Backend:
   - cd backend
   - npm install
   - npm run seed
   - npm start
5. Frontend:
   - cd frontend
   - npm install
   - npm start
6. Open `http://localhost:3000` (frontend). Default demo login: `admin / admin123`.

## Endpoints
- POST /auth/login — body: { username, password }
- POST /api/sql/execute — body: { sql } (protected)
- GET /api/transactions — list transactions (protected)
- POST /api/transactions/simulate — simulate tx (protected)
- POST /api/transactions/:id/commit — commit tx (protected)
- POST /api/transactions/:id/abort — abort tx (protected)
- GET /api/logs — list logs (protected)

## Notes
- This is a demo scaffold. Remove unsafe SQL execution for production.
- When you send the descriptive document of the work, I will:
  - integrate its business rules into models,
  - create migrations and specific tables,
  - implement constrained endpoints to enforce the rules,
  - and adjust UI forms to match fields and flows described.
