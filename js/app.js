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