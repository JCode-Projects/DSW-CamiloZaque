const menu = document.querySelector(".menu"); 
document.querySelector(".fa-bars").addEventListener("click", () => {
    menu.classList.toggle("show");
})

const toggleFlexOn = document.querySelector(".switch .fa-toggle-on");
const toggleFlexOff = document.querySelector(".switch .fa-toggle-off");
const cajasFlexUno = document.querySelector(".contenedor-cajas-uno");
const cajasFlexDos = document.querySelector(".contenedor-cajas-dos");
const textoFlex = document.querySelectorAll("#info-flex");
const cajaGrid = document.querySelector(".contenedor-cajas-grid");
const textoGrid = document.querySelectorAll("#info-grid");
if(toggleFlexOn) {
    toggleFlexOn.addEventListener("click", () => {
        toggleFlexOn.classList.add("toggle-off");
        toggleFlexOff.classList.add("toggle-on");
        if(cajasFlexUno) {
            cajasFlexUno.classList.add("sin-flexbox");
            cajasFlexDos.classList.add("sin-flexbox");
            textoFlex[0].textContent = "Sin FlexBox";
            textoFlex[1].textContent = "Sin FlexBox";
        } else if(cajaGrid) {
            cajaGrid.classList.add("sin-flexbox");
            textoGrid[0].textContent = "Sin CSS GRID";
            textoGrid[1].textContent = "Sin CSS GRID";
        }
    });
    
    toggleFlexOff.addEventListener("click", () => {
        toggleFlexOn.classList.remove("toggle-off");
        toggleFlexOff.classList.remove("toggle-on");
        if(cajasFlexUno) {
            cajasFlexUno.classList.remove("sin-flexbox");
            cajasFlexDos.classList.remove("sin-flexbox");
            textoFlex[0].textContent = "Con FlexBox";
            textoFlex[1].textContent = "Con FlexBox";
        } else if(cajaGrid) {
            cajaGrid.classList.remove("sin-flexbox");
            textoGrid[0].textContent = "Con CSS GRID";
            textoGrid[1].textContent = "Con CSS GRID";
        }
    });
}

// Codigo para el reproductor
let reproduciendo = false;

const play = document.querySelector(".reproducir");
const pausa = document.querySelector(".pausa");
const repetir = document.querySelector(".reboot");
const recorrido = document.querySelector("#recorrido");
const paginaFlex = document.querySelector(".recursos-flex");
const paginaGrid = document.querySelector(".recursos-grid");

if(play) {
    let audio;
    if(paginaFlex) {
        audio = new Audio("../fase3/recursos/Flex.mp3");
    } else if(paginaGrid) {
        audio = new Audio("../fase3/recursos/Grid.mp3");
    }

    audio.onloadeddata = () => {
        recorrido.max = audio.duration;
        recorrido.value = 0;
    }

    let reproducir = () => {
        audio.play();
        reproduciendo = true;
        setInterval(() => {
            recorrido.value = audio.currentTime;
            if(audio.currentTime == audio.duration) {
                audio.currentTime = 0;
                pausa.classList.add("ocultar");
                play.classList.remove("ocultar");
            }
        }, 2000);

    }

    let pausar = () => {
        audio.pause();
        reproduciendo = false;
    }

    play.addEventListener("click", () => {
        reproducir();
        play.classList.add("ocultar");
        pausa.classList.remove("ocultar");
    });

    pausa.addEventListener("click", () => {
        pausar();
        pausa.classList.add("ocultar");
        play.classList.remove("ocultar");
    });

    recorrido.addEventListener("click", () => {
        audio.currentTime = recorrido.value;
        reproducir();
        play.classList.add("ocultar");
        pausa.classList.remove("ocultar");
    });

    repetir.addEventListener("click", () => {
        audio.currentTime = 0;
        pausar();
        pausa.classList.add("ocultar");
        play.classList.remove("ocultar");
    });
}

// Animación de autor
let nodos = document.querySelectorAll(".oculto");
if(nodos) {
    setTimeout(() => {
        nodos.forEach(nodo => {
            setTimeout(() => {
                nodo.classList.remove("oculto");
            }, 100);
        });
    }, 1000);
}