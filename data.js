let field = {
    CRIME: 9,
    DATE: 10,
    ADDRESS: 18
};

var allCrimes = null;

async function fetchCrimeData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        allCrimes = data["data"];
    }
    catch (error) {
        console.error(f`Error fetching CSV data: ${error}.`);
    }
}

// Fetches data from open data JSON file from city of gainesville
async function setCrime(index) {
    //var crimes = await fetchCrimeData("./Data.json");
    var crime = allCrimes[index];
    var crimeStr = `${crime[field.CRIME]} occurred on ${crime[field.DATE]} at ${crime[field.ADDRESS]}.`
    document.getElementById("data-text").textContent = crimeStr;
}

// Grabs inputted number in text input and loads the data from it. Called on button press
document.getElementById('input-box').addEventListener('submit', function (e) {
    // Prevents default behavior of instantly refreshing the page
    e.preventDefault();

    // Get number inputted into input box
    var index = document.getElementById("index").value;

    // If no value inputted in text box, simply default back to most recent crime
    if (index == "") index = 0;

    // Updates text to show crime of inputted index
    setCrime(index);
});

async function main() {
    await fetchCrimeData("./Data.json");
    setCrime(0);
}

main();