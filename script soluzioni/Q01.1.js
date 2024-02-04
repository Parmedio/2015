// 1) scaricare l'informazione dal sito (...non serviva lol!)

// 2) ottengo un iterabile... che devo solo leggere allora! (https://askjavascript.com/javascript-array-count-example/ => guarda 'creating count() prototype')

// node Q01.1.js 01 => comando scritto in console terminale

const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

let quesitonDirectory = `./testo domande/${fileData}.txt`;

let istruzioni = fs.readFileSync(quesitonDirectory);

const mosse = String(istruzioni).split('');
const a = mosse.length;
//console.log(mosse)
//console.log(a)

// METODO 1 (funziona anche senza split('')!)
let countOpen = 0
for (let i = 0; i < a; ++i) {
 if (mosse[i] == '(')
 countOpen++;
}
//console.log(countOpen)

// METODO 2 (da errore se togli split('')!)
let countClose = mosse.filter(x => x == ')').length
//console.log(countClose)

// METODO 3 (con accumulatore)
const answer = mosse.reduce((acc, currentValue) => {
  if (currentValue === '(') {return acc += 1} 
  else if (currentValue === ')') {return acc -= 1}
}, 0)
console.log('reduce ' + answer)

console.log('differenza ' + (countOpen - countClose))

//console.time('cronos')
//console.timeEnd('cronos')

// trovata la lunghezza della array e quante volte compare uno dei 2 simboli basta fare |[(a/2)-conteggio di uno dei 2 simboli]*2|

// 3) trovare modo per calcolare il piano risultante
// 3.a) per ogni elemento aggiungo +- 1 ad una lista che creo a seconda che trovi ( o ). Poi faccio la somma di tutti gli elementi appartenenti alla nuova lista creata (scarto perché richiede di occupare memoria)
// 3.b) dare come indice di partenza 0 e +- 1 se ( o ) (buono)
// 3.c) contare quanti ( e quanti ) e fare la differenza (migliore)

// https://adventofcode.com/2015

// RISPOSTA ANDREI

function andreiQ01() {
  fs.readFile(quesitonDirectory, (err, data) => {
    console.time('tempo svolgimento Q1');
    if (err) {
        console.log('qualcosa è andato storto: ' + err);
    } else {
      const moves = String(data).split('');
      const resultingFloor = moves.reduce((acc, currentValue) => {
        if (currentValue === '(') {return acc += 1} 
        else if (currentValue === ')') {return acc -= 1}
      }, 0)
      console.log('Santa arrived at floor ' + resultingFloor + '.')
    }
    console.timeEnd('tempo svolgimento Q1');
  })
}

andreiQ01()

// => cd 'C:\Users\marco\coding\advent of code'
// => node Q01.1 '01'