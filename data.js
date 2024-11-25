//hello
//hi
async function fetchCrimeData(url) {
    try {
        var data = await fetch(url).then((response) => response.json());
        return data;
    }
    catch (error) {
        console.error(f`Error fetching CSV data: ${error}.`);
    }
}

// Fetches data from open data JSON file
async function setCrime(index) {
    var data = await fetchCrimeData("https://data.cityofgainesville.org/resource/gvua-xt9q.json");
    var crime = data[index]
    var crimeStr = `${crime["narrative"]} occurred on ${crime["report_day_of_week"]} at ${crime["address"]}.`
    document.getElementById("data-text").textContent = crimeStr;
}

// Updates text to be most recent crime
setCrime(0);

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