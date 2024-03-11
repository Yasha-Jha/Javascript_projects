const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector(".quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

let apiQuotes = [];

window.addEventListener("DOMContentLoaded", () => {
  getQuotes();
});

// On Load

function randomValue() {
  return Math.floor(Math.random() * apiQuotes.length);
}

function displayQuotes() {
  let quote = apiQuotes[randomValue()];
  //   console.log(apiQuotes[quote]);
  //   Check if Author field is blank and replace it with 'Unkown'
  if (quote.author) {
    authorText.textContent = "Unknown"; //innerHtml = textContent same here
  } else {
    authorText.textContent = quote.author;
  }
  //   CHeck Quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.innerHTML = quote.text;
  authorText.innerHTML = quote.author;
}

//  Get Quotes From API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    // console.log(apiQuotes);
    displayQuotes();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", displayQuotes);
twitterBtn.addEventListener("click", tweetQuote);
