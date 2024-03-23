const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q19.js" 19

console.clear();

const startingAtom = "e";
const instructionList = createInstruction(fileData);
const replacementObjList = createReplacementObjList(instructionList);
const molecule = instructionList[instructionList.length - 1];

console.log(generateAllMoleculeVariants(molecule, replacementObjList).length);
console.log(lesDoeIt(startingAtom, molecule, replacementObjList));
console.log(lesDoeIt(startingAtom, molecule, replacementObjList)[0].steps['1']);


// #region LOGICS

    function lesDoeIt(startingAtom, molecule, replacementObjList){
        let currentCumulation = [{
            steps: {},
            moleculeShape: startingAtom
        }];

        let nextPhase = [];

        currentCumulation.forEach(x => {
            let newBranches = createNewBranches(x, replacementObjList)
            nextPhase = newBranches;
        })
        
        return nextPhase;
    }

    function createNewBranches(branch, replacementObjList){
        let newBranches = [];
        let molecule = branch.moleculeShape;

        replacementObjList.forEach(replacementObj => {
            let interventionPoints = getPatternOccurrencesIndexes(molecule, replacementObj);
            
            interventionPoints.forEach(index => {
                let newBranch = {
                    steps: {...branch.steps},
                    moleculeShape: molecule.slice(0, index) +
                        replacementObj.replacement +
                        molecule.slice(index + replacementObj.pattern.length)
                };
                
                let nextKey = Object.keys(branch.steps).length === 0 ? 1 : getMaxKeyNumber(branch.steps) + 1;

                newBranch.steps[nextKey] = {
                    repl: replacementObj,
                    index: index
                };
                
                newBranches.push(newBranch);
            });
        });

        return newBranches;
    }

    function generateAllMoleculeVariants(molecule, replacementObjList) {
        let elaborations = new Set();

        replacementObjList.forEach(replacementObj => {
            let interventionPoints = getPatternOccurrencesIndexes(molecule, replacementObj);
            
            interventionPoints.forEach(index => {
                elaborations.add(
                    molecule.slice(0, index) +
                    replacementObj.replacement +
                    molecule.slice(index + replacementObj.pattern.length)
                );
            });
        })

        return Array.from(elaborations);
    }

    function getMaxKeyNumber(obj) {
        const keys = Object.keys(obj).map(Number);
        return Math.max(...keys);
    }

    function getPatternOccurrencesIndexes(molecule, replacementObj) {
        let patternOccurrencesIndexes = [];
        let index = molecule.indexOf(replacementObj.pattern);

        while (index !== -1) {
            patternOccurrencesIndexes.push(index);
            index = molecule.indexOf(replacementObj.pattern, index + 1);
        }

        return patternOccurrencesIndexes;
    }

    function createReplacementObjList(instructionList) {
        return instructionList.filter(x => x.includes('=>')).map(x => {
            let parts = x.split(' ');

            return {
                pattern: parts[0],
                replacement: parts[2]
            }
        })
    }

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

// #endregion