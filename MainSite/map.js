export class Map {
    constructor(position) {
        this.posMarker = null;
        this.zoomLevel = 13;
        this.crimeMarkers = [];

        // Initializes map with center at start start position
        this.map = L.map('map', {
            center: position,
            zoom: 13,
            zoomControl: false,
            preferCanvas: true,
            attributionControl: false
        });

        // Set map to use OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 11,  // Limits how far user can zoom out
            maxZoom: 19,  // Limits how far user can zoom in
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Initialize zoom tools to bottom right
        L.control.zoom({
            position: 'bottomleft'
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
        crimes.forEach(crime => {
            // Store crime's position in vector format
            let position = [crime.latitude, crime.longitude];
            var marker = L.circleMarker(position, { color: '#d12e36', radius: 4, fillOpacity: 1 });

            // Creates new marker at crime's position and sets custom crime data
            marker.incident = crime.incident;
            marker.date = crime.date;
            marker.address = crime.address;

            // Binds data to popup and hover tool tip to make crime markers interactable
            marker.bindPopup(`<b>Incident:</b> ${crime.incident}<br><b>Date:</b> ${crime.date}<br><b>Time: </b>${crime.time}<br><b>Address:</b> ${crime.address}`);
            marker.bindTooltip(`${crime.incident} - ${crime.date}`);

            // Add marker with data onto map
            marker.addTo(this.map);

            // Append marker to list of all crime markers
            this.crimeMarkers.push(marker);
        });
    }
}