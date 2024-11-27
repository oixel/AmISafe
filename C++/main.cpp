// #include <iostream>
// #include "Crime.h"
// #include "MinHeap.h"
// #include "HashMap.h"
// #include <chrono>
// #include <vector>
// #include "handleData.cpp"
// using namespace std;


// int main()
// {
//     // user input: get user's latitude and longitude?
//     // string userLatString;
//     // cin >> userLatString;
//     // float userLat = stof(userLatString);

//     // string userLongString;
//     // cin >> userLongString;
//     // float userLong = stof(userLongString);

//     // Distance testing
//     // Crime crime("Test", "Date", "Address", 29.6465, -82.3480);
//     // crime.setPreciseDistance(29.69052, -82.33503);
//     // crime.display();
//     // cout << endl;

//     // Crime crime2("Test 2", "Date", "Address", 29.6465, -82.3480);
//     // crime2.setDistance(29.69052, -82.33503);
//     // crime2.display();
//     // cout << endl;

//     // Get all crimes recorded crimes in Gainesville with adequate data
//     vector<Crime> crimes = getData("Crime_Responses.csv");
//     // crimes[0].display();
//     // cout << crimes.size() << endl;

//     // Create min heap and fill it with all crime data

//     const float RADIUS = 10.0;
//     auto start = std::chrono::high_resolution_clock::now();
//     MinHeap minheap1(crimes);
//     cout << "Min heap size: " << minheap1.minHeap.size() << endl;
//     cout << "Crimes in " << RADIUS << " mile radius: " << minheap1.getCrimesInRange(RADIUS).size() << endl;
//     auto end = std::chrono::high_resolution_clock::now();
//     std::chrono::duration<double> elapsed = end - start;

//     std::cout << "Elapsed time: " << elapsed.count() << " seconds" << std::endl;

//     // Create hash map and fill it with all crime data
//     auto start2 = std::chrono::high_resolution_clock::now();
//     HashMap hashTable(207, crimes);
//     cout << hashTable.entries << endl;
//     cout << "Crimes in " << RADIUS << " mile radius: " << hashTable.getCrimesInRange(RADIUS).size() << endl;
//     auto end2 = std::chrono::high_resolution_clock::now();
//     std::chrono::duration<double> elapsed2 = end2 - start2;
//     std::cout << "Elapsed time: " << elapsed2.count() << " seconds" << std::endl;

//     return 0;
// }