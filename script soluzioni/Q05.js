const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q05.js" 05

let istruzioni = fs.readFileSync(`./testo domande/${fileData}.txt`, 'utf-8');
let movimenti = istruzioni.split('\n')

let puliti = movimenti.map(element => element.replace('\r', ''));

let naughty = []
let nice = []

const doubleLetter = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 1]) {
      return true
    }
  }
  return false
}

const threeVowels = (str) => {
  let k = 0;
  for (let i = 0; i < str.length; i++) {
    if (
      str[i] === 'a' ||
      str[i] === 'e' ||
      str[i] === 'i' ||
      str[i] === 'o' ||
      str[i] === 'u'
    )
      k++
    if (k > 2)
      return true
  }
  return false
}

const targetSequence = (str) => {
  if (
    str.indexOf('ab') !== -1 ||
    str.indexOf('cd') !== -1 ||
    str.indexOf('pq') !== -1 ||
    str.indexOf('xy') !== -1
  )
    return false
  return true
}
  
const filtro01 = (str) => {
  if (
    doubleLetter(str) &&
    threeVowels(str) &&
    targetSequence(str)
  ) {
    nice.push(str);
    return
  }
  naughty.push(str);
}

puliti.forEach(filtro01)
console.log(`\nApplicando i criteri della prima parte del quesito si hanno:\n- ${naughty.length} elementi cattivi\n- ${nice.length} elementi buoni`)

naughty.length = 0;
nice.length = 0;

const doublePairs = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.slice(i+2).indexOf(str.slice(i, i+2)) !== -1) {
      return true
    }
  }
  return false
}

const sandwich = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === str[i + 2]) {
      return true
    }
  }
  return false
}

const filtro02 = (str) => {
  if (
    doublePairs(str) &&
    sandwich(str)
  ) {
    nice.push(str);
    return
  }
  naughty.push(str);
}

puliti.forEach(filtro02)
console.log(`\nApplicando i criteri della seconda parte del quesito si hanno:\n- ${naughty.length} elementi cattivi\n- ${nice.length} elementi buoni\n`)
