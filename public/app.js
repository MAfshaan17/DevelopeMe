"use strict";

const TASKS_KEY = "prepwise.tasks.v2";
const LEGACY_TASKS_KEY = "prepwise.tasks.v1";
const SUBJECTS_KEY = "prepwise.subjects.v1";
const CURRICULUM_IMPORT_KEY = "prepwise.curriculum-import.v1";
const SESSIONS_KEY = "prepwise.sessions.v1";
const PROFILE_KEY = "prepwise.student-profile.v1";
const ACCOUNT_KEY = "prepwise.profile.v1";
const THEME_KEY = "prepwise.theme.v1";
const PROFILE_DEFAULTS = {
  name: "Mahammad Afshaan",
  college: "JSS Science and Technology University, Mysuru",
  course: "B.E. Computer Science and Business Systems (CSBS)",
  semester: "5th semester",
  focusAreas: "Agentic AI, LLM engineering, RAG, backend engineering, system design, deployment, DSA, core CS",
  examDate: "",
  weeklyGoal: "",
  reminderTime: "19:00",
  reminderEnabled: false,
  github: "https://github.com/MAfshaan17",
  linkedin: "https://www.linkedin.com/in/mahammad-afshaan05"
};
const SUBJECT_STYLES = [
  { icon: "✳", color: "#897be8", background: "#f0efff" },
  { icon: "◈", color: "#7fbda1", background: "#edf7f1" },
  { icon: "◉", color: "#e5a56d", background: "#fff3e8" },
  { icon: "⌬", color: "#62abb6", background: "#eaf7f7" },
  { icon: "Aa", color: "#d18f9c", background: "#fbf0f3" },
  { icon: "◷", color: "#c79656", background: "#fcf4e8" }
];
const DAILY_REALITY_CHECKS = [
  "Afshaan, nobody can do the practice hours for you. If placement is your goal, build the skills steadily: one problem, one concept, one project step at a time.",
  "Skipping one day will not decide your future. Repeating the skip can shrink your options. Choose one subject and give it 25 honest minutes today.",
  "Want to be a stronger engineer? Build, debug, and explain things—not just collect tutorials. Make one small piece of real progress today.",
  "Your degree is a start, not a job guarantee. Practice a problem, review a CS fundamental, or improve a project. Start with one focused block.",
  "Do not confuse planning with progress. A simple task finished today beats the perfect timetable you never follow.",
  "Confidence comes from repetitions. Put in a few fundamentals today so interviews feel less unfamiliar later.",
  "Engineering is also how you work with people. Keep your word, communicate clearly, and help someone—then put in one focused study session."
];
const CSBS_CURRICULUM = [
  {
    semester: 1,
    sourcePage: 35,
    courses: [
      { code: "24CB110", name: "Discrete Mathematics", category: "PCC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB120", name: "Statistics, Probability and Calculus", category: "BSC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB130", name: "Fundamentals of Computer Science", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB140", name: "Principles of Electrical Engineering", category: "ESC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB150", name: "Physics for Computing Science", category: "BSC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB160", name: "Business Communication & Value Science - I", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      { code: "24HU110", name: "Kannada", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: null }
    ]
  },
  {
    semester: 2,
    sourcePage: 36,
    courses: [
      { code: "24CB210", name: "Linear Algebra", category: "PCC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB220", name: "Statistical Modelling", category: "BSC", lecture: 3, tutorial: 1, practical: 0, credits: 4 },
      { code: "24CB230", name: "Data Structures & Algorithms", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB240", name: "Principles of Electronics Engineering", category: "ESC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB250", name: "Fundamentals of Economics", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      { code: "24CB260", name: "Business Communication & Value Science - II", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 }
    ]
  },
  {
    semester: 3,
    sourcePage: 37,
    courses: [
      { code: "24MATDIP310", name: "Foundations of Engineering Mathematics-I", category: "BSC", lecture: 3, tutorial: 0, practical: 0, credits: null },
      { code: "24CB310", name: "Formal Language & Automata Theory", category: "PCC", lecture: 3, tutorial: 1, practical: 0, credits: 4 },
      { code: "24CB320", name: "Computer Organization & Architecture", category: "PCC", lecture: 3, tutorial: 1, practical: 0, credits: 4 },
      { code: "24CB330", name: "Object Oriented Programming", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB340", name: "Computational Statistics", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB350", name: "Software Engineering", category: "PCC", lecture: 3, tutorial: 1, practical: 0, credits: 4 },
      { code: "24CB360", name: "Financial & Cost Accounting", category: "HSMC", lecture: 4, tutorial: 0, practical: 0, credits: 4 },
      { code: "24HU311", name: "Universal Human Values (UHV)-II", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 }
    ]
  },
  {
    semester: 4,
    sourcePage: 38,
    courses: [
      { code: "24MATDIP410", name: "Foundations of Engineering Mathematics-II", category: "BSC", lecture: 3, tutorial: 0, practical: 0, credits: null },
      { code: "24CB410", name: "Operating Systems", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB420", name: "Database Management Systems", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB430", name: "Software Design with UML", category: "PCC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB440", name: "Operations Research", category: "PCC", lecture: 3, tutorial: 1, practical: 0, credits: 4 },
      { code: "24CB450", name: "Innovation, IP Management & Entrepreneurship", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      { code: "24CB460", name: "Marketing Research & Marketing Management", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      { code: "24CB470", name: "Business Communication & Value Science - III", category: "HSMC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      { code: "24HU412", name: "Environmental Studies", category: "HSMC/EV", lecture: 2, tutorial: 0, practical: 0, credits: 2 }
    ]
  },
  {
    semester: 5,
    sourcePage: 39,
    courses: [
      { code: "24CB510", name: "Design and Analysis of Algorithms", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB520", name: "Compiler Design", category: "PCC", lecture: 3, tutorial: 0, practical: 2, credits: 4 },
      { code: "24CB530", name: "Fundamentals of Management", category: "HSMC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB540", name: "Business Strategy", category: "HSMC", lecture: 3, tutorial: 0, practical: 0, credits: 3 },
      { code: "24CB550", name: "Design Thinking", category: "PCC", lecture: 2, tutorial: 0, practical: 0, credits: 2 },
      {
        code: "24CB56x",
        name: "Professional Elective-I",
        category: "PEC",
        lecture: 3,
        tutorial: 0,
        practical: 0,
        credits: 3,
        slot: true,
        options: [
          { code: "24CB561", name: "Conversational Systems" },
          { code: "24CB562", name: "Cloud, Micro services & Application" },
          { code: "24CB563", name: "Machine Learning" }
        ]
      },
      {
        code: "24CB57xOE",
        name: "Open Elective-I",
        category: "OEC",
        lecture: 3,
        tutorial: 0,
        practical: 0,
        credits: 3,
        slot: true,
        note: "The scheme lists the elective slot but does not identify your selected course."
      }
    ]
  }
];

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readCollection(key, validate, errorMessage) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return [];
    const items = JSON.parse(saved);
    if (!Array.isArray(items) || !items.every(validate)) throw new Error(errorMessage);
    return items;
  } catch (error) {
    console.error(errorMessage, error);
    showToast("Some saved study data could not be loaded.");
    return [];
  }
}

function isTask(task) {
  return task
    && typeof task.id === "string"
    && typeof task.title === "string"
    && typeof task.subject === "string"
    && typeof task.time === "string"
    && typeof task.date === "string"
    && typeof task.done === "boolean";
}

function readTasks() {
  if (localStorage.getItem(TASKS_KEY)) return readCollection(TASKS_KEY, isTask, "Saved study tasks are not valid.");
  return readCollection(LEGACY_TASKS_KEY, isTask, "Saved study tasks are not valid.")
    .filter((task) => !task.id.startsWith("seed-"));
}

function readProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    return saved && typeof saved === "object" ? { ...PROFILE_DEFAULTS, ...saved } : { ...PROFILE_DEFAULTS };
  } catch (error) {
    console.error("Could not load the saved student profile:", error);
    return { ...PROFILE_DEFAULTS };
  }
}

function readAccount() {
  try {
    const account = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "null");
    return account && typeof account.username === "string" ? account : null;
  } catch (error) {
    console.error("Could not load the saved account:", error);
    return null;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

const state = {
  tasks: readTasks(),
  subjects: readCollection(SUBJECTS_KEY, (subject) => subject && typeof subject.id === "string" && typeof subject.name === "string" && typeof subject.progress === "number", "Saved subjects are not valid."),
  sessions: readCollection(SESSIONS_KEY, (session) => session && typeof session.date === "string" && typeof session.minutes === "number", "Saved focus sessions are not valid."),
  filter: "all",
  currentView: "overview",
  currentSemester: 5,
  authMode: "login",
  editingSubjectId: null,
  profile: readProfile(),
  account: readAccount(),
  secondsLeft: 25 * 60,
  timerDuration: 25 * 60,
  timerRunning: false,
  timerBreak: false,
  timerInterval: null
};

function persist(key, value, label) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not save ${label}:`, error);
    showToast("Your browser couldn't save this change. Check your storage settings.");
  }
}

function persistTasks() {
  persist(TASKS_KEY, state.tasks, "study tasks");
}

function persistSubjects() {
  persist(SUBJECTS_KEY, state.subjects, "subjects");
}

function persistSessions() {
  persist(SESSIONS_KEY, state.sessions, "focus sessions");
}

function showToast(message) {
  const region = document.getElementById("toast-region");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3500);
}

function todayTasks() {
  return state.tasks.filter((task) => task.date === localDate());
}

function completedTasks() {
  return state.tasks.filter((task) => task.done && task.completedAt && isThisWeek(task.completedAt)).length;
}

function mondayOfWeek(date = new Date()) {
  const monday = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  return localDate(monday);
}

function isThisWeek(dateString) {
  return typeof dateString === "string" && dateString.slice(0, 10) >= mondayOfWeek() && dateString.slice(0, 10) <= localDate();
}

function sessionsThisWeek() {
  return state.sessions.filter((session) => isThisWeek(session.date));
}

function activeDays() {
  const dates = new Set([
    ...state.sessions.map((session) => session.date),
    ...state.tasks.filter((task) => task.done && task.completedAt).map((task) => task.completedAt.slice(0, 10))
  ]);
  let current = new Date();
  if (!dates.has(localDate(current))) current.setDate(current.getDate() - 1);
  let streak = 0;
  while (dates.has(localDate(current))) {
    streak += 1;
    current.setDate(current.getDate() - 1);
  }
  return streak;
}

function timeInMinutes(time) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(time);
  if (!match) return 0;
  const hour = Number(match[1]) % 12;
  return hour * 60 + Number(match[2]) + (match[3].toUpperCase() === "PM" ? 12 * 60 : 0);
}

function compareTasks(first, second) {
  return first.date.localeCompare(second.date) || timeInMinutes(first.time) - timeInMinutes(second.time);
}

function renderSubjects(targetId, limit = Number.POSITIVE_INFINITY) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const subjects = state.subjects.slice(0, limit);
  target.innerHTML = subjects.length ? subjects.map((subject) => {
    const style = SUBJECT_STYLES[subject.styleIndex % SUBJECT_STYLES.length];
    const progress = subject.progressTracked === false
      ? `<div class="subject-progress-label"><span>Progress tracking</span><strong>Not started</strong></div>`
      : `<div class="subject-progress-label"><span>Your progress</span><strong>${subject.progress}%</strong></div>
        <div class="subject-progress" role="progressbar" aria-label="${escapeHtml(subject.name)} progress" aria-valuenow="${subject.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${subject.progress}%"></span></div>`;
    return `
      <article class="subject-item" style="--subject-color:${style.color}">
        <div class="subject-top">
          <span class="subject-icon" style="background:${style.background};color:${style.color}" aria-hidden="true">${style.icon}</span>
          <div><h3>${escapeHtml(subject.name)}</h3><p>${escapeHtml(subject.detail || "Add a course note in your subject settings")}</p></div>
          <button class="subject-edit" type="button" data-edit-subject="${escapeHtml(subject.id)}" aria-label="Edit ${escapeHtml(subject.name)}">✎</button>
          <button class="subject-delete" type="button" data-delete-subject="${escapeHtml(subject.id)}" aria-label="Remove ${escapeHtml(subject.name)}">×</button>
        </div>
        ${progress}
      </article>
    `;
  }).join("") : `<div class="empty-state"><span class="empty-state-icon">＋</span><h3>No subjects yet</h3><p>Add your current courses to organize your semester.</p><button class="button button-primary" type="button" data-add-subject>Add your first subject <span>→</span></button></div>`;
}

function profileSemesterNumber() {
  const match = String(state.profile.semester || "").match(/\d+/);
  return match ? Number(match[0]) : 5;
}

function renderCurriculum() {
  const semester = CSBS_CURRICULUM.find((item) => item.semester === state.currentSemester);
  if (!semester) return;
  const currentSemester = profileSemesterNumber();
  const status = semester.semester < currentSemester ? "Completed" : semester.semester === currentSemester ? "In progress" : "Upcoming";
  const courseCount = semester.courses.filter((course) => !course.slot).length;
  const electiveSlots = semester.courses.length - courseCount;
  const knownCredits = semester.courses.reduce((total, course) => total + (course.credits || 0), 0);
  const practicalHours = semester.courses.reduce((total, course) => total + course.practical, 0);
  const subjectNames = new Set(state.subjects.map((subject) => subject.name.toLocaleLowerCase()));
  const subjectCodes = new Set(state.subjects.map((subject) => subject.curriculumCode).filter(Boolean));
  const tabs = document.getElementById("semester-tabs");
  tabs.querySelectorAll("[data-semester]").forEach((tab) => {
    const selected = Number(tab.dataset.semester) === semester.semester;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-pressed", String(selected));
  });
  document.getElementById("curriculum-semester-title").textContent = `Semester ${["I", "II", "III", "IV", "V"][semester.semester - 1]}`;
  document.getElementById("curriculum-semester-status").textContent = status;
  document.getElementById("curriculum-semester-status").className = `semester-status status-${status.toLocaleLowerCase().replace(" ", "-")}`;
  document.getElementById("curriculum-semester-summary").innerHTML = `
    <span>${courseCount} courses${electiveSlots ? ` · ${electiveSlots} elective slots` : ""}</span>
    <span>${knownCredits} scheduled credits${semester.courses.some((course) => course.credits === null) ? " · some rows have no credit value in the scheme" : ""}</span>
    <span>${practicalHours} practical hours per week</span>`;
  document.getElementById("curriculum-source").textContent = `Source: CSBS Scheme of Teaching and Assessment 2024-25, PDF page ${semester.sourcePage}. Practical hours are shown as P in the scheme; separate lab course titles are not listed here.`;
  document.getElementById("curriculum-courses").innerHTML = semester.courses.map((course) => {
    const options = course.options || [];
    const actions = options.length
      ? `<div class="elective-options">${options.map((option) => {
        const alreadyAdded = subjectCodes.has(option.code) || subjectNames.has(option.name.toLocaleLowerCase());
        return `<div class="elective-option"><span><strong>${escapeHtml(option.code)}</strong>${escapeHtml(option.name)}</span><button class="text-button curriculum-add-button" type="button" data-add-curriculum-course data-course-code="${escapeHtml(option.code)}" data-course-name="${escapeHtml(option.name)}"${alreadyAdded ? " disabled" : ""}>${alreadyAdded ? "Added" : "Add"}</button></div>`;
      }).join("")}</div>`
      : "";
    const alreadyAdded = subjectCodes.has(course.code) || subjectNames.has(course.name.toLocaleLowerCase());
    const addAction = course.slot
      ? `<p class="course-note">${escapeHtml(course.note || "Choose the elective that you are taking before adding it to your subjects.")}</p>`
      : `<button class="button button-quiet curriculum-add-button" type="button" data-add-curriculum-course data-course-code="${escapeHtml(course.code)}" data-course-name="${escapeHtml(course.name)}"${alreadyAdded ? " disabled" : ""}>${alreadyAdded ? "Already in my subjects" : "Add to my subjects"}</button>`;
    return `
      <article class="curriculum-course${course.slot ? " is-elective" : ""}">
        <div class="curriculum-course-heading">
          <div><span class="course-code">${escapeHtml(course.code)}</span><h3>${escapeHtml(course.name)}</h3></div>
          <div class="course-tags"><span class="course-category">${escapeHtml(course.category)}</span><span class="course-credits">${course.credits === null ? "Credits not listed" : `${course.credits} credits`}</span></div>
        </div>
        <p class="course-hours">L ${course.lecture} · T ${course.tutorial} · P ${course.practical} hrs/week</p>
        ${options.length ? `<p class="course-note">Options listed for this slot on PDF page 40. Your selection is not assumed.</p>${actions}` : ""}
        ${course.slot && !options.length ? addAction : ""}
        ${!course.slot ? addAction : ""}
      </article>`;
  }).join("");
}

function importCurrentSemesterSubjects() {
  if (localStorage.getItem(CURRICULUM_IMPORT_KEY) === "done") return;
  const semester = CSBS_CURRICULUM.find((item) => item.semester === profileSemesterNumber());
  if (!semester) return;
  const names = new Set(state.subjects.map((subject) => subject.name.toLocaleLowerCase()));
  const codes = new Set(state.subjects.map((subject) => subject.curriculumCode).filter(Boolean));
  const additions = semester.courses
    .filter((course) => !course.slot && !codes.has(course.code) && !names.has(course.name.toLocaleLowerCase()))
    .map((course, index) => ({
      id: `curriculum-${course.code}`,
      name: course.name,
      detail: course.code,
      progress: 0,
      progressTracked: false,
      curriculumCode: course.code,
      styleIndex: (state.subjects.length + index) % SUBJECT_STYLES.length
    }));
  if (additions.length) state.subjects.push(...additions);
  try {
    localStorage.setItem(SUBJECTS_KEY, JSON.stringify(state.subjects));
    localStorage.setItem(CURRICULUM_IMPORT_KEY, "done");
  } catch (error) {
    console.error("Could not save the current semester courses:", error);
    showToast("Your semester courses could not be saved in this browser.");
  }
}

function renderOverview() {
  const completed = completedTasks();
  const weeklyGoal = Number(state.profile.weeklyGoal) || 0;
  const weeklySessions = sessionsThisWeek();
  const focusMinutes = weeklySessions.reduce((total, session) => total + session.minutes, 0);
  const streak = activeDays();
  renderDailyRealityCheck();
  document.getElementById("weekly-hours").textContent = (focusMinutes / 60).toFixed(1);
  document.getElementById("tasks-completed").textContent = String(completed);
  document.getElementById("weekly-goal-label").textContent = weeklyGoal ? `${completed} / ${weeklyGoal}` : "Set a goal";
  document.getElementById("weekly-goal-bar").style.width = weeklyGoal ? `${Math.min(100, completed / weeklyGoal * 100)}%` : "0%";
  document.getElementById("task-count").textContent = String(todayTasks().filter((task) => !task.done).length);
  document.getElementById("current-streak").textContent = String(streak);
  document.getElementById("streak-value").textContent = String(streak);
  document.getElementById("streak-caption").textContent = streak === 1 ? "day of activity in a row" : "consecutive active days";
  document.getElementById("streak-card-title").textContent = streak ? "Your study streak" : "Start your streak";
  document.getElementById("streak-card-caption").textContent = streak ? `${streak} active ${streak === 1 ? "day" : "days"} — keep it up.` : "Complete a task or focus session.";

  const countdown = document.getElementById("exam-countdown");
  if (state.profile.examDate) {
    const daysLeft = Math.ceil((new Date(`${state.profile.examDate}T00:00:00`) - new Date(`${localDate()}T00:00:00`)) / 86400000);
    countdown.innerHTML = `<div class="countdown-number">${Math.max(0, daysLeft)}</div><div class="countdown-label">${daysLeft < 0 ? "DAYS SINCE EXAM" : "DAYS TO GO"}</div><div class="countdown-caption">${escapeHtml(new Date(`${state.profile.examDate}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }))}</div>`;
  } else {
    countdown.innerHTML = '<button class="exam-date-button" type="button" data-open-profile>Set exam date <span>→</span></button><div class="countdown-caption">Add your next exam to get a countdown.</div>';
  }
  document.getElementById("college-name").textContent = state.profile.college || "Add your college details";
  document.getElementById("college-course").textContent = [state.profile.course, state.profile.semester].filter(Boolean).join(" · ") || "Add your degree and semester";
  renderSocialLinks();

  const schedule = document.getElementById("today-schedule");
  const upcoming = todayTasks().slice().sort(compareTasks);
  schedule.innerHTML = upcoming.length ? upcoming.map((task) => `
    <div class="schedule-item${task.done ? " is-done" : ""}">
      <span class="schedule-time">${escapeHtml(task.time)}</span><span class="schedule-indicator"></span>
      <div><div class="schedule-title">${escapeHtml(task.title)}</div><div class="schedule-meta">${escapeHtml(task.subject)}</div></div>
      <button class="schedule-check${task.done ? " checked" : ""}" type="button" data-toggle-task="${escapeHtml(task.id)}" aria-label="${task.done ? "Mark incomplete" : "Mark complete"}: ${escapeHtml(task.title)}">${task.done ? "✓" : ""}</button>
    </div>
  `).join("") : '<p class="empty-plan">Your day is clear. Add a task when you’re ready.</p>';
  renderSubjects("overview-subjects", 4);
  renderMiniWeekBars(weeklySessions);
  const active = new Set([
    ...state.sessions.map((session) => session.date),
    ...state.tasks.filter((task) => task.done && task.completedAt).map((task) => task.completedAt.slice(0, 10))
  ]);
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  document.getElementById("streak-week").innerHTML = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(monday);
    day.setDate(monday.getDate() + index);
    const date = localDate(day);
    const label = new Intl.DateTimeFormat(undefined, { weekday: "narrow" }).format(day);
    return `<span class="streak-day${active.has(date) ? " done" : ""}${date === localDate() ? " today" : ""}" aria-label="${escapeHtml(new Intl.DateTimeFormat(undefined, { weekday: "long", month: "short", day: "numeric" }).format(day))}${active.has(date) ? ": activity recorded" : ": no activity recorded"}">${escapeHtml(label)}</span>`;
  }).join("");
}

function renderPlan() {
  const tasks = todayTasks();
  const complete = tasks.filter((task) => task.done).length;
  const minutes = tasks.reduce((total, task) => total + (Number(task.duration) || 0), 0);
  document.getElementById("plan-summary").innerHTML = `
    <article class="plan-summary-card"><span class="plan-summary-icon">◷</span><span class="plan-summary-copy"><strong>${tasks.length}</strong><span>Tasks planned today</span></span></article>
    <article class="plan-summary-card"><span class="plan-summary-icon">✓</span><span class="plan-summary-copy"><strong>${complete} / ${tasks.length}</strong><span>Tasks completed</span></span></article>
    <article class="plan-summary-card"><span class="plan-summary-icon">✳</span><span class="plan-summary-copy"><strong>${Math.floor(minutes / 60)}h ${minutes % 60}m</strong><span>Planned study time</span></span></article>`;

  const visible = state.tasks.filter((task) => {
    if (state.filter === "todo") return !task.done;
    if (state.filter === "done") return task.done;
    return true;
  }).slice().sort(compareTasks);
  const list = document.getElementById("plan-task-list");
  list.innerHTML = visible.length ? visible.map((task) => `
    <div class="plan-task${task.done ? " is-done" : ""}">
      <button class="task-toggle${task.done ? " is-done" : ""}" type="button" data-toggle-task="${escapeHtml(task.id)}" aria-label="${task.done ? "Mark incomplete" : "Mark complete"}: ${escapeHtml(task.title)}">${task.done ? "✓" : ""}</button>
      <div class="task-copy"><strong>${escapeHtml(task.title)}</strong><small>${escapeHtml(task.subject)} · ${escapeHtml(task.date === localDate() ? "Today" : task.date)}</small></div>
      <span class="task-time">${escapeHtml(task.time)}</span>
      <button class="task-delete" type="button" data-delete-task="${escapeHtml(task.id)}" aria-label="Delete ${escapeHtml(task.title)}">×</button>
    </div>
  `).join("") : '<p class="empty-plan">Nothing to show here just yet. Add a task to get started.</p>';
  document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button.dataset.filter === state.filter));
}

