"use strict";

/* =========================================
   THE GREAT WAR: THE GAME
   Data Manager
========================================= */

const DataManager = {

    countries: {},
    units: {},
    leaders: {},
    events: {},

    async loadData() {

    console.log("Loading game data...");

    this.countryList = await this.loadJSON(
        "data/countries.json"
    );

    this.units = await this.loadJSON(
        "data/units.json"
    );

    this.countries = {};

    for (const countryID in this.countryList) {

        const file = 
            "data/countries/" + countryID + ".json";

        try {

            this.countries[countryID] =
                await this.loadJSON(file);

            console.log(
                "Loaded country:",
                countryID
            );

        } catch (error) {

            console.warn(
                "Could not load:",
                file
            );

        }
    }

    console.log("Game data loaded.");
},


    async loadJSON(file) {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                "Could not load " + file
            );
        }

        return await response.json();
    },


    getCountry(countryName) {

        return this.countries[countryName];

    }

};