// Try global variable outside of map scope

export class WorldMap {
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

        document.addEventListener("setfiltertypes", this.setFilters);

        // filterupdate event gets called every time a checkbox in filter menu is clicked
        document.addEventListener("filterupdate", function (e) {
            const years = e.detail.years;
            const crimes = e.detail.crimes;

            for (const year of years.keys()) {
                for (const crime of crimes.keys()) {
                    let key = year + "_" + crime;
                    const filtered = years.get(year) && crimes.get(crime);
                    this.filters.set(key, filtered);
                }
            }
        });
    }

    setFilters(e) {
        // 
        const years = e.detail.years;
        const crimes = e.detail.crimes;

        // 
        this.filters = new Map();

        // 
        for (let i = years[0]; i <= years[1]; i++) {
            // 
            let year = i.toString();

            // 
            for (const crime of crimes) {
                let key = year + "_" + crime;
                this.filters.set(key, true);
            }

        }
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
        for (const marker of this.crimeMarkers) {
            this.map.removeLayer(marker);
        }

        // Clears the crime markers array since the markers are no longer on map
        this.crimeMarkers.length = 0;
    }

    // Fill map with all markers for all crimes in passed-in vector
    setCrimeMarkers(crimesInRadius) {
        this.layerGroups = new Map();
        console.log(this.filters);
        // for (const filter of this.filters.keys()) {
        //     //this.layerGroups.set(filter, L.layerGroup());
        // }

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

            // Add marker with data onto map
            marker.addTo(this.map);

            // Append marker to list of all crime markers
            this.crimeMarkers.push(marker);
        }

        // Displays the quantity of crimes that loaded around user above user marker
        this.posMarker.bindPopup(`<b>${crimes.length}</b> crimes found nearby.`)
        this.posMarker.openPopup();
    }
}