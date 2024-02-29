const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q09.js" 09

let rows = splitInstructions(fileData);
let orderedRoutes = createRoutes(rows).sort(function(a, b) {
    return parseInt(b.distance) - parseInt(a.distance);
});

for (let i = 0; i < orderedRoutes.length; i++) {
    if (itSOkToRemove(orderedRoutes[i], orderedRoutes)) {
        orderedRoutes.splice(i, 1); // Rimuovi l'elemento corrente
        i--; // Decrementa l'indice per compensare la rimozione dell'elemento
    }
}

console.log(orderedRoutes);


function checkCityCounts(obj) { // OK
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

    return citiesWithOne <= 2 && citiesWithTwoOrMore >= Object.keys(obj).length - 2;
}

function areObjectsEqual(obj1, obj2) { // OK
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

    copiedList = copiedList.filter(obj => areObjectsEqual(obj, objToRemove));

    return checkCityCounts(trackAllCities(copiedList));
}

function trackAllCities(list) { // OK
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

function createRoutes(list) { // OK
    return list.map(x => {
        let rowParts = x.split(' ');
        return {
            cityDep : rowParts[0],
            cityArr : rowParts[2],
            distance : rowParts[4]
        }     
    })
};

function splitInstructions(nomeFile) {
    let instructions = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    let rows = instructions.split('\n');
    return rows.map(x => x.replace('\r', ''));
};


// ho sbagliato completamente logica, devo partire dal basso, aggiungere e fare il test
// appena ottengo una situazione con requisiti minimi devo togliere superfluo 

// in realtà potrebbe essere sufficiente scremare comunque dall'alto e scendere fino alla fine
