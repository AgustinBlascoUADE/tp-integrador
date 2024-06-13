// Paso 1: Crear un arreglo de objetos
var fotos = [
  {
    url: "../img/señales-informativas/Caseta-telefonica.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-informativas/Estacion-de-servicio.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-informativas/Oficina-de-correos.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-informativas/Oficinas-de-informacion.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-informativas/Primeros-auxilios.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-informativas/Taller-mecanico.png",
    tematica: "señales informativas",
    seleccionada: false,
  },
  {
    url: "../img/señales-preventivas/Camino-sinuoso.png",
    tematica: "señales preventivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-preventivas/Contracurva.png",
    tematica: "señales preventivas",
    seleccionada: false,
  },
  { url: "../img/señales-preventivas/Cruce.png",
    tematica: "señales preventivas", 
    seleccionada: false,
  },
    
  {
    url: "../img/señales-preventivas/Curva-cerrada.png",
    tematica: "señales preventivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-preventivas/Curva-sinuosa.png",
    tematica: "señales preventivas",
    seleccionada: false,
  },
  { url: "../img/señales-preventivas/Curva.png",
    tematica: "señales preventivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Ceda-el-paso.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Circulacion.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Inspeccion.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Prohibido-rebasar.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Velocidad-maxima.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
  {
    url: "../img/señales-restrictivas/Vuelta-continua.png",
    tematica: "señales restrictivas",
    seleccionada: false,
  },
];

var mezclarFotos = fotos.sort(() => 0.5 - Math.random()).slice(0, 9);
var tematica = mezclarFotos[Math.floor(Math.random() * 9)].tematica;

function mostrarFotos() {
  
  let contenedorTexto = document.getElementById("contenedorTexto");
  let contenedorFotos = document.getElementById("contenedorFotos");
  let text = document.createElement("p");
  let info = document.createElement("p"); 

  text.innerText = `Selecciona las ${tematica}`;
  text.style.fontWeight = 'bold';
  if (tematica === "señales informativas") {
    info.innerText = "Las señales de tránsito informativas tienen el objetivo de guiar al usuario \n en su camino en torno a la ubicación de servicios de emergencia, atractivos turísticos, kilometrajes y recomendaciones al viajar.";
  }
  else if (tematica === "señales preventivas") {
    info.innerText = "Son las señales de color amarillo con negro que tienen el objetivo de \n prevenir a los conductores sobre algún peligro o cambio en el camino.";
  }
  else {
    info.innerText = "Las señales de tránsito restrictivas advierten sobre restricciones físicas \n o reglamentarias en la circulación. Normalmente son de color rojo y están colocadas en postes tanto en zonas urbanas como rurales.";
  }
  contenedorTexto.appendChild(text);
  contenedorTexto.appendChild(info);

  mezclarFotos.forEach((foto) => {
    let img = document.createElement("img");
    img.src = foto.url;
    contenedorFotos.appendChild(img);
    img.addEventListener("click", function () {
      // Toggle the 'selected' class
      this.classList.toggle("selected");
      foto.seleccionada = !foto.seleccionada;
    });

    let boton = document.getElementById("boton");
    boton.addEventListener("click", verificar);
  });
}

function verificar() {
  let estaCorrecto=true;
  let correctas = mezclarFotos.filter((foto) => foto.tematica === tematica);
  mezclarFotos.forEach(foto => {
    if (foto.seleccionada === true && correctas.includes(foto) === false) {
      estaCorrecto = false;
    }
    else if (foto.seleccionada === false && correctas.includes(foto) === true) {
      estaCorrecto = false;
    }
    
  });
  if (estaCorrecto) {
    alert("¡Felicidades! Has seleccionado todas las fotos correctas")
    location.reload();
  }
  else {
    alert("¡Inténtalo de nuevo!");
  }
  
}

// Instrucciones

const botonJugar = document.getElementById("btn-jugar");
const modalInstrucciones = document.getElementById("instrucciones-modal");
const botonAyuda = document.getElementById("btn-ayuda");
const backdrop = document.getElementById("backdrop")

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible")
}

const mostrarInstrucciones = () => {
  modalInstrucciones.classList.remove("invisible");
}

const ocultarInstrucciones = () => {
  modalInstrucciones.classList.add("invisible");
}

botonJugar.onclick = function() {
    ocultarInstrucciones();
    toggleBackdrop();
    if (!juegoEmpezado) {
      comenzarJuego();
    }
}

botonAyuda.onclick = function() {
    mostrarInstrucciones();
    toggleBackdrop();
}

window.onclick = function(event) {
    if (event.target == backdrop) {
      ocultarInstrucciones();
      toggleBackdrop();
    }
}

toggleBackdrop();