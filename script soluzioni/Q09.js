const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q09.js" 09

let listaStringhe = separaIstruzioni(fileData);

console.log(listaStringhe);

function separaIstruzioni(nomeFile) {
    let istruzioni = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    let movimenti = istruzioni.split('\n');
    return movimenti.map(element => element.replace('\r', ''));
}