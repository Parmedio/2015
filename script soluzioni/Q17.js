const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q17.js" 17

console.clear();

const litersToStore = 150;
const containersList = createInstruction(17).map(x => parseInt(x));
const allStorageCombination = calculateAllStorageCombination(containersList, litersToStore);

console.log (allStorageCombination.length);

const ContainersUsedInAllcombination = allStorageCombination.map(x => Object.keys(x).length)
const minNumberOfContainer = Math.min(...ContainersUsedInAllcombination);

console.log (ContainersUsedInAllcombination.filter(x => x === minNumberOfContainer).length);

// #region LOGICS

    function getMaxKeyNumber(obj) {
        const keys = Object.keys(obj).map(Number);
        return Math.max(...keys);
    }

    function createDictionary(numbers) {
        const dictionary = {};
        numbers.forEach((num, index) => {
            dictionary[index] = num;
        });
        return dictionary;
    }

    function sumAllNumbersInDictionary(dict) {
        let sum = 0;
        for (const key in dict) {
            sum += dict[key];
        }
        return sum;
    }
    
    function calculateAllStorageCombination(containersList, litersToStore) {
        console.time('calculateAllStorageCombination');
        const dictionary = createDictionary(containersList);
        const containersListLength = containersList.length;
        let result = [];
        
        for (let i = 0; i < containersListLength; i++) {
            let currentCumulationOfIndexCombination = [{ [i]: dictionary[i] }];
            let nextCumulationOfIndexCombination = [];
            
            for (let k = i + 1; k < containersListLength; k++) {

                currentCumulationOfIndexCombination.forEach(x => {
                    
                    for (let key in dictionary) {
                        let current = { ...x }; 
                        let parsedKey = parseInt(key);
                        
                        if (parsedKey >= getMaxKeyNumber(current) && !(parsedKey in current)) {
                            current[parsedKey] = dictionary[parsedKey];

                            let sumOfAllNumber = sumAllNumbersInDictionary(current);

                            if (sumOfAllNumber < litersToStore)
                                nextCumulationOfIndexCombination.push(current);

                            if (sumOfAllNumber == litersToStore)
                                result.push(current);
                        }
                    }
                })

                currentCumulationOfIndexCombination = nextCumulationOfIndexCombination;
                nextCumulationOfIndexCombination = [];
            }
        }
        console.timeEnd('calculateAllStorageCombination');
        return result;
    }

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion