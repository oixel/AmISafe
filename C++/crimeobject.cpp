#include <iostream>
#include <cmath>
using namespace std;
// something

float calculatedDistance(float lat2, float lon2)
{
    // citation: https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
    float distance;
    float lat1 = 29.6465; // origin is the location of user: reitz union for this example
    float lon1 = -82.3480;

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
    return distance;
}

int main()
{
    cout << "Hello World" << endl;
    cout << calculatedDistance(29.69052, -82.33503) << endl;
    return 0;
}
