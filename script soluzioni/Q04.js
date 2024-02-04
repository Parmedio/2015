import md5 from '../md5.js';

const secretKey = 'bgvyzdsv'

let raccoltaHash = []

for (let i = 1000000; i <= 2000000; i++) {
  if( md5(secretKey + i).slice(0, 6) === '000000') {
    raccoltaHash.push(i);
  }
}

console.log(raccoltaHash)