function renderPractice() {
  const practice = document.getElementById("practice-subjects");
  practice.innerHTML = state.subjects.length ? state.subjects.map((subject) => {
    const style = SUBJECT_STYLES[subject.styleIndex % SUBJECT_STYLES.length];
    return `
      <article class="practice-card">
        <div class="practice-card-top"><span class="subject-icon" style="background:${style.background};color:${style.color}" aria-hidden="true">${style.icon}</span><div><h3>${escapeHtml(subject.name)}</h3><p>Plan a practice session for this course.</p></div></div>
        <button class="button button-quiet" type="button" data-practice-subject="${escapeHtml(subject.id)}">Plan a ${escapeHtml(subject.name)} recap <span>→</span></button>
      </article>
    `;
  }).join("") : '<div class="empty-state"><span class="empty-state-icon">＋</span><h3>No courses to practice yet</h3><p>Add your subjects first, then plan a practice session for any course.</p><button class="button button-primary" type="button" data-add-subject>Add a subject <span>→</span></button></div>';
}

function renderProgress() {
  const done = completedTasks();
  const weeklySessions = sessionsThisWeek();
  const focusMinutes = weeklySessions.reduce((total, session) => total + session.minutes, 0);
  const streak = activeDays();
  const stats = document.getElementById("progress-stats");
  stats.innerHTML = `
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-lavender">◷</span><span class="stat-trend">THIS WEEK</span></div><div class="stat-value">${(focusMinutes / 60).toFixed(1)}<small>hrs</small></div><div class="stat-caption">Recorded focus time</div></article>
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-mint">✓</span><span class="stat-trend trend-green">THIS WEEK</span></div><div class="stat-value">${done}<small>tasks</small></div><div class="stat-caption">Tasks you marked complete</div></article>
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-peach">✳</span><span class="stat-trend">FROM YOUR ACTIVITY</span></div><div class="stat-value">${streak}<small>${streak === 1 ? "day" : "days"} streak</small></div><div class="stat-caption">${streak ? "Consecutive active days" : "Complete a task or focus session to start"}</div></article>`;
  renderWeekBars("week-chart", weeklySessions);
  renderSubjects("progress-subjects", 4);
}

