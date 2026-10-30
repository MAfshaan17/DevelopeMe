# STUDY SPACE

A personal study planner for **MYSELF**, a **5th-semester B.E. Computer Science and Business Systems student at JSS Science and Technology University, Mysuru**.

This project is meant to support my own college routine, semester goals, and interests—not to show made-up courses or sample activity. My profile starts with my own details and the focus areas from my [public GitHub profile](https://github.com/MAfshaan17). Edit these any time from **Student profile**.

## My study space

- Add the subjects I am actually taking and update each subject's progress.
- Add your own **Self-learning** tracks (for example AI, DSA, backend, or projects) alongside College courses from **My subjects & tracks**. Filter the list by College or Self-learning and add tasks for either.
- Check the **CSBS curriculum** view for the official Semester I–V courses from the 2024-25 JSS STU scheme (PDF pages 35–40). Semester I–IV are marked complete and Semester V in progress based on the timeline you shared; no marks or individual course progress are assumed. The five non-elective Semester V courses are added to **My subjects** once, with progress left untracked until you set it. Add other listed courses when you want to plan or track them.
- The scheme gives practical/lab hours as **P** alongside course lecture/tutorial hours. It does not list stand-alone lab course titles for these semesters, so none are invented. The Semester V Professional Elective I choices are shown without assuming which one you selected; the Open Elective title remains yours to enter.
- Plan your own study tasks by date, time, and duration.
- Track focus sessions, completed tasks, and your active-day streak from activity you record.
- Set your exam date and an optional weekly task goal.
- See a firm, supportive daily reality check on the dashboard. Use **Start a 25-min session** or **Plan one task** to turn it into action. Enable the daily reality-check notification and choose its time in **Student profile**; allow browser notifications when prompted. The app must remain open in a browser that supports notifications; reminders are not delivered while it is closed.
- Keep your own GitHub, LinkedIn, and CSBS/AI/backend focus areas on your dashboard.
- Open the **CSBS curriculum** view for links to your shared Semester V Google Drive folders. The ADA folder has direct links to `ADA Syllabus.pdf`, `Unit 1 Notes.pdf`, and its Question Papers folder; the other course folders are linked too.

Study profile, subjects, tasks, and completed focus sessions are saved in this browser's local storage. They are not currently synced between browsers or devices. Account registration is available through the existing API, but the study planner itself does not yet sync its data to that account.

The Drive links open the shared Google Drive folders and files in a new tab; Prepwise does not import, copy, or automatically sync their contents. A live, signed-in Drive integration would need Google OAuth credentials and explicit folder access; the app does not collect Google passwords or scrape private Drive links.

## Run locally

1. Install dependencies with `npm install`.
2. Set `PORT`, `MONGO_URL`, and `JWT_SECRET` in `.env` if you want to use account registration and sign-in.
3. Start Prepwise with `npm run dev`.
4. Open [http://localhost:3000](http://localhost:3000).

## Existing API

- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — sign in
- `GET /api/auth/logout` — sign out
- `GET /api/health` — check that the server is responding
