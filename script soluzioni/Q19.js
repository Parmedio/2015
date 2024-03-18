const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q19.js" 19

console.clear();

const instructionList = createInstruction(fileData);
const replacementObjList = createReplacementObjList(instructionList);
const molecule = instructionList[instructionList.length - 1];

console.log(generateAllMoleculeVariants(molecule, replacementObjList).length);

// #region LOGICS

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