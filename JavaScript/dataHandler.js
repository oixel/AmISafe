//
class Crime {
    constructor(incident, date, address, latitude, longitude) {
        this.incident = incident;
        this.date = date;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.distance = -1;
    }

    setDistance(userLat, userLong) {
        var latMiles = (userLat - this.latitude) * 69;      // 1 degree latitude coordinate = 69 miles
        var longMiles = (userLong - this.longitude) * 54.6; // 1 degree longitude coordinate = 54.6 miles

        // Calculate distance using distance formula: sqrt((x2 - x1)^2 + (y2 - y1)^2)
        this.distance = Math.sqrt(latMiles ** 2 + longMiles ** 2);
    }
}

// 
function parse(data) {
    const lines = data.split("\n");

    // Remove first line since it just contains columns names
    lines.splice(0, 1);

    var crimes = [];

    lines.forEach((line) => {
        var data = line.split(",");

        // Only adds crime if latitude and longitude data is provided
        if (parseFloat(data[11]) && parseFloat(data[12])) {
            var crime = new Crime(data[1], data[3], data[10], data[11], data[12]);
            crime.setDistance(29.69052, -82.33503);
            crimes.push(crime);
        }
    });

    return crimes;
}

//
async function getCrimeData(filepath) {
    const crimes = fetch(filepath)
        .then(file => file.text())
        .then(data => parse(data));

    return crimes;
}

async function main() {
    var crimes = await getCrimeData("../Crime_Responses.csv");
    console.log(crimes);
}

main()