// Grabs input elements in settings menu
var settingsButton = document.getElementById("settings-button");
var settings = document.getElementById("settings");
var radiusSlider = document.getElementById("radius-slider");
var filtersButton = document.getElementById("filters-button");
var filters = document.getElementById("filters");
var timeButton = document.getElementById("time-button");

// Add toggling to settings menu by clicking settings button
settingsButton.addEventListener("click", function (e) {
    // Determines whether settings menu is currently visible by checking its display state
    let isOpen = settings.style.display == "flex";

    // If settings are not open, make settings visible and set button icon to X
    if (!isOpen) {
        settings.style.display = "flex";

        // Re-opens the filters menu if it was previously open
        if (filtersButton.classList.contains("toggled-on")) {
            filters.style.display = "block";
        }

        settingsButton.textContent = "✖️";
    }
    else {  // Otherwise close settings menu and set button icon back to cog
        settings.style.display = "none";
        settingsButton.textContent = "⚙️";

        // Hides filters menu when settings are closed
        filters.style.display = "none";
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
        filters.style.display = "block";
    }
    else {
        filtersButton.classList.remove("toggled-on");
        filters.style.display = "none";
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