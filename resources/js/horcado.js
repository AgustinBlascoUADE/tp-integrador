// Palabras para el juego
const palabras_horcado = [
    "limite de velocidad", 
    "cinturon de seguridad", 
    "seguridad vial", 
    "primeros auxilios", 
    "freno de manos", 
    "bolsa de aire", 
    "parabrisas", 
    "retrovisor", 
    "cambio de carril",
];


palabra = "";
palabraConGuiones = [];

// Función para llenar las vidas, se llena con 5 vidas en forma de img en el html
function llenarVidas() {
    const vidas = document.querySelector('#vidas');
    vidas.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        var imgVida = document.createElement("img");
        imgVida.src = "../img/vidas_horcado.png";
        imgVida.className = 'vida'
        imgVida.async = true;
        vidas.appendChild(imgVida)
    }
}

// Se ejecuta cuando el documento está cargado
document.addEventListener("DOMContentLoaded", function () {
    juegoHorcado();
    llenarVidas();
});

// Se ejecuta cuando se presiona el botón de verificar, verifica si la letra ingresada está en la palabra
document.querySelector('#verificar').addEventListener('click', () => {
    const letra = document.querySelector('#letra').value;
    let letraEnPalabra = false;

    // Recorre la palabra y si la letra ingresada está en la palabra, la agrega a la palabra con guiones
    for (let i = 0; i < palabra.length; i++) {
        if (letra == palabra[i]) {
            palabraConGuiones[i] = palabra[i] === ' ' ? '&nbsp;&nbsp;' : palabra[i];
            letraEnPalabra = true;
        }
    }
    // Si la letra no está en la palabra, se quita una vida. En el else, si la palabra con guiones es igual a la palabra, se muestra un alert de ganaste.
    if (!letraEnPalabra) {
        const vidas = document.querySelector('#vidas');
        const vida = vidas.querySelector('.vida');
        if (vida) {
            vidas.removeChild(vida);
        }
        if (!vidas.querySelector('.vida')) {
            alert("Perdiste!");
            reiniciarJuego();
        }
    } else {
        const palabraSinEspacios = palabra.split(' ').join('&nbsp;&nbsp;');
        if (palabraConGuiones.join('') === palabraSinEspacios) {
            alert("Ganaste!");
            juegoHorcado();
            llenarVidas();
        }
    }
    // Se muestra la palabra con guiones en el html
    document.querySelector('#display').innerHTML = palabraConGuiones.join(' ');
    // Se limpia el input de la letra
    document.querySelector('#letra').value = '';
});

// Se elije una palabra aleatoria del array de palabras
function valoresJuego(numero) {
    numero = numero || Math.floor(Math.random() * palabras_horcado.length);
    palabra = palabras_horcado[numero];
}

// Se inicia el juego.
function juegoHorcado() {
    valoresJuego();
    palabraConGuiones = palabra.split('').map(c => (c === ' ' ? '&nbsp;&nbsp;' : '_'));
    document.querySelector('#display').innerHTML = palabraConGuiones.join(' ');
    document.querySelector('#letra').focus();
}

// Se reinicia el juego
function reiniciarJuego() {
    juegoHorcado();
    document.querySelector('#letra').value = '';
    llenarVidas();
}

document.querySelector('#reiniciar').addEventListener('click', reiniciarJuego);

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