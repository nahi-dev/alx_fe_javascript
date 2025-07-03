const quotes = [
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

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

function showRandomQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
}

function addQuote(e) {
  e.preventDefault();
  if (!newQuoteText.value || !newQuoteCategory.value) return;
  quotes.push({ text: newQuoteText.value, category: newQuoteCategory.value });
  newQuoteText.value = "";
  newQuoteCategory.value = "";
  showRandomQuote();
}

newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteForm.addEventListener("submit", addQuote);
window.addQuote = addQuote;
