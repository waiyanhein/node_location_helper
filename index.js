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

let firstLocation = generateRandomLocationWithinRadius(2000, 51.590998, -0.1692847);
let secondLocation = generateRandomLocationWithinRadius(2000, 51.590998, -0.1692847);

let distance = calcCrow(firstLocation.latitude, firstLocation.longitude, secondLocation.latitude, secondLocation.longitude)

console.log(`First location ${firstLocation.latitude}, ${firstLocation.longitude}`)
console.log(`Second location ${secondLocation.latitude}, ${secondLocation.longitude}`)
console.log(`Distance is ${distance}`)
