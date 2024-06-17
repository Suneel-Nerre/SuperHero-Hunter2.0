// get container from DOM
let cardContainer = document.getElementById('fav-container');

window.addEventListener("load", function() {
    let favourites = localStorage.getItem("favouriteCharacters");

    if(favourites == null){
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
        return;
    }else{
        favourites = JSON.parse(this.localStorage.getItem("favouriteCharacters"));
    }

    if(favourites.length == 0){
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
        return;
    }

    cardContainer.innerHTML = "";

    favourites.forEach(character => {
        cardContainer.innerHTML += `
            <div class="card">
                <img src="${character.squareImage}" alt="">
                <span class="name">${character.name}</span>
                <span class="id">Id : ${character.id}</span>
                <span class="comics">Comics : ${character.comics}</span>
                <span class="series">Series : ${character.series}</span>
                <span class="stories">Stories : ${character.stories}</span>
                <a class="character-info" href="./info.html">
                    <button class="btn"><i class="fa-solid fa-circle-info"></i> &nbsp; More Info</button>
                </a>
                <button class="btn remove-btn"><i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favourites</button>
            </div>
        `
    })
    addEvent();
})

function addEvent(){
    let removeBtn = document.querySelectorAll(".remove-btn");
    removeBtn.forEach((btn) => btn.addEventListener("click", removeCharacterFromFavourites))

    let characterInfo = document.querySelectorAll(".character-info");
    characterInfo.forEach((character) => character.addEventListener("click", addInfoInLocalStorage));
}

function removeCharacterFromFavourites(){
    let idOfCharacterToBeDeleted = this.parentElement.children[2].innerHTML.substring(5);

    let favourites = JSON.parse(localStorage.getItem("favouriteCharacters"));

    let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));

    favouritesCharacterIDs.delete(`${idOfCharacterToBeDeleted}`);

    favourites.forEach(function (favourite, index){
        if(favourite.id == idOfCharacterToBeDeleted){
            favourites.splice(index, 1);
        }
    });

    if(favourites.length == 0) {
        cardContainer.innerHTML = "<p class=\"no-characters\">No characters present in Favourites</p>";
    }

    localStorage.setItem("favouriteCharacters", JSON.stringify(favourites));
    localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));

    this.parentElement.remove();
}

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