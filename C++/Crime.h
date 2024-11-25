#include <iostream>
using namespace std;

class Crime
{
private:
public:
    string narrative;
    string address;
    float longitude;
    float latitude;
    float distance;
    // int radius; // we may not need this right now

    // Default constructor
    Crime(string narrative, string address, float longitude, float latitude)
    {
        this->narrative = narrative;
        this->address = address;
        this->longitude = longitude;
        this->latitude = latitude;
    }

    // Updates distance
};