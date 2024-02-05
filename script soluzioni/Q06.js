const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q06.js" 06

let istruzioni = fs.readFileSync(`./testo domande/${fileData}.txt`, 'utf-8');
let movimenti = istruzioni.split('\n')

let puliti = []
movimenti.forEach(element => {
    puliti.push(element.replace('\r', ''))
});

const createNewSchermoLuci = () => {
  let newSchermoLuci = []

  for (let i = 0; i < 1000; i++) {
    newSchermoLuci.push(Array(1000).fill(0))
  }

  return newSchermoLuci
}

const svolgimento = (istruzione, functionToApply, targetDisplay) => {
  let a = istruzione
  let grezzoCi = a.slice(a.indexOf(' ', 5), a.indexOf(' thr'));
  let Xi = Number(grezzoCi.slice(0, grezzoCi.indexOf(',')))
  let Yi = Number(grezzoCi.slice(grezzoCi.indexOf(',') + 1))

  let grezzoCf = a.slice(a.indexOf('gh') + 3);
  let Xf = Number(grezzoCf.slice(0, grezzoCf.indexOf(',')))
  let Yf = Number(grezzoCf.slice(grezzoCf.indexOf(',') + 1))

  let action = a[6]

  functionToApply(targetDisplay, Yi, Yf, Xi, Xf, action)
}

const totalLight= (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let k = 0; k < array.length; k++) {
      contatoreLucine += array[i][k];
    }
  }
}

let contatoreLucine = 0

// PRIMA PARTE

let primoShermo = createNewSchermoLuci();

const operazioneTransistor = (array, Yi, Yf, Xi, Xf, action) => {
  for (let t = Yi; t <= Yf; t++) {
    for (let i = Xi; i < Xf + 1; i++) {
      if (action === 'n')
        array[t][i] = 1;
      else if ( action === 'f' )
        array[t][i] = 0;
      else 
        array[t][i] = array[t][i] == 0 ? 1 : 0;
    }
  }
}

puliti.forEach(x => svolgimento(x, operazioneTransistor, primoShermo))

totalLight(primoShermo)
console.log(contatoreLucine)

// SECONDA PARTE

let secondoShermo = createNewSchermoLuci();

const operazioneLumen = (array, Yi, Yf, Xi, Xf, action) => {
  for (let t = Yi; t < Yf + 1; t++) {
    for (let i = Xi; i < Xf + 1; i++) {
      if (action === 'n') 
        array[t][i]++;
      else if ( action === 'f' && array[t][i] > 0)
        array[t][i]--;
      else if ( action === ' ')
        array[t][i] += 2;
    }
  }
}

puliti.forEach(x => svolgimento(x, operazioneLumen, secondoShermo))

contatoreLucine = 0;

totalLight(secondoShermo)
console.log(contatoreLucine)

// const ruccio = async (id) => {
//   const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//   const data = await res.json();
//   console.log(data.forms[0].name)
// }

// ruccio(748)