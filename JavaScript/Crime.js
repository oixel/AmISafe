export class Crime {
    constructor(incident, date, address, latitude, longitude) {
        this.incident = incident;
        this.date = date;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
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
        return `<strong>Incident:</strong> ${this.incident}<br>
        <strong>Date:</strong> ${this.date}<br>
        <strong>Address:</strong> ${this.address}<br>
        <strong>Coordinates:</strong> (${this.latitude}, ${this.longitude})`;
    }
}