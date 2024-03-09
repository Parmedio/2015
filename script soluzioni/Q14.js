const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q14.js" 14

console.clear();

const timeFirstRace = 2503

let instrunctionList = createInstruction(fileData);
let objecstList = createObjecstList(instrunctionList);
executeRace(objecstList, timeFirstRace);

console.log(findMaxOfProperty(objecstList, 'DistanceTravelled'));
console.log(findMaxOfProperty(objecstList, 'Score'));

// #region LOGICS

    function executeRace(listParticipants, raceTime){
        for (let i = 1; i <= raceTime; i++) {
            listParticipants.forEach(x => {
                x.CycleTime ++;
                if (x.CycleTime <= x.RunFor)
                    x.DistanceTravelled += x.Speed
                else if (x.CycleTime >= x.RunFor + x.RestFor)
                    x.CycleTime = 0 
            })

            let indexOfLeads = findIndexOfWhoIsLeadingOnProperty (listParticipants, 'DistanceTravelled');
            indexOfLeads.forEach(x => listParticipants[x].Score ++)
        }
    }

    function findMaxOfProperty(objectList, property) {
        return Math.max(...objectList.map(obj => obj[property]));
    }

    function findIndexOfWhoIsLeadingOnProperty (listParticipants, property){
        let propertyMaxValue = findMaxOfProperty(listParticipants, property)

        return listParticipants
            .map((obj, index) => ({ obj, index }))
            .filter(({ obj }) => obj[property] === propertyMaxValue)
            .map(({ index }) => index);
    }

    function createObjecstList(puzzleList) {
        return puzzleList.map(x => x.split(" ")).map(x => ({
            Name: x[0],
            Speed: parseInt(x[3]),
            RunFor: parseInt(x[6]),
            RestFor: parseInt(x[13]),
            CycleTime: 0,
            DistanceTravelled:0,
            Score: 0
        }))
    }

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion