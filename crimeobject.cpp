#include <iostream>
using namespace std;
// something

class crimeObject{
public:
float longitude;
float latitude;
int radius; // we may not need this right now
float calculatedDistance;
string address;
string narrative;

crimeObject(float longitude, float latitude, string address, string narrative){
    this->longitude = longitude;
    this->latitude = latitude;
    this->address = address;
    this->narrative = narrative;
}

};

float calculatedDistance(float longitude, float latitude){
    float distance;
    float originLongitude = 29.6465; // origin is the location of user: reitz union for this example
    float originLatitude = 82.3480; 

    // calculate difference between origin & passed in coordinates

    double dLat = (lat2 - lat1) *
               M_PI / 180.0;
    double dLon = (lon2 - lon1) * 
                    M_PI / 180.0;

    // convert to radians
    lat1 = (lat1) * M_PI / 180.0;
    lat2 = (lat2) * M_PI / 180.0;

    // apply formulae
    double a = pow(sin(dLat / 2), 2) + 
                pow(sin(dLon / 2), 2) * 
                cos(lat1) * cos(lat2);
    double rad = 6371;
    double c = 2 * asin(sqrt(a));
    return rad * c;


    // convert km into miles
    return distance;
}


int main(){
    cout << "Hello World" << endl;
    return 0;
}
