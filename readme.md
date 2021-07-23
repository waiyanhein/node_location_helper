## Random location generator
Javascript package to generate random location(s) with a certain radius.

### Installation
- `npm install location-generator`



### Example usages
- Import the library/ package, `import LocationGenerator from 'location-generator'`
- Generating multiple random locations within a specified radius after importing the package.

```
LocationGenerator.generateLocationsWithinRange({
    withinRadiusInKm: 10,
    numOfLocations: 1,
    originalLatitude: 51.590998,
    originalLongitude: -0.1692847,
    minDistanceBetweenPoints: 1,
    locationsGenerated: [ ],
    callback: (locations) => {
        console.log(locations)
    }
})
```
