//cargo en un arreglo las imganes de las señales viales. Este sera el orden que se mostrarán
let señales = [
  //señales preventivas - 9
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
let correcta = [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
//arreglo que guardara las opciones a mostrar en cada jugada
let opciones = [];
//cargo en el arreglo opciones las opciones a mostrar en cada jugada

//Señales preventivas - 9
opciones.push(["curva", "curva sinuosa", "curva cerrada"]);
opciones.push([
  "entronque",
  "entronque a la derecha",
  "entronque a la izquierda",
]);
opciones.push(["cruce", "cruce a la derecha", "cruce a la izquierda"]);
opciones.push(["glorieta", "glorieta a la derecha", "glorieta a la izquierda"]);
opciones.push([
  "incorporacion de transito",
  "incorporacion a la derecha",
  "incorporacion a la izquierda",
]);
opciones.push(["doble circulacion", "doble sentido", "carril central"]);
opciones.push(["ganado", "vacas", "cruce de animales"]);
opciones.push(["camino sinuoso", "curvas continuas", "curvas cerradas"]);

opciones.push(["salida", "salida a la derecha", "salida a la izquierda"]);

//Señales restrictivas - 8
opciones.push(["inspeccion", "camaras", "revision tecnica"]);
opciones.push(["vuelta continua", "vuelta prohibida", "vuelta a la derecha"]);
opciones.push(["sentido de circulacion", "carril", "carril de circulacion"]);
opciones.push(["altura restringida", "puente", "tunel"]);
opciones.push([
  "retorno prohibido",
  "vuelta obligatoria",
  "retorno a la derecha",
]);

opciones.push(["peso restringido", "carga", "carga maxima"]);
opciones.push(["no parar", "no pasar", "no parquear"]);
opciones.push([
  "prohibido seguir de frente",
  "calle sin salida",
  "calle cerrada",
]);

//conjuntos - 3
opciones.push(["señales de destino", "destino", "indicaciones"]);
opciones.push(["señales de identificacion", "identificacion", "indicaciones"]);
opciones.push(["señales de recomendacion", "recomendacion", "indicaciones"]);

//variable que guarda la posicion actual
let posActual = 0;
//variable que guarda la cantidad acertadas hasta el moemento
let cantidadAcertadas = 0;

function comenzarJuego() {
  //reseteamos las variables
  posActual = 0;
  cantidadAcertadas = 0;
  //activamos las pantallas necesarias
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  cargarBandera();
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

    document.getElementById("imgBandera").src = "img/" + señales[posActual];
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
}

function volverAlInicio() {
  //ocultamos las pantallas y activamos la inicial
  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
  document.getElementById("pantalla-juego").style.display = "none";
}
