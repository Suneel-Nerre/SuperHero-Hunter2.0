
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
function showSearchedResults(searchedHero) {
    let favouritesCharacterIDs = localStorage.getItem("favoriteCharactersIDs");
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    } else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoriteCharacterIDs")));
    }

    searchResults.innerHTML = ``;
    let count = 1;

    for (const key in searchedHero) {
        if (count <= 5) {
            let hero = searchedHero[key];
            searchResults.innerHTML += `
            <li class="flex-row single-search-result">
                <div class="flex-row img-info">
                        <img src="${hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension}" alt="">
                        <div class="hero-info">
                            <a class="character-info" href="./more-info.html">
                                <span class="hero-name">${hero.name}</span>
                            </a>
                        </div>
                </div>
                <div class="flex-col buttons">
                        <!-- <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button> -->
                        <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" : "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
                </div>
                <div style="display:none;">
                        <span>${hero.name}</span>
                        <span>${hero.description}</span>
                        <span>${hero.comics.available}</span>
                        <span>${hero.series.available}</span>
                        <span>${hero.stories.available}</span>
                        <span>${hero.thumbnail.path + '/portrait_uncanny.' + hero.thumbnail.extension}</span>
                        <span>${hero.id}</span>
                        <span>${hero.thumbnail.path + '/landscape_incredible.' + hero.thumbnail.extension}</span>
                        <span>${hero.thumbnail.path + '/standard_fantastic.' + hero.thumbnail.extension}</span>
                </div>
            </li>
            `
        }
        count++;
    }
    events();
}

function events(){
    
}