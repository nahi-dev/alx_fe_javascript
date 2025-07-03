const STORAGE_KEY = "quotes";
const LAST_QUOTE_KEY = "lastQuoteIndex";

let quotes = [];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

// Load quotes from localStorage or defaults
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

function saveQuotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "No quotes available.";
    return;
  }
  const index = Math.floor(Math.random() * quotes.length);
  const q = quotes[index];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
  sessionStorage.setItem(LAST_QUOTE_KEY, index);
}

function addQuote(event) {
  event.preventDefault();
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) return;
  quotes.push({ text, category });
  saveQuotes();
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  showRandomQuote();
}

// Export quotes to JSON file
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

// Import quotes from JSON file
function importFromJsonFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");
      for (const q of imported) {
        if (typeof q.text !== "string" || typeof q.category !== "string") {
          alert("Invalid quote format in JSON");
          return;
        }
      }
      quotes.push(...imported);
      saveQuotes();
      alert("Quotes imported successfully!");
      showRandomQuote();
    } catch {
      alert("Failed to import quotes: invalid JSON");
    }
  };
  reader.readAsText(file);

  event.target.value = ""; // reset input so same file can be uploaded again
}

loadQuotes();
showRandomQuote();

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteForm.addEventListener("submit", addQuote);
exportBtn.addEventListener("click", exportQuotes);
importFile.addEventListener("change", importFromJsonFile);

window.addQuote = addQuote;