function renderWeekBars(targetId, sessions) {
  const chart = document.getElementById(targetId);
  if (!chart) return;
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateKey = localDate(date);
    const minutes = sessions.filter((session) => session.date === dateKey).reduce((total, session) => total + session.minutes, 0);
    return { label: new Intl.DateTimeFormat(undefined, { weekday: "short" }).format(date), minutes, date: dateKey };
  });
  const maxMinutes = Math.max(...days.map((day) => day.minutes), 25);
  chart.innerHTML = days.map((day) => `
    <div class="chart-day" aria-label="${day.label}: ${day.minutes} minutes">
      <span class="chart-value">${day.minutes ? `${day.minutes}m` : "—"}</span><div class="chart-bar-track"><span class="chart-bar${day.date === localDate() ? " today" : ""}" style="height:${day.minutes ? day.minutes / maxMinutes * 100 : 0}%"></span></div><span class="chart-label">${day.label}</span>
    </div>`).join("");
}

function renderMiniWeekBars(sessions) {
  const chart = document.getElementById("week-mini-bars");
  if (!chart) return;
  const monday = new Date();
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const dateKey = localDate(date);
    return {
      date: dateKey,
      label: new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(date),
      minutes: sessions.filter((session) => session.date === dateKey).reduce((total, session) => total + session.minutes, 0)
    };
  });
  const maxMinutes = Math.max(...days.map((day) => day.minutes), 1);
  chart.innerHTML = days.map((day) => `<i title="${escapeHtml(day.label)}: ${day.minutes} minutes" aria-label="${escapeHtml(day.label)}: ${day.minutes} minutes"${day.date === localDate() ? ' class="bar-today"' : ""} style="height:${day.minutes ? Math.max(12, day.minutes / maxMinutes * 100) : 4}%"></i>`).join("");
}

