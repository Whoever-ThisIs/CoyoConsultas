function eventlis(){
    let crear = document.querySelector("#crear");
    let inicio = document.querySelector("#inicio");
    let perfil = document.querySelector("#perfil");
    let cerrar = document.querySelector("#cerrar");
    crear.addEventListener("click",()=>{
        window.location = '../../templates/Crear_formulario.html'
    })
    inicio.addEventListener("click",()=>{
        window.location = '../../templates/Inicio.html'
    })
    perfil.addEventListener("click",()=>{
        window.location = '../../templates/Perfil.html'
    })
    cerrar.addEventListener("click",()=>{
        window.location = '../../index.html'
    })
}
fetch('NavInicio.html')
.then((respuesta)=>{
    return respuesta.text();
})
.then((text)=>{
    let navBar = document.querySelector(".navBar");
    navBar.innerHTML = text;
    eventlis();
})