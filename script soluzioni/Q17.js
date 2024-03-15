const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q17.js" 17

console.clear();

const instrunctionList = createInstruction(fileData);

console.log(instrunctionList);

// #region LOGICS

    function confrontObjects(tickerTape, obj) {
        for (const property in obj) {
            if (property !== "aunt" && obj[property] !== null) {
                if (property == "cats" || property == "trees") {
                    if (obj[property] <= tickerTape[property]) {
                        return false;
                    }
                } else if (property == "pomeranians" || property == "goldfish") {
                    if (obj[property] >= tickerTape[property]) {
                        return false;
                    }
                } else if (obj[property] !== tickerTape[property]) {
                    return false;
                }
            }
        }
        return true;
    }

    function createObjectsList(stringList) {
        return stringList.map(x => {
            let pieces = (x.replace(/:/g, "").replace(",", "").replace("Sue ", "")).split(" ");

            return {
                aunt:  parseInt(pieces[0]),
                children: getValue(pieces, "children"), 
                cats: getValue(pieces, "cats"),
                samoyeds: getValue(pieces, "samoyeds"),
                pomeranians: getValue(pieces, "pomeranians"),
                akitas: getValue(pieces, "akitas"),
                vizslas: getValue(pieces, "vizslas"),
                goldfish: getValue(pieces, "goldfish"),
                trees: getValue(pieces, "trees"),
                cars: getValue(pieces, "cars"),
                perfumes: getValue(pieces, "perfumes")
            }
        })
    }

    function getValue(stringList, string) {
        let index = stringList.indexOf(string);
        
        if (index !== -1)
            return parseInt(stringList[index + 1]);
    
        return null;
    }

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion

