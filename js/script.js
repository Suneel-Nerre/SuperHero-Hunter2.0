
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
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    } else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
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
                            <a class="character-info" href="./info.html">
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
    let favouriteButton = document.querySelectorAll(".add-to-fav-btn");
    favouriteButton.forEach((btn) => btn.addEventListener("click", addToFavourites));

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

function addToFavourites(){
    if(this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites'){
        let heroInfo = {
            name: this.parentElement.parentElement.children[2].children[0].innerHTML,
            description: this.parentElement.parentElement.children[2].children[1].innerHTML,
            comics: this.parentElement.parentElement.children[2].children[2].innerHTML,
            series: this.parentElement.parentElement.children[2].children[3].innerHTML,
            stories: this.parentElement.parentElement.children[2].children[4].innerHTML,
            portraitImage: this.parentElement.parentElement.children[2].children[5].innerHTML,
            id: this.parentElement.parentElement.children[2].children[6].innerHTML,
            landscapeImage: this.parentElement.parentElement.children[2].children[7].innerHTML,
            squareImage: this.parentElement.parentElement.children[2].children[8].innerHTML
        }

        let favouritesArray = localStorage.getItem("favouriteCharacters");

        if(favouritesArray == null){
            favouritesArray = [];
        }else{
            favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        }

        let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");

        if(favouritesCharacterIDs == null){
            favouritesCharacterIDs = new Map();
        }else{
            favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        }

        favouritesCharacterIDs.set(heroInfo.id, true);
        favouritesArray.push(heroInfo);

        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
        localStorage.setItem("favouriteCharacters", JSON. stringify(favouritesArray));

        this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites';

    }else{
        let idOfCharacterToBeRemoveFromFavourites = this.parentElement.parentElement.children[2].children[6].innerHTML;
        let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

        let newFavouritesArray = [];
        favouritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavourites}`);
        favouritesArray.forEach((favourite) => {
            if(idOfCharacterToBeRemoveFromFavourites != favourite.id){
                newFavouritesArray.push(favourite);
            }
        });

        localStorage.setItem("favouriteCharacters", JSON.stringify(newFavouritesArray));
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

        this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favourites';
    }
}

function addInfoInLocalStorage(){
    let heroInfo = {
        name: this.parentElement.parentElement.parentElement.children[2].children[0].innerHTML,
          description: this.parentElement.parentElement.parentElement.children[2].children[1].innerHTML,
          comics: this.parentElement.parentElement.parentElement.children[2].children[2].innerHTML,
          series: this.parentElement.parentElement.parentElement.children[2].children[3].innerHTML,
          stories: this.parentElement.parentElement.parentElement.children[2].children[4].innerHTML,
          portraitImage: this.parentElement.parentElement.parentElement.children[2].children[5].innerHTML,
          id: this.parentElement.parentElement.parentElement.children[2].children[6].innerHTML,
          landscapeImage: this.parentElement.parentElement.parentElement.children[2].children[7].innerHTML,
          squareImage: this.parentElement.parentElement.parentElement.children[2].children[8].innerHTML
    }

    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}