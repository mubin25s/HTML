const quote = document.getElementById("quote");
const author = document.getElementById("author");
// API URL that provides quotes
const api_url = "https://api.quotable.io/random";

async function getQuote(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        quote.innerHTML = '"' + data.content + '"';
        author.innerHTML = "- " + data.author;
    } catch (e) {
        quote.innerHTML = "An error occured while fetching quote";
    }
}
getQuote(api_url);
