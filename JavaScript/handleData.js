// 
import { Crime } from './Crime.js';

// 
const MAX_RANGE = 100;

// 
var crimes = null;

// 
var inputForm = document.getElementById('input-form');
var indexInput = document.getElementById("index-input");
var crimeText = document.getElementById("crime-text")

// 
function parse(data) {
    const lines = data.split("\n");

    // Remove first line since it just contains columns names
    lines.splice(0, 1);

    var crimes = [];

    // 
    lines.forEach((line) => {
        var data = line.split(",");

        // Only adds crime if latitude and longitude data is provided
        if (parseFloat(data[11]) && parseFloat(data[12])) {
            var crime = new Crime(data[1], data[3], data[10], data[11], data[12]);
            crime.setDistance(29.69052, -82.33503);

            // 
            if (crime.distance <= MAX_RANGE) crimes.push(crime);
        }
    });

    return crimes;
}

//
async function getCrimeData(filepath) {
    // 
    return fetch(filepath)
        .then(file => file.text())
        .then(data => parse(data));
}

// 
inputForm.addEventListener('submit', function (event) {
    // 
    event.preventDefault();

    // 
    var index = (indexInput.value == "") ? 1 : indexInput.value;

    // 
    crimeText.innerHTML = crimes[index - 1].getData();
});


// 
async function main() {
    // 
    crimes = await getCrimeData("../Crime_Responses.csv");

    // 
    crimeText.textContent = `${crimes.length} crimes loaded!`;
    indexInput.max = crimes.length;
}

main()