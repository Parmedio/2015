const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

let quesitoDirectory = `./testo domande/${fileData}.txt`;
let istruzioni = fs.readFileSync(quesitoDirectory);

const move = String(istruzioni)
const a = move.length

let pianoCorrente = 0
let step = 0
let already = false;

for (let i = 0; i <= a; ++i) {
  if (move[i] == '(') {
    pianoCorrente++;
  } else {
    pianoCorrente--;
  };
  step++;

  if(pianoCorrente === -1 && already === false) {
    console.log(`Sono entrato al ${step} passo`);
    already = true;
  }
}

//console.time('cronos')
//console.timeEnd('cronos')

// RISPOSTA ANDREI

function andreiQ02() {
  fs.readFile(quesitoDirectory, (err, data) => {
    console.time('tempo svolgimento Q2');
    if (err) {
        console.log('qualcosa è andato storto: ' + err);
    } else {
      const moves = String(data).split('');
      let currentFloor = 0
      let currentPosition = 0
      moves.some((currentItem) => {
        if (currentItem === '(')
          currentFloor += 1 
        else if (currentItem === ')')
          currentFloor -= 1
        
          currentPosition ++
        
          return currentFloor < 0;
      })
      console.log('basement enter at: ' + currentPosition)
    } 
    console.timeEnd('tempo svolgimento Q2');
  })
}

andreiQ02()

// => cd 'C:\Users\marco\coding\advent of code'
// => node "script soluzioni/Q01.2.js" 01