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
console.log(getFewestSteps(startingAtom, molecule, replacementObjList));


// #region LOGICS

    function getFewestSteps(startingAtom, molecule, replacementObjList){
        let maxMoleculeLength = molecule.length;
        let nextPhase = [];
        
        let currentBraches = [{
            nSteps: 0,
            moleculeShape: startingAtom
        }];

        let existTargetMolecule = false;

        while (!existTargetMolecule || existOneShorterMolecule(currentBraches, maxMoleculeLength)) {
            currentBraches.forEach(b => {
                let newBranches = createNewBranches(b, replacementObjList, maxMoleculeLength);

                newBranches.forEach(b => {
                    addBranch(nextPhase, b);
                });
            });

            currentBraches = nextPhase;
            nextPhase = [];
            existTargetMolecule = currentBraches.some(b => b.moleculeShape == molecule);
            console.clear();

            console.log(currentBraches.length);
        }
        
        return currentBraches.filter(b => b.moleculeShape == molecule)
            .reduce((min, b) => (min.nSteps < b.nSteps ? min : b));
    }

    function addBranch(targetArray, branch){
        const existingBranch = targetArray.find(b => b.moleculeShape === branch.moleculeShape);
    
        if (!existingBranch) {
            targetArray.push(branch);
        } else if (branch.nSteps < existingBranch.nSteps) {
            existingBranch.nSteps = branch.nSteps;
        }
    }

    function existOneShorterMolecule(branches, maxMoleculeLength){
        return branches.some(b => isShorter(b, maxMoleculeLength));
    }

    function isShorter(obj, maxMoleculeLength){
        return obj.moleculeShape.length < maxMoleculeLength;
    }
    
    function createNewBranches(branch, replacementObjList, maxMoleculeLength){
        let newBranches = [];
        
        if (branch.moleculeShape.length == maxMoleculeLength) {
            newBranches.push(branch);    
        }

        var allMoleculeVariants = generateAllMoleculeVariants(branch.moleculeShape, replacementObjList);

        allMoleculeVariants.forEach(molecule => {
            if (molecule.length <= maxMoleculeLength) {
                let newBranch = {
                    nSteps: branch.nSteps + 1,
                    moleculeShape: molecule
                };
                
                newBranches.push(newBranch);
            }
        });

        return filterDuplicateMolecule(newBranches);
    }

    function filterDuplicateMolecule(branches) {
        let uniqueBranches = {};
      
        branches.forEach(b => {
          if (!uniqueBranches[b.moleculeShape] || uniqueBranches[b.moleculeShape].nSteps > b.nSteps) {
            uniqueBranches[b.moleculeShape] = b;
          }
        });
      
        return Object.values(uniqueBranches);
    }

    function generateAllMoleculeVariants(molecule, replacementObjList) {
        let elaborations = new Set();

        replacementObjList.forEach(replacementObj => {
            let interventionPoints = getPatternOccurrencesIndexes(molecule, replacementObj);
            
            interventionPoints.forEach(index => {
                elaborations.add(
                    generateMolecule(molecule, index, replacementObj)
                );
            });
        })

        return Array.from(elaborations);
    }

    function generateMolecule(molecule, index, replacementObj) {
        return molecule.slice(0, index) +
            replacementObj.replacement +
            molecule.slice(index + replacementObj.pattern.length)
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