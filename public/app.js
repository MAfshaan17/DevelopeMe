"use strict";

const STORAGE_KEY = "prepwise.tasks.v1";
const PROFILE_KEY = "prepwise.profile.v1";
const DEFAULT_TASKS = [
  { id: "seed-1", title: "Review cell biology notes", subject: "Biology", time: "9:00 AM", duration: 45, done: false, date: localDate() },
  { id: "seed-2", title: "Practice quadratic equations", subject: "Mathematics", time: "11:00 AM", duration: 30, done: false, date: localDate() },
  { id: "seed-3", title: "Read chapter 6: energy", subject: "Physics", time: "2:00 PM", duration: 45, done: false, date: localDate() }
];
const SUBJECTS = [
  { name: "Biology", detail: "Cell biology · 4 chapters", icon: "✿", color: "#7fbda1", background: "#edf7f1", progress: 72 },
  { name: "Mathematics", detail: "Algebra · 6 chapters", icon: "∑", color: "#897be8", background: "#f0efff", progress: 54 },
  { name: "Physics", detail: "Mechanics · 5 chapters", icon: "◉", color: "#e5a56d", background: "#fff3e8", progress: 38 },
  { name: "Chemistry", detail: "Organic · 3 chapters", icon: "⌬", color: "#62abb6", background: "#eaf7f7", progress: 86 },
  { name: "English", detail: "Literature · 4 chapters", icon: "Aa", color: "#d18f9c", background: "#fbf0f3", progress: 61 },
  { name: "History", detail: "Modern history · 5 units", icon: "◷", color: "#c79656", background: "#fcf4e8", progress: 45 }
];

function localDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_TASKS.map((task) => ({ ...task }));
    const tasks = JSON.parse(saved);
    if (!Array.isArray(tasks) || !tasks.every((task) => task
      && typeof task.id === "string"
      && typeof task.title === "string"
      && typeof task.subject === "string"
      && typeof task.time === "string"
      && typeof task.date === "string"
      && typeof task.done === "boolean")) {
      throw new Error("Saved study tasks are not valid.");
    }
    return tasks;
  } catch (error) {
    console.error("Could not load saved study tasks:", error);
    showToast("Your saved tasks could not be loaded. A fresh plan is ready.");
    return DEFAULT_TASKS.map((task) => ({ ...task }));
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
  filter: "all",
  currentView: "overview",
  authMode: "login",
  profile: readProfile(),
  secondsLeft: 25 * 60,
  timerDuration: 25 * 60,
  timerRunning: false,
  timerBreak: false,
  timerInterval: null
};

function readProfile() {
  try {
    const profile = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
    return profile && typeof profile.username === "string" ? profile : null;
  } catch (error) {
    console.error("Could not load the saved profile:", error);
    return null;
  }
}

function persistTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch (error) {
    console.error("Could not save study tasks:", error);
    showToast("Your browser couldn't save this change. Check your storage settings.");
  }
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
  return state.tasks.filter((task) => task.done).length;
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

function renderSubjects(targetId, limit = SUBJECTS.length) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = SUBJECTS.slice(0, limit).map((subject) => `
    <article class="subject-item" style="--subject-color:${subject.color}">
      <div class="subject-top">
        <span class="subject-icon" style="background:${subject.background};color:${subject.color}" aria-hidden="true">${subject.icon}</span>
        <div><h3>${subject.name}</h3><p>${subject.detail}</p></div>
      </div>
      <div class="subject-progress-label"><span>Course progress</span><strong>${subject.progress}%</strong></div>
      <div class="subject-progress" role="progressbar" aria-label="${subject.name} course progress" aria-valuenow="${subject.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${subject.progress}%"></span></div>
    </article>
  `).join("");
}

function renderOverview() {
  const completed = completedTasks();
  document.getElementById("tasks-completed").textContent = String(6 + completed);
  document.getElementById("weekly-goal-label").textContent = `${6 + completed} / 10`;
  document.getElementById("weekly-goal-bar").style.width = `${Math.min(100, (6 + completed) * 10)}%`;
  document.getElementById("task-count").textContent = String(todayTasks().filter((task) => !task.done).length);

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
  document.getElementById("practice-subjects").innerHTML = SUBJECTS.map((subject) => `
    <article class="practice-card">
      <div class="practice-card-top"><span class="subject-icon" style="background:${subject.background};color:${subject.color}" aria-hidden="true">${subject.icon}</span><div><h3>${subject.name}</h3><p>${subject.progress}% of your course reviewed</p></div></div>
      <button class="button button-quiet" type="button" data-practice-subject="${subject.name}">Plan a ${subject.name} recap <span>→</span></button>
    </article>
  `).join("");
}

