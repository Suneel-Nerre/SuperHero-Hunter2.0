
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

// function to display searched results
// searchedHero is the array of objects which are matching with the string entered in search bar 
function showSearchedResults(searchedHero) {
    //favoritesCharacterIDs is a map which contains ids of favorite characters as key and true as value
    let favoritesCharacterIDs = localStorage.getItem("favoritesCharacterIDs");
    if (favoritesCharacterIDs == null) {
        favoritesCharacterIDs = new Map();
    } else if (favoritesCharacterIDs != null) {
        favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));
    }

    searchResults.innerHTML = ``;
    let count = 1;

    //Iterating through searchedHero array upto 5 characters
    for (const key in searchedHero) {
        if (count <= 5) {
            let hero = searchedHero[key];
            //appending hero details into the list
            searchResults.innerHTML += `
            <li class="single-search-result">
                <div class="img-info">
                        <img src="${hero.thumbnail.path + '/portrait_medium.' + hero.thumbnail.extension}" alt="">
                        <div class="hero-info">
                            <a class="character-info" href="./info.html">
                                <span class="hero-name">${hero.name}</span>
                            </a>
                        </div>
                </div>
                <div class="buttons">
                        <button class="btn add-to-fav-btn">${favoritesCharacterIDs.has(`${hero.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favorites" : "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favorites"}</button>
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

//adding eventListener to search results list
function events(){
    let favoriteButton = document.querySelectorAll(".add-to-fav-btn");
    favoriteButton.forEach((btn) => btn.addEventListener("click", addToFavorites));

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

// this function will be called when add to favorites/ remove from favorites button is clicked
function addToFavorites(){
    if(this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favorites'){
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

        //getting favorites array which contains objects of favorite characters, null incase of no favorites are present
        let favoritesArray = localStorage.getItem("favoriteCharacters");

        if(favoritesArray == null){
            favoritesArray = [];
        }else{
            favoritesArray = JSON.parse(localStorage.getItem("favoriteCharacters"));
        }

        //getting favorite IDs map which contains IDs of favorite characters, null incase of no IDs are present
        let favoritesCharacterIDs = localStorage.getItem("favoritesCharacterIDs");

        if(favoritesCharacterIDs == null){
            favoritesCharacterIDs = new Map();
        }else{
            favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));
        }

        //setting the value of hero id to true and pushing hero object to favorites array
        favoritesCharacterIDs.set(heroInfo.id, true);
        favoritesArray.push(heroInfo);

        //converting favorite characters and their ids to string and storing them in local storage
        localStorage.setItem("favoritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));
        localStorage.setItem("favoriteCharacters", JSON. stringify(favoritesArray));

        this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favorites';

    }else{
        //remove the character from favorites
        //getting id of the character to be removed
        let idOfCharacterToBeRemoved = this.parentElement.parentElement.children[2].children[6].innerHTML;
        let favoritesArray = JSON.parse(localStorage.getItem("favoriteCharacters"));
        let favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));

        let newFavoritesArray = [];
        //deleting id from favorites
        favoritesCharacterIDs.delete(`${idOfCharacterToBeRemoved}`);
        favoritesArray.forEach((favorite) => {
            if(idOfCharacterToBeRemoved != favorite.id){
                newFavoritesArray.push(favorite);
            }
        });

        //updating local storage after deleting the id
        localStorage.setItem("favoriteCharacters", JSON.stringify(newFavoritesArray));
        localStorage.setItem("favoritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));

        this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favorites';
    }
}

//add info in local storage
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