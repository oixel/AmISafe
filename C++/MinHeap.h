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
void extractMin();
void heapifyUp(int childindex);
void heapifyDown();

};

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
    // if(childIndex > 0 && minHeap[parentIndex].distance < minHeap[childIndex].distance){
    //     swap(minHeap[childIndex], minHeap[parentIndex]);

    //     // keep heapifying up recursively
    //     heapifyUp(parentIndex);
    // }
}