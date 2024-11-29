export class HashTable {
    constructor(buckets, crimes) {
        this.buckets = buckets;
        this.loadFactor = 0.75;
        this.entries = 0;
        this.resizeCount = 0;

        // 2D array to store chaining in conflicts
        // Key: Hashed key based on distance from current position
        // Value: Crime objects
        this.table = new Array(buckets);

        // Fill array with empty buckets
        this.table.fill(null);

        // Insert all crimes into hashtable
        for (const crime of crimes) {
            this.insert(crime);
        }
    }

    // Hashes based on the amount of resizes and ensures it is in the range of buckets
    hash(distance) {
        return Math.floor(Math.abs((distance * (10 ** this.resizeCount)) % this.buckets));
    }

    // Dynamically resize the hash
    resize() {
        // Resize the bucket count
        this.buckets *= 2;

        // Store current table to rehash and reinsert current elements
        var tempTable = Array.from(this.table);

        // Empty the current table
        this.table.length = 0;

        // Fill array with empty arrays
        this.table.length = this.buckets;
        this.table.fill(null);

        // Increment resize count to change hashFunction
        this.resizeCount += 1;

        // Update entries since insert function will recalculate this
        this.entries = 0;

        // Rehash and refill table with old values
        for (const crime of tempTable) {
            if (crime != null) this.insert(crime);
        }
    }

    insert(crime) {
        // Insert crime into hashtable and hashed key index
        let hashCode = this.hash(crime.distance);

        // Stores current quadratic for quadratic probing
        let quad = 1;

        // Loops until an open bucket is found
        while (this.table[hashCode] !== null) {
            // Ensures that bucket is in range of total buckets
            hashCode = (hashCode + quad * quad) % this.buckets;

            // Increment quad on collision for further probing
            quad++;
        }

        // Once an open bucket is found, insert crime into it
        this.table[hashCode] = crime;

        // Increment entry count
        this.entries += 1;

        // If load factor has been surpassed, resize the hashtable
        if (this.entries / this.buckets >= this.loadFactor)
            this.resize();
    }

    // Returns all the crimes within radius of current position
    getCrimesInRange(radius) {
        // Stores all the crimes in given radius
        let crimesInRange = [];

        // Loops through all buckets in table
        for (const crime of this.table) {
            // Only adds crime if bucket is not empty and it is in desired radius
            if (crime !== null && crime.distance <= radius) {
                crimesInRange.push(crime);
            }
        }

        // Return all the crimes within radius of current position
        return crimesInRange;
    }
}