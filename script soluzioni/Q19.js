const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q19.js" 19

console.clear();

const containersList = createInstruction(fileData);

console.log(containersList);

// #region LOGICS

    

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion