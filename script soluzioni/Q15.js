const fs = require('fs');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q15.js" 15

console.clear();

const totalDoses = 100;
const amountOfCalories = 500 
const instrunctionList = createInstruction(fileData);
const objectList = createObjectsList(instrunctionList);
const allPossibleDosesCombination = createAllPossibleDosesCombination(objectList, totalDoses);
const allPossibleRecipes = allPossibleDosesCombination.map(x => assignProperties(x, objectList));
const allRecipesWithCaloriesConstraint = allPossibleRecipes.filter(x => calculateCalories(x) === amountOfCalories);
const allPossibleScores = allPossibleRecipes.map(x => calculateScore(x));
const allScoresWithCaloriesConstraint = allRecipesWithCaloriesConstraint.map(x => calculateScore(x));

console.log(findHighestScore(allPossibleScores));
console.log(findHighestScore(allScoresWithCaloriesConstraint));

// #region LOGICS

    function findHighestScore(scoresList) {
        let maxScore = 0;

        scoresList.forEach(x => {
            if (x > maxScore)
                maxScore = x;
        })

        return maxScore;
    }

    function calculateScore(listOfIngredientsScore) {
        let totalCapacity = [];
        let totalDurability = [];
        let totalFlavor = [];
        let totalTexture = [];

        listOfIngredientsScore.forEach(x => {
            totalCapacity.push(x.S_Capacity);
            totalDurability.push(x.S_Durability);
            totalFlavor.push(x.S_Flavor);
            totalTexture.push(x.S_Texture);
        })

        totalCapacity = sum(...totalCapacity) < 0 ? 0 : sum(...totalCapacity);
        totalDurability = sum(...totalDurability) < 0 ? 0 : sum(...totalDurability);
        totalFlavor = sum(...totalFlavor) < 0 ? 0 : sum(...totalFlavor);
        totalTexture = sum(...totalTexture) < 0 ? 0 : sum(...totalTexture);
        
        return totalCapacity * totalDurability * totalFlavor * totalTexture;
    }

    function calculateCalories(listOfIngredientsScore){
        let totalCalories = [];

        listOfIngredientsScore.forEach(x => {
            totalCalories.push(x.S_Calories);
        })

        totalCalories = sum(...totalCalories) < 0 ? 0 : sum(...totalCalories);

        return totalCalories;
    }

    function assignProperties(listOfDoses, listOfIngredientsScore) {
        let copy = listOfIngredientsScore.map(x => ({
            Name: x.Name,
            Amount: 0,
            Capacity: x.Capacity,
            Durability: x.Durability,
            Flavor: x.Flavor,
            Texture: x.Texture,
            Calories:x.Calories,
            S_Capacity: 0,
            S_Durability: 0,
            S_Flavor: 0,
            S_Texture: 0,
            S_Calories: 0
        }))

        for (let i = 0; i < listOfDoses.length ; i++) {
            copy[i].Amount = listOfDoses[i];
        }
        
        copy.forEach(x => {
            x.S_Capacity = x.Amount * x.Capacity;
            x.S_Durability = x.Amount * x.Durability;
            x.S_Flavor = x.Amount * x.Flavor;
            x.S_Texture = x.Amount * x.Texture;
            x.S_Calories = x.Amount * x.Calories;
        })

        return copy;
    }

    function createAllPossibleDosesCombination(objList, totalDoses){
        console.time('tempo Parmedio');
        let result = [[]];
        let currentDosesMix = [];
        let numberOfIngredients = objList.length;
        let maxAmountOfSingleIngredient = totalDoses - numberOfIngredients + 1; 

        for (let i = 1; i <= numberOfIngredients; i++) {
            result.forEach(element => {
                for (let k = 1; k <= maxAmountOfSingleIngredient; k++) {
                    const currentSum = sum(...element, k);
                    if ((i === numberOfIngredients && currentSum === totalDoses) || 
                        (i !== numberOfIngredients && currentSum <= totalDoses - numberOfIngredients + i)) {
                        currentDosesMix.push([...element, k]);
                    }
                }
            });

            result = currentDosesMix;
            currentDosesMix = [];
        }

        console.timeEnd('tempo Parmedio');
        return result;
    }

    function sum() {
        let total = 0;
        for (let i = 0; i < arguments.length; i++) {
            total += arguments[i];
        }
        return total;
    }

    function createInstruction(fileName) {
        return fs.readFileSync(`./testo domande/${fileName}.txt`, 'utf-8')
            .split('\n')
            .map(element => element.replace('\r', ''));
    };

    function createObjectsList(stringList) {
        return stringList
            .map(x => x.replace(":", "").replace(",", "").split(" "))
            .map(x => ({
                Name: x[0],
                Amount: 0,
                Capacity: parseInt(x[2]),
                Durability: parseInt(x[4]),
                Flavor: parseInt(x[6]),
                Texture: parseInt(x[8]),
                Calories:parseInt(x[10]),
                S_Capacity: 0,
                S_Durability: 0,
                S_Flavor: 0,
                S_Texture: 0,
                S_Calories: 0
            }))
    }

// #endregion

