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
/* Genera feed principal */
function askInicio(file){
    fetch(file)
    .then((result)=>{
        return result.text();
    })
    .then((convert)=>{
        content.innerHTML = convert;
        let cardFeed = document.querySelector("#cardFeed");
        for(let i=0;i<9;i++){
            let card = document.createElement("div");
            card.classList.add("card")
            let link = document.createElement("a");
            link.setAttribute("href","#");
            link.classList.add("link");
            card.appendChild(link);
            cardFeed.appendChild(card);
        }
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
            askInicio('Inicio.html');
        })
        perfil.addEventListener("click",()=>{
            ask('Perfil.html');
        })
    })
    .catch((error)=>{
        console.log(error.message);
    })