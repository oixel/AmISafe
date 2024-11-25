#include "Crime.h"
#include <vector>
#include <fstream>

using namespace std;

vector<Crime> GetData(string filepath)
{
    vector<Crime> crimes = {};

    ifstream file;
    file.open(filepath);

    string line = "";
    while (getline(file, line))
    {
        Crime newCrime("Test", "Test", 0, 0);
        crimes.push_back(newCrime);
    }

    return crimes;
}

int main()
{
    vector<Crime> crimes = GetData("Crime_Responses.csv");
    cout << crimes.size() << endl;
    return 0;
}