function profileLink(value, label, domain) {
  const link = normalizeProfileUrl(value, domain);
  return link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${label} ↗</a>` : "";
}

function normalizeProfileUrl(value, domain) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    if (url.hostname !== domain && !url.hostname.endsWith(`.${domain}`)) return "";
    return url.href;
  } catch {
    return "";
  }
}

function renderSocialLinks() {
  const links = [
    profileLink(state.profile.github, "GitHub", "github.com"),
    profileLink(state.profile.linkedin, "LinkedIn", "linkedin.com")
  ].filter(Boolean);
  document.getElementById("student-links").innerHTML = links.length ? links.join("") : '<button type="button" class="inline-link" data-open-profile>Add your profile links</button>';
}

function renderFocusAreas() {
  const areas = String(state.profile.focusAreas || "").split(",").map((area) => area.trim()).filter(Boolean);
  document.getElementById("focus-areas").innerHTML = areas.length
    ? areas.map((area) => `<span class="focus-area-chip">${escapeHtml(area)}</span>`).join("")
    : '<button type="button" class="inline-link" data-open-profile>Add your focus areas</button>';
}

function renderAll() {
  renderOverview();
  renderPlan();
  renderSubjects("all-subjects");
  renderCurriculum();
  renderPractice();
  renderProgress();
  updateProfile();
  renderFocusAreas();
}

function reminderMessage() {
  const firstName = state.profile.name.trim().split(/\s+/)[0] || "Afshaan";
  const realityCheck = DAILY_REALITY_CHECKS[dailyRealityCheckIndex()];
  return {
    title: `Your daily reality check, ${firstName}`,
    body: realityCheck
  };
}

function dailyRealityCheckIndex(date = localDate()) {
  const [year, month, day] = date.split("-").map(Number);
  const dayOfYear = Math.floor((Date.UTC(year, month - 1, day) - Date.UTC(year, 0, 0)) / 86400000);
  return dayOfYear % DAILY_REALITY_CHECKS.length;
}

function renderDailyRealityCheck() {
  const date = localDate();
  const dateLabel = document.getElementById("reality-check-date");
  if (dateLabel.dataset.date === date) return;
  dateLabel.dataset.date = date;
  dateLabel.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric"
  }).format(new Date(`${date}T00:00:00`));
  document.getElementById("reality-check-message").textContent = DAILY_REALITY_CHECKS[dailyRealityCheckIndex(date)];
}

function checkDailyReminder() {
  renderDailyRealityCheck();
  if (!state.profile.reminderEnabled || !state.profile.reminderTime || !("Notification" in window) || Notification.permission !== "granted") return;
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  if (currentTime < state.profile.reminderTime) return;
  const reminderDate = localDate(now);
  if (state.profile.lastReminderDate === reminderDate) return;
  const reminder = reminderMessage();
  new Notification(reminder.title, { body: reminder.body, tag: `prepwise-daily-${reminderDate}` });
  state.profile.lastReminderDate = reminderDate;
  persist(PROFILE_KEY, state.profile, "student profile");
}

async function enableDailyReminder() {
  if (!("Notification" in window)) {
    showToast("This browser doesn't support desktop notifications.");
    return false;
  }
  if (Notification.permission === "denied") {
    showToast("Notifications are blocked for this site. Allow them in your browser settings first.");
    return false;
  }
  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      showToast("Allow notifications in your browser to turn on your daily reminder.");
      return false;
    }
  }
  return true;
}

function updateProfile() {
  const username = state.profile.name || state.account?.username || "Student";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const initials = username === "Student" ? "＋" : username.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  document.getElementById("profile-name").textContent = username;
  document.getElementById("profile-status").textContent = state.account ? "Account connected" : "Your study space";
  document.getElementById("avatar-initials").textContent = initials;
  document.getElementById("welcome-title").textContent = username === "Student"
    ? `${greeting}.`
    : `${greeting}, ${username.split(/\s+/)[0]}.`;
}

function updateThemeButton() {
  const isDark = document.documentElement.dataset.theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  const button = document.getElementById("theme-button");
  button.setAttribute("aria-label", label);
  button.title = label;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#171b1a" : "#f3f5f4";
}

function toggleTheme() {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  updateThemeButton();
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error("Could not save the selected theme:", error);
    showToast("Your theme preference couldn't be saved in this browser.");
  }
}

function changeView(view) {
  if (!document.getElementById(`view-${view}`)) return;
  state.currentView = view;
  document.querySelectorAll(".view-panel").forEach((panel) => panel.classList.toggle("active", panel.id === `view-${view}`));
  document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.view === view));
  const nav = document.querySelector(`[data-view="${view}"] span`);
  const heading = document.getElementById("breadcrumb-current");
  heading.textContent = nav?.textContent?.trim() || "Overview";
  document.title = `${heading.textContent} — Prepwise`;
  document.getElementById("sidebar").classList.remove("open");
  if (view === "plan") renderPlan();
  if (view === "curriculum") renderCurriculum();
}

function openTaskDialog(subject = "", title = "") {
  const options = document.getElementById("subject-options");
  options.innerHTML = state.subjects.map((item) => `<option value="${escapeHtml(item.name)}"></option>`).join("");
  document.getElementById("task-subject").value = subject;
  document.getElementById("task-title").value = title;
  document.getElementById("task-date").value = localDate();
  document.getElementById("task-time").value = "";
  document.getElementById("task-duration").value = "25";
  const dialog = document.getElementById("task-dialog");
  dialog.showModal();
  document.getElementById("task-title").focus();
}

function openSubjectDialog(subjectId = "") {
  const form = document.getElementById("subject-form");
  form.reset();
  state.editingSubjectId = subjectId;
  const subject = state.subjects.find((item) => item.id === subjectId);
  document.getElementById("subject-dialog-title").textContent = subject ? "Edit subject" : "Add a subject";
  document.getElementById("subject-submit-label").innerHTML = `${subject ? "Save changes" : "Add subject"} <span>→</span>`;
  document.getElementById("subject-name").value = subject?.name || "";
  document.getElementById("subject-detail").value = subject?.detail || "";
  document.getElementById("subject-progress-input").value = String(subject?.progress ?? 0);
  document.getElementById("subject-progress-value").textContent = `${subject?.progress ?? 0}%`;
  document.getElementById("subject-dialog").showModal();
  document.getElementById("subject-name").focus();
}

function addCurriculumCourse(code, name) {
  if (state.subjects.some((subject) => subject.curriculumCode === code || subject.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    showToast(`${name} is already in your subjects.`);
    return;
  }
  state.subjects.push({
    id: `curriculum-${code}`,
    name,
    detail: code,
    progress: 0,
    progressTracked: false,
    curriculumCode: code,
    styleIndex: state.subjects.length % SUBJECT_STYLES.length
  });
  persistSubjects();
  renderAll();
  showToast(`${name} added to your subjects. Set your own progress when you're ready.`);
}

