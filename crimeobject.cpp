#include <iostream>
using namespace std;

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


    // convert km into miles
    return distance;
}


int main(){
    cout << "Hello World" << endl;
    return 0;
}
