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

  text.innerText = `Selecciona las ${tematica}`;
  contenedorTexto.appendChild(text);

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

const botonAyuda = document.getElementById("btn-ayuda");

botonAyuda.click();