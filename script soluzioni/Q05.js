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

//console.log(puliti)

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
      str[i] ==='u'
    ) {
      k++
    }
    if (k > 2) {
      return true
    }
  }
  return false
}

const targetSequence = (str) => {
  if (
    str.indexOf('ab') !== -1 ||
    str.indexOf('cd') !== -1 ||
    str.indexOf('pq') !== -1 ||
    str.indexOf('xy') !== -1
  ) {
    return false
  }
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

//puliti.forEach(filtro01)

//console.log(naughty.length)
//console.log(nice.length)

const doublePairs = (str) => {
  for (let i = 0; i < str.length - 1; i++) {
    if (str.slice(i+2).indexOf(str.slice(i, i+2)) !== -1) {
      return true
    }
  }
  return false
}

const doublePairsAI = (str) => {
  const pairs = new Set();
  for (let i = 0; i < str.length - 1; i++) {
    const pair = str.slice(i, i + 2);
    if (pairs.has(pair) && str[i] !== str[i + 2]) {
      return true;
    }
    pairs.add(pair);
  }
  return false;
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

console.log(naughty.length)
console.log(nice.length)