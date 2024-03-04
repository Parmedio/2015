const puzzle01 = "cqjxjnds";
const puzzle02 = "cqjxxyzz";
let puzzleLetterList = puzzle02.split("");

// node "script soluzioni/Q11.js"

console.clear();

const alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const clearAlphabet = alphabet.filter(x => x !== 'i' && x !== 'o' && x !== 'l');

const firstAnswer = findNextPassword(puzzle01);
console.log(firstAnswer);
console.log(findNextPassword(firstAnswer));

function findNextPassword(string) {
    let allCondition = false;
    let currentString = string;

    while (!allCondition) {
        let result = nextValue(currentString.split("")).join("");
        if (checkAllCondition(result))
            allCondition = !allCondition;
        currentString = result;
    }

    return currentString;
}

function checkAllCondition(string) {
    return (hasIncreasingStraight(string) && hasDifferentPairs(string))   
}

function areAllElementsA(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] !== 'a') {
            return false;
        }
    }
    return true;
}

function nextValue(string) {
    const inputLength = string.length;

    for (let i = inputLength - 1; i >= 0; i-- ) {
        let portion = string.slice(i + 1);
        let allA = areAllElementsA(portion);
            
        if (i == inputLength - 1 || allA) {
            let indexOfCurrentLetterInAlphabet = clearAlphabet.indexOf(string[i]);
            if (indexOfCurrentLetterInAlphabet == clearAlphabet.length - 1)
                string[i] = clearAlphabet[0];
            else
                string[i] = clearAlphabet[indexOfCurrentLetterInAlphabet + 1];
        }
    }

    return string
}

function hasIncreasingStraight(password) {
    const alphabetString = alphabet.join("");

    for (let i = 0; i < alphabetString.length - 2; i++) {
        const straight = alphabetString.slice(i, i + 3);
        if (password.includes(straight)) {
            return true;
        }
    }

    return false;
}

function hasDifferentPairs(password) {
    const pairs = {};

    for (let i = 0; i < password.length - 1; i++) {
        const pair = password.slice(i, i + 2);
        if (pair[0] === pair[1]) {
            pairs[pair] = (pairs[pair] || 0) + 1;
        }
    }

    const distinctPairs = Object.keys(pairs);
    const countPairs = distinctPairs.length;

    return countPairs >= 2;
}
