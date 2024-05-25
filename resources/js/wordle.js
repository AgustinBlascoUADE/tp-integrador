import { PALABRAS_ESP, PALABRAS_JUEGO } from "./palabras-wordle.js";

const INTENTOS = 6;
let adivinanzaActual = [];
let proximaLetra = 0;
let palabraParaAdivinar = PALABRAS_JUEGO[Math.floor(Math.random() * PALABRAS_JUEGO.length)]
let adivinanzasPendientes = INTENTOS;


function iniciarTablero() {
    let tablero = document.getElementById("game-board");

    for (let i = 0; i < adivinanzasPendientes; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        
        for (let j = 0; j < palabraParaAdivinar.length; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        tablero.appendChild(row)
    }
}

function insertarLetra(letraPresionada) {
    if (proximaLetra === palabraParaAdivinar.length) {
        return
    }
    letraPresionada = letraPresionada.toLowerCase()

    let fila = document.getElementsByClassName("letter-row")[INTENTOS - adivinanzasPendientes]
    let casillero = fila.children[proximaLetra]
    casillero.textContent = letraPresionada
    casillero.classList.add("filled-box")
    adivinanzaActual.push(letraPresionada)
    proximaLetra += 1
}

function eliminarLetra () {
    let fila = document.getElementsByClassName("letter-row")[INTENTOS - adivinanzasPendientes]
    let casillero = fila.children[proximaLetra - 1]
    casillero.textContent = ""
    casillero.classList.remove("filled-box")
    adivinanzaActual.pop()
    proximaLetra -= 1
}

function checkGuess () {
    let fila = document.getElementsByClassName("letter-row")[INTENTOS - adivinanzasPendientes]
    let intentoPalabra = ''
    let palabraCorrecta = Array.from(palabraParaAdivinar)

    for (const val of adivinanzaActual) {
        intentoPalabra += val
    }

    if (intentoPalabra.length != palabraParaAdivinar.length) {
        alert("Faltan completar letras!")
        return
    }

    if (!PALABRAS_ESP.includes(intentoPalabra)) {
        alert("La Palabra no se encuentra en la lista!")
        return
    }

    
    for (let i = 0; i < palabraParaAdivinar.length; i++) {
        let colorDeLetra = ''
        let casillero = fila.children[i]
        let letra = adivinanzaActual[i]
        
        let positionDeLaLetra = palabraCorrecta.indexOf(adivinanzaActual[i])
        // is letter in the correct guess
        if (positionDeLaLetra === -1) {
            colorDeLetra = 'grey'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (adivinanzaActual[i] === palabraCorrecta[i]) {
                // shade green 
                colorDeLetra = 'green'
            } else {
                // shade box yellow
                colorDeLetra = 'yellow'
            }

            palabraCorrecta[positionDeLaLetra] = "#"
        }

        let demora = 250 * i
        setTimeout(()=> {
            //shade box
            casillero.style.backgroundColor = colorDeLetra
            shadeKeyBoard(letra, colorDeLetra)
        }, demora)
    }

    if (intentoPalabra === palabraParaAdivinar) {
        alert("Adivinaste! Bien Hecho!")
        adivinanzasPendientes = 0
        return
    } else {
        adivinanzasPendientes -= 1;
        adivinanzaActual = [];
        proximaLetra = 0;

        if (adivinanzasPendientes === 0) {
            alert("Te quedaste sin intentos, no adivinaste la palabra!")
            alert(`La palabra correcta era: "${palabraParaAdivinar}"`)
        }
    }
}

function shadeKeyBoard(letra, color) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (elem.textContent === letra) {
            let colorAnterior = elem.style.backgroundColor
            if (colorAnterior === 'green') {
                return
            } 

            if (colorAnterior === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

iniciarTablero()

document.addEventListener("keyup", (e) => {

    if (adivinanzasPendientes === 0) {
        return
    }

    let letraPresionada = String(e.key)
    if (letraPresionada === "Backspace" && proximaLetra !== 0) {
        eliminarLetra()
        return
    }

    if (letraPresionada === "Enter") {
        checkGuess()
        return
    }

    // let found = pressedKey.match(/[a-z]/gi)
    let found = letraPresionada.match(/[a-zA-ZñÑ\s]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertarLetra(letraPresionada)
    }
})

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) {
        return
    }
    let key = target.textContent

    if (key === "Del") {
        key = "Backspace"
    } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

// Instrucciones

const botonJugar = document.getElementById("btn-jugar");
const modalInstrucciones = document.getElementById("instrucciones-modal");
const botonAyuda = document.getElementById("btn-ayuda");
const backdrop = document.getElementById("backdrop")

botonJugar.onclick = function() {
    modalInstrucciones.style.display = "none";
    backdrop.style.display = "none";
}

botonAyuda.onclick = function() {
    modalInstrucciones.style.display = "grid";
    backdrop.style.display = "block";
}

window.onclick = function(event) {
    if (event.target == backdrop) {
        modalInstrucciones.style.display = "none";
        backdrop.style.display = "none";
    }
}