function openProfileDialog() {
  const form = document.getElementById("profile-form");
  for (const [key, value] of Object.entries(state.profile)) {
    const field = form.elements.namedItem(key);
    if (!field) continue;
    if (field.type === "checkbox") field.checked = Boolean(value);
    else field.value = value || "";
  }
  document.getElementById("account-button").hidden = Boolean(state.account);
  document.getElementById("signout-button").hidden = !state.account;
  document.getElementById("profile-dialog").showModal();
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  task.completedAt = task.done ? new Date().toISOString() : "";
  persistTasks();
  renderAll();
}

function formatTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function setTimerDisplay() {
  const minutes = String(Math.floor(state.secondsLeft / 60)).padStart(2, "0");
  const seconds = String(state.secondsLeft % 60).padStart(2, "0");
  document.getElementById("timer-display").innerHTML = `${minutes}<span>:${seconds}</span>`;
  document.getElementById("timer-progress-bar").style.width = `${((state.timerDuration - state.secondsLeft) / state.timerDuration) * 100}%`;
  const button = document.getElementById("timer-start");
  button.innerHTML = state.timerRunning ? "Pause session <span>Ⅱ</span>" : state.secondsLeft === state.timerDuration ? "Start focusing <span>→</span>" : "Resume session <span>→</span>";
  document.getElementById("timer-mode").textContent = state.timerBreak ? "Take a breath. You earned this break." : state.timerRunning ? "One thing at a time. You’re doing great." : "A little focus goes a long way";
  document.querySelector(".live-pill").innerHTML = `<i></i> ${state.timerRunning ? "IN FOCUS" : state.timerBreak ? "ON BREAK" : "READY"}`;
}

