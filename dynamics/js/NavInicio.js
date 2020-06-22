let crear = document.querySelector("#crear");
let inicio = document.querySelector("#inicio");
let perfil = document.querySelector("#perfil");
let cerrar = document.querySelector("#cerrar");
let content = document.querySelector("#content");
function ask(file){
    fetch(file)
    .then((result)=>{
        return result.text();
    })
    .then((convert)=>{
        content.innerHTML = convert;
    })
    .catch((error)=>{
        console.log(error.mesage)
    })
}
fetch('Inicio.html')
    .then((response)=>{
        return response.text();
    })
    .then((then)=>{
        content.innerHTML = then;
        crear.addEventListener("click",()=>{
            ask('Crear.html');
        })
        inicio.addEventListener("click",()=>{
            ask('Inicio.html');
        })
        perfil.addEventListener("click",()=>{
            ask('Perfil.html');
        })
    })
    .catch((error)=>{
        console.log(error.message);
    })