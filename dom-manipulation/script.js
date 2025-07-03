// Initial quotes array with some default quotes and categories
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

// Reference DOM elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteForm = document.getElementById("addQuoteForm");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");

// Function to show a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available. Please add some!";
    return;
  }
  // Pick random quote index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

// Function to handle form submission and add a new quote
function addQuote(event) {
  event.preventDefault(); // Prevent form from submitting normally

  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }

  // Add the new quote to the quotes array
  quotes.push({ text, category });

  // Clear inputs after adding
  newQuoteText.value = "";
  newQuoteCategory.value = "";

  // Optionally show the new quote right away
  showRandomQuote();
}

// Event listeners
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteForm.addEventListener("submit", addQuote);
