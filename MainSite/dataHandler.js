// Import crime class from external JavaScript file
import { Crime } from '../JavaScript/Crime.js';
import { HashTable } from '../JavaScript/HashTable.js';
import { MinHeap } from '../JavaScript/MinHeap.js';

// Stores radius limit to only allow values in Gainesville since dataset contains some crimes outside of Gainesville's
const MAX_RANGE = 100;

export class DataHandler {
    // Initializes all the crimes in CSV file into this.crimes with distance based on position parameter
    constructor(position) {
        this.init(position);
    }

    // Reads CSV file, converts it to a string, and passes it to parse function
    async getCrimeData(filepath, position) {
        return fetch(filepath)
            .then(file => file.text())
            .then(text => this.parse(text, position));
    }

    // Returns array of crimes from crime data in CSV file
    parse(text, position) {
        // Splits all lines in CSV file into an array
        const lines = text.split("\n");

        // Remove first line since it just contains columns names
        lines.splice(0, 1);

        // Output array that stores valid crimes (has coordinate data and in Gainesville)
        var crimes = [];

        // Loops through all lines in CSV
        lines.forEach(line => {
            // Stores values seperated by delimiter of "," into array called data
            var data = line.split(",");

            // Only adds crime if latitude and longitude data is provided
            if (parseFloat(data[11]) && parseFloat(data[12])) {
                // 1: Incident, 3: Date, 10: Address, 11: Latitude, 12: Longitude
                var crime = new Crime(data[1], data[3], data[10], data[11], data[12]);

                // Sets initial distance to be based on starting position
                crime.setDistance(position[0], position[1]);

                // Only appends crime if it is the range of Gainesville
                if (crime.distance <= MAX_RANGE) crimes.push(crime);
            }
        });

        // Returns crimes in range of Gainesville with proper coordinate data
        return crimes;
    }

    // Creates array of valid crimes
    async init(position) {
        this.crimes = await this.getCrimeData("../Crime_Responses.csv", position);
        console.log(`${this.crimes.length} crimes loaded!`);
    }

    // Updates the distances of each crime based on new position
    async updateDistances(position) {
        await this.crimes.forEach(crime => {
            crime.setDistance(position[0], position[1]);
        });
    }

    // Returns values in given radius from position using data structure selected in settings
    async getCrimesInRadius(radius, dataStructure) {
        let structure = (dataStructure == "minheap") ? new MinHeap(this.crimes) : new HashTable(276, this.crimes);
        console.log(`Used ${structure.constructor.name} data structure!`)
        return structure.getCrimesInRange(radius);
    }
}