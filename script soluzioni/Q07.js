const fs = require('fs');
const util = require('util');
const process = require('process');
const { argv } = process;
const [, , fileData] = argv;

// node "script soluzioni/Q07.js" 07

let listaIstruzioni = separaIstruzioni(fileData);

let listaStrutturata = creaListaStrutturata(listaIstruzioni);

console.log('Ho cominciato.');

processaIstruzioni(listaStrutturata);

console.log('Ho finito.');

listaStrutturata.filter(x => x.outputExpression.outputWireName == 'a').forEach(x => console.log(x));

function separaIstruzioni(nomeFile){
    let istruzioni = fs.readFileSync(`./testo domande/${nomeFile}.txt`, 'utf-8');
    let movimenti = istruzioni.split('\n');
    return movimenti.map(element => element.replace('\r', ''));
} 

function creaListaStrutturata(lista) {
    let listaElaborata = [];
    
    lista.forEach(element => {
        let parts = element.split(' -> ');
        let inputParts = parts[0].split(' ');
        
        let obj = {
            inputExpression : inputPartsHandler(inputParts),
            outputExpression : {
                outputWireName : parts[1].replace('\r', ''),
                signalValue : null
            }
        };

        if (obj.inputExpression.base != null && !isNaN(parseInt(obj.inputExpression.base))){
            obj.outputExpression.signalValue = parseInt(obj.inputExpression.base); 
        }

        listaElaborata.push(obj);

    });

    return listaElaborata
}

function inputPartsHandler(lista) {
    let obj;
    let nElementi = lista.length;
    let isShift = lista.includes('RSHIFT') || lista.includes('LSHIFT');

    obj = {
        wire1: nElementi === 3 ? lista[0] : lista[1],
        ...(nElementi === 3 && !isShift && { wire2: lista[2] }),
        ...(nElementi === 3 && isShift && { shiftBits: lista[2] }),
        bitwiseOperation: nElementi === 3 ? lista[1] : lista[0]
    };

    if (nElementi < 2) {
        obj = {base : lista[0]}
    }

    return obj
}

function processaIstruzioni(lista) {
    let lunghezzaLista = lista.length;
    let segnaliCalcolati = 0;

    while (segnaliCalcolati < lunghezzaLista) {
        lista.forEach(x => {
            if (x.outputExpression.signalValue != null)
                return;
            
            let valoreInput = null;
            let inputElement = lista.find(y => y.outputExpression.outputWireName === x.inputExpression.base);
            if (inputElement) {
                valoreInput = inputElement.outputExpression.signalValue;
            }
            if (valoreInput != null) {
                x.outputExpression.signalValue = valoreInput;
                return;
            }
            
            let valoreInputWire1 = null;
            let valoreInputWire1IsNumber = !isNaN(parseInt(x.inputExpression.wire1));
            if (!valoreInputWire1IsNumber) {
                let foundElement = lista.find(y => y.outputExpression.outputWireName === x.inputExpression.wire1);
                valoreInputWire1 = foundElement ? foundElement.outputExpression.signalValue : null;
            } else {
                valoreInputWire1 = parseInt(x.inputExpression.wire1);
            }
            if (valoreInputWire1 == null)
                return;

            let valoreShiftBits;
            if (typeof x.inputExpression.shiftBits !== "undefined") {
                valoreShiftBits = parseInt(x.inputExpression.shiftBits);
            }
        
            if (x.inputExpression.bitwiseOperation == "NOT") {
                x.outputExpression.signalValue = ~valoreInputWire1;
            } else if (!valoreShiftBits) {
                let foundElement = lista.find(y => y.outputExpression.outputWireName === x.inputExpression.wire2);
                valoreInputWire2 = foundElement ? foundElement.outputExpression.signalValue : null;

                if (valoreInputWire2 == null)
                    return;
                
                switch (x.inputExpression.bitwiseOperation) {
                    case "AND":
                        x.outputExpression.signalValue = valoreInputWire1 & valoreInputWire2
                        break;
            
                    case "OR":
                        x.outputExpression.signalValue = valoreInputWire1 | valoreInputWire2
                        break;
                }
            } else if (valoreShiftBits) {
                
                switch (x.inputExpression.bitwiseOperation) {
                    case "RSHIFT":
                        x.outputExpression.signalValue = valoreInputWire1 >> valoreShiftBits;
                        break;

                    case "LSHIFT":
                        x.outputExpression.signalValue = valoreInputWire1 << valoreShiftBits;
                        break;
                }
            }
        })

        segnaliCalcolati = lista.filter(x => x.outputExpression.signalValue != null).length;
    }
}