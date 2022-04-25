import axios from "axios";


const countryList = document.getElementById("countries");


//*************************************** PART 1 **********************************************************************

async function fetchWorld() {
    try {
        const resultWorld = await axios.get('https://restcountries.com/v2/all')
        const countries = resultWorld.data
        countries.sort((a, b) => {
            return a.population - b.population
        })
        listingIt(countries)
    } catch (e) {
        console.error(e);
    }
}

fetchWorld()


function listingIt(countryArr) {
    const worldList = countryArr.map((country) => {
        countryColor(country)
        return `
        <li class="country">
            <h3 class="${countryColor(country.region)}"><img src="${country.flag}" alt="De vlag" height="20">  ${country.name}</h3>
            <p>Has a population of ${country.population}</p>
        </li> `
    })
    countryList.innerHTML = `${worldList.join('')}`
}

function countryColor(region) {
    switch (region) {
        case 'Africa' :
            return "myBlue"
        case 'Americas' :
            return "myGreen"
        case 'Asia' :
            return "myRed"
        case 'Europe' :
            return "myYellow"
        case 'Oceania' :
            return "myPurple"
        default :
            return "myBlack"
    }
}