const puzzle = "3113322113";
const puzzleTimeToIterate = 40;

// node "script soluzioni/Q10.js"

console.clear();
console.log(iterateOverNTimes(describeSequence, 40, puzzle).length);
console.log(iterateOverNTimes(describeSequence, 50, puzzle).length);

function iterateOverNTimes(functionToExecute, timeToIterate, objectToIterate) {
    let currentState = objectToIterate;

    for (let i = 1; i <= timeToIterate; i++){
        currentState = functionToExecute(currentState);
    }

    return currentState;
}

function describeSequence(inputString) {
    let result = '';
    
    let count = 1;
    let currentDigit = inputString[0];
    
    for (let i = 1; i < inputString.length; i++) {
        if (inputString[i] === currentDigit) {
            count++;
        } else {
            result += count + currentDigit;
            count = 1;
            currentDigit = inputString[i];
        }
    }
    
    result += count + currentDigit;
    
    return result;
}