function pauseTimer() {
  state.timerRunning = false;
  window.clearInterval(state.timerInterval);
  state.timerInterval = null;
  setTimerDisplay();
}

function startTimer() {
  if (state.timerRunning) {
    pauseTimer();
    return;
  }
  state.timerRunning = true;
  setTimerDisplay();
  state.timerInterval = window.setInterval(() => {
    state.secondsLeft -= 1;
    setTimerDisplay();
    if (state.secondsLeft <= 0) {
      pauseTimer();
      showToast(state.timerBreak ? "Break's over. Ready for another focus session?" : "Focus session complete. Take a well-earned 5-minute break!");
      if (!state.timerBreak) {
        state.sessions.push({ date: localDate(), minutes: state.timerDuration / 60 });
        persistSessions();
        renderAll();
      }
      state.timerBreak = !state.timerBreak;
      state.timerDuration = state.timerBreak ? 5 * 60 : 25 * 60;
      state.secondsLeft = state.timerDuration;
      setTimerDisplay();
    }
  }, 1000);
}

function resetTimer() {
  pauseTimer();
  state.timerBreak = false;
  state.timerDuration = 25 * 60;
  state.secondsLeft = state.timerDuration;
  setTimerDisplay();
}

function setAuthMode(mode) {
  state.authMode = mode;
  const registering = mode === "register";
  document.getElementById("auth-title").textContent = registering ? "Create your account" : "Welcome back";
  document.getElementById("auth-submit").innerHTML = `${registering ? "Create account" : "Sign in"} <span>→</span>`;
  document.getElementById("auth-username").required = registering;
  document.getElementById("auth-username").parentElement.hidden = !registering;
  document.getElementById("auth-password").autocomplete = registering ? "new-password" : "current-password";
  document.getElementById("auth-error").textContent = "";
  document.querySelectorAll("[data-auth-mode]").forEach((button) => button.classList.toggle("active", button.dataset.authMode === mode));
}

