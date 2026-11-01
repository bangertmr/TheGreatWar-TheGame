
"use strict";

/* =========================================
   THE GREAT WAR: THE GAME
   Interactive Map - Prototype 1
========================================= */

const MapSystem = {

    selectedTerritory: null,

    territories: [
        {
            id: "greatBritain",
            name: "Great Britain",
            owner: "Great Britain",
            details: "An island nation protected by the Royal Navy. Its empire depends on secure sea routes."
        },
        {
            id: "france",
            name: "France",
            owner: "France",
            details: "A major industrial and military power in western Europe."
        },
        {
            id: "germany",
            name: "Germany",
            owner: "Germany",
            details: "A powerful industrial empire in central Europe."
        },
        {
            id: "austriaHungary",
            name: "Austria-Hungary",
            owner: "Austria-Hungary",
            details: "A multinational empire in central and southeastern Europe."
        },
        {
            id: "italy",
            name: "Italy",
            owner: "Italy",
            details: "Italy remained neutral when war began in August 1914, despite its alliance with Germany and Austria-Hungary."
        },
        {
            id: "russia",
            name: "Russia",
            owner: "Russia",
            details: "The Russian Empire covered enormous territory and possessed a large population and army."
        }
    ],

    initialize: function () {
        this.drawMap();
        this.updateInformation();
    },

    drawMap: function () {
        const map = document.getElementById("europeMap");

        if (!map) {
            console.error("Map container not found.");
            return;
        }

        map.innerHTML = "";

        const image = document.createElement("img");
        image.src = "images/maps/europe-1914.svg";
        image.alt = "Map of Europe in 1914";

        image.style.width = "100%";
        image.style.height = "100%";
        image.style.objectFit = "contain";
        image.style.display = "block";

        map.appendChild(image);
    },

    selectTerritory: function (territoryId) {
        this.selectedTerritory = territoryId;

        document.querySelectorAll(".map-territory").forEach(button => {
            button.classList.toggle(
                "selected",
                button.dataset.territory === territoryId
            );
        });

        this.updateInformation();
    },

    updateInformation: function () {
        const territory = this.territories.find(item =>
            item.id === this.selectedTerritory
        );

        const name = document.getElementById("territoryName");
        const owner = document.getElementById("territoryOwner");
        const details = document.getElementById("territoryDetails");

        if (!territory) {
            name.textContent = "No territory selected";
            owner.textContent = "";
            details.textContent = "Click one of the territories on the map.";
            return;
        }

        name.textContent = territory.name;
        owner.textContent = "Controlled by: " + territory.owner;
        details.textContent = territory.details;
    }

};
