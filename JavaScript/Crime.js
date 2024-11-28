export class Crime {
    constructor(incident, occurence, address, latitude, longitude) {
        this.incident = incident;
        this.date = occurence.slice(0, 11);  // Get date value from occurence data
        this.time = occurence.slice(12);     // Get time value from occurence data

        // Removes " BLK " prefix added to random addresses
        address = address.replace(" BLK ", " ");
        this.address = address;

        this.latitude = latitude;
        this.longitude = longitude;

        // Initialize distance; gets set in setDistance()
        this.distance = 0;
    }

    // Gets distance of this crime from inputted coordinate
    setDistance(userLat, userLong) {
        var latMiles = (userLat - this.latitude) * 69;      // 1 degree latitude coordinate = 69 miles
        var longMiles = (userLong - this.longitude) * 54.6; // 1 degree longitude coordinate = 54.6 miles

        // Calculate distance using distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
        this.distance = Math.sqrt(latMiles ** 2 + longMiles ** 2);
    }

    // Returns formatted string of this crime's data
    getData() {
        return `<b>Incident:</b> ${this.incident}<br>
        <b>Date:</b> ${this.date}<br>
        <b>Time: </b>${this.time}<br>
        <b>Address:</b> ${this.address}`;
    }
}