//cargo en un arreglo las imganes de las señales viales. Este sera el orden que se mostrarán

let señales = [
  //señales preventivas - 9                                                           //TD
  "curva-sinuosa.svg",
  "entronque.svg",
  "cruce.svg",
  "glorieta.svg",
  "incorporacion-de-transito.svg",
  "doble-circulacion.svg",
  "ganado.svg",
  "camino-sinuoso.svg",
  "salida.svg",
  //Señales restrictivas - 8
  "inspeccion.svg",
  "vuelta-continua.svg",
  "circulacion.svg",
  "altura-restringida.svg",
  "retorno-prohibido.svg",
  "peso-restringido.svg",
  "no-parar.svg",
  "prohibido-seguir-de-frente.svg",
  //conjuntos - 3
  "señales-de-destino.svg",
  "señales-de-identificacion.svg",
  "señales-de-recomendacion.svg",
];
//arreglo que guardara la opcion correcta
let correcta = [
  0,
  1,
  0,
  2, //1

  2,
  0,
  0,
  2, //2

  1,
  0,
  2,
  0, //3

  1,
  1,
  2,
  0, //4

  0,
  2,
  1,
  0, //5
];
//arreglo que guardara las opciones a mostrar en cada jugada
let opciones = [];
//cargo en el arreglo opciones las opciones a mostrar en cada jugada

//Señales preventivas - 9
/////////////////////////////////////////////////////////////////////////////////////////1
opciones.push([
  "Curva sinuosa",
  "Curva y contracurva derecha",
  "Curva cerrada",
]);
opciones.push(["Entronque", "Bifurcación en T", "Entrecruce"]);
opciones.push(["Cruce", "Cruce a la derecha", "Cruce a la izquierda"]);
opciones.push(["Rotonda", "Glorieta a la derecha", "Glorieta"]);

///////////////////////////////////////////////////////////////////////////////////////2
opciones.push([
  "Incorporacion de transito",
  "Incorporacion a la derecha",
  "Incorporacion a la izquierda",
]);
opciones.push([
  "Doble circulacion próxima",
  "Doble sentido",
  "Carriles centrales",
]);
opciones.push(["Cruce de ganado", "Vacas", "Cruce de animales"]);
opciones.push(["Curvas cerradas", "Curvas continuas", "Carretera sinuosa"]);

/////////////////////////////////////////////////////////////////////////////////////////3
opciones.push(["Salida", "Salida a la derecha", "Lateral a la derecha"]);
//Señales restrictivas - 8
opciones.push(["Puesto de inspeccion", "Vigilante", "Puesto de guardia"]);
opciones.push([
  "Curva a la derecha",
  "Vuelta prohibida a la derecha",
  "Vuelta permitida a la derecha",
]);
opciones.push([
  "Siga a la derecha",
  "Incorporación derecha",
  "Carril de circulacion",
]);

//////////////////////////////////////////////////////////////////////////////////////////4
opciones.push(["Altura restringida", "Altura máxima", "Altura Próxima"]);
opciones.push([
  "Retorno prohibido en U",
  "Retorno no permitido",
  "Evitar retorno",
]);
opciones.push([
  "Peso reservado máximo",
  "Carga máxima",
  "Peso total permitido",
]);
opciones.push(["Paso vial cerrado", "Prohibido pasar", "No seguir"]); ///cambiar imagen

////////////////////////////////////////////////////////////////////////////////////////5
opciones.push(["No seguir", "Calle sin salida", "Vía cerrada"]);
//conjuntos - 3
opciones.push(["Indicaciones", "Destinos próximos", "Señales de destino"]);
opciones.push([
  "Identificacion",
  "Señales de identificacion",
  "Indicaciones viales",
]);
opciones.push([
  "Señales de regulación",
  "Señales de recomendacion",
  "Consejos viales",
]); //TD

//variable que guarda la posicion actual
let posActual = 0;
//variable que guarda la cantidad acertadas hasta el moemento
let cantidadAcertadas = 0;
let juegoEmpezado = false;
function comenzarJuego() {
  //reseteamos las variables
  posActual = 0;
  cantidadAcertadas = 0;
  //activamos las pantallas necesarias
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "flex";
  cargarBandera();
  juegoEmpezado = true;
}

//funcion que carga la siguiente imagen y sus opciones
function cargarBandera() {
  //controla si se terminaron las imagenes viales
  if (señales.length <= posActual) {
    terminarJuego();
  } else {
    //cargo las opciones
    //limpiamos las clases que se asignaron
    limpiarOpciones();

    document.getElementById("imgBandera").src = "../img/img_trivia/" + señales[posActual];
    document.getElementById("n0").innerHTML = opciones[posActual][0];
    document.getElementById("n1").innerHTML = opciones[posActual][1];
    document.getElementById("n2").innerHTML = opciones[posActual][2];
  }
}

function limpiarOpciones() {
  document.getElementById("n0").className = "nombre";
  document.getElementById("n1").className = "nombre";
  document.getElementById("n2").className = "nombre";

  document.getElementById("l0").className = "letra";
  document.getElementById("l1").className = "letra";
  document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida) {
  if (opElegida == correcta[posActual]) {
    //acertó
    //agregamos las clases para colocar el color verde a la opcion elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreAcertada";
    document.getElementById("l" + opElegida).className = "letra letraAcertada";
    cantidadAcertadas++;
  } else {
    //no acerto
    //agramos las clases para colocar en rojo la opcion elegida
    document.getElementById("n" + opElegida).className =
      "nombre nombreNoAcertada";
    document.getElementById("l" + opElegida).className =
      "letra letraNoAcertada";

    //opcion que era correcta
    document.getElementById("n" + correcta[posActual]).className =
      "nombre nombreAcertada";
    document.getElementById("l" + correcta[posActual]).className =
      "letra letraAcertada";
  }
  posActual++;
  //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
  setTimeout(cargarBandera, 1000);
}
function terminarJuego() {
  //ocultamos las pantallas y mostramos la pantalla final
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "block";
  //agreamos los resultados
  document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
  document.getElementById("numIncorrectas").innerHTML =
    señales.length - cantidadAcertadas;
    juegoEmpezado = false;
}

function volverAlInicio() {
  //ocultamos las pantallas y activamos la inicial
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
  botonAyuda.click();
}

window.onload = function () {
  volverAlInicio();
};
function volverAlInicio2() {
  // Mostrar la pantalla de juego
  document.getElementById("pantalla-juego").style.display = "block";
  // Ocultar la pantalla final
  document.getElementById("pantalla-final").style.display = "none";
  // Mostrar la pantalla inicial
  document.getElementById("pantalla-inicial").style.display = "block";
}

function HojaRespuestas() {
  // Ocultar las pantallas y mostrar la pantalla de respuestas
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "none";
}

const botonAyuda = document.getElementById("btn-ayuda");
const botonComienzoJuego = document.getElementById("btn-comienzo-juego");

// botonAyuda.click();
botonComienzoJuego.onclick = function() {
  if (!juegoEmpezado) {
    comenzarJuego();
  }
}
