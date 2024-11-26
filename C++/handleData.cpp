#include "Crime.h"
#include <vector>
#include <fstream>
#include <sstream>

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
            Crime newCrime(data[incident], data[date], data[address], stof(data[longitude]), stof(data[latitude]));
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
    // Distance testing
    Crime crime("Test", "Date", "Address", 29.6465, -82.3480);
    crime.setPreciseDistance(29.69052, -82.33503);
    crime.display();
    cout << endl;

    Crime crime2("Test 2", "Date", "Address", 29.6465, -82.3480);
    crime2.setDistance(29.69052, -82.33503);
    crime2.display();
    cout << endl;

    // Get all crimes recorded crimes in Gainesville with adequate data
    vector<Crime> crimes = getData("Crime_Responses.csv");
    crimes[0].display();

    return 0;
}