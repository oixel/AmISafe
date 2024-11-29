// Import lists of allowed crime types from Crime class to create checkboxes for each type in crimes filter section
import { CRIME_TYPES } from "./crime.js";

// Stores range of years in data to create checkboxes for their filters
const YEAR_RANGE = [2011, 2024];

// Grabs elements from HTML page
var settingsButton = document.getElementById("settings-button");
var settings = document.getElementById("settings");
var radiusSlider = document.getElementById("radius-slider");
var filterMenuButton = document.getElementById("filter-menu-button");
var filtersMenu = document.getElementById("filter-menu");
var crimesTabButton = document.getElementById("crimes-tab-button");
var crimesCheckboxes = document.getElementById("crimes-checkboxes");
var yearsTabButton = document.getElementById("years-tab-button");
var yearsCheckboxes = document.getElementById("years-checkboxes");
var timeButton = document.getElementById("time-button");

// Add toggling to settings menu by clicking settings button
settingsButton.addEventListener("click", function () {
    // Determines whether settings menu is currently visible by checking its display state
    let isOpen = settings.style.display == "flex";

    // If settings are not open, make settings visible and set button icon to X
    if (!isOpen) {
        settings.style.display = "flex";

        // Re-opens the filter menu if it was previously open
        if (filterMenuButton.classList.contains("toggled-on")) {
            filtersMenu.style.display = "block";
        }

        settingsButton.textContent = "✖️";
    }
    else {  // Otherwise close settings menu and set button icon back to cog
        settings.style.display = "none";
        settingsButton.textContent = "⚙️";

        // Hides filter menu when settings are closed
        filtersMenu.style.display = "none";
    }
});

// Updates text next to radius slider to show current slider value
radiusSlider.addEventListener("input", function () {
    document.getElementById("radius-text").textContent = `${radiusSlider.value} miles`;
});

// Toggles the button's background color and visibility of filter menu
filterMenuButton.addEventListener("click", function () {
    let isToggledOn = filterMenuButton.classList.contains("toggled-on");

    if (!isToggledOn) {
        filterMenuButton.classList.add("toggled-on");
        filtersMenu.style.display = "flex";
    }
    else {
        filterMenuButton.classList.remove("toggled-on");
        filtersMenu.style.display = "none";
    }
});

// Toggles the button's background color and visibility of on-screen timer
timeButton.addEventListener("click", function () {
    let isToggledOn = timeButton.classList.contains("toggled-on");

    if (!isToggledOn) {
        timeButton.classList.add("toggled-on");
    }
    else {
        timeButton.classList.remove("toggled-on");
    }
});

// Switches filter tab to crimes tab when button is pressed
crimesTabButton.addEventListener("click", function () {
    let isToggledOn = crimesTabButton.classList.contains("toggled-on");

    // If not already open, closes years tab and opens crimes tab instead
    if (!isToggledOn) {
        crimesTabButton.classList.add("toggled-on");
        crimesCheckboxes.style.display = "flex";

        yearsTabButton.classList.remove("toggled-on");
        yearsCheckboxes.style.display = "none";
    }
});

// Switches filter tab to years tab when button is pressed
yearsTabButton.addEventListener("click", function () {
    let isToggledOn = yearsTabButton.classList.contains("toggled-on");

    // If not already open, closes crimes tab and opens year tab instead
    if (!isToggledOn) {
        yearsTabButton.classList.add("toggled-on");
        yearsCheckboxes.style.display = "flex";

        crimesTabButton.classList.remove("toggled-on");
        crimesCheckboxes.style.display = "none";
    }
});

// Returns all the checked checkboxes in the passed-in container
function getFilterStatuses(container) {
    let filters = new Map();

    // Getes all checkboxes in container div
    let checkboxes = container.querySelectorAll("input[type='checkbox']");

    // Loops through all checkboxes in container and appends those that are checked
    for (const checkbox of checkboxes) {
        filters.set(checkbox.value, checkbox.checked);
    }

    return filters;
}

// Creates a checkbox and label with passed-in name and then inserts it into container 
function createCheckBox(name, container) {
    // Create checkbox item and fill it with it's information
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = name;
    checkbox.name = name;
    checkbox.value = name;
    checkbox.checked = true;

    // Every time the checkbox is clicked, send out custom event. This is event is listened for in worldMap.js
    checkbox.addEventListener("click", function () {
        // Create a new event containing the data of currently checked filters
        const filterUpdateEvent = new CustomEvent("filterupdate", {
            detail: {
                crimes: getFilterStatuses(crimesCheckboxes),
                years: getFilterStatuses(yearsCheckboxes)
            }
        });

        // Send out the event to trigger listener in worldMap.js
        document.dispatchEvent(filterUpdateEvent);
    });

    // Create label item and set it's text to the checkbox's value
    const label = document.createElement("label");
    label.setAttribute("for", checkbox.name);
    label.textContent = checkbox.name;

    // Insert checkbox and its label into passed-in container
    container.appendChild(checkbox);
    container.appendChild(label)
}

// Creates the checkboxes for all filterable crime types and years
async function fillFilterMenus() {
    // Loops through crime types and creates a checkbox for each
    for (const crimeType of CRIME_TYPES) {
        createCheckBox(crimeType, crimesCheckboxes);
    }

    // Loops through range of years present in data and creates a checkbox for each
    for (var i = YEAR_RANGE[0]; i <= YEAR_RANGE[1]; i++) {
        createCheckBox(i.toString(), yearsCheckboxes);
    }
}

fillFilterMenus();

let setFilterTypes = new CustomEvent("setfiltertypes", {
    detail: {
        crimes: CRIME_TYPES,
        years: YEAR_RANGE
    }
});

document.dispatchEvent(setFilterTypes);