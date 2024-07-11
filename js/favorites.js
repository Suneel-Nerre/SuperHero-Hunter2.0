// get container from DOM
let cardContainer = document.getElementById('fav-container');

//this event listener will be executed when page is loaded
window.addEventListener("load", function() {
    let favorites = localStorage.getItem("favoriteCharacters");

    //if there are no favorite characters then return
    if(favorites == null){
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favorites</p>";
        return;
    }else{
        favorites = JSON.parse(this.localStorage.getItem("favoriteCharacters"));
    }

    //this is in case all character are removed from favorites
    if(favorites.length == 0){
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favorites</p>";
        return;
    }

    cardContainer.innerHTML = "";

    //append each favorite character to DOM
    favorites.forEach(character => {
        cardContainer.innerHTML += `
            <div class="flex-col card">
                    <img src="${character.squareImage}" alt="">
                    <span class="name">${character.name}</span>
                    <span class="id">Id : ${character.id}</span>
                    <span class="comics">Comics : ${character.comics}</span>
                    <span class="series">Series : ${character.series}</span>
                    <span class="stories">Stories : ${character.stories}</span>
                    <a class="character-info" href="./info.html">
                         <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                    </a>
                    <div style="display:none;">
                         <span>${character.id}</span>
                         <span>${character.name}</span>
                         <span>${character.comics}</span>
                         <span>${character.series}</span>
                         <span>${character.stories}</span>
                         <span>${character.description}</span>
                         <span>${character.landscapeImage}</span>
                         <span>${character.portraitImage}</span>
                         <span>${character.squareImage}</span>
                    </div>
                    <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favorites</button>
               </div>
        `
    })
    addEvent();
})

//add event listeners to buttons
function addEvent(){
    let removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavorites))

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

//remove character from favorites when clicked on remove button
function removeCharacterFromFavorites(){
    let idOfCharacterToBeRemoved = this.parentElement.children[2].innerHTML.substring(5);

    let favorites = JSON.parse(localStorage.getItem("favoriteCharacters"));

    let favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));

    //delete id from favorites
    favoritesCharacterIDs.delete(`${idOfCharacterToBeRemoved}`);
    favorites.forEach(function (favorite, index){
        if(favorite.id == idOfCharacterToBeRemoved){
            favorites.splice(index, 1);
        }
    });

    //if no characters left in favorites then display text on screen
    if(favorites.length == 0) {
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favorites</p>";
    }

    //update local storage after removing character from favorites
    localStorage.setItem("favoriteCharacters", JSON.stringify(favorites));
    localStorage.setItem("favoritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));

    this.parentElement.remove();
}

//adding info of the character in local storage when clicked on info button
function addInfoInLocalStorage(){
    let heroInfo = {
        name: this.parentElement.children[7].children[1].innerHTML,
          description: this.parentElement.children[7].children[5].innerHTML,
          comics: this.parentElement.children[7].children[2].innerHTML,
          series: this.parentElement.children[7].children[3].innerHTML,
          stories: this.parentElement.children[7].children[4].innerHTML,
          portraitImage: this.parentElement.children[7].children[7].innerHTML,
          id: this.parentElement.children[7].children[0].innerHTML,
          landscapeImage: this.parentElement.children[7].children[6].innerHTML
    }
    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}