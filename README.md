# Prepwise

A calm, personal study dashboard for planning exam preparation. Prepwise currently includes a daily study plan, subject progress, a focus timer, practice-session planning, and a weekly progress view. Study tasks are saved in your browser, so the dashboard works before you connect an account.

## Run locally

1. Install the project dependencies with `npm install`.
2. Configure `.env` with `PORT`, `MONGO_URL`, and `JWT_SECRET` to enable registration and sign-in.
3. Start the server with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

The study dashboard can be explored without a database connection. Account registration, sign-in, and sign-out use the existing MongoDB-backed API.

## API

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — sign in
- `GET /api/auth/logout` — sign out
- `GET /api/health` — check that the server is responding
