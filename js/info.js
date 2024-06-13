let info = document.getElementById('info-container');

let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));

window.addEventListener("load", function () {
    let favouritesCharacterIDs = this.localStorage.getItem("favouritesCharacterIDs");
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    } else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(this.localStorage.getItem("favouritesCharacterIDs")));
    }

    info.innerHTML = `
        <div class="flex-row hero-name">${heroInfo.name}</div>
            <div class="flex-row hero-img-and-more-info">
                <img id="portraitImage" class="hero-img" src="${heroInfo.portraitImage}" alt="">
                <img style="display:none;" id="landscapeImage" src="${heroInfo.landscapeImage}" alt="">
                <div class="flex-col more-info">
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
            <button class="btn add-to-fav-btn">${favouritesCharacterIDs.has(`${heroInfo.id}`) ? "<i class=\"fa-solid fa-heart-circle-minus\"></i> &nbsp; Remove from Favourites" : "<i class=\"fa-solid fa-heart fav-icon\"></i> &nbsp; Add to Favourites</button>"}
        `

        addEvent();
})

