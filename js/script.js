
// const publicKey = "1c0de1d88e61f8ad7b98a8d4bc5b918f";
// const privateKey = "85c8ac848dc84d691b77bf457255ee8ad58f8501";
// const timeStamp = "1717642193559";
// const hashKey = "f23dd071d37f04f324f709bf556fdaf5";

// const URL = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=iron%20man&apikey=1c0de1d88e61f8ad7b98a8d4bc5b918f&hash=f23dd071d37f04f324f709bf556fdaf5&ts=1717642193559";

// async function searchHerosDemo(){
//     let response = await fetch(URL);
//     let data = await response.json();
//     console.log(data.data.results[0]);
// }

// get Elements from DOM
let searchBar = document.getElementById("search-bar");
let searchResults = document.getElementById("search-results");

// Add event listner to search bar
searchBar.addEventListener("input", () => searchHeros(searchBar.value));

// function for API call
async function searchHeros(textSearched) {

    // if no text is entered in search bar then nothing will be displayed
    if (textSearched.length == 0) {
        searchResults.innerHTML = ``;
        return;
    }

    // API call to get the data
    await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${textSearched}&apikey=1c0de1d88e61f8ad7b98a8d4bc5b918f&hash=f23dd071d37f04f324f709bf556fdaf5&ts=1717642193559`)
    .then(res => res.json()) // converting response data to JSON format
    .then(data => showSearchedResults(data.data.results)) // sending searched results to show in HTML
}

// function to display searched results in DOM
function showSearchedResults(searchedHero){
    
}