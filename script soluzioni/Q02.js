const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

let quesitonDirectory = `./testo domande/${fileData}.txt`;

const formattaDatiPerCalcoli = (StringheDiMisurePacchi) => {
  let pacchi = StringheDiMisurePacchi.split('\n');
  pacchi = pacchi.map(e => e.replace('\r', ''));
  pacchi = pacchi.map(e => e.split('x'));
  pacchi = pacchi.map(e => e.map(n => Number(n)));
  pacchi = pacchi.map(e => e.sort((a, b) => a-b));
  return pacchi;
}

const calcoliPervelina = (listaDimensioniOrdinataASC) => {
  let e = listaDimensioniOrdinataASC;
  let result = 
    e[0]*e[1]*3 +
    e[0]*e[2]*2 +
    e[1]*e[2]*2;
  return result
}

const calcoliPerNastro = (listaDimensioniOrdinataASC) => {
  let e = listaDimensioniOrdinataASC;
  let result = 
    e[0]*2 +
    e[1]*2 +
    e[0]*e[1]*e[2]
  return result
}

function  DUEdue(metodoCalcolo, messaggio = null) {
  fs.readFile(quesitonDirectory, 'utf-8', (err, data) => {
    console.time('timer');
    if (err) {
      console.log("qualcosa è andato storto in  DUEdue: " + err);
    } else {
      let msrBoxNum = formattaDatiPerCalcoli(data);
      let consxBox = msrBoxNum.map(e => metodoCalcolo(e));
      let totalCons = consxBox.reduce((acc, value) => {return acc + value}, 0);
      console.log(totalCons)
      if (messaggio != null)
        console.log(messaggio)
    };
    console.timeEnd('timer');
  })
}
  
//  DUEdue('Elves need this amount of square feet of wrapping paper.', calcoliPervelina)
//  DUEdue('Elves need this amount of feet of ribbon.', calcoliPerNastro)

 DUEdue(calcoliPervelina)
 DUEdue(calcoliPerNastro)

// => cd 'C:\Users\marco\coding\advent of code'
// => node "script soluzioni/Q02.js" 02