function renderProgress() {
  const done = completedTasks();
  const stats = document.getElementById("progress-stats");
  stats.innerHTML = `
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-lavender">◷</span><span class="stat-trend">THIS WEEK</span></div><div class="stat-value">${(8.5 + done * 0.5).toFixed(1)}<small>hrs</small></div><div class="stat-caption">Time invested in your goals</div></article>
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-mint">✓</span><span class="stat-trend trend-green">KEEP IT UP</span></div><div class="stat-value">${6 + done}<small>tasks</small></div><div class="stat-caption">Small wins add up to big progress</div></article>
    <article class="stat-card"><div class="stat-top"><span class="stat-icon stat-icon-peach">✳</span><span class="stat-trend">YOUR BEST: 9 DAYS</span></div><div class="stat-value">4<small>day streak</small></div><div class="stat-caption">A new day to show up for yourself</div></article>`;
  const chart = document.getElementById("week-chart");
  const days = [
    { day: "Mon", hours: 2 },
    { day: "Tue", hours: 3.5 },
    { day: "Wed", hours: 2.5 },
    { day: "Thu", hours: 4 },
    { day: "Fri", hours: 1.5 },
    { day: "Sat", hours: 3 },
    { day: "Sun", hours: 1 }
  ];
  chart.innerHTML = days.map((item, index) => `
    <div class="chart-day" aria-label="${item.day}: ${item.hours} hours">
      <span class="chart-value">${item.hours}h</span><div class="chart-bar-track"><span class="chart-bar${index === 3 ? " today" : ""}" style="height:${item.hours / 4 * 100}%"></span></div><span class="chart-label">${item.day}</span>
    </div>`).join("");
  renderSubjects("progress-subjects", 4);
}

function renderAll() {
  renderOverview();
  renderPlan();
  renderSubjects("all-subjects");
  renderPractice();
  renderProgress();
  updateProfile();
}

function updateProfile() {
  const username = state.profile?.username || "Alex Morgan";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const initials = username.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "A";
  document.getElementById("profile-name").textContent = username;
  document.getElementById("profile-status").textContent = state.profile ? "Signed in · Sign out" : "Your study space";
  document.getElementById("avatar-initials").textContent = initials;
  document.getElementById("welcome-title").innerHTML = `${greeting}, ${escapeHtml(username.split(/\s+/)[0])} <span class="wave">✳</span>`;
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
}

function openTaskDialog(subject = "") {
  const select = document.getElementById("task-subject");
  select.innerHTML = SUBJECTS.map((item) => `<option value="${item.name}"${item.name === subject ? " selected" : ""}>${item.name}</option>`).join("");
  const dialog = document.getElementById("task-dialog");
  dialog.showModal();
  document.getElementById("task-title").focus();
}

function toggleTask(id) {
  const task = state.tasks.find((item) => item.id === id);
  if (!task) return;
  task.done = !task.done;
  persistTasks();
  renderAll();
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
    state.profile = result.user ? { username: result.user.username || result.user.suername || data.get("username") || data.get("email").split("@")[0] } : null;
    try {
      if (state.profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(state.profile));
    } catch (storageError) {
      console.error("Could not save your profile:", storageError);
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
    state.profile = null;
    localStorage.removeItem(PROFILE_KEY);
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
  const firstName = state.profile?.username?.split(/\s+/)[0] || "Alex";
  document.getElementById("welcome-title").innerHTML = `${greeting}, ${escapeHtml(firstName)} <span class="wave">✳</span>`;
}

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
  if (practice) openTaskDialog(practice.dataset.practiceSubject);
  if (target.closest("[data-close-dialog]")) target.closest("dialog").close();
});

document.getElementById("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  state.tasks.push({
    id,
    title: data.get("title").trim(),
    subject: data.get("subject"),
    time: data.get("time"),
    duration: 45,
    done: false,
    date: localDate()
  });
  persistTasks();
  renderAll();
  document.getElementById("task-dialog").close();
  event.currentTarget.reset();
  showToast("Added to your study plan. You’ve got this!");
});

document.getElementById("auth-form").addEventListener("submit", submitAuth);
document.getElementById("profile-button").addEventListener("click", () => {
  if (state.profile) {
    signOut();
    return;
  }
  setAuthMode("login");
  document.getElementById("auth-dialog").showModal();
});
document.getElementById("timer-start").addEventListener("click", startTimer);
document.getElementById("timer-reset").addEventListener("click", resetTimer);

setDateLabel();
renderAll();
setTimerDisplay();
