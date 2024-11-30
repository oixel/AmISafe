export class WorldMap {
    constructor(position) {
        this.posMarker = null;
        this.zoomLevel = 13;

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

        // Instantiates regular custom icon
        this.customMarker = L.icon({
            iconUrl: './assets/icons/userIcon.png',

            iconSize: [64, 64],
            iconAnchor: [35, 64],
            popupAnchor: [-2.5, -55]
        });

        // Instantiates custom marker of happy little guy holding duck. Shows up when no crimes are found in radius.
        this.happyMarker = L.icon({
            iconUrl: './assets/icons/userIconHappy.png',

            iconSize: [64, 64],
            iconAnchor: [35, 64],
            popupAnchor: [-2.5, -55]
        });
    }

    // Updates state of filters whenever a change occurs. Stores booleans of what 
    setFilters(crimes, years) {
        // Create a new map to hold boolean of whether certain data is
        this.filters = new Map();

        // Creates a boolean in map for each crime type in each year (For example, "2011Arson")
        for (const year of years.keys()) {
            for (const crime of crimes.keys()) {
                let key = year + crime;

                const filtered = years.get(year) && crimes.get(crime);
                this.filters.set(key, filtered);
            }
        }

        // Re-render any crime markers currently on the screen to reflect updated filters
        this.renderCrimeMarkers();
    }

    // Resets camera to point at current position
    resetView(position) {
        this.map.flyTo(position, this.zoomLevel);
    }

    // Creates a marker at inputted position and moves camera to it
    updatePosition(position, markerIcon = this.customMarker) {
        // Deletes previous position marker if one exists
        if (this.posMarker) this.map.removeLayer(this.posMarker);

        // Create new marker at position and move camera to it
        this.posMarker = L.marker(position, { icon: markerIcon }).addTo(this.map);
    }

    // Removes all crime markers currently on the map
    clearCrimeMarkers() {
        // If no markers exist on the map, exit function since there is nothing to remove
        if (!this.layerGroups) return;

        // Loops through all markers on the map and deletes them
        for (const key of this.layerGroups.keys()) {
            this.map.removeLayer(this.layerGroups.get(key));
        }
    }

    // Displays the crime markers that are not currently filtered out
    renderCrimeMarkers() {
        // If there are no markers to render, exit out of function
        if (!this.layerGroups) return;

        // Wipe previous crime markers before rendering new ones
        this.clearCrimeMarkers();

        // Loops through all possible combinations of crime types and years
        for (const key of this.filters.keys()) {
            // If the checkbox for this combination is toggled on, display it!
            if (this.filters.get(key)) {
                this.layerGroups.get(key).addTo(this.map);
            }
        }
    }

    // Fill map with all markers for all crimes in passed-in vector
    setCrimeMarkers(crimesInRadius) {
        // Makes user icon happy if no crimes are around
        if (crimesInRadius.length == 0) this.updatePosition(this.posMarker.getLatLng(), this.happyMarker);

        // Wipes markers already on the board
        this.clearCrimeMarkers();

        // Reset layer groups since new markers are to be created
        this.layerGroups = new Map();

        // Fill new map with empty layer groups for each possible crime and year combination
        for (const filter of this.filters.keys()) {
            this.layerGroups.set(filter, new L.layerGroup());
        }

        for (const crime of crimesInRadius) {
            // Store crime's position in vector format
            let position = [crime.latitude, crime.longitude];
            var marker = L.circleMarker(position, { color: '#d12e36', radius: 4, fillOpacity: 1 });

            // Stores custom crime data in marker
            marker.incident = crime.incident;
            marker.date = crime.date;
            marker.address = crime.address;

            // Binds data to popup and hover tooltip to make crime markers interactable
            marker.bindPopup(crime.getData());
            marker.bindTooltip(`${crime.incident} - ${crime.date}`);

            // Hides hover tooltip whenever popup gets opened
            marker.on('click', function () {
                this.closeTooltip();
            })

            // Keeps hover tooltip hidden while popup is currently open
            marker.on('mouseover', function () {
                if (this.isPopupOpen()) this.closeTooltip();
            });

            // Determine current crime's combination of year and crime, and add it to it's specific layer group
            let key = crime.year + crime.crimeType;
            marker.addTo(this.layerGroups.get(key));
        }

        // Display the new markers!
        this.renderCrimeMarkers();

        // Displays the quantity of crimes found within radius above the user's marker
        this.posMarker.bindPopup(`<b>${crimesInRadius.length}</b> crimes found nearby.`)
        this.posMarker.openPopup();
    }
}