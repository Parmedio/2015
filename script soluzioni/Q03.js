const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

let quesitoDirectory = `./testo domande/${fileData}.txt`;
let istruzioni = fs.readFileSync(quesitoDirectory);
let movimenti = String(istruzioni).split('')

let contatoreLongitudine = 0
let contatoreLatitudine = 0
let contatorePassi = 0

let doppioPacco = []
let triploPacco = []
let registroDiBordo = [
  {                  // elemento che rappresemta prima consegna in punto (0, 0)
    passi : 0,
    longitudine : 0, // asse X
    latitudine : 0,  // asse Y
    pacchi_cons : 1    
  }
]

const movimento = (step) => {
  if (step === '^') {
    contatoreLatitudine++
  } else if (step === '>') {
    contatoreLongitudine++
  } else if (step === 'v') {
    contatoreLatitudine--
  } else if (step === '<') {
    contatoreLongitudine--
  }
  contatorePassi++
  let newElement = 
  {
    passo : contatorePassi,
    longitudine : contatoreLongitudine,
    latitudine : contatoreLatitudine,
    pacchi_cons : 1    
  };
  for (let i = 0; i < doppioPacco.length; i++) {
    if (newElement.longitudine === doppioPacco[i].longitudine &&
        newElement.latitudine === doppioPacco[i].latitudine) {
        triploPacco.push(newElement);
        return
    }
  }
  for (let k = 0; k < registroDiBordo.length; k++) {
    if (newElement.longitudine === registroDiBordo[k].longitudine &&
        newElement.latitudine === registroDiBordo[k].latitudine) {
      doppioPacco.push(newElement)
      return
    }
  }
  registroDiBordo.push(newElement)
}

let bioSantaList =  []
let roboSantaList = []

for (let i = 0; i < movimenti.length; i++) {
  if ( i % 2 == 0) {
    bioSantaList.push(movimenti[i])
  } else {
  roboSantaList.push(movimenti[i])
  }
}

console.time('timer01');
roboSantaList.forEach(movimento);

console.log(`La lunghezza della lista dei movimenti è: ${roboSantaList.length}`);
console.log(`La case che hanno ricevuto ALMENO 1 regalo sono: ${registroDiBordo.length}`);
console.log(`La case che hanno ricevuto ALMENO 2 regali sono: ${doppioPacco.length}`);
console.log(`La case che hanno ricevuto 3 regali o più: ${triploPacco.length}`);

let LReg = registroDiBordo.length
let LDobleP = doppioPacco.length
let LTripleP = triploPacco.length


let provaDelNove = LReg + LDobleP + LTripleP

console.log(`Se ho scritto bene il codice, il totale delle case visitate è ${provaDelNove}, che è 1 più alta rispetto al totale dei passi percorsi presenti in lista (${bioSantaList.length}) perché la posizione 0 considero che ho visitato la casa`);

console.timeEnd('timer01');

let BScontatoreLongitudine = 0
let BScontatoreLatitudine = 0
let BScontatorePassi = 0

let BSdoppioPacco = []
let BStriploPacco = []
let BSregistroDiBordo = [
  {
    passi : 0,
    longitudine : 0,
    latitudine : 0,
    pacchi_cons : 1    
  },
]

const BSmovimento = (step) => {
  if (step === '^') {
    BScontatoreLatitudine++
    BScontatorePassi++
  } else if (step === '>') {
    BScontatoreLongitudine++
    BScontatorePassi++
  } else if (step === 'v') {
    BScontatoreLatitudine--
    BScontatorePassi++
  } else if (step === '<') {
    BScontatoreLongitudine--
    BScontatorePassi++
  }
  let newElement = 
  {
    passo : BScontatorePassi,
    longitudine : BScontatoreLongitudine,
    latitudine : BScontatoreLatitudine,
    pacchi_cons : 1    
  };
  for (let i = 0; i < BSdoppioPacco.length; i++) {
    if (newElement.longitudine === BSdoppioPacco[i].longitudine &&
        newElement.latitudine === BSdoppioPacco[i].latitudine) {
        BStriploPacco.push(newElement);
        return
    }
  }
  for (let k = 0; k < BSregistroDiBordo.length; k++) {
    if (newElement.longitudine === BSregistroDiBordo[k].longitudine &&
        newElement.latitudine === BSregistroDiBordo[k].latitudine) {
      BSdoppioPacco.push(newElement)
      return
    }
  }
  BSregistroDiBordo.push(newElement)
}

console.time('timer02');
bioSantaList.forEach(BSmovimento);

console.log(`La lunghezza della lista dei movimenti è: ${roboSantaList.length}`);
console.log(`La case che hanno ricevuto ALMENO 1 regalo sono: ${BSregistroDiBordo.length}`);
console.log(`La case che hanno ricevuto ALMENO 2 regalo sono: ${BSdoppioPacco.length}`);
console.log(`La case che hanno ricevuto 3 regali o più: ${BStriploPacco.length}`);

let BSLReg = BSregistroDiBordo.length
let BSLDobleP = BSdoppioPacco.length
let BSLTripleP = BStriploPacco.length


let BSprovaDelNove = BSLReg + BSLDobleP + BSLTripleP

console.log(`Se ho scritto bene il codice, il totale delle case visitate è ${BSprovaDelNove}, che è 1 più alta rispetto al totale dei passi percorsi presenti in lista (${bioSantaList.length}) perché la posizione 0 considero che ho visitato la casa`);

console.timeEnd('timer02');

let santaSpecialz = []

const separatore = (elemento) => {
  for (let k = 0; k < registroDiBordo.length; k++) {
    if (elemento.longitudine === registroDiBordo[k].longitudine &&
      elemento.latitudine === registroDiBordo[k].latitudine) {
        santaSpecialz.push(elemento)
        return
    }
  }
}

BSregistroDiBordo.forEach(separatore)

// const verga = santaSpecialz.length

console.log(santaSpecialz.length)
console.log(registroDiBordo.length)
console.log(BSregistroDiBordo.length)

// DAI CAZZO!!!!!!! 2631!