import md5 from '../md5.js';

const secretKey = 'bgvyzdsv'

let raccoltaHash = []

console.time('timer01');

for (let i = 0; i <= 2000000; i++) {
  if (raccoltaHash.length > 0)
    break; 
  if(md5(secretKey + i).slice(0, 6) === '000000') {
    raccoltaHash.push(i);
  }
}

console.log(raccoltaHash[0])

console.timeEnd('timer01');

// aggiungere "type": "module" in package.json
// node "script soluzioni/Q04.js"