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
        this.table.fill([]);

        crimes.forEach(crime => {
            this.insert(crime);
        });
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
        var tempTable = this.table;

        // Empty the current table
        this.table.length = 0;

        // Fill array with empty arrays
        this.table.length = this.buckets;
        this.table.fill([]);

        // Increment resize count to change hashFunction
        this.resizeCount += 1;

        // Update entries since insert function will recalculate this
        this.entries = 0;

        // Rehash and refill table with old values
        tempTable.forEach(row => {
            row.forEach(crime => {
                this.insert(crime);
            });
        });
    }

    insert(crime) {
        // Insert crime into hashtable and hashed key index
        const hashCode = this.hash(crime.distance);
        this.table[hashCode].push(crime);

        // Increment entry count
        this.entries += 1;

        // If load factor has been surpassed, resize the hashtable
        if (this.entries / this.buckets >= this.loadFactor)
            this.resize();
    }
}