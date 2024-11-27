import { Map } from './map.js'

// Stores the two input elements for latitude and longitude
const latitude = document.getElementById("latitude");
const longitude = document.getElementById("longitude");

// Sets starting position on map to be the Reitz Union
const START_POSITION = [29.646682, -82.347788]
var position = START_POSITION;

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
function getCrimes() {
    // Updates marker to current location if not previously updated
    setPositionMarker();
}