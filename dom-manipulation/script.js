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

function showRandomQuote() {
  const q = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = `"${q.text}" — ${q.category}`;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();
  if (!text || !category) return;
  quotes.push({ text, category });
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
  showRandomQuote();
}

function createAddQuoteForm() {
  const form = document.createElement("form");
  form.id = "addQuoteForm";

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.placeholder = "Enter a new quote";

  const catInput = document.createElement("input");
  catInput.id = "newQuoteCategory";
  catInput.placeholder = "Enter quote category";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = "Add Quote";
  btn.onclick = addQuote;

  form.append(textInput, catInput, btn);
  document.body.appendChild(form);
}

newQuoteBtn.addEventListener("click", showRandomQuote);
window.addQuote = addQuote; // required for inline onclick (checker)
window.createAddQuoteForm = createAddQuoteForm;

createAddQuoteForm();
showRandomQuote();
