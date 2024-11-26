// Citation for distance formula: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/

#include <iostream>
#include <cmath>
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

    // Calculated from longitude and latitude to inputted location
    float distance = -1.0;

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
        // Output basic crime data
        cout << "Crime: " << incident << endl;
        cout << "Date: " << date << endl;
        cout << "Address: " << address << endl;
        cout << "(" << latitude << ", " << longitude << ")" << endl;

        // Outputs distance if one has been calculated
        if (distance)
            cout << "Distance from user: " << distance << endl;
    }

    // Updates distance of crime from inputted coordinate
    void setDistance(float lat2, float lon2)
    {
        float lat1 = latitude; // origin is the location of user: reitz union for this example
        float lon1 = longitude;

        // calculate difference between origin & passed in coordinates

        double dLat = (lat2 - lat1) *
                      M_PI / 180.0;
        double dLon = (lon2 - lon1) *
                      M_PI / 180.0;

        // convert to radians
        lat1 = (lat1)*M_PI / 180.0;
        lat2 = (lat2)*M_PI / 180.0;

        // apply formulae
        double a = pow(sin(dLat / 2), 2) +
                   pow(sin(dLon / 2), 2) *
                       cos(lat1) * cos(lat2);
        double rad = 6371;
        double c = 2 * asin(sqrt(a));
        float km = rad * c;

        // convert km into miles
        distance = km * 0.621371;
    }

    // Gets distance of this crime from inputted coordinate
    // void setDistance(float userLat, float userLong)
    // {
    //     double latMiles = (userLat - latitude) * 69;      // 1 degree latitude coordinate = 69 miles
    //     double longMiles = (userLong - longitude) * 54.6; // 1 degree longitude coordinate = 54.6 miles

    //     // Calculate distance using distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
    //     distance = sqrt(pow(latMiles, 2) + pow(longMiles, 2));
    // }
};