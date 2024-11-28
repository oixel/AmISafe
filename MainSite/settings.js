// Grabs input elements in settings menu
var settingsButton = document.getElementById("settings-button");
var settings = document.getElementById("settings");
var radiusSlider = document.getElementById("radius-slider");

// Add toggling to settings menu by clicking settings button
settingsButton.addEventListener("click", function (e) {
    // Determines whether settings menu is currently visible by checking its display state
    let isOpen = settings.style.display == "flex";

    // If settings are not open, make settings visible and set button icon to X
    if (!isOpen) {
        settings.style.display = "flex";
        settingsButton.textContent = "✖️";
    }
    else {  // Otherwise close settings menu and set button icon back to cog
        settings.style.display = "none";
        settingsButton.textContent = "⚙️";
    }
});

// Updates text next to radius slider to show current slider value
radiusSlider.addEventListener("input", function (e) {
    document.getElementById("radius-text").textContent = `${radiusSlider.value} miles`;
});