const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

let istruzioni = fs.readFileSync(`./${fileData}.txt`);
let movimenti = String(istruzioni).split('\n')

let puliti = []
movimenti.forEach(element => {
    puliti.push(element.replace('\r', ''))
});

let schermoLuci = []

for (let i = 0; i < 1000; i++) {
  schermoLuci.push(Array(1000).fill(0))
}

const operazioneTransistor = (array, Yi, Yf, Xi, Xf, action) => {
  for (let t = Yi; t < Yf + 1; t++) {
    if (action === 'n') {
      for (let i = Xi; i < Xf + 1; i++) {
        array[t][i] = 1;
      }
    } else if ( action === 'f' ) {
      for (let i = Xi; i < Xf + 1; i++) {
        array[t][i] = 0;
      }
    } else {
      for (let i = Xi; i < Xf + 1; i++) {
        if (array[t][i] == 0) {
          array[t][i] = 1
        } else {
          array[t][i] = 0
        }
      }
    }
  }
}

const operazioneLumen = (array, Yi, Yf, Xi, Xf, action) => {
  for (let t = Yi; t < Yf + 1; t++) {
    if (action === 'n') {
      for (let i = Xi; i < Xf + 1; i++) {
        array[t][i]++;
      }
    } else if ( action === 'f' ) {
      for (let i = Xi; i < Xf + 1; i++) {
        if (array[t][i]>0) {
          array[t][i]--;
        }
      }
    } else {
      for (let i = Xi; i < Xf + 1; i++) {
        array[t][i] += 2;
      }
    }
  }
}

const svolgimento = (istruzione) => {
  let a = istruzione
  let grezzoCi = a.slice(a.indexOf(' ', 5), a.indexOf(' thr'));
  let Xi = Number(grezzoCi.slice(0, grezzoCi.indexOf(',')))
  let Yi = Number(grezzoCi.slice(grezzoCi.indexOf(',') + 1))

  let grezzoCf = a.slice(a.indexOf('gh') + 3);
  let Xf = Number(grezzoCf.slice(0, grezzoCf.indexOf(',')))
  let Yf = Number(grezzoCf.slice(grezzoCf.indexOf(',') + 1))

  let action = a[6]

  operazioneLumen(schermoLuci, Yi, Yf, Xi, Xf, action)
}

puliti.forEach(svolgimento)

let contatoreLucine = 0

const Transistor = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == 1) {contatoreLucine++}
  }
}

const Lumen = (array) => {
  for (let i = 0; i < array.length; i++) {
    contatoreLucine += array[i];
  }
}

const TotGruppo= (array,type) => {
  for (let i = 0; i < array.length; i++) {
    type(array[i])
  }
}

TotGruppo(schermoLuci,Lumen)
console.log(contatoreLucine)


const ruccio = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  console.log(data.forms[0].name)
}