document.addEventListener("DOMContentLoaded", () => {
    inicializar();
});

function inicializar() {
    iniciarEventos();
}

let respElegidas;

function validarPegunta() {
    let preguntas = ["preg1", "preg2", "preg3", "preg4", "preg5"];
    respElegidas = [];
    let respondidas = 0;
    preguntas.forEach((id) => {
        let selecccionada = 0;
        let opciones = document.querySelectorAll(`#${id} input[type="radio"]`);
        let alerta = document.querySelector(`#${id} .alert-danger`);
        opciones.forEach((opcion) => {
            if(opcion.checked) {
                selecccionada++;
                respondidas++;
                respElegidas.push(opcion.value);
            }

            if(!selecccionada) {
                alerta.classList.remove("d-none");
            } else {
                alerta.classList.add("d-none");
            }

        })
    })

    if(respondidas == preguntas.length) return true;
}

function respuestasUsuario(verificado) {
    if(verificado) {
        let objetoRespuestas = {
            preg1: respElegidas[0],
            preg2: respElegidas[1],
            preg3: respElegidas[2],
            preg4: respElegidas[3],
            preg5: respElegidas[4]
        };
        
        validarRespuestas(objetoRespuestas);
    }
}

function iniciarEventos() {
    let formulario = document.querySelector("#form-flex");
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let verificado = validarPegunta();
        if(verificado) {
            respuestasUsuario(verificado);
        } else {
            aviso("Asegurese de que contestó todas las preguntas.");
        }
    });

    formulario.addEventListener("click", (e) => {
        if(e.target.classList.contains("form-check-input")) {
            let id = e.target.parentElement.parentElement.id;
            document.querySelector(`#${id} .alert-danger`).classList.add("d-none");
        }
    })
}

function validarRespuestas(objetoRespuestas) {
    let respuestasVal = {
        preg1: "ans3",
        preg2: "ans2",
        preg3: "ans2",
        preg4: "ans4",
        preg5: "ans1"
    };

    let correcto = {
        preg1: (objetoRespuestas.preg1 == respuestasVal.preg1),
        preg2: (objetoRespuestas.preg2 == respuestasVal.preg2),
        preg3: (objetoRespuestas.preg3 == respuestasVal.preg3),
        preg4: (objetoRespuestas.preg4 == respuestasVal.preg4),
        preg5: (objetoRespuestas.preg5 == respuestasVal.preg5)
    }

    mostrarResultados(objetoRespuestas, respuestasVal, correcto);
}

function respuestas() {
    return {
        pp: {
            ans1: "position: flex;",
            ans2: "display: flexbox;",
            ans3: "display: flex;",
            ans4: "position: flexbox;"
        },
        sp: {
            ans1: "Los elementos del contenedor se sobreponen entre si.",
            ans2: "Los elementos se posicionan en diferentes ejes si se supera el ancho del contenedor.",
            ans3: "Los elementos mantendrán el mismo eje aunque se supere el ancho del contenedor.",
            ans4: "No sucederá nada ya que esta propiedad no exite para Flexbox."
        },
        tp: {
            ans1: "Eje diagonal.",
            ans2: "Eje vertical.",
            ans3: "Eje horizontal."
        }, 
        cp: {
            ans1: "width",
            ans2: "float",
            ans3: "flex-width",
            ans4: "flex-basis"
        }, 
        qp: {
            ans1: "Es capaz de cambiar la dirección de los ejes del contenedor flex.",
            ans2: "Permite definir el ancho de un elemento flex.",
            ans3: "Permite definir la altura de un elemento flex.",
            ans4: "Crea nuevos ejes dentro del contenedor flex."
        }
    }
}

function mostrarResultados(respUsuario, respValidas, objValidar) {
    let formulario = document.getElementById("contenedor-form");
    let resultados = document.getElementById("resultados");
    let primerPreg = document.getElementById("pp-resp");
    let segundaPreg = document.getElementById("sp-resp");
    let tercerPreg = document.getElementById("tp-resp");
    let cuartaPreg = document.getElementById("cp-resp");
    let quintaPreg = document.getElementById("qp-resp");
    let puntaje = document.getElementById("num-correctas");
    let barra = document.getElementById("barra-progreso");
    let respuestaText = respuestas();
    let numCorrectas = 0;

    formulario.classList.add("d-none");
    formulario.classList.remove("d-none");

    primerPreg.innerHTML = `<code>${respuestaText.pp[respUsuario.preg1]}</code>`;
    segundaPreg.innerHTML = respuestaText.sp[respUsuario.preg2];
    tercerPreg.innerHTML = respuestaText.tp[respUsuario.preg3];
    cuartaPreg.innerHTML = `<code>${respuestaText.cp[respUsuario.preg4]}</code>`;
    quintaPreg.innerHTML = respuestaText.qp[respUsuario.preg5];

    if(objValidar.preg1) {
        alertExito(primerPreg);
        numCorrectas++;
    } else {
        alertError(primerPreg);
    }

    if(objValidar.preg2) {
        alertExito(segundaPreg);
        numCorrectas++;
    } else {
        alertError(segundaPreg);
    }

    if(objValidar.preg3) {
        alertExito(tercerPreg);
        numCorrectas++;
    } else {
        alertError(tercerPreg);
    }

    if(objValidar.preg4) {
        alertExito(cuartaPreg);
        numCorrectas++;
    } else {
        alertError(cuartaPreg);
    }

    if(objValidar.preg5) {
        alertExito(quintaPreg);
        numCorrectas++;
    } else {
        alertError(quintaPreg);
    }

    puntaje.innerHTML = `${numCorrectas}/5`;
    let porcentaje =(numCorrectas * 100) / 5;

    barra.setAttribute("aria-valuenow", porcentaje);
    barra.style.width = `${porcentaje}%`;
    barra.innerHTML = `${porcentaje}%`;
}

function alertExito(elemento) {
    elemento.classList.add("text-success");
    elemento.parentElement.parentElement.classList.add("alert-success");
}

function alertError(elemento) {
    elemento.classList.add("text-danger");
    elemento.parentElement.parentElement.classList.add("alert-danger");
}

function aviso(mensaje) {
    let notificacion = document.createElement("div");
    notificacion.classList.add("not-succes");
    notificacion.innerHTML = `${mensaje}`;

    let body = document.querySelector("body");
    body.appendChild(notificacion);

    setTimeout(function () {
        notificacion.classList.add("anim");

        setTimeout(function () {
            notificacion.classList.remove("anim");

            setTimeout(function () {
                notificacion.remove();
            }, 500);
        }, 5000);
    }, 100);
}