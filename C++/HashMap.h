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
    // vector<Crime> crimes;

    // creates 2D vector to store the chaining
    // Key: outer vector holds the distance
    // Value: holds the other crime objects
    vector<vector<Crime>> table;

    // Constuctor (how are we getting the number of buckets?)
    HashMap(int buckets, vector<Crime> &crimes)
    {
        this->buckets = buckets;
        table.resize(buckets, {});

        for (auto crime : crimes)
        {
            insert(crime);
        }

        // For testing, stores the amount of buckets actually used
        int bucketsUsed = 0;
        for (auto row : table)
        {
            if (row.size() != 0)
                bucketsUsed++;
        }

        cout << endl;
        cout << "Bucket data:" << endl;
        cout << bucketsUsed << "/" << this->buckets << " used." << endl;
        float ratio = float(bucketsUsed) / this->buckets;
        cout << "Ratio: " << ratio << endl;
        cout << this->buckets - bucketsUsed << " empty buckets." << endl;
        cout << endl;
    }

    // hash function? or do we alr have the keys we just need to input it?
    unsigned int hashFunction(float distance)
    {
        return (unsigned int)(distance * pow(10, resizeCount)) % buckets;
    }

    // resize function
    void resize()
    {
        // resize the buckets: double the number of buckets
        buckets *= 2;
        vector<vector<Crime>> tempTable = table;
        table.clear();
        table.resize(buckets);

        //
        resizeCount++;

        //
        entries = 0;

        for (auto row : tempTable)
        {
            for (Crime crime : row)
            {
                insert(crime);
            }
        }
    }

    //
    void insert(Crime crime)
    {
        int hashCode = hashFunction(crime.distance);

        // cout << hashCode << " in buckets of " << buckets << endl;
        table[hashCode].push_back(crime);

        // cout << entries << ": " << hashCode << " in bucket size of " << buckets << endl;
        // cout << "(" << crime.latitude << "," << crime.longitude << ") :: This crime has a distance of " << crime.distance << " @ " << crime.address << endl;
        entries++;

        if (entries / buckets >= loadFactor)
            resize();
    }

    //
    vector<Crime> getCrimesInRange(float radius)
    {
    }
};