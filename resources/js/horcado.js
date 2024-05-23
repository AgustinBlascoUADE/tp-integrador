String.prototype.replaceAt = function (index, character) {
    return this.substring(0, index) + character + this.substring(index + 1);}

const palabras_horcado = ["velocidad", "cinturon", "vial", "auxilios", "manos", "aire", "parabrisas"];
const pistas_horcado = ["Siempre que manejemos debemos respetar el limite de ...", "Al subirnos a un auto, debemos asegurarnos de ponernos el ...",
    "Esta página nos ensenha sobre la seguridad ...", "En el auto, siempre llevar con nosotros un kit de primeros ...", 
    "Al estacionar el auto, nos debemos asegurar de poner el freno de ...", "Si chocamos, se activaran las bolsas de ...",
    "Siempre debemos mantener limpio el ..."
]

const numero = Math.floor(Math.random() * palabras_horcado.length);
const palabra = palabras_horcado[numero];
const pista = pistas_horcado[numero];

palabraConGuiones = palabra.replace(/./g, "_ ");

document.querySelector('#display').innerHTML = palabraConGuiones;
document.querySelector('#pista').innerHTML = pista;


document.querySelector('#verificar').addEventListener('click', () =>
{
    //pido la letra que ingreso el usuario
    const letra = document.querySelector('#letra').value
    //declaro un booleano como falso para cambiar si esta la letra
    let letraEnPalabra = false;
    //verifico que la letra este en la palabra secreta con un bucle For
    for (let i = 0; i < palabra.length; i++){
        if(letra == palabra[i]){
            palabraConGuiones = palabraConGuiones.replaceAt(i*2 , letra);
            letraEnPalabra = true;
        }
    }
    if (!letraEnPalabra) {
        const vidas = document.getElementById("vidas");
        const numVidas = parseInt(vidas.textContent) - 1;
        vidas.textContent = numVidas;
        if (numVidas === 0) {
          alert("Perdiste!");
        }
    }else{
        if (palabraConGuiones.indexOf('_') < 0) {
            alert("Ganaste!")
        }
    }
    document.querySelector('#display').innerHTML = palabraConGuiones;
    document.querySelector('#letra').value = '';
});
