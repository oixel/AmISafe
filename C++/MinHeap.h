#include <iostream>
#include <cmath>
#include <vector>
#include "Crime.h"
using namespace std;

class MinHeap
{
public:
    //
    vector<Crime> minHeap;

    //
    Crime extractMin();

    //
    void insert(Crime crime);
    void heapifyUp(int childindex);
    void heapifyDown(int index);

    //
    vector<Crime> getCrimesInRange(float distance);

    // constructor
    MinHeap(vector<Crime> &crimes){
        for(auto crime : crimes){
            insert(crime);
        }
    }
};




// Returns all the crime in a given distance from current position
vector<Crime> MinHeap::getCrimesInRange(float radius)
{
    vector<Crime> result;
    // Crime minElement = extractMin();
    // while (minElement.distance <= radius)
    // {
    //     result.push_back(minElement);
    //     minElement = extractMin();
    // }
    for(auto crime : minHeap){
        if(crime.distance <= radius){
            result.push_back(crime);
        }
    }

    return result;
}

//
void MinHeap::insert(Crime crime)
{
    // Insert new element at the end of the vector minHeap.size()-1
    minHeap.push_back(crime);

    // Heapify up
    heapifyUp(minHeap.size() - 1);
}

//
void MinHeap::heapifyUp(int childIndex)
{
    // Calculate parent
    int parentIndex = (childIndex - 1) / 2; // this already does floor

    // If child is less than parent, swap elements
    if (childIndex > 0 && minHeap[childIndex].distance < minHeap[parentIndex].distance)
    {
        swap(minHeap[childIndex], minHeap[parentIndex]);

        // Continue heapifying up recursively
        heapifyUp(parentIndex);
    }
}

//
Crime MinHeap::extractMin()
{
    Crime minElement = minHeap[0];

    // Assign root with last element in min heap
    minHeap[0] = minHeap[minHeap.size() - 1];

    // Delete last element
    minHeap.pop_back();

    // Heapify down
    heapifyDown(0);

    return minElement;
}

//
void MinHeap::heapifyDown(int index)
{
    int left = 2 * index + 1;
    int right = 2 * index + 2;
    int smallestIndex = index;

    // Check if left or right child are smaller
    if (left < minHeap.size() && minHeap[left].distance < minHeap[smallestIndex].distance)
    {
        smallestIndex = left;
    }

    if (right < minHeap.size() && minHeap[right].distance < minHeap[smallestIndex].distance)
    {
        smallestIndex = right;
    }

    // Swap if a smaller element has been found
    if (smallestIndex != index)
    {
        swap(minHeap[index], minHeap[smallestIndex]);
        heapifyDown(smallestIndex);
    }
}