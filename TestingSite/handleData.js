// Import crime class from external JavaScript file
import { Crime } from '../MainSite/crime.js';
import { HashTable } from '../MainSite/hashTable.js';
import { MinHeap } from '../MainSite/minHeap.js';

// Stores radius limit to only allow values in Gainesville since dataset contains some crimes outside of Gainesville's
const MAX_RANGE = 100;

// Stores initial position (Reitz Union)
const START_LATITUDE = 29.646682;
const START_LONGITUDE = -82.347788;

// Stores all the crimes in an array to access when index is inputted
var crimes = null;

// Pass used document values into variables for cleaner code
var inputForm = document.getElementById('input-form');
var indexInput = document.getElementById("index-input");
var crimeText = document.getElementById("crime-text")

// Returns array of crimes from crime data in CSV file
function parse(text) {
    // Splits all lines in CSV file into an array
    const lines = text.split("\n");

    // Remove first line since it just contains columns names
    lines.splice(0, 1);

    // Output array that stores valid crimes (has coordinate data and in Gainesville)
    var crimes = [];

    // Loops through all lines in CSV
    lines.forEach(line => {
        // Stores values seperated by delimiter of "," into array called data
        var data = line.split(",");

        // Only adds crime if latitude and longitude data is provided
        if (parseFloat(data[11]) && parseFloat(data[12])) {
            // 1: Incident, 3: Date, 10: Address, 11: Latitude, 12: Longitude
            var crime = new Crime(data[1], data[3], data[10], data[11], data[12]);

            // Sets initial distance to be based on starting position
            crime.setDistance(START_LATITUDE, START_LONGITUDE);

            // Only appends crime if it is the range of Gainesville
            if (crime.distance <= MAX_RANGE) crimes.push(crime);
        }
    });

    // Returns crimes in range of Gainesville with proper coordinate data
    return crimes;
}

// Reads CSV file, converts it to a string, and passes it to parse function
async function getCrimeData(filepath) {
    return fetch(filepath)
        .then(file => file.text())
        .then(text => parse(text));
}

// Adds listener for when "Get Data" button is pressed
inputForm.addEventListener('submit', function (event) {
    // Blocks form button's default behavior of refreshing the page
    event.preventDefault();

    // Usese value inputted or 1 if input box is empty
    var index = (indexInput.value == "") ? 1 : indexInput.value;

    // Updates the content of text box to display the data of indexed crime
    crimeText.innerHTML = crimes[index - 1].getData();
});

async function main() {
    // Stores array of valid crimes
    crimes = await getCrimeData("../Crime_Responses.csv");

    // Sets text box to display loaded crimes at start
    crimeText.textContent = `${crimes.length} crimes loaded!`;

    // Updates max value allowed in input box to be quantity of crimes
    indexInput.max = crimes.length;

    var hashtable = new HashTable(276, crimes);
    console.log(hashtable.entries);
    var crimesInRange = hashtable.getCrimesInRange(0.5);
    console.log(crimesInRange.length);

    var minHeap = new MinHeap(crimes);
    console.log(minHeap.heap.length);
    var crimesInRange = minHeap.getCrimesInRange(0.5);
    console.log(crimesInRange.length);
}

main()