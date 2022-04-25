//*************************************** PART 2 **********************************************************************

import axios from "axios";

const countrySearchResult = document.getElementById("countryResult");
const errorMessage = document.getElementById("error");

const searchCity = document.getElementById("searchButton");
searchCity.addEventListener('submit', sendData);

function sendData(e) {
    e.preventDefault();
    const valInput = document.getElementById('city-input');
    fetchCountryData(valInput.value);
    valInput.value = ""
}


async function fetchCountryData(name) {
    countrySearchResult.innerHTML = ``;
    try {
        const resultCountry = await axios.get(`https://restcountries.com/v2/name/${name}`);
        const country = resultCountry.data[0];
        errorMessage.innerHTML = "";
        listingItTwo(country);
    } catch (e) {
        console.error(e);
        errorMessage.innerHTML = `
        <h2>Oepsie woepsie!</h2>
        <p>De site is stukkie-wukkie!</p>
        <p>Ziet ernaar uit dat er iets mis is gegaan.</p>
        <p>Is de invoer correct?</p>
        `
    }
}

function listingItTwo(country) {
    countrySearchResult.innerHTML = `
    <div>
        <h2><img src="${country.flag}" alt="De vlag" height="60"> ${country.name}</h2>
        <p>${country.name} is situated in ${country.subregion}</p>
        <p>It has a population of ${country.population}</p>
        <p>The capital is ${country.capital} and you can pay with ${currencyString(country.currencies)}</p>
    </div>
    `;
}

function currencyString(currencies) {
    if (currencies.length === 1) {
        return currencies[0].name;
    } else {
        let availableCurrencies = '';
        for (let i = 0; i < currencies.length; i++) {
            availableCurrencies = availableCurrencies + `${currencies[i].name}`;
            if (i < currencies.length - 1) {
                availableCurrencies = `${availableCurrencies} and `;
            }
        } return availableCurrencies;
    }
}
