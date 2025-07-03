const STORAGE_KEY = "quotes";
const LAST_QUOTE_KEY = "lastQuoteIndex";
const FILTER_KEY = "selectedCategory";

let quotes = [];

// ───── DOM Elements ──────────────────────────────────────────────────────────
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");
const formContainer = document.getElementById("formContainer");
const categoryFilter = document.getElementById("categoryFilter"); // <select> added in HTML

// ───── Local‑storage helpers ────────────────────────────────────────────────
function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      quotes = JSON.parse(stored);
      if (!Array.isArray(quotes)) throw new Error();
    } catch {
      quotes = getDefaultQuotes();
      saveQuotes();
    }
  } else {
    quotes = getDefaultQuotes();
    saveQuotes();
  }
}

function getDefaultQuotes() {
  return [
    {
      text: "The best way to predict the future is to create it.",
      category: "Motivation",
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      category: "Life",
    },
    {
      text: "Be yourself; everyone else is already taken.",
      category: "Inspiration",
    },
    {
      text: "In the middle of difficulty lies opportunity.",
      category: "Motivation",
    },
    {
      text: "To be, or not to be, that is the question.",
      category: "Philosophy",
    },
  ];
}

// ───── Category UI ──────────────────────────────────────────────────────────
function populateCategories() {
  if (!categoryFilter) return;

  const previous = categoryFilter.value;
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  const uniqueCats = [...new Set(quotes.map((q) => q.category))].sort();
  uniqueCats.forEach((cat) => {
    const opt = document.createElement("option");
    opt.value = opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });

  // Restore previous (or saved) selection
  const saved = localStorage.getItem(FILTER_KEY) || "all";
  categoryFilter.value =
    uniqueCats.includes(saved) || saved === "all" ? saved : "all";
}

function filterQuotes() {
  if (!categoryFilter) return; // safety
  const selected = categoryFilter.value;
  localStorage.setItem(FILTER_KEY, selected);

  const pool =
    selected === "all" ? quotes : quotes.filter((q) => q.category === selected);
  if (pool.length === 0) {
    quoteDisplay.innerHTML = "No quotes in this category.";
    return;
  }
  const q = pool[Math.floor(Math.random() * pool.length)];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
  sessionStorage.setItem(LAST_QUOTE_KEY, quotes.indexOf(q));
}

// ───── Quote display helpers ───────────────────────────────────────────────
function showRandomQuote() {
  const pool = quotes;
  if (pool.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }
  const q = pool[Math.floor(Math.random() * pool.length)];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
  sessionStorage.setItem(LAST_QUOTE_KEY, quotes.indexOf(q));
}

// ───── Add‑quote form ───────────────────────────────────────────────────────
function addQuote(event) {
  event.preventDefault();
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();
  if (!text || !category) return;

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  textInput.value = "";
  categoryInput.value = "";
  filterQuotes();
}

function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";
  textInput.required = true;

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.placeholder = "Enter quote category";
  categoryInput.required = true;

  const addButton = document.createElement("button");
  addButton.type = "submit";
  addButton.textContent = "Add Quote";

  form.append(textInput, categoryInput, addButton);
  formContainer.appendChild(form);
  form.addEventListener("submit", addQuote);
}

// ───── Import / Export JSON ────────────────────────────────────────────────
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error();
      imported.forEach((q) => {
        if (typeof q.text === "string" && typeof q.category === "string") {
          quotes.push(q);
        }
      });
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
      filterQuotes();
    } catch {
      alert("Failed to import quotes: invalid JSON");
    }
  };
  reader.readAsText(file);
  event.target.value = ""; // reset input
}

// ───── Initialization ──────────────────────────────────────────────────────
loadQuotes();
createAddQuoteForm();
populateCategories();
filterQuotes();

newQuoteBtn.addEventListener("click", filterQuotes); // show quote respecting current filter
exportBtn.addEventListener("click", exportQuotes);
importFile.addEventListener("change", importFromJsonFile);
if (categoryFilter) categoryFilter.addEventListener("change", filterQuotes);

window.addQuote = addQuote;
window.createAddQuoteForm = createAddQuoteForm;
window.populateCategories = populateCategories;
window.filterQuotes = filterQuotes;
