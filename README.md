# Prepwise — CSBS Study Space

Prepwise is a personal study planner for a B.E. Computer Science and Business Systems (CSBS) student at JSS Science and Technology University, Mysuru. It helps organize college subjects and self-learning, plan study time, and review recorded progress.

The profile and curriculum content are tailored to this study space. Update your student details, subjects, and learning goals in the app to make it your own.

## What the website does

- **Overview:** See your study dashboard, exam countdown, study streak, focus areas, and daily reality check. Use the quick actions to plan a task or start a 25-minute focus session.
- **My study plan:** Add tasks with a title, optional subject, date, optional start time, and planned duration. Mark tasks complete or manage them from your plan.
- **My subjects:** Add and update college subjects or self-learning tracks, such as AI, DSA, backend development, or projects. Filter subjects by track type and review their progress.
- **CSBS curriculum:** Browse the Semester I–V courses from the 2024–25 JSS STU scheme. Add curriculum courses to your subjects when you want to track them. The semester status is informational; course progress is not assumed.
- **Practice tests:** Use your subjects to plan practice time. This page helps you organize practice; it does not provide an automated quiz or question bank.
- **Progress:** Review completed tasks, focus sessions, streaks, weekly focus time, and subject progress recorded in the app.
- **Focus timer:** Start and reset a focus session. Completed sessions contribute to your recorded progress.
- **Student profile:** Edit your profile, focus areas, social links, exam date, and optional weekly task goal.
- **Theme and reminders:** Switch between light and dark themes. You can enable a daily browser notification and select its time in your profile. Grant notification permission when prompted; reminders require Prepwise to remain open in a browser that supports notifications.
- **Study resources:** Open the shared Google Drive course folders and files from the curriculum page. These are external links; Prepwise does not import or sync their contents.

## Data and accounts

Study profile, subjects, tasks, theme, and completed focus sessions are saved in the current browser's local storage. They are not synced between browsers or devices, and clearing that browser's site data may remove them.

The server also provides account registration, sign-in, and sign-out endpoints. Accounts are stored in MongoDB, and authentication uses an HTTP-only cookie. Account sign-in does **not** currently sync the planner's local data to MongoDB.

## Run locally

### Requirements

- Node.js and npm
- MongoDB, if you want to use account registration or sign-in

### Install and start

Run these commands in PowerShell from the project folder:

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The `dev` script starts `server.js` with Nodemon, which restarts the server when files change.

To use a different port, set `PORT` in a `.env` file before starting the server:

```env
PORT=4000
```

Then open `http://localhost:4000`.

### Configure account features

Create a `.env` file in the project root and set a MongoDB connection string and a private JWT signing secret:

```env
MONGO_URL=your-mongodb-connection-string
JWT_SECRET=your-private-secret
PORT=3000
```

Replace the example values with your own; do not commit `.env` or share its secrets. The server serves the website without account configuration, but account endpoints require a working MongoDB connection and `JWT_SECRET`.

## Available npm commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs the dependencies listed in `package.json`. |
| `npm run dev` | Starts the local Express server with Nodemon. |

There is no production build or configured test suite in `package.json` yet.

## API endpoints

The Express server serves the website from `public/` and exposes these endpoints:

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Returns `{ "status": "ok" }` when the server is responding. |
| `POST` | `/api/auth/register` | Creates an account. Send JSON with `username`, `email`, and `password`. |
| `POST` | `/api/auth/login` | Signs in with JSON containing `email` and `password`. |
| `GET` | `/api/auth/logout` | Clears the authentication cookie and signs out. |

Registration and login set an HTTP-only `token` cookie. These endpoints authenticate users only; they do not save or retrieve study planner data.
