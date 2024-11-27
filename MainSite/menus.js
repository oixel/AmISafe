let crime_dropdown = document.getElementById("crime-dropdown");

let crimeVisible = false;
function ToggleCrimeDropdown() {
    crimeVisible = !crimeVisible;
    crime_dropdown.style.display = (crimeVisible) ? "flex" : "none";
}

let times_dropdown = document.getElementById("times-dropdown");
let timesVisible = false;
function ToggleTimesDropdown() {
    timesVisible = !timesVisible;
    times_dropdown.style.display = (timesVisible) ? "flex" : "none";
}

let settingsVisible = false;
let dropdowns = document.getElementById("dropdowns");
let cog_button = document.getElementById("cog-button");
function ToggleDropdowns() {
    settingsVisible = !settingsVisible;
    cog_button.textContent = (settingsVisible) ? "✖️" : '⚙️';
    dropdowns.style.display = (settingsVisible) ? "flex" : "none";
}