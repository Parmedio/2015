const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q12.js" 12

console.clear();

let json = createJson(fileData);
let stringListFromJson = jsonToStringList(json);

console.log(sumAllnumber01(stringListFromJson));
console.log(sumAllnumber02a(json));
console.log(sumAllnumber02b(json));

function sumAllnumber02b(json) {
    let stack = [json];
    let sum = 0;

    while (stack.length > 0) {
        let current = stack.pop();
        if (typeof current === 'object') {
            if (Array.isArray(current)) {
                stack.push(...current);
            } else {
                let hasRedProperty = Object.values(current).some(value => value === "red");
                if (!hasRedProperty) {
                    Object.values(current).forEach(value => {
                        stack.push(value);
                    });
                }
            }
        } else if (typeof current === 'number') {
            sum += current;
        }
    }

    return sum;
}

function sumAllnumber02a(json) {
    let sum = 0;
    if (typeof json === 'object') {
        if (Array.isArray(json)) {
            json.forEach(element => {
                sum += sumAllnumber02a(element);
            });
        } else {
            let hasRedProperty = Object.values(json).some(value => value === "red");
            if (!hasRedProperty) {
                Object.keys(json).forEach(key => {
                    sum += sumAllnumber02a(json[key]);
                });
            }
        }
    } else if (typeof json === 'number') {
        sum += json;
    }
    return sum;
}

function sumAllnumber01(list) {
    return list.reduce((acc, curr) => {
        let output = getNumberFromString(curr);
        if (output !== null) {
            acc += output;
        }
        return acc;
    }, 0);
}

function getNumberFromString(stringa) {
    const regex = /-?\d+/;
    const match = stringa.match(regex);

    if (match) {
        return parseInt(match[0]);
    } else {
        return null;
    }
}

function createJson(nomeFile) {
    let istruzioni = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    return JSON.parse(istruzioni);
}

function jsonToStringList(json) {
    let jsonString = JSON.stringify(json, null, 2);
    let rows = jsonString.split('\n');
    return rows.map(x => x.trim());
}