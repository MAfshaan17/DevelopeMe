# Study Space — Personal Academic Planner

> A personalized study planning workspace for managing college coursework, self-learning goals, daily study sessions, and semester progress in one place.

Study Space is a personal productivity web application built around my actual academic routine as a **5th-semester B.E. Computer Science and Business Systems (CSBS) student at JSS Science and Technology University, Mysuru**.

Instead of treating college academics and independent learning as separate activities, Study Space brings both into one workspace. It helps me organize subjects, plan study tasks, record focus sessions, monitor consistency, and keep long-term learning goals visible.

## Overview

Study Space is intended to answer a few practical questions:

- What should I study today?
- Which college subjects and self-learning tracks need attention?
- What tasks have I planned, completed, or postponed?
- Am I building a consistent study habit?
- How can I balance semester coursework with AI, DSA, backend development, and personal projects?

The goal is simple: **turn study intentions into a realistic, trackable daily plan.**

## Core Features

### 1. Personalized Student Profile
- Stores my academic profile and semester context.
- Keeps my learning interests and professional links accessible.
- Allows profile information and focus areas to be edited.
- Supports an optional exam date and weekly task goal.

### 2. College Subjects and Self-Learning Tracks
Organize academic work and independent learning in the same workspace.

- Add and manage college subjects.
- Create self-learning tracks such as Artificial Intelligence, Data Structures and Algorithms, backend development, and personal projects.
- Filter the list by **College** or **Self-learning**.
- Update subject progress when appropriate.
- Create tasks for either category.

### 3. CSBS Curriculum Reference
The curriculum view provides a reference for the official Semester I–V courses from the JSS STU CSBS 2024–25 scheme.

- Semester I–IV are represented as completed in the academic timeline.
- Semester V is represented as in progress.
- The five non-elective Semester V courses are available in My Subjects without fabricated individual progress.
- Professional Elective I choices are shown without assuming which elective was selected.
- The Open Elective remains editable.
- Practical hours are represented as **P** where indicated by the scheme; standalone lab course titles are not invented.

The curriculum view is a planning reference, not an official academic record or marksheet.

### 4. Task Planning
Create a practical study plan around my college schedule.

- Add tasks for subjects and self-learning tracks.
- Schedule tasks by date and time.
- Set a planned duration.
- Record completion through the planner.
- Use the dashboard to decide what to work on next.

### 5. Focus Sessions and Study Activity
- Start a 25-minute focus session from the dashboard.
- Record completed focus sessions.
- Track completed tasks and recorded study activity.
- Calculate an active-day streak from activity recorded in the application.

Study metrics reflect recorded activity rather than automatically verified study time.

### 6. Daily Reality Check
A dashboard designed to encourage action rather than overwhelm.

- Review the current day's study plan.
- Use **Start a 25-min session** to begin focused work.
- Use **Plan one task** to turn an unclear goal into a concrete next step.
- Enable a daily reality-check browser notification and configure its time from Student Profile.

**Notification limitation:** reminders require the application to remain open in a browser that supports notifications, with browser permission granted. They are not guaranteed to be delivered while the application is closed.

### 7. Learning and Developer Focus
Keep my technical growth visible alongside academic work.

- GitHub profile
- LinkedIn profile
- CSBS coursework
- Artificial Intelligence
- Data Structures and Algorithms
- Backend engineering
- Personal projects

### 8. Google Drive Study Resources
The curriculum view links to shared Google Drive folders for Semester V study material.

The ADA resource section includes direct links to:
- `ADA Syllabus.pdf`
- `Unit 1 Notes.pdf`
- The ADA Question Papers folder

Other course folders are linked where configured.

**Integration limitation:** these links open the shared Google Drive locations in a new tab. The application does not import, copy, scrape, or synchronize Drive contents. A live Drive integration would require Google OAuth configuration and explicit authorization to access the selected folders.

## Data Storage and Authentication

### Local Study Data
The study planner currently stores the following data in the browser's local storage:

- Student profile
- Subjects and self-learning tracks
- Study tasks
- Completed focus sessions
- Related planner activity

This makes the planner convenient for personal use in the same browser.

**Current limitation:** local study data is not synchronized across browsers or devices. Clearing browser data can remove locally stored information, so it should not be treated as a reliable backup.

