// Replace with your OpenWeatherMap API key
const OPENWEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

// ---- Notes App ----
const notesKey = "notes-weather-app.notes.v1";

function getNotes() {
  try {
    const raw = localStorage.getItem(notesKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(notesKey, JSON.stringify(notes));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const notesListEl = document.getElementById("notes-list");
const searchInput = document.getElementById("search");
const clearBtn = document.getElementById("clear-notes");

let editingId = null;

function renderNotes(filter = "") {
  const notes = getNotes().slice().reverse(); // show newest first
  const filtered = notes.filter(n =>
    (n.title + " " + n.content).toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    notesListEl.innerHTML = `<p class="muted">No notes yet.</p>`;
    return;
  }

  notesListEl.innerHTML = "";
  filtered.forEach(note => {
    const card = document.createElement("div");
    card.className = "note";
    card.innerHTML = `
      <div class="left">
        <h3>${escapeHtml(note.title)}</h3>
        <p>${escapeHtml(note.content)}</p>
        <div class="meta">${new Date(note.createdAt).toLocaleString()}</div>
      </div>
      <div class="actions">
        <button class="btn edit" data-id="${note.id}">Edit</button>
        <button class="btn danger delete" data-id="${note.id}">Delete</button>
      </div>
    `;
    notesListEl.appendChild(card);
  });

  // hook up actions
  notesListEl.querySelectorAll(".delete").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.currentTarget.dataset.id;
      deleteNote(id);
    });
`*
