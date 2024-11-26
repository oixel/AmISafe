#include "Crime.h"
#include <vector>
#include <fstream>
#include <sstream>
#include <unordered_map>

using namespace std;

// Stores the different field names present in the data
vector<string> fields = {
    "id",
    "incident",
    "report_date",
    "offense_date",
    "report_hour",
    "report_weekday",
    "offense_hour",
    "offense_weekday",
    "city",
    "state",
    "address",
    "latitude",
    "longitude",
    "location",
};

unordered_map<string, string> split(string str)
{
    stringstream stream(str);
    vector<string> data;

    string value = "";
    while (getline(stream, value, ','))
    {
        data.push_back(value);
    }

    unordered_map<string, string> mappedData;
    for (int i = 0; i < fields.size(); i++)
    {
        mappedData[fields[i]] = data[i];
    }

    return mappedData;
}

vector<Crime> getData(string filepath)
{
    vector<Crime> crimes = {};

    ifstream file;
    file.open(filepath);

    string line = "";

    // Ignore first line since it is the unformatted field names
    getline(file, line);

    // Loops through all data in CSV files
    while (getline(file, line))
    {
        unordered_map<string, string> data = split(line);

        if (data["latitude"].empty() || data["longitude"].empty())
            continue;

        Crime newCrime(data);
        crimes.push_back(newCrime);
    }

    return crimes;
}

int main()
{
    vector<Crime> crimes = getData("Crime_Responses.csv");
    crimes[0].display();
    return 0;
}