#include <iostream>
#include <unordered_map>
using namespace std;

class Crime
{
private:
public:
    unordered_map<string, string> data;

    // int radius; // we may not need this right now

    // Default constructor
    Crime(unordered_map<string, string> data)
    {
        this->data = data;
    }

    // Displays stored data
    void display()
    {
        cout << "Crime: " << data["incident"] << endl;
        cout << "Date: " << data["offense_date"] << endl;
        cout << "Address: " << data["address"] << endl;
        cout << "(" << data["latitude"] << ", " << data["longitude"] << ")" << endl;
    }

    // Updates distance
};