const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q08.js" 08

const patternNotazioneHexadecimal = /\\x[a-fA-F\d]{2}/g;
const patternSingleBackslash = /\\\\/g;
const patternLoneDoubleQuote = /\\\"/g;

const listaCostanti = [
    patternNotazioneHexadecimal,
    patternSingleBackslash,
    patternLoneDoubleQuote
];

let listaStringhe = separaIstruzioni(fileData);

const totaleLiterals = listaStringhe.reduce((acc, string) => acc + contaLiterals(string), 0);
const totaleInMemory = listaStringhe.reduce((acc, string) => acc + contaMemory(string), 0);
const totaleEncoding = listaStringhe.reduce((acc, string) => acc + contaEncoding(string), 0);

console.log(`\ncaratteri literal ----- ${totaleLiterals}\ncaratteri in memory --- ${totaleInMemory}\ndifferenza ------------ ${totaleLiterals - totaleInMemory}`);
console.log(`\ncaratteri encoding ---- ${totaleEncoding}\ncaratteri literal ----- ${totaleLiterals}\ndifferenza ------------ ${totaleEncoding - totaleLiterals}`);
console.log();

function contaPattern(testo, pattern) {
    let risultati = testo.match(pattern) || [];
    return risultati.length;
}

function rimuoviPattern(testo, pattern) {
    let nuovoTesto = testo.replace(pattern, '');
    return nuovoTesto;
}

function rimuoviVirgolette(stringa) {
    let stringaSenzaVirgolette = stringa.slice(1, -1);
    return stringaSenzaVirgolette;
}

function contaMemory(string) {
    let totale = 0;
    let currentText = rimuoviVirgolette(string);

    listaCostanti.forEach(pattern => {
        totale += contaPattern(currentText, pattern);
        currentText = rimuoviPattern(currentText, pattern);
    });
    totale += contaLiterals(currentText);

    return totale;
}

function contaLiterals(string) {
    return string.length;
}

function contaEncoding(string) {
    return JSON.stringify(string).length;
}

function separaIstruzioni(nomeFile) {
    let istruzioni = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    let movimenti = istruzioni.split('\n');
    return movimenti.map(element => element.replace('\r', ''));
}