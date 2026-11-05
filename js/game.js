
/* =========================================
   THE GREAT WAR: THE GAME
   Version 0.1.0 - Foundations

   Main game controller
========================================= */

"use strict";

// -----------------------------------------
// GAME DATA
// -----------------------------------------

const Game = {
    version: "0.1.0",

    currentScreen: "titleScreen",

    selectedCountry: null,

    countries: {
        germany: {
            name: "Germany",
            flag: "🇩🇪",
            description:
                "The German Empire is one of Europe's strongest industrial and military powers. Its army is highly organized, and its leaders must navigate an increasingly dangerous diplomatic crisis."
        },

        austriaHungary: {
            name: "Austria-Hungary",
            flag: "🇦🇹",
            description:
                "The Austro-Hungarian Empire is a diverse multinational state facing growing political and national tensions. Its alliance with Germany will be crucial as Europe approaches war."
        },

        greatBritain: {
            name: "Great Britain",
            flag: "🇬🇧",
            description:
                "The British Empire stretches across the globe. Its powerful Royal Navy protects vital trade routes, colonies, and overseas interests."
        },

        france: {
            name: "France",
            flag: "🇫🇷",
            description:
                "France is a major European power with a strong industrial base and an important alliance with Russia. Relations with Germany remain tense."
        },

        russia: {
            name: "Russia",
            flag: "🇷🇺",
            description:
                "The Russian Empire possesses enormous territory and manpower. However, its military and industrial systems face serious challenges."
        },

        italy: {
            name: "Italy",
            flag: "🇮🇹",
            description:
                "The Kingdom of Italy is a relatively young European state. Although it belongs to the Triple Alliance, its future role in the growing crisis is uncertain."
        }
    }
};


// -----------------------------------------
// SCREEN MANAGEMENT
// -----------------------------------------

function showScreen(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (!nextScreen) {
        console.error("Screen not found:", screenId);
        return;
    }

    nextScreen.classList.add("active");

    Game.currentScreen = screenId;

    console.log("Current screen:", screenId);
}


// -----------------------------------------
// COUNTRY SELECTION
// -----------------------------------------

function selectCountry(countryId) {

    const country = Game.countries[countryId];

    if (!country) {
        console.error("Country not found:", countryId);
        return;
    }

    Game.selectedCountry = countryId;

    // Remove previous selections
    document.querySelectorAll(".country-card").forEach(card => {
        card.classList.remove("selected");
    });

    // Highlight selected country
    const selectedCard = document.querySelector(
        `[data-country="${countryId}"]`
    );

    if (selectedCard) {
        selectedCard.classList.add("selected");
    }

    document.getElementById("selectionMessage").textContent =
        country.name + " selected. Starting your campaign...";

    console.log("Selected country:", country.name);

    // Move to campaign introduction
    setTimeout(() => {
        startCampaign();
    }, 450);
}


// -----------------------------------------
// START CAMPAIGN
// -----------------------------------------

function startCampaign() {

    if (!Game.selectedCountry) {
        return;
    }

    const databaseCountry =
    DataManager.getCountry(Game.selectedCountry);

    console.log("Selected Country ID:", Game.selectedCountry);
console.log("Database Country:", databaseCountry);

const country =
    Game.countries[Game.selectedCountry];

    document.getElementById("chosenFlag").textContent =
        country.flag;

    document.getElementById("chosenCountry").textContent =
        country.name;

    document.getElementById("campaignDescription").textContent =
        country.description;

    showScreen("campaignScreen");
            showScreen("mapScreen");
    MapSystem.initialize();
}


// -----------------------------------------
// BUTTON EVENTS
// -----------------------------------------

function initializeButtons() {

    // Main menu
    document.getElementById("newGameButton")
        .addEventListener("click", () => {
            showScreen("countryScreen");
        });

    document.getElementById("loadGameButton")
        .addEventListener("click", () => {
            showScreen("loadScreen");
        });

    document.getElementById("settingsButton")
        .addEventListener("click", () => {
            showScreen("settingsScreen");
        });

    document.getElementById("creditsButton")
        .addEventListener("click", () => {
            showScreen("creditsScreen");
        });

    // Country selection
    document.querySelectorAll(".country-card").forEach(card => {

        card.addEventListener("click", () => {

            const countryId = card.dataset.country;

            selectCountry(countryId);

        });

    });

    // Back buttons
    document.getElementById("countryBackButton")
        .addEventListener("click", () => {
            Game.selectedCountry = null;
            showScreen("titleScreen");
        });

    document.getElementById("campaignBackButton")
        .addEventListener("click", () => {
            Game.selectedCountry = null;
            showScreen("countryScreen");
        });

    // Buttons with the data-home attribute
    document.querySelectorAll("[data-home]").forEach(button => {

        button.addEventListener("click", () => {
            showScreen("titleScreen");
        });

    });

}


// -----------------------------------------
// GAME INITIALIZATION
// -----------------------------------------

async function initializeGame() {

    console.log("--------------------------------");
    console.log("THE GREAT WAR: THE GAME");
    console.log("Version:", Game.version);
    console.log("Game engine initialized.");
    console.log("--------------------------------");

    await DataManager.loadData();

    initializeButtons();

    showScreen("titleScreen");

}


// -----------------------------------------
// START THE GAME
// -----------------------------------------

document.addEventListener("DOMContentLoaded", initializeGame);