### Account API
The existing backend exposes registration, login, logout, and health-check endpoints.

Account registration and sign-in can use the configured backend and MongoDB connection. However, the study planner's local data is **not yet connected to account-based cloud synchronization**.

## Technology and Architecture

The project includes a Node.js-based development setup and an existing API with MongoDB and JWT configuration.

| Component | Responsibility |
|---|---|
| Web application | Student dashboard, profile, curriculum, subjects, tasks, and focus workflow |
| Browser local storage | Persistence for personal study-planner data |
| Backend API | Account endpoints and server health check |
| MongoDB | Database connection for the existing account functionality |
| JWT configuration | Authentication-related token configuration |
| Google Drive links | External access to shared study materials |

The exact frontend framework, library versions, and project-specific architecture should be confirmed from the current source files and dependency manifest rather than assumed from this overview.

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- MongoDB, if using the account API
- A modern browser

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Replace the placeholders with the actual repository URL and directory name.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root if you want to use account registration and sign-in.

```env
PORT=3000
MONGO_URL=mongodb://127.0.0.1:27017/study_space
JWT_SECRET=replace_with_a_long_random_secret
```

Use the MongoDB connection string appropriate for your environment. Generate a secure, unique JWT secret and keep `.env` out of version control.

The values above are examples; use the environment variables and MongoDB database name supported by your backend configuration.

### 4. Start the application

```bash
npm run dev
```

Open the application at:

[http://localhost:3000](http://localhost:3000)

If the application uses a different configured port, open the corresponding local URL.

## Existing API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/auth/register` | Create an account |
| `POST` | `/api/auth/login` | Authenticate a user |
| `GET` | `/api/auth/logout` | Trigger logout handling |
| `GET` | `/api/health` | Check server availability |

Authentication behavior should be verified against the actual server implementation. In particular, client-side data persistence and account authentication are currently separate concerns.

### Health Check

With the server running, check:

```bash
curl http://localhost:3000/api/health
```

A successful response indicates that the server's health endpoint is reachable. It does not, by itself, prove that every database or authentication operation is working correctly.

## Security and Privacy Notes

- Never commit `.env`, API keys, JWT secrets, or database credentials.
- Use a strong, unique JWT secret for any non-local deployment.
- Validate and handle authentication failures on the server.
- Do not collect Google passwords or scrape private Drive links.
- Grant external integrations only the permissions they need.
- Remember that browser-local study data can be lost and is not an account-backed backup.

## Current Limitations

Study Space is a personal productivity tool, and its current boundaries are intentional:

- Study data is stored locally and is not cloud-synchronized.
- Account registration and authentication exist at the API level, but planner data is not yet associated with a signed-in account for synchronization.
- Google Drive resources are external links rather than an authenticated Drive integration.
- Browser reminders depend on the app remaining open and notifications being permitted.
- Recorded focus sessions and streaks measure activity entered into the app, not independently verified study behavior.
- Academic progress must be updated by the student; the application does not infer marks or grades.

## Potential Future Improvements

Possible next steps, subject to implementation and testing:

- Authenticated cloud synchronization across devices
- Automatic backup and data export/import
- More flexible recurring tasks and weekly planning
- Exam countdowns and subject-priority planning
- Reliable server-backed reminders
- Optional Google Drive OAuth integration
- Improved accessibility, automated tests, and production deployment checks

These are future possibilities, not claims about currently implemented functionality.

## Project Purpose

I built Study Space to make my own academic routine easier to manage while continuing to learn beyond the syllabus. It combines semester coursework with independent technical goals and provides a practical place to plan, act, and review progress.

The guiding principle is:

**Plan realistically. Focus consistently. Track honestly. Improve continuously.**

## Student

**Mahammad Afshaan**  
B.E. Computer Science and Business Systems — Semester V  
JSS Science and Technology University, Mysuru

- **GitHub:** [MAfshaan17](https://github.com/MAfshaan17)
- **LinkedIn:** [Connect on LinkedIn](https://www.linkedin.com/in/mahammad-afshaan05/)

---

*Study Space is a personal academic planning project. It is not an official university system, marksheet, or institutional student portal.*
