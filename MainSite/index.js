import { Map } from './map.js'
import { DataHandler } from './DataHandler.js';

// Stores the two input elements for latitude and longitude
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

// Sets starting position on map to be the Reitz Union
const START_POSITION = [29.646682, -82.347788]
var position = START_POSITION;
var prevPosition = [0, 0];

// Tracks what data structure was used previous time crimes were generated
var dsSelector = document.getElementById("ds-selector");
var prevDataStructure = "";

// Tracks radius value inputted in settings
const radiusSlider = document.getElementById("radius-slider");
var prevRadius = 0;

// Create map object with center at current position
var map = new Map(position);

// Adds functionality to all control buttons
document.getElementById("get-location").addEventListener("click", getCurrentLocation);
document.getElementById("set-marker").addEventListener("click", setPositionMarker);
document.getElementById("get-crimes").addEventListener("click", getCrimes);
document.getElementById("reset-view").addEventListener("click", function () { map.resetView(position) });

// Initializes the values in the latitude and longitude boxes to show starting position
latitude.value = position[0];
longitude.value = position[1];
map.updatePosition(position);
var dataHandler = new DataHandler(position);

// Allows position to be set by clicking around on the map
map.map.on('click', function (e) {
    // Only allows moving pointer with mouse if check box is currently checked
    if (!document.getElementById("use-mouse").checked) return;

    // Sets current position to position clicked on the map
    position = [e.latlng.lat, e.latlng.lng];

    // Updates latitude and longitude input boxes to show new position
    latitude.value = position[0];
    longitude.value = position[1];

    // Update marker position on the map
    map.updatePosition(position);
});

// Updates latitude and longitude values to be coordinates of device's current location
function getCurrentLocation() {
    // Prompts user for location permission if not previously given
    navigator.geolocation.getCurrentPosition((pos) => {
        latitude.value = pos.coords.latitude;
        longitude.value = pos.coords.longitude;
    });
}

// Updates position value to values in input boxes and moves position marker
function setPositionMarker() {
    position = [latitude.value, longitude.value];
    map.updatePosition(position);
}

// Fills map with crime markers around user
async function getCrimes() {
    // Updates marker to current location if not previously updated
    setPositionMarker();

    // Determines whether the current position is different than last time the button was pressed
    let isNewPosition = (position[0] != prevPosition[0]) && position[1] != prevPosition[1];

    // Grab current value in data selector
    let dataStructure = dsSelector.value;

    // Grabs value of radius slider in settings
    let radius = radiusSlider.value;

    // Only updates crimes around position if position, data structure, or radius has changed
    if (isNewPosition || dataStructure != prevDataStructure || radius != prevRadius) {
        dataHandler.updateDistances(position);

        // Gets crime around current position and fills the map with markers
        var crimes = await dataHandler.getCrimesInRadius(radius, dataStructure);
        map.clearCrimeMarkers();  // Wipe current markers before adding new markers
        map.setCrimeMarkers(crimes);
    }

    // Updates the previously seen values to current value
    prevPosition = Array.from(position);
    prevDataStructure = dataStructure;
    prevRadius = radius;
}