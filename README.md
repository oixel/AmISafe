## Am I Safe?

This project helps visualize crimes across Gainesville through a map interface. Born out of a desire to find safe places in apartment hunting, this project helps students and other Gainesville residents understand their safety from a large database of crimes in Gainesville from 2010-present. Additionally, various filters are present to help narrow searches.

## How To Use
Our project can be accessed through the following link: www.amisaferightnow.com

_NOTE:_
Our initial code for testing functionality and development can be viewed in the OldFiles folder. This folder contains two subfolders: C++ and TestingSite. C++ contains our first attempt at creating data structures to handle the crime data. Meanwhile, the TestingSite folder contains our original code for parsing through the CSV data using JavaScript.

## Technologies Used
HTML, CSS, JavaScript, Leaflet JavaScript Library

Our project uses HTML and CSS to support the design and visual elements, while JavaScript is used to parse crime data and display it. The Leaflet JavaScript Library enables our interactive map features for visualizing crime locations.

## Optimizations/Data Stuctures Used 
As part of our Data Structures & Algorithms course, we aimed to compare two data structures: Min Heap and Hash Table. The Min Heap stores crime objects sorted by the distances between the user's location and the crimes (with the closest crimes near the root). The Hash Table stores crime objects, each containing its distance to the user. We compared their time complexity using both the "stopwatch method" and Big O analysis. Users can click the settings button in the top right and toggle the timer button to observe how long it takes for the crime results to load.

## Lessons Learned:

