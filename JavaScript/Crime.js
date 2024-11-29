// Stores all filterable crime types
export const CRIME_TYPES = ["Assault", "Arson", "Arrest", "Battery", "Burglary", "Death", "Drug Violation", "Robbery", "Stolen Vehicle", "Theft", "Other"];

export class Crime {
    constructor(incident, occurence, address, latitude, longitude) {
        this.incident = incident;

        this.date = occurence.slice(0, 10);  // Get date value from occurence data
        this.year = occurence.slice(6, 10); // Get year value from occurence data
        this.time = occurence.slice(11);     // Get time value from occurence data

        // Removes " BLK " prefix added to random addresses
        address = address.replace(" BLK ", " ");
        this.address = address;

        this.latitude = latitude;
        this.longitude = longitude;

        // Initialize distance; gets set in setDistance()
        this.distance = 0;

        // Set crime categorization
        this.setCrimeType();
    }

    // Gets distance of this crime from inputted coordinate
    setDistance(userLat, userLong) {
        var latMiles = (userLat - this.latitude) * 69;      // 1 degree latitude coordinate = 69 miles
        var longMiles = (userLong - this.longitude) * 54.6; // 1 degree longitude coordinate = 54.6 miles

        // Calculate distance using distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
        this.distance = Math.sqrt(latMiles ** 2 + longMiles ** 2);
    }

    // Determines crime type out of valid CRIME_TYPES from incident information
    setCrimeType() {
        // Store this.incident into variable to avoid having to write "this." every if statement
        const incident = this.incident;

        // Loops through all filterable crime types
        for (var i = 0; i < CRIME_TYPES.length; i++) {
            // If the incident information contains one of the crime types, assign it to this Crime object
            if (incident.toLowerCase().includes(CRIME_TYPES[i].toLowerCase())) {
                this.crimeType = CRIME_TYPES[i];
                break;
            }
        }

        // If no matches occur, this incident gets the generic crime type of "Other"
        if (!this.crimeType) this.crimeType = "Other";
    }


    // Returns formatted string of this crime's data
    getData() {
        return `<b>Incident:</b> ${this.incident}<br>
        <b>Category:</b> ${this.crimeType}<br>
        <b>Date:</b> ${this.date}<br>
        <b>Time: </b>${this.time}<br>
        <b>Address:</b> ${this.address}`;
    }
}