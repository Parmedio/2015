const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q09.js" 09

//#region COMMON LOGIC

    console.clear();
    let rows = splitInstructions(fileData);
    let routes = createRoutes(rows);
    const totalNumberOfCities = Object.keys(trackAllCities(routes)).length;
    const listOfCities = Object.keys(trackAllCities(routes));
    // console.log(totalNumberOfCities);
    // console.log(listOfCities);

//#endregion

//#region PART 01

    //#region ATTEMPT 01

        // let orderedRoutes = orderRoutesByDistance(routes, "desc");
        // let shortestPaths = scrumRoutes(orderedRoutes);
        // let shortestWay = computePathsDistanceSum(shortestPaths);

        // console.log(shortestPaths);
        // console.log(trackAllCities(shortestPaths));
        // console.log(shortestWay);

    //#endregion

    //#region ATTEMPT 02

        // let orderedRoutes = orderRoutesByDistance(routes, "asc");
        // let citiesAlreadyLinked = [];
        // let citiesToLink = [];
        // let pickedRoutes = [];

        // orderedRoutes.forEach(route => {
        //     if (pickedRoutes.length == 0) {
        //         citiesToLink.push(route.cityDep);
        //         citiesToLink.push(route.cityArr);
        //         pickedRoutes.push(route);

        //     } else if (citiesToLink.includes(route.cityDep) && !citiesToLink.includes(route.cityArr) && !citiesAlreadyLinked.includes(route.cityArr)) { 
        //         citiesToLink.splice(citiesToLink.indexOf(route.cityDep), 1)
        //         citiesAlreadyLinked.push(route.cityDep)
        //         citiesToLink.push(route.cityArr);
        //         pickedRoutes.push(route);

        //     } else if (citiesToLink.includes(route.cityArr) && !citiesToLink.includes(route.cityDep) && !citiesAlreadyLinked.includes(route.cityDep)) { 
        //         citiesToLink.splice(citiesToLink.indexOf(route.cityArr), 1)
        //         citiesAlreadyLinked.push(route.cityArr)
        //         citiesToLink.push(route.cityDep);
        //         pickedRoutes.push(route);
        //     }
        // })
        
        // console.log(citiesAlreadyLinked);
        // console.log(citiesToLink)
        // console.log(pickedRoutes);

    //#endregion

    //#region ATTEMPT 03

        const allPossibleCombination = permute(listOfCities);
        let shortestPathLength = findShortestPathLength(allPossibleCombination);
        console.log(shortestPathLength);

    //#endregion

//#endregion

//#region PART 02

    //#region ATTEMPT 03

        // let longhestPathLength = findLonghestPathLength(allPossibleCombination);
        // console.log(longhestPathLength);

    //#endregion

//#endregion

//#region LOGIC SECTION

function findLonghestPathLength(listOfCombination) {
    let longhest = 0;

    listOfCombination.forEach(curr => {
        let pathLength = calculatePathLength(curr, routes)
        
        if (longhest == 0 || longhest < pathLength)
            longhest = pathLength
    });
    
    return longhest;
}

function findShortestPathLength(listOfCombination) {
    let shortest = 0;

    listOfCombination.forEach(curr => {
        let pathLength = calculatePathLength(curr, routes)
        
        if (shortest == 0 || shortest > pathLength)
            shortest = pathLength
    });
    
    return shortest;
}

function permute(elementList) {
    const result = [];

    function generate(currentPermutation, remainingArray) {
        if (remainingArray.length === 0) {
            result.push(currentPermutation);
            return;
        }

        for (let i = 0; i < remainingArray.length; i++) {
            const newPermutation = currentPermutation.concat(remainingArray[i]);
            const newArray = [...remainingArray.slice(0, i), ...remainingArray.slice(i + 1)];
            generate(newPermutation, newArray);
        }
    }

    generate([], elementList);

    return result;
}

function calculatePathLength(path, routes) {
    let totalDistance = 0;

    for (let i = 0; i < path.length - 1; i++) {
        const cityDep = path[i];
        const cityArr = path[i + 1];
        
        for (const route of routes) {
            if ((route.cityDep === cityDep && route.cityArr === cityArr) ||
                (route.cityDep === cityArr && route.cityArr === cityDep)) {
                totalDistance += route.distance;
                break;
            }
        }
    }

    return totalDistance;
}

function computePathsDistanceSum(pathList){
    return pathList.reduce((acc, path) => {
        acc += path.distance;
        return acc;
    }, 0);
}

function scrumRoutes(list){
    let copiedList = [...list];
    
    for (let i = 0; i < copiedList.length; i++) {
        if (itSOkToRemove(copiedList[i], copiedList)) {
            copiedList.splice(i, 1);
            i--;
        }
    }
    
    return copiedList;
}

function orderRoutesByDistance(list, way){
    return list.sort(function(a, b) {
        if (way == "desc")
            return b.distance - a.distance;
        if (way == "asc")
            return a.distance - b.distance;
    });
}

function canBuildPath(routeList) {
    // logic that verify if can build a path among all cities
    return true;
}

function checkCityCounts(obj) {
    let citiesWithOne = 0;
    let citiesWithTwoOrMore = 0;

    for (let city in obj) {
        if (obj[city] < 2) {
            citiesWithOne++;
        }
        else if (obj[city] >= 2) {
            citiesWithTwoOrMore++;
        }
    }

    let test = 
        citiesWithOne <= 2 && 
        citiesWithTwoOrMore >= totalNumberOfCities - 2 && 
        citiesWithOne + citiesWithTwoOrMore == totalNumberOfCities;

    return test;
}

function areObjectsEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

function itSOkToRemove(objToRemove, list){
    let copiedList = [...list];

    copiedList = copiedList.filter(obj => !areObjectsEqual(obj, objToRemove));

    return checkCityCounts(trackAllCities(copiedList)) && canBuildPath(copiedList);
}

function trackAllCities(list) {
    let uniqueCities = new Set();
    
    list.forEach(route => {
        uniqueCities.add(route.cityDep);
        uniqueCities.add(route.cityArr);
    });

    let uniqueCitiesArray = Array.from(uniqueCities);

    return uniqueCitiesArray.reduce((acc, city) => {
        acc[city] = list.reduce((acc, route) => {
            if (route.cityDep == city)
                acc++;
            if (route.cityArr == city)
                acc++;
            return acc;
        }, 0);
        return acc;
    }, {});
};

function createRoutes(list) {
    return list.map(x => {
        let rowParts = x.split(' ');
        return {
            cityDep : rowParts[0],
            cityArr : rowParts[2],
            distance : parseInt(rowParts[4])
        }     
    })
};

function splitInstructions(nomeFile) {
    let instructions = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    let rows = instructions.split('\n');
    return rows.map(x => x.replace('\r', ''));
};

//#endregion