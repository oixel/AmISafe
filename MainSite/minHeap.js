export class MinHeap {
    constructor(crimes) {
        this.heap = [];
        crimes.forEach(crime => this.insert(crime));
    }

    insert(crime) {
        // Insert new element at the end of the list
        this.heap.push(crime);

        //Heapify up
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(childIndex) {
        // Calculate parent
        const parentIndex = Math.floor((childIndex - 1) / 2);

        // If child is less than parent, swap elements
        if (childIndex > 0 && this.heap[childIndex].distance < this.heap[parentIndex].distance) {
            [this.heap[childIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[childIndex]];

            // Continue heapifying up recursively
            this.heapifyUp(parentIndex);
        }

    }

    extractMin() {
        // Return nothing if heap is empty
        if (this.heap.length === 0) return null;

        // Get root
        const minElement = this.heap[0];

        // Remove and return last element
        const lastElement = this.heap.pop();

        // If there are still elements left
        if (this.heap.length > 0) {
            this.heap[0] = lastElement; // Put last element in root
            this.heapifyDown(0); // Heapify down from the root
        }

        return minElement;
    }

    heapifyDown(index) {
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        let smallestIndex = index;

        // Check if left or right child are smaller
        if (left < this.heap.length && this.heap[left].distance < this.heap[smallestIndex].distance) {
            smallestIndex = left;
        }

        if (right < this.heap.length && this.heap[right].distance < this.heap[smallestIndex].distance) {
            smallestIndex = right;
        }

        // Swap if a smaller element has been found
        if (smallestIndex !== index) {
            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
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
