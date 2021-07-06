// radius must be in meters
const generateRandomLocationWithinRadius = (radius, originalLat, originalLong) => {
    var r = radius/111300 // = 100 meters
        , y0 = originalLat
        , x0 = originalLong
        , u = Math.random()
        , v = Math.random()
        , w = r * Math.sqrt(u)
        , t = 2 * Math.PI * v
        , x = w * Math.cos(t)
        , y1 = w * Math.sin(t)
        , x1 = x / Math.cos(y0)

    let newY = y0 + y1
    let newX = x0 + x1

    return {
        longitude: newX,
        latitude: newY
    }
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calcCrow = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // km
    let dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
}

// Converts numeric degrees to radians
const toRad = (Value) => {
    return Value * Math.PI / 180;
}

// function to generate the locations specifying the minimum distance between locations
// distance is in km
// this function can consume too much memory space
// num of locations must be minimum 2
// min distance needs to be min 1
// within range needs to be greater than min distance
// NOTE: within radius is in meters whereas min distance is in km
const generateLocationsWithinRange = (withinRadius, numOfLocations, originalLatitude, originalLongitude, minDistanceBetweenPoints, locationsGenerated, callback) => {
    if (locationsGenerated.length == numOfLocations) {
        return locationsGenerated;
    }

    let tempGeneratedLocations = [ ...locationsGenerated ];

    let generatedLocation = generateRandomLocationWithinRadius(withinRadius, originalLatitude, originalLongitude);

    // if the location is generated for the first time
    if (locationsGenerated.length < 1) {
        tempGeneratedLocations.push(generatedLocation);

        generateLocationsWithinRange(withinRadius, numOfLocations, originalLatitude, originalLongitude, minDistanceBetweenPoints, tempGeneratedLocations, callback);
    } else {
        // check if the generated location very close to the other generated locations
        let isCloseToOthers = false;
        for (let i= 0; i < locationsGenerated.length; i++) {
            let distance = calcCrow(generatedLocation.latitude, generatedLocation.longitude, locationsGenerated[i].latitude, locationsGenerated[i].longitude);
            if (distance < minDistanceBetweenPoints) {
                // invalid
                isCloseToOthers = true;
                break;
            }
        }

        if (isCloseToOthers) {
            // generate the location again cos it is too close
            generateLocationsWithinRange(withinRadius, numOfLocations, originalLatitude, originalLongitude, minDistanceBetweenPoints, tempGeneratedLocations, callback);
        } else {
            tempGeneratedLocations.push(generatedLocation);

            if (tempGeneratedLocations.length >= numOfLocations) {
                // already got enough locations
                callback(tempGeneratedLocations);
            } else {
                // generate another location cos it needs more
                generateLocationsWithinRange(withinRadius, numOfLocations, originalLatitude, originalLongitude, minDistanceBetweenPoints, tempGeneratedLocations, callback);
            }
        }
    }
}

let firstLocation = generateRandomLocationWithinRadius(2000, 51.590998, -0.1692847);
let secondLocation = generateRandomLocationWithinRadius(2000, 51.590998, -0.1692847);

let distance = calcCrow(firstLocation.latitude, firstLocation.longitude, secondLocation.latitude, secondLocation.longitude);

console.log(`First location ${firstLocation.latitude}, ${firstLocation.longitude}`)
console.log(`Second location ${secondLocation.latitude}, ${secondLocation.longitude}`)
console.log(`Distance is ${distance}`)

generateLocationsWithinRange(10000, 3, 51.590998, -0.1692847, 1, [], (locations) => {
    console.log(locations);
});
