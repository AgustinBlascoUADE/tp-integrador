import { PALABRAS_ESP, PALABRAS_JUEGOS_EXPLICACION } from "./palabras-wordle.js";

const INTENTOS = 6;
let adivinanzaActual = [];
let proximaLetra = 0;
let contador = 0;
let adivinanzasPendientes = INTENTOS;
let tablero = document.getElementById("game-board");

const mezlcarPalabras = (arrayPalabras) => {
    let array = [...arrayPalabras];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const palabrasParaAdivinar = mezlcarPalabras(PALABRAS_JUEGOS_EXPLICACION);
let palabraParaAdivinar = palabrasParaAdivinar[contador]['key'];
let explicacionPalabra = palabrasParaAdivinar[contador]['explicacion'];

// Instrucciones

const botonJugar = document.getElementById("btn-jugar");
const modalInstrucciones = document.getElementById("instrucciones-modal");
const botonAyuda = document.getElementById("btn-ayuda");
const backdrop = document.getElementById("backdrop")
const modalMensajes = document.getElementById("modal-mensaje");
const tituloModalMensaje = document.getElementById("titulo-mensaje");
const complementarioModalMensaje = document.getElementById("complementario");
const imagenModalMensaje = document.getElementById("img-mensaje");
const botonMensaje = document.getElementById("btn-mensaje");

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible")
}

const mostrarInstrucciones = () => {
    modalInstrucciones.classList.remove("invisible");
}

const mostrarMensaje = () => {
    modalMensajes.classList.add("visible");
}

const ocultarInstrucciones = () => {
    modalInstrucciones.classList.add("invisible");
}

const ocultarMensajes = () => {
    modalMensajes.classList.remove("visible");
}

const mostrarTextComplementario = () => {
    complementarioModalMensaje.classList.remove("invisible");
}

const mostrarImagen = () => {
    imagenModalMensaje.classList.remove("invisible");
}

const ocultarTextComplementario = () => {
    complementarioModalMensaje.classList.add("invisible");
}

const ocultarImagen = () => {
    imagenModalMensaje.classList.add("invisible");
}

const ocultarBotonMensajes = () => {
    botonMensaje.className.add("invisible");
}

botonJugar.onclick = function() {
    ocultarInstrucciones();
    toggleBackdrop();
}

botonAyuda.onclick = function() {
    mostrarInstrucciones();
    toggleBackdrop();
}

botonMensaje.onclick = () => {
    if (botonMensaje.classList.contains("alerta")) {
        ocultarMensajes();
        toggleBackdrop();
        botonMensaje.classList.remove("alerta");
    } else {
        if (contador === palabrasParaAdivinar.length) {
            tituloModalMensaje.textContent = "No quedan mas Palabras. Gracias por Jugar!";
            ocultarTextComplementario();
            ocultarImagen();
            ocultarBotonMensajes();
            return
        }
        palabraParaAdivinar = palabrasParaAdivinar[contador]['key'];
        explicacionPalabra = palabrasParaAdivinar[contador]['explicacion'];
        adivinanzaActual = [];
        proximaLetra = 0;
        adivinanzasPendientes = INTENTOS;
        ocultarMensajes();
        toggleBackdrop();
        limpiarTablero();
        iniciarTablero();
        limpiarColoresTeclado();
    }
    
}

window.onclick = function(event) {
    if (event.target == backdrop) {
        ocultarInstrucciones();
        toggleBackdrop();
        ocultarMensajes();
    }
}


function iniciarTablero() {
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

function limpiarTablero() {
    while (tablero.hasChildNodes()) {
        tablero.removeChild(tablero.lastChild)
    }
}

function limpiarColoresTeclado() {
    const letras = document.getElementsByClassName("keyboard-button");
    for (let i = 0; i < letras.length; i++) {
        shadeKeyBoard(letras[i].textContent, "#F0F0F0", true);
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
    let demoraTotal = 250 * palabraParaAdivinar.length

    for (const val of adivinanzaActual) {
        intentoPalabra += val
    }

    if (intentoPalabra.length != palabraParaAdivinar.length) {
        toggleBackdrop();
        tituloModalMensaje.textContent = "Faltan completar Letras!";
        ocultarTextComplementario();
        ocultarImagen();
        botonMensaje.textContent = "Continuar"
        botonMensaje.classList.add("alerta");
        mostrarMensaje();
        return
    }

    if (!PALABRAS_ESP.includes(intentoPalabra)) {
        toggleBackdrop();
        tituloModalMensaje.textContent = "La Palabra no se encuentra en la lista!";
        ocultarTextComplementario();
        ocultarImagen();
        botonMensaje.textContent = "Continuar"
        botonMensaje.classList.add("alerta");
        mostrarMensaje();
        return
    }

    
    for (let i = 0; i < palabraParaAdivinar.length; i++) {
        let colorDeLetra = '';
        let casillero = fila.children[i];
        let letra = adivinanzaActual[i];
        
        let positionDeLaLetra = palabraCorrecta.indexOf(adivinanzaActual[i]);
        if (positionDeLaLetra === -1) {
            colorDeLetra = 'grey';
        } else {
            if (adivinanzaActual[i] === palabraCorrecta[i]) {
                colorDeLetra = 'green';
            } else {
                // shade box yellow
                colorDeLetra = 'yellow';
            }

            palabraCorrecta[positionDeLaLetra] = "#";
        }

        let demora = 250 * i;
        setTimeout(() => {
            casillero.style.backgroundColor = colorDeLetra
            shadeKeyBoard(letra, colorDeLetra, false)
        }, demora)
    }

    setTimeout(() => {
        if (intentoPalabra === palabraParaAdivinar) {
            tituloModalMensaje.textContent = "Adivinaste! Bien Hecho!";
            mostrarTextComplementario();
            mostrarImagen();
            imagenModalMensaje.src = `../img/wordle/img-${palabraParaAdivinar}.jpg`
            imagenModalMensaje.alt = `Una imagen de ${palabraParaAdivinar}`;
            complementarioModalMensaje.textContent = explicacionPalabra
            botonMensaje.textContent = "Proxima Palabra"
            toggleBackdrop();
            mostrarMensaje();
            adivinanzasPendientes = 0
            return
        } else {
            adivinanzasPendientes -= 1;
            adivinanzaActual = [];
            proximaLetra = 0;
    
            if (adivinanzasPendientes === 0) {
                tituloModalMensaje.textContent = `Te quedaste sin intentos, la palabra correcta era: "${palabraParaAdivinar}".`;
                mostrarTextComplementario();
                mostrarImagen();
                imagenModalMensaje.src = `../img/wordle/img-${palabraParaAdivinar}.jpg`;
                imagenModalMensaje.alt = `Una imagen de ${palabraParaAdivinar}`;
                complementarioModalMensaje.textContent = explicacionPalabra;
                botonMensaje.textContent = "Jugar de Nuevo!"
                toggleBackdrop();
                mostrarMensaje();
            }
        }
    }, demoraTotal)
    contador++;
}


function shadeKeyBoard(letra, color, reset) {
    for (const elem of document.getElementsByClassName("keyboard-button")) {
        if (reset && elem.textContent === letra) {
            elem.style.backgroundColor = color
            return
        }
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

iniciarTablero();
toggleBackdrop();

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
        if (modalMensajes.classList.contains("visible")) {
            return;
        }
        checkGuess();
        return;
    }

    let found = letraPresionada.match(/[a-zA-ZñÑ\s]/gi)
    if (!found || found.length > 1) {
        return;
    } else {
        insertarLetra(letraPresionada);
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
