#include <iostream>
using namespace std;

struct Crime
{
    // String-based attributes
    string incident;
    string date;
    string address;

    // Float-based attributes
    float latitude;
    float longitude;

    // Calculated from longitude and latitude to user
    float distance;

    // Default constructor
    Crime(string incident, string date, string address, float latitude, float longitude)
    {
        this->incident = incident;
        this->date = date;
        this->address = address;
        this->latitude = latitude;
        this->longitude = longitude;
    }

    // Displays stored data
    void display()
    {
        cout << "Crime: " << incident << endl;
        cout << "Date: " << date << endl;
        cout << "Address: " << address << endl;
        cout << "(" << latitude << ", " << longitude << ")" << endl;
    }

    // Updates distance
};