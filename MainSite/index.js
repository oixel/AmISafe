import { Map } from './map.js'
import { DataHandler } from './DataHandler.js';

// Stores the two input elements for latitude and longitude
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

// Sets starting position on map to be the Reitz Union
const START_POSITION = [29.646682, -82.347788]
var position = START_POSITION;
var prevPosition = [0, 0];

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

//
async function getCrimes() {
    // Updates marker to current location if not previously updated
    setPositionMarker();

    // Only updates crimes around position if position has changed;
    let isNewPosition = (position[0] != prevPosition[0]) && position[1] != prevPosition[1];
    if (isNewPosition) {
        dataHandler.updateDistances(position);

        // Gets crime around current position and fills the map with markers
        var crimes = await dataHandler.getCrimesInRadius();
        map.setCrimeMarkers(crimes);
    }

    // Update prevPosition to be position that was just checked
    prevPosition = Array.from(position);
}