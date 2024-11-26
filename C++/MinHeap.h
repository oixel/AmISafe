#include <iostream>
#include <cmath>
#include <vector>
#include "Crime.h"
using namespace std;

class MinHeap
{
public:
vector<Crime> minHeap;
void insert(Crime crime);
Crime extractMin();
void heapifyUp(int childindex);
void heapifyDown(int index);
vector<Crime> getClosestCrimes(float UserDefinedDistance);

};

// not sure if this is 100% accurate but will do more testing with heaps soon
vector<Crime> MinHeap::getClosestCrimes(float UserDefinedDistance){
    vector<Crime> result;
    Crime minElement = extractMin();
    while(minElement.distance <= UserDefinedDistance){
        result.push_back(minElement);
        minElement = extractMin();
    }

    return result;
}


void MinHeap::insert(Crime crime){
    // insert new element at the end of the vector minHeap.size()-1
    minHeap.push_back(crime);

    // heapify up 
    heapifyUp(minHeap.size()-1);
}

void MinHeap::heapifyUp(int childIndex){
    // calculate parent
    int parentIndex = (childIndex - 1) / 2; // this already does floor

    // if child is less than parent, swap elements
    if(childIndex > 0 && minHeap[parentIndex].distance < minHeap[childIndex].distance){
        swap(minHeap[childIndex], minHeap[parentIndex]);

        // keep heapifying up recursively
        heapifyUp(parentIndex);
    }
}

Crime MinHeap::extractMin(){
    Crime minElement = minHeap[0];

    // assign root with last element in min heap
    minHeap[0] = minHeap[minHeap.size()-1];

    // delete last element
    minHeap.pop_back();

    // heapify down
    heapifyDown(0);

    return minElement;
}

void MinHeap::heapifyDown(int index){
    int left = 2 * index + 1;
    int right = 2 * index + 2;
    int smallestIndex = index;

    // check if left or right child are smaller
    if(left < minHeap.size() && minHeap[left].distance < minHeap[index].distance){
        smallestIndex = left;
    }

    if(right < minHeap.size() && minHeap[right].distance < minHeap[index].distance){
        smallestIndex = right;
    }

    // swap if a smaller element has been found
    if(smallestIndex != index){
        swap(minHeap[index], minHeap[smallestIndex]);
        heapifyDown(smallestIndex);
    }
}