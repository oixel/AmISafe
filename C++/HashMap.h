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
        int maxIndex = 0;
        int index = 0;
        for (auto row : table)
        {
            if (row.size() > table[maxIndex].size())
                maxIndex = index;
            if (!row.empty())
                bucketsUsed++;

            index++;
        }

        // cout << endl;
        // cout << "Bucket data:" << endl;
        // cout << bucketsUsed << "/" << this->buckets << " used." << endl;
        // cout << this->buckets - bucketsUsed << " empty buckets." << endl;
        // cout << "Biggest bucket: " << maxIndex << " has " << table[maxIndex].size() << endl;
        // cout << endl;

        // for (Crime crime : table[maxIndex])
        // {
        //     cout << crime.latitude << ", " << crime.longitude << endl;
        // }
    }

    // hash function? or do we alr have the keys we just need to input it?
    int hash(float distance)
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
        int hashCode = hash(crime.distance);

        // cout << hashCode << " in buckets of " << buckets << endl;
        table[hashCode].push_back(crime);

        // cout << entries << ": " << hashCode << " in bucket size of " << buckets << endl;
        // cout << "(" << crime.latitude << "," << crime.longitude << ") :: This crime has a distance of " << crime.distance << " @ " << crime.address << endl;
        entries++;

        if (entries / buckets >= loadFactor)
            resize();
    }

    // Takes in distance from user to track crimes from
    vector<Crime> getCrimesInRange(float radius)
    {
        // Stores all the crimes in given radius
        vector<Crime> crimesInRange = {};

        // Loops through all buckets in table
        for (auto bucket : table)
        {
            // If bucket is empty, skip over bucket
            if (bucket.empty())
            {
                continue;
            }

            // Otherwise, add values in bucket to output if in radius of current position
            for (Crime crime : bucket)
            {
                if (crime.distance <= radius)
                {
                    crimesInRange.push_back(crime);
                }
            }
        }

        // Return all the buckets in given range
        return crimesInRange;
    }
};