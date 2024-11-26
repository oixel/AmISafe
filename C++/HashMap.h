#pragma once
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
float loadFactor = 0.75; // 0.75?
int entries = 0;
int resizeCount = 0;
//vector<Crime> crimes;


// creates 2D vector to store the chaining 
// Key: outer vector holds the distance 
// Value: holds the other crime objects 
vector<vector<Crime>> table; 

// Constuctor (how are we getting the number of buckets?)
HashMap(int buckets, vector<Crime> &crimes){
    this->buckets = buckets;
    table.resize(buckets);
    // for(auto crime: crimes){
    //     insert(crime);
    // }
    cout << "Constructor is called" << endl;
}

//hash function? or do we alr have the keys we just need to input it?
int hashFunction(float distance){
    int hashCode = floor(pow(10, resizeCount) * distance);
    return hashCode;
}

// resize function
void resize(){
    resizeCount++;
    // resize the buckets: double the number of buckets
    buckets *= 2;
    vector<vector<Crime>> tempTable = table;
    table.clear();
    table.resize(buckets);

    for(auto row : tempTable){
        for(int j = 0; j < row.size(); j++){
            insert(row[j]);
        }
    }
}


//insert function 
void insert(Crime crime){
    
    int hashCode = hashFunction(crime.distance); // we may need a better hash function to reduce the time complexity
    table[hashCode].push_back(crime);
    entries++;

    if (entries/buckets >= loadFactor){
        resize();
    }
}

// do we delete or are we just iterating? 
vector<Crime> getClosestCrimes(float userDefinedDistance){


}


};