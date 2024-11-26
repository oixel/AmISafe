#include "HashMap.h"
#include "MinHeap.h"
#include <vector>
#include <fstream>
#include <sstream>
#include <chrono>

using namespace std;

// Stores the indices of the different imported field names present in the data
enum fields
{
    incident = 1,
    date = 3,
    address = 10,
    latitude = 11,
    longitude = 12
};

// Splits line at commas and places data into a vector
vector<string> split(string str)
{
    stringstream stream(str);
    vector<string> data;

    string value = "";
    while (getline(stream, value, ','))
    {
        data.push_back(value);
    }

    return data;
}

vector<Crime> getData(string filepath)
{
    // Stores all crimes with valid data
    vector<Crime> crimes = {};

    // Opens file at inputted path and stores it in file variable
    ifstream file(filepath);

    // Stores the current line in CSV file
    string line = "";

    // Ignore first line since it is the unformatted field names
    getline(file, line);

    // Loops through all data in CSV files
    while (getline(file, line))
    {
        // Splits current line at delimiter of ','
        vector<string> data = split(line);

        // Only creates crime objects out of crimes with valid data
        try
        {
            Crime newCrime(data[incident], data[date], data[address], stof(data[latitude]), stof(data[longitude]));
            newCrime.setDistance(29.69052, -82.33503);

            // Limits crimes to Gainesville
            if (newCrime.distance > 100)
                continue;

            crimes.push_back(newCrime);
        }
        catch (exception _)
        {
            continue;
        }
    }

    return crimes;
}

int main()
{
    // user input: get user's latitude and longitude?
    // string userLatString;
    // cin >> userLatString;
    // float userLat = stof(userLatString);

    // string userLongString;
    // cin >> userLongString;
    // float userLong = stof(userLongString);

    // Distance testing
    // Crime crime("Test", "Date", "Address", 29.6465, -82.3480);
    // crime.setPreciseDistance(29.69052, -82.33503);
    // crime.display();
    // cout << endl;

    // Crime crime2("Test 2", "Date", "Address", 29.6465, -82.3480);
    // crime2.setDistance(29.69052, -82.33503);
    // crime2.display();
    // cout << endl;

    // Get all crimes recorded crimes in Gainesville with adequate data
    vector<Crime> crimes = getData("Crime_Responses.csv");
    // crimes[0].display();
    // cout << crimes.size() << endl;

    // Create min heap and fill it with all crime data

    const float RADIUS = 10.0;
    auto start = std::chrono::high_resolution_clock::now();
    MinHeap minheap1(crimes);
    cout << "Min heap size: " << minheap1.minHeap.size() << endl;
    cout << "Crimes in " << RADIUS << " mile radius: " << minheap1.getCrimesInRange(RADIUS).size() << endl;
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;

    std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;

    // Create hash map and fill it with all crime data
    auto start2 = std::chrono::high_resolution_clock::now();
    HashMap hashTable(207, crimes);
    cout << hashTable.entries << endl;
    cout << "Crimes in " << RADIUS << " mile radius: " << hashTable.getCrimesInRange(RADIUS).size() << endl;
    auto end2 = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed2 = end2 - start2;
    std::cout << "Elapsed time: " << elapsed2.count() << " seconds" << std::endl;

    return 0;
}