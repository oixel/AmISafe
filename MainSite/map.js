// Imports red version of default leaflet icon from github
var redMarker = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export class Map {
    constructor(position) {
        this.posMarker = null;
        this.zoomLevel = 13;
        this.crimeMarkers = [];

        // Initializes map with center at start start position
        this.map = L.map('map', {
            center: position,
            zoom: 13,
            zoomControl: false
        });

        // Set map to use OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 13,  // Limits how far user can zoom out
            maxZoom: 19,  // Limits how far user can zoom in
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Initialize zoom tools to bottom right
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);
    }

    // Resets camera to point at current position
    resetView(position) {
        this.map.flyTo(position, this.zoomLevel);
    }

    // Creates a marker at inputted position and moves camera to it
    updatePosition(position) {
        // Deletes previous position marker if one exists
        if (this.posMarker) this.map.removeLayer(this.posMarker);

        // Create new marker at position and move camera to it
        this.posMarker = L.marker(position).addTo(this.map);
    }

    // Removes all crime markers currently on the map
    clearCrimeMarkers() {
        // Loops through all markers on the map and deletes them
        this.crimeMarkers.forEach(marker => {
            this.map.removeLayer(marker);
        });

        // Clears the crime markers array since the markers are no longer on map
        this.crimeMarkers.length = 0;
    }

    // Fill map with all markers for all crimes in passed-in vector
    setCrimeMarkers(crimes) {
        var markers = L.markerClusterGroup({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false,
            spiderLegPolylineOptions: { weight: 0 },
            maxClusterRadius: 5
        });

        markers.addTo(this.map);
        this.map.addLayer(markers);

        crimes.forEach(crime => {
            // Store crime's position in vector format
            let newPosition = [crime.latitude, crime.longitude];

            // Creates new marker at crime's position and sets custom crime data
            let marker = L.marker(newPosition, { icon: redMarker });
            marker.incident = crime.incident;
            marker.date = crime.date;
            marker.address = crime.address;

            // Binds crime type to pop up so whenever the marker is clicked it show the crime name
            marker.bindPopup(`${crime.incident} commited on ${crime.date} at ${crime.address}.`);

            //
            markers.addLayer(marker);

            // // Add marker with data onto map
            // marker.addTo(this.map);

            // Append marker to list of all crime markers
            this.crimeMarkers.push(marker);
        });

        this.map.addLayer(markers);
    }
}