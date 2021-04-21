document.addEventListener("DOMContentLoaded", () => {
    inicializar();
});

function inicializar() {
    iniciarEventos();
}

function validarPegunta() {
    let preguntas = ["preg1", "preg2", "preg3", "preg4", "preg5"];
    let respondidas = 0;
    preguntas.forEach((id) => {
        let selecccionada = 0;
        let opciones = document.querySelectorAll(`#${id} input[type="radio"]`);
        let alerta = document.querySelector(`#${id} .alert-danger`);
        opciones.forEach((opcion) => {
            if(opcion.checked) {
                selecccionada++;
                respondidas++;
            }

            if(!selecccionada) {
                alerta.classList.remove("d-none");
            }
        })
    })

    if(respondidas == preguntas.length) return true;
}

function respuestasUsuario(verificado) {
    
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