const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q13.js" 13

console.clear();
let instruntionList = createInstruction(fileData);
console.log(instruntionList);

function createInstruction(nomeFile) {
    return fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8')
        .split('\n')
        .map(element => 
            element.replace('\r', '')
        );
}