async function submitAuth(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submit = document.getElementById("auth-submit");
  const error = document.getElementById("auth-error");
  submit.disabled = true;
  submit.textContent = state.authMode === "register" ? "Creating account…" : "Signing in…";
  error.textContent = "";
  try {
    const response = await fetch(`/api/auth/${state.authMode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
        ...(state.authMode === "register" ? { username: data.get("username") } : {})
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || result.Message || "We couldn't sign you in. Please try again.");
    state.account = result.user ? { username: result.user.username || data.get("username") || data.get("email").split("@")[0] } : null;
    try {
      if (state.account) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(state.account));
    } catch (storageError) {
      console.error("Could not save your account:", storageError);
    }
    updateProfile();
    document.getElementById("auth-dialog").close();
    form.reset();
    showToast(state.authMode === "register" ? "Your study space is ready. Welcome aboard!" : "You're signed in. Let's make today count!");
  } catch (requestError) {
    error.textContent = requestError instanceof TypeError ? "Can't reach the server right now. Please try again in a moment." : requestError.message;
  } finally {
    submit.disabled = false;
    setAuthMode(state.authMode);
  }
}

async function signOut() {
  try {
    const response = await fetch("/api/auth/logout", { method: "GET", credentials: "same-origin" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "We couldn't sign you out. Please try again.");
    state.account = null;
    localStorage.removeItem(ACCOUNT_KEY);
    document.getElementById("profile-dialog").close();
    updateProfile();
    showToast("You’ve signed out. Your study plan is still saved here.");
  } catch (error) {
    showToast(error instanceof TypeError ? "Can't reach the server right now." : error.message);
  }
}

function setDateLabel() {
  const now = new Date();
  document.getElementById("today-label").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(now);
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const username = state.profile.name || state.account?.username || "";
  document.getElementById("welcome-title").innerHTML = `${greeting}${username ? `, ${escapeHtml(username.split(/\s+/)[0])}` : ""} <span class="wave">✳</span>`;
}

document.getElementById("profile-reminder-enabled").addEventListener("change", async (event) => {
  if (!event.currentTarget.checked) return;
  const allowed = await enableDailyReminder();
  if (!allowed) event.currentTarget.checked = false;
});

document.getElementById("reminder-button").addEventListener("click", openProfileDialog);
document.getElementById("theme-button").addEventListener("click", toggleTheme);
document.getElementById("reality-check-focus").addEventListener("click", () => {
  changeView("overview");
  if (!state.timerRunning) startTimer();
});
checkDailyReminder();
window.setInterval(checkDailyReminder, 15000);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) checkDailyReminder();
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const nav = target.closest("[data-view]");
  if (nav) changeView(nav.dataset.view);
  const navigate = target.closest("[data-navigate]");
  if (navigate) changeView(navigate.dataset.navigate);
  if (target.closest("#menu-button")) document.getElementById("sidebar").classList.toggle("open");
  if (target.closest("#top-focus-button")) {
    changeView("overview");
    if (!state.timerRunning) startTimer();
  }
  if (target.closest("#add-task-button") || target.closest("[data-add-task]")) openTaskDialog();
  if (target.closest("[data-add-subject]")) openSubjectDialog();
  const semesterTab = target.closest("[data-semester]");
  if (semesterTab) {
    state.currentSemester = Number(semesterTab.dataset.semester);
    renderCurriculum();
  }
  const curriculumCourse = target.closest("[data-add-curriculum-course]");
  if (curriculumCourse) addCurriculumCourse(curriculumCourse.dataset.courseCode, curriculumCourse.dataset.courseName);
  if (target.closest("[data-open-profile]")) openProfileDialog();
  const toggle = target.closest("[data-toggle-task]");
  if (toggle) toggleTask(toggle.dataset.toggleTask);
  const remove = target.closest("[data-delete-task]");
  if (remove) {
    state.tasks = state.tasks.filter((task) => task.id !== remove.dataset.deleteTask);
    persistTasks();
    renderAll();
    showToast("Task removed from your plan.");
  }
  const filter = target.closest("[data-filter]");
  if (filter) {
    state.filter = filter.dataset.filter;
    renderPlan();
  }
  const authTab = target.closest("[data-auth-mode]");
  if (authTab) setAuthMode(authTab.dataset.authMode);
  const practice = target.closest("[data-practice-subject]");
  if (practice) {
    const subject = state.subjects.find((item) => item.id === practice.dataset.practiceSubject);
    if (subject) openTaskDialog(subject.name, `Practice ${subject.name} questions`);
  }
  const editSubject = target.closest("[data-edit-subject]");
  if (editSubject) openSubjectDialog(editSubject.dataset.editSubject);
  const removeSubject = target.closest("[data-delete-subject]");
  if (removeSubject) {
    const subject = state.subjects.find((item) => item.id === removeSubject.dataset.deleteSubject);
    state.subjects = state.subjects.filter((item) => item.id !== removeSubject.dataset.deleteSubject);
    persistSubjects();
    renderAll();
    if (subject) showToast(`${subject.name} removed from your subjects.`);
  }
  if (target.closest("[data-close-dialog]")) target.closest("dialog").close();
});

document.getElementById("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const enteredTime = data.get("time");
  state.tasks.push({
    id,
    title: data.get("title").trim(),
    subject: String(data.get("subject") || "").trim(),
    time: enteredTime ? formatTime(enteredTime) : "",
    duration: Number(data.get("duration")),
    done: false,
    date: data.get("date")
  });
  persistTasks();
  renderAll();
  document.getElementById("task-dialog").close();
  event.currentTarget.reset();
  showToast("Added to your study plan. You’ve got this!");
});

document.getElementById("subject-progress-input").addEventListener("input", (event) => {
  document.getElementById("subject-progress-value").textContent = `${event.currentTarget.value}%`;
});

document.getElementById("subject-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "").trim();
  if (state.subjects.some((subject) => subject.id !== state.editingSubjectId && subject.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
    showToast("That subject is already in your list.");
    return;
  }
  if (state.editingSubjectId) {
    const subject = state.subjects.find((item) => item.id === state.editingSubjectId);
    if (subject) {
      subject.name = name;
      subject.detail = String(data.get("detail") || "").trim();
      subject.progress = Number(data.get("progress"));
      subject.progressTracked = true;
    }
  } else {
    state.subjects.push({
      id: typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name,
      detail: String(data.get("detail") || "").trim(),
      progress: Number(data.get("progress")),
      progressTracked: true,
      styleIndex: state.subjects.length % SUBJECT_STYLES.length
    });
  }
  persistSubjects();
  renderAll();
  document.getElementById("subject-dialog").close();
  event.currentTarget.reset();
  showToast(`${name} ${state.editingSubjectId ? "updated" : "added"} in your subjects.`);
  state.editingSubjectId = null;
});

document.getElementById("profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const github = normalizeProfileUrl(data.get("github"), "github.com");
  const linkedin = normalizeProfileUrl(data.get("linkedin"), "linkedin.com");
  const error = document.getElementById("profile-error");
  if (data.get("github") && !github) {
    error.textContent = "Enter a valid github.com profile URL.";
    return;
  }
  if (data.get("linkedin") && !linkedin) {
    error.textContent = "Enter a valid linkedin.com profile URL.";
    return;
  }
  error.textContent = "";
  state.profile = {
    name: String(data.get("name") || "").trim(),
    college: String(data.get("college") || "").trim(),
    course: String(data.get("course") || "").trim(),
    semester: String(data.get("semester") || "").trim(),
    focusAreas: String(data.get("focusAreas") || "").trim(),
    examDate: String(data.get("examDate") || ""),
    weeklyGoal: String(data.get("weeklyGoal") || ""),
    reminderTime: String(data.get("reminderTime") || ""),
    reminderEnabled: data.get("reminderEnabled") === "on",
    lastReminderDate: state.profile.lastReminderDate || "",
    github,
    linkedin
  };
  persist(PROFILE_KEY, state.profile, "student profile");
  renderAll();
  document.getElementById("profile-dialog").close();
  showToast("Your student profile has been saved.");
});

document.getElementById("auth-form").addEventListener("submit", submitAuth);
document.getElementById("profile-button").addEventListener("click", () => {
  openProfileDialog();
});
document.getElementById("account-button").addEventListener("click", () => {
  document.getElementById("profile-dialog").close();
  setAuthMode("login");
  document.getElementById("auth-dialog").showModal();
});
document.getElementById("signout-button").addEventListener("click", signOut);
document.getElementById("timer-start").addEventListener("click", startTimer);
document.getElementById("timer-reset").addEventListener("click", resetTimer);

setDateLabel();
updateThemeButton();
importCurrentSemesterSubjects();
renderAll();
setTimerDisplay();
