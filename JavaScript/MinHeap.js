export class MinHeap {
    constructor(crimes) {
        this.minHeap = [];
        crimes.forEach(crime => this.insert(crime));
    }

    insert(crime) {
        // Insert new element at the end of the list
        this.minHeap.push(crime);

        //Heapify up
        this.heapifyUp(this.minHeap.length - 1);
    }

    heapifyUp(childIndex) {
        // Calculate parent
        const parentIndex = Math.floor((childIndex - 1) / 2);

        // If child is less than parent, swap elements
        if (childIndex > 0 && this.minHeap[childIndex].distance < this.minHeap[parentIndex].distance) {
            [this.minHeap[childIndex], this.minHeap[parentIndex]] = [this.minHeap[parentIndex], this.minHeap[childIndex]];

            // Continue heapifying up recursively
            this.heapifyUp(parentIndex);
        }

    }

    extractMin() {
        // Return nothing if heap is empty
        if (this.minHeap.length === 0) return null;

        // Get root
        const minElement = this.minHeap[0];

        // Remove and return last element
        const lastElement = this.minHeap.pop();

        // If there are still elements left
        if (this.minHeap.length > 0) {
            this.minHeap[0] = lastElement; // Put last element in root
            this.heapifyDown(0); // Heapify down from the root
        }

        return minElement;
    }

    heapifyDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallestIndex = index;

        // Check if left or right child are smaller
        if (left < this.minHeap.length && this.minHeap[left].distance < this.minHeap[smallestIndex].distance) {
            smallestIndex = left;
        }

        if (right < this.minHeap.length && this.minHeap[right].distance < this.minHeap[smallestIndex].distance) {
            smallestIndex = right;
        }

        // Swap if a smaller element has been found
        if (smallestIndex !== index) {
            [this.minHeap[index], this.minHeap[smallestIndex]] = [this.minHeap[smallestIndex], this.minHeap[index]];
            this.heapifyDown(smallestIndex);
        }
    }

    // Returns all the crime in a given distance from current position
    getCrimesInRange(radius) {
        const result = [];

        let minElement = this.extractMin();
        while (minElement && minElement.distance <= radius) {
            result.push(minElement);
            minElement = this.extractMin();
        }
        return result;
    }
}
