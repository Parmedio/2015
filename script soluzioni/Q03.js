const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q03.js" 03
// PRIMA PARTE

let quesitonDirectory = `./testo domande/${fileData}.txt`;
let istruzioni = fs.readFileSync(quesitonDirectory);
let movimenti = String(istruzioni).split('')

let contatoreLongitudine = 0
let contatoreLatitudine = 0

const azzeraContatoriCoordinate = () => {
  contatoreLongitudine = 0
  contatoreLatitudine = 0
}

const sonoStesseCoordinate = (currentElement, collection, collectionIndex) => {
  return (currentElement.longitudine === collection[collectionIndex].longitudine &&
    currentElement.latitudine === collection[collectionIndex].latitudine)
}

const elaboraMovimento = (step, registroDestinazione) => {
  switch (step) {
    case '^':
      contatoreLatitudine++; break;
    case '>':
      contatoreLongitudine++; break;
    case 'v':
      contatoreLatitudine--; break;
    case '<':
      contatoreLongitudine--; break;
  }

  let newElement = 
  {
    longitudine : contatoreLongitudine,
    latitudine : contatoreLatitudine,
    pacchi_cons : 1    
  }

  let luogoGiaVisitato = false;

  for (let i = 0; i < registroDestinazione.length; i++) {
    if (sonoStesseCoordinate(newElement, registroDestinazione, i)) {
      luogoGiaVisitato = true;
      registroDestinazione[i].pacchi_cons++;
    }
  }
  
  if (!luogoGiaVisitato)
    registroDestinazione.push(newElement)
}

const createNewRegistro = () => {
  let newregistro = [
    {                  // elemento che rappresemta prima consegna in punto (0, 0)
      longitudine : 0, // asse X
      latitudine : 0,  // asse Y
      pacchi_cons : 1    
    }
  ];

  return newregistro
}

let registroDiBordo = createNewRegistro();

console.log('\n');
console.time('timer01');

azzeraContatoriCoordinate();
movimenti.forEach( x => elaboraMovimento(x, registroDiBordo));

console.log(`Il primo anno babbo natale ha visitato ${registroDiBordo.length} case.`);
console.timeEnd('timer01');
console.log('\n');

// SECONDA PARTE

let bioSantaMovimentiList =  []
let robotSantaMovimentiList = []

console.time('timer02');

for (let i = 0; i < movimenti.length; i++) {
  if ( i % 2 == 0) {
    bioSantaMovimentiList.push(movimenti[i])
  } else {
    robotSantaMovimentiList.push(movimenti[i])
  }
}

let listaCaseBioSanta = createNewRegistro();
let listaCaseRobotSanta = createNewRegistro();

azzeraContatoriCoordinate();
bioSantaMovimentiList.forEach( x => elaboraMovimento(x, listaCaseBioSanta));

azzeraContatoriCoordinate();
robotSantaMovimentiList.forEach( x => elaboraMovimento(x, listaCaseRobotSanta));

let elementiComuni = 0;

for (let i = 0; i < listaCaseBioSanta.length; i++) {
  for (let k = 0; k < listaCaseRobotSanta.length; k++) {
    if (sonoStesseCoordinate(listaCaseRobotSanta[k], listaCaseBioSanta, i)) {
      elementiComuni++;
      break;
    }
  }
}

// This approach of finding common houses visited by the two santas can be done this way because the list does not contain element with same coordinates

console.log(`Il secondo anno babbo natale ed il suo alter ego bionico hanno visitato ${listaCaseBioSanta.length + listaCaseRobotSanta.length - elementiComuni} case.`);
console.timeEnd('timer02');
console.log('\n');