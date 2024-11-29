import { CRIME_TYPES } from "../JavaScript/Crime.js";

// Grabs input elements in settings menu
var settingsButton = document.getElementById("settings-button");
var settings = document.getElementById("settings");
var radiusSlider = document.getElementById("radius-slider");
var filtersButton = document.getElementById("filters-button");
var filtersMenu = document.getElementById("filters-menu");
var crimeOption = document.getElementById("crime-filter-option");
var crimeMenu = document.getElementById("crime-checkboxes");
var yearOption = document.getElementById("year-filter-option");
var yearMenu = document.getElementById("year-checkboxes");
var timeButton = document.getElementById("time-button");


// Add toggling to settings menu by clicking settings button
settingsButton.addEventListener("click", function () {
    // Determines whether settings menu is currently visible by checking its display state
    let isOpen = settings.style.display == "flex";

    // If settings are not open, make settings visible and set button icon to X
    if (!isOpen) {
        settings.style.display = "flex";

        // Re-opens the filters menu if it was previously open
        if (filtersButton.classList.contains("toggled-on")) {
            filtersMenu.style.display = "block";
        }

        settingsButton.textContent = "✖️";
    }
    else {  // Otherwise close settings menu and set button icon back to cog
        settings.style.display = "none";
        settingsButton.textContent = "⚙️";

        // Hides filters menu when settings are closed
        filtersMenu.style.display = "none";
    }
});

// Updates text next to radius slider to show current slider value
radiusSlider.addEventListener("input", function () {
    document.getElementById("radius-text").textContent = `${radiusSlider.value} miles`;
});

// Toggles the visibility of filters menu when the button is toggled
filtersButton.addEventListener("click", function () {
    let isToggledOn = filtersButton.classList.contains("toggled-on");

    // Alternates button's background color and visibility of filters menu
    if (!isToggledOn) {
        filtersButton.classList.add("toggled-on");
        filtersMenu.style.display = "flex";
    }
    else {
        filtersButton.classList.remove("toggled-on");
        filtersMenu.style.display = "none";
    }
});

// 
timeButton.addEventListener("click", function () {
    let isToggledOn = timeButton.classList.contains("toggled-on");

    // 
    if (!isToggledOn) {
        timeButton.classList.add("toggled-on");
    }
    else {
        timeButton.classList.remove("toggled-on");
    }
});

// Ensures only one 
crimeOption.addEventListener("click", function () {
    let isToggledOn = crimeOption.classList.contains("toggled-on");

    // 
    if (!isToggledOn) {
        crimeOption.classList.add("toggled-on");
        crimeMenu.style.display = "flex";

        yearOption.classList.remove("toggled-on");
        yearMenu.style.display = "none";
    }
});

// 
yearOption.addEventListener("click", function () {
    let isToggledOn = yearOption.classList.contains("toggled-on");

    // 
    if (!isToggledOn) {
        yearOption.classList.add("toggled-on");
        yearMenu.style.display = "flex";

        crimeOption.classList.remove("toggled-on");
        crimeMenu.style.display = "none";
    }
});

// 
function createCheckBox(name, container) {
    // Create checkbox item and fill it with it's information
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = name;
    checkbox.checked = true;

    // 
    const label = document.createElement("label");
    label.setAttribute("for", checkbox.name);
    label.textContent = checkbox.name;

    // 
    container.appendChild(checkbox);
    container.appendChild(label)
}

// 
function fillFilterMenus() {
    // 
    CRIME_TYPES.forEach(crimeType => {
        createCheckBox(crimeType, crimeMenu)
    });

    // 
    for (var i = 2011; i < 2025; i++) {
        createCheckBox(i.toString(), yearMenu);
    }
}

fillFilterMenus();