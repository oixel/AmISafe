// Stores the different crime types that exist in the data set and whether their markers should be shown
var allowed_crimes = {
    "Theft": true,
    "Arson": true,
    "Assault": true,
    "Murder": true,
    "Abuse": true,
    "Battery": true
};

// Stores the different years that exist in the data set and whether their markers should be shown
var allowed_times = {
    "2019": true,
    "2020": true,
    "2021": true,
    "2022": true,
    "2023": true,
    "2024": true
};

// Stores current crime markers on the map
var crime_markers = [];

// Initialize map and remove the top left zoom controls
var map = L.map('map', {
    center: [29.6465, -82.3533],
    zoom: 13,
    zoomControl: false
});

// Initialize map to use OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 13,
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initialize zoom tools to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Stores current position on map
var position = [29.6465, -82.3533];
var zoomLevel = 13;
UpdateView();

// Stores the position marker so it can be deleted when a new one is created
var pos_marker;

// Resets camera to point at current position
function UpdateView() {
    map.flyTo(position, zoomLevel);
}

// Grab hidden "Loading location..." text
var state_text = document.getElementById("state_text");

// Displays text next to buttons with passed-in text and class
function ShowText(new_text, new_class) {
    state_text.textContent = new_text;
    state_text.className = new_class;
    state_text.style.display = "block";
}

// Handles location functionality depending on permission state to allow for errors
function LocationHandler() {
    // Displays support error if location services are not supported in current browser
    if (!("geolocation" in navigator)) {
        ShowText("ERROR: Location is not supported on this browser.", "support_error");
        return;
    }

    // Hide previous text
    state_text.style.display = "none";

    // Handles functionality depending on state of location permissions
    navigator.permissions && navigator.permissions.query({ name: 'geolocation' })
        .then(function (PermissionStatus) {
            // If location is permitted, update map position
            if (PermissionStatus.state == 'granted') {
                SetCurrentLocation();
            }
            else if (PermissionStatus.state == 'prompt') {
                // Show error text stating to enable location
                ShowText("ERROR: Enable Location", "default_error");
                navigator.geolocation.getCurrentPosition(function (_) { });
            }
            else {
                // Show error text stating that location is blocked
                ShowText("ERROR: Unblock Location", "blocked_error");
            }
        })
}

// If user's location is available, grab it and update position to it
function SetCurrentLocation() {
    // If a position marker exists, remove it before creating a new one
    if (pos_marker) map.removeLayer(pos_marker);
    RemoveCrimeMarkers();

    // Update zoom level to be 18 by default now
    zoomLevel = 18;

    // Make "Loading location..." text visible
    ShowText("Loading location...", "loading_text");

    // Gets current position and updates map to the new position
    navigator.geolocation.getCurrentPosition((pos) => {
        // Store current position as new position
        position = [pos.coords.latitude, pos.coords.longitude];

        // Update camera's view
        UpdateView();

        // Create a new marker at position and store it in variable
        pos_marker = L.marker(position).addTo(map);

        // Rehide "Loading location..." text
        state_text.style.display = "none";

        // Removes markers that might have been created if button was spammed
        RemoveCrimeMarkers();

        // Creates randomly generated markers
        CreateCrimeMarkers();
    });
}

// Generates a random number in a given range
function GetRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Imports red version of default leaflet icon from github
var red_icon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Import all crime checkboxes into an object and add event listener to each
var crime_checkboxes = document.getElementsByClassName("crime_checkbox");
for (var i = 0; i < crime_checkboxes.length; i++) {
    crime_checkboxes[i].addEventListener("change", UpdateCheckedCrimes);
}

// Import all time checkboxes into an object and add event listener to each
var time_checkboxes = document.getElementsByClassName("time_checkbox");
for (var i = 0; i < time_checkboxes.length; i++) {
    time_checkboxes[i].addEventListener("change", UpdateCheckedTimes);
}

// Gathers which crimes should be displayed on the map and updates dictionary
function UpdateCheckedCrimes() {
    for (var i = 0; i < crime_checkboxes.length; i++) {
        let crime = crime_checkboxes[i].parentElement.textContent;
        allowed_crimes[crime] = crime_checkboxes[i].checked;
    }

    // Removes the markers on the map, but does not delete them from the list
    RemoveCrimeMarkers(false);

    // Adds all allowed markers to map
    PlaceCrimeMarkers();
}

// Gathers which times should be displayed on the map and updates dictionary
function UpdateCheckedTimes() {
    for (var i = 0; i < time_checkboxes.length; i++) {
        let time = time_checkboxes[i].parentElement.textContent;
        allowed_times[time] = time_checkboxes[i].checked;
    }

    // Removes the markers on the map, but does not delete them from the list
    RemoveCrimeMarkers(false);

    // Adds all allowed markers to map
    PlaceCrimeMarkers();
}

// Loops through all stored markers and only places those of allowed crime types
function PlaceCrimeMarkers() {
    for (var i = 0; i < crime_markers.length; i++) {
        let crime = crime_markers[i].crime;
        let time = crime_markers[i].time;

        // Only displays marker if the crime is selected in settings
        if (allowed_crimes[crime] && allowed_times[time]) crime_markers[i].addTo(map);
    }
}

// Updates checked crimes and generates 5 random crimes of varied types around
function CreateCrimeMarkers() {
    const COUNT = 100;

    // Creates COUNT random markers of varied crimes
    for (var i = 0; i < COUNT; i++) {
        // Generates a random longitude and latitude difference to subtract from user's position
        let lang_diff = GetRandom(-9, 9) * GetRandom(0.0001, 0.0005) / 2;
        let long_diff = GetRandom(-9, 9) * GetRandom(0.0001, 0.0005) / 2;

        // Picks a random crime type to bind to marker
        let crime_index = Math.floor(GetRandom(0, 5.99));
        let crime_type = Object.keys(allowed_crimes)[crime_index];

        // Picks a random time type to bind to marker
        let time_index = Math.floor(GetRandom(0, 5.99));
        let time_type = Object.keys(allowed_times)[time_index];

        // Calculates position of marker relative to user
        let new_position = [position[0] - lang_diff, position[1] - long_diff];

        // Creates new marker at the new position and sets custom crime data
        let new_marker = new L.marker(new_position, { icon: red_icon });
        new_marker.crime = crime_type;
        new_marker.time = time_type;

        // Binds crime type to pop up so whenever the marker is clicked it show the crime name
        new_marker.bindPopup(`${crime_type} commited in ${time_type}.`);

        // Append marker to list of all crime markers
        crime_markers.push(new_marker);
    }

    // When all markers are created, display those of allowed crime types
    UpdateCheckedCrimes();
}

// Wipe previously generated crime markers from the map
function RemoveCrimeMarkers(erase = true) {
    // Removes all markers from map
    for (var i = 0; i < crime_markers.length; i++) {
        map.removeLayer(crime_markers[i]);
    }

    // Erase all markers from list if desired
    if (erase) crime_markers.length = 0;
}

/*
    Useful functionality to reference later:
    map.fitBounds(polygon.getBounds()); // max zoom to see whole polygon
    map.setMaxBounds(polygon.getBounds()); // restrict map view to polygon bounds
    map.options.minZoom = map.getZoom(); // restrict user to zoom out 

    To revert:
    delete map.options.maxBounds;  // remove the maxBounds object from the map options
    map.options.minZoom = 0; // set min-zoom to 0 = no restriciton

*/