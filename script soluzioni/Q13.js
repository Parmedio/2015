const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q13.js" 13

console.clear();
let instrunctionList = createInstruction(fileData);
const neighborlyHappinessReport = createNeighborlyHappinessReport(instrunctionList);

// #region DEVELOP THEORY
    const list = ['a', 'b', 'm', 'd', 'p'];
    const n = list.length;
    const k = factorial(n)/n;
    const allShifts = createAllShiftsToRight(list);
    const allCombinations = createAllCombinations(list);
    const allSequences = createAllSequences(list);
    const sliceFirstKElements = allCombinations.slice(0,k);
    const filterOnlyForFirstElement = allCombinations.filter(x => x[0] == list[0]);
// #endregion

let allNames = findAllNames(neighborlyHappinessReport);

printMaxHappiness();

allNames.push("Parmedio");

printMaxHappiness();

// #region LOGICS

    function printMaxHappiness() {
        let allDisposition = createAllDispositions(allNames);
        let maxHappiness = allDisposition.reduce((max, x) => {
            const totale = calculateTotalHappiness(x, neighborlyHappinessReport);
            return totale > max ? totale : max;
        }, 0);

        console.log(maxHappiness);
    }

    function calculateTotalHappiness(disposition, report) {
        let totalHappiness = 0;
        let firstIndex = 0 ;
        let lastIndex = disposition.length - 1;
        let prev;
        let next;

        disposition.forEach(x => {
            let currentIndex = disposition.indexOf(x);

            if (currentIndex == firstIndex)
                prev = disposition[lastIndex]
            else
                prev = disposition[currentIndex - 1]
            
            if (currentIndex == lastIndex)
                next = disposition[firstIndex]
            else
                next = disposition[currentIndex + 1]

            report.forEach(y => {
                if (y.name === x && (y.neighbour === prev || y.neighbour === next)) {
                    if (y.isGain) {
                        totalHappiness += y.intensity;
                    } else {
                        totalHappiness -= y.intensity;
                    }
                }
            });
        });

        return totalHappiness;
    }

    function findAllNames(list) {
        const names = [];
        list.forEach(item => {
            if (!names.includes(item.name)) {
                names.push(item.name);
            }
        });
        return names;
    }

    function createNeighborlyHappinessReport(list) {
        return list.map(x => x.split(" ")).map(x => ({
            name: x[0],
            isGain: x[2] === "gain",
            intensity: parseInt(x[3]),
            neighbour: x[10].replace(".", "")
        }));
    }

    function createInstruction(nomeFile) {
        return fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8')
            .split('\n')
            .map(element => 
                element.replace('\r', '')
            );
    };

    function createAllDispositions(nameList) {
        let result = [[nameList[0]]];
        let currentCumulation = [];
        const timeToIterate = nameList.length - 1;

        for (let i = 1; i <= timeToIterate; i++) {
            result.forEach(element => {
                nameList.forEach(x => {
                    if (!element.includes(x))
                        currentCumulation.push([...element, x]);
                });
            });

            result = currentCumulation;
            currentCumulation = [];
        }

        return result;
    }

    function createAllSequences(elementList) {
        let result = [elementList[0]];
        let currentCumulation = [];
        const timeToIterate = elementList.length - 1;

        for (let i = 1; i <= timeToIterate; i++) {
            result.forEach(element => {
                elementList.forEach(x => {
                    if (!element.includes(x))
                        currentCumulation.push([...element, x]);
                })
            })

            result = currentCumulation;
            currentCumulation = [];
        }

        return result;
    }

    function createAllCombinations(elementList) {
        let result = elementList.map(x => [x]);
        let currentCumulation = [];
        const timeToIterate = elementList.length - 1;

        for (let i = 1; i <= timeToIterate; i++) {
            result.forEach(element => {
                elementList.forEach(x => {
                    if (!element.includes(x))
                        currentCumulation.push([...element, x]);
                })
            })

            result = currentCumulation;
            currentCumulation = [];
        }

        return result;
    }

    function createAllShiftsToRight(list) {
        let variants = [];
        const n = list.length;

        for (let i = 0; i < n; i++) {
            const variant = [];
            for (let j = i; j < i + n; j++) {
                variant.push(list[j % n]);
            }
            variants.push(variant);
        }

        return variants;
    }

    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        } else {
            return n * factorial(n - 1);
        }
    }

// #endregion