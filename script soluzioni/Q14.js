const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q14.js" 14

console.clear();

let instrunctionList = createInstruction(fileData);

console.log(instrunctionList);

// #region LOGICS

    function createInstruction(nomeFile) {
        return fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8')
            .split('\n')
            .map(element => 
                element.replace('\r', '')
            );
    };

// #endregion