//select elements from DOM
let info = document.getElementById('info-container');


let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

window.addEventListener("load", function () {
    //getting favorite character ids to display appropriate button 
    let favoritesCharacterIDs = localStorage.getItem("favoritesCharacterIDs");
    if (favoritesCharacterIDs == null) {
        favoritesCharacterIDs = new Map();
    } else if (favoritesCharacterIDs != null) {
        favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));
    }

    info.innerHTML = `
        <div class="flex-row hero-name">${heroInfo.name}</div>
            <div class="hero-img-and-more-info">
                <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
                <div class="more-info">
                        <div class="flex-row id">
                            <b>ID:</b><span>${heroInfo.id}</span>
                        </div>
                        <div class="flex-row comics">
                            <b>Comics:</b><span>${heroInfo.comics}</span>
                        </div>
                        <div class="flex-row series">
                            <b>Series:</b><span>${heroInfo.series}</span>
                        </div>
                        <div class="flex-row stories">
                            <b>Stories:</b><span>${heroInfo.stories}</span>
                        </div>
                </div>
            </div>
            <div class="flex-col hero-discription">
                <b>Discription:</b>
                <p>${heroInfo.description != "" ? heroInfo.description : "No Description Available"}</p>
            </div>
            <div style="display:none;">
                    <span>${heroInfo.name}</span>
                    <span>${heroInfo.portraitImage}</span>
                    <span>${heroInfo.landscapeImage}</span>
                    <span>${heroInfo.id}</span>
                    <span>${heroInfo.comics}</span>
                    <span>${heroInfo.series}</span>
                    <span>${heroInfo.stories}</span>
                    <span>${heroInfo.squareImage}</span>
                    <span>${heroInfo.description}</span>
               </div>
            <button class="btn add-to-fav-btn">${favoritesCharacterIDs.has(`${heroInfo.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favorites" : "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favorites</button>"}
        `

        addEvent();
})

//add event listeners to buttons
function addEvent(){
    let favoriteButton = document.querySelector('.add-to-fav-btn');
    favoriteButton.addEventListener("click", addToFavorites);
}

// this function will be called when add to favorites/ remove from favorites button is clicked
function addToFavorites(){
    if(this.innerHTML == '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favorites'){
        //create a new object and push it to favorites array
        let heroInfo = {
            name: this.parentElement.children[3].children[0].innerHTML,
            description: this.parentElement.children[3].children[8].innerHTML,
            comics: this.parentElement.children[3].children[4].innerHTML,
            series: this.parentElement.children[3].children[5].innerHTML,
            stories: this.parentElement.children[3].children[6].innerHTML,
            portraitImage: this.parentElement.children[3].children[1].innerHTML,
            id: this.parentElement.children[3].children[3].innerHTML,
            landscapeImage: this.parentElement.children[3].children[2].innerHTML,
            squareImage: this.parentElement.children[3].children[7].innerHTML
       }

        //getting favorites array which contains objects of favorite characters, null incase of no favorites are present
        let favoritesArray = localStorage.getItem("favoriteCharacters");

        if(favoritesArray == null){
            favoritesArray = [];
        }else{
            favoritesArray = JSON.parse(localStorage.getItem("favoriteCharacters"));
        }

        //getting favorite IDs which contains IDs of favorite characters, null incase of no IDs are present
        let favoritesCharacterIDs = localStorage.getItem("favoritesCharacterIDs");

        if(favoritesCharacterIDs == null){
            favoritesCharacterIDs = new Map();
        }else{
            favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));
        }

        //setting the value of ID to true
        favoritesCharacterIDs.set(heroInfo.id, true);

        //pushing hero object to favorites array
        favoritesArray.push(heroInfo);

        //converting favorite characters and their ids to string and storing them in local storage
        localStorage.setItem("favoritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));
        localStorage.setItem("favoriteCharacters", JSON.stringify(favoritesArray));

        this.innerHTML = '<i class="fa-solid fa-heart-circle-minus"></i> &nbsp; Remove from Favorites';

    }else{
        //remove character from favorites
        //getting id of the character to be removed
        let idOfCharacterToBeRemoveFromFavorites = this.parentElement.children[3].children[3].innerHTML;
        let favoritesArray = JSON.parse(localStorage.getItem("favoriteCharacters"));
        let favoritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favoritesCharacterIDs")));
        
        let newFavoritesArray = [];

        //deleting id from favorites
        favoritesCharacterIDs.delete(`${idOfCharacterToBeRemoveFromFavorites}`);
        
        favoritesArray.forEach((favorite) => {
            if(idOfCharacterToBeRemoveFromFavorites != favorite.id){
                newFavoritesArray.push(favorite);
            }
        });

        //update local storage after removing character
        localStorage.setItem("favoriteCharacters", JSON.stringify(newFavoritesArray));
        localStorage.setItem("favoritesCharacterIDs", JSON.stringify([...favoritesCharacterIDs]));

        this.innerHTML = '<i class="fa-solid fa-heart fav-icon"></i> &nbsp; Add to Favorites';
    }
}