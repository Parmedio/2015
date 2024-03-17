const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q18.js" 18

console.clear();

const onSymbol = '#';
const offSymbol = '.';
const stepsToPerform = 100;
const containersList = createInstruction(18);
const initialGrid = createInitialGrid(containersList);
let lastStatus = executeSteps(initialGrid, onSymbol, offSymbol, stepsToPerform);
let lastStatuslightsStuckOn = executeSteps(initialGrid, onSymbol, offSymbol, stepsToPerform, true);

console.log(countOnStauses(lastStatus.flat(), onSymbol));
console.log(countOnStauses(setCornerOn(lastStatuslightsStuckOn, onSymbol).flat(), onSymbol));

// #region LOGICS

    function executeSteps(grid, onSymbol, offSymbol, stepsToPerform, lightsStuckOn = false) {
        let nextStep = [];

        for (let i = 0; i < stepsToPerform; i++) {
            let loopGrid = i == 0 ? grid : nextStep;

            nextStep = bildNextStep(loopGrid, onSymbol, offSymbol, lightsStuckOn)    
        }

        return nextStep;
    }

    function setCornerOn(grid, onSymbol) {
        let copy = [...grid]
        let gridWidth = grid[0].length;
        let gridHeight = grid.length;

        copy[0][0] = onSymbol;
        copy[0][gridWidth - 1] = onSymbol;
        copy[gridHeight - 1][0] = onSymbol;
        copy[gridHeight - 1][gridWidth - 1] = onSymbol;

        return copy;
    }

    function bildNextStep(grid, onSymbol, offSymbol, lightsStuckOn = false) {
        let nextGrid = [];
        let gridWidth = grid[0].length;
        let gridHeight = grid.length;

        if (lightsStuckOn) {
            setCornerOn(grid, onSymbol)
        }

        for (let row = 0; row < gridHeight; row++){
            let newRow = [];

            for (let column = 0; column < gridWidth; column++){
                newRow.push(calculateNextState(grid, column, row, onSymbol, offSymbol))
            }

            nextGrid.push(newRow);
        }

        // All of the lights update simultaneously; they all consider the same current state before moving to the next. 
        return nextGrid;
    };

    function calculateNextState(grid, x, y, onSymbol, offSymbol) {
        let currentStatus = grid[y][x];
        let nextStatus = '';
        let gridWidth = grid[0].length;
        let gridHeight = grid.length;

        let prevCol = indexHandler(gridWidth, x - 1); 
        let nextCol = indexHandler(gridWidth, x + 1); 
        let prevRow = indexHandler(gridHeight, y - 1); 
        let nextRow = indexHandler(gridHeight, y + 1);

        let neighbours = [
            [prevCol, prevRow], [x, prevRow], [nextCol, prevRow],
            [prevCol, y],     /*[x, y],*/     [nextCol, y],
            [prevCol, nextRow], [x, nextRow], [nextCol, nextRow]
        ]

        // Lights on the edge of the grid might have fewer than eight neighbors; the missing ones always count as "off".
        let neighboursStatuses = neighbours.map(x => (x[1] == -1 || x[0] == -1) ? offSymbol : grid[x[1]][x[0]]);
        let neighborsTurnedOn = countOnStauses(neighboursStatuses, onSymbol);

        // A light which is on stays on when 2 or 3 neighbors are on, and turns off otherwise.
        let conditionIsOn = currentStatus == onSymbol && (neighborsTurnedOn == 2 || neighborsTurnedOn == 3);
        // A light which is off turns on if exactly 3 neighbors are on, and stays off otherwise.
        let conditionIsOff = currentStatus == offSymbol && (neighborsTurnedOn == 3);

        nextStatus = conditionIsOn || conditionIsOff ? onSymbol: offSymbol;
        
        return nextStatus;
    };

    function countOnStauses(statusesList, onSymbol) {
        return statusesList.reduce((total, status) => {
            return total + (status === onSymbol ? 1 : 0);
        }, 0);
    }

    function indexHandler(dimension, index) {
        return index >= 0 && index < dimension ? index : -1;
    };

    function createInitialGrid(rowsList) {
        return rowsList.map(x => x.split(''));
    };

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion