#include <iostream>
#include <cmath>
#include <vector>
#include "Crime.h"
using namespace std;

// if we need to visualize: there is a display hash function we can use to make sure everything is being added correctly 
// https://www.geeksforgeeks.org/hash-table-data-structure/

class HashMap
{
public:

int buckets; 

// creates 2D vector to store the chaining 
// Key: outer vector holds the distance 
// Value: holds the other crime objects 
vector<vector<Crime>> table; 

// Constuctor (how are we getting the number of buckets?)
HashMap(int buckets){
    this->buckets = buckets;
    table.resize(buckets);
}

//insert function 

//hash function? or do we alr have the keys we just need to input it?

// do we delete or are we just iterating? 



};