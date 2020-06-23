let crear = document.querySelector("#crear");
let inicio = document.querySelector("#inicio");
let perfil = document.querySelector("#perfil");
let cerrar = document.querySelector("#cerrar");
let content = document.querySelector("#content");
let body = document.querySelector("body");
function ask(file){
    fetch(file)
    .then((result)=>{
        return result.text();
    })
    .then((convert)=>{
        content.innerHTML = "";
        content.innerHTML = convert;
        if(file=="Inicio.html"){
            let todo = document.querySelector("#todo");
            let deportes = document.querySelector("#deportes");
            let entretenimiento = document.querySelector("#entretenimiento");
            let politica = document.querySelector("#politica");
            let cultura = document.querySelector("#cultura");
            createCards(16);
            todo.addEventListener("click",()=>{
                createCards(16);
            })
            deportes.addEventListener("click",()=>{
                createCards(8);
            })
            entretenimiento.addEventListener("click",()=>{
                createCards(3);
            })

            politica.addEventListener("click",()=>{
                createCards(3);
            })

            cultura.addEventListener("click",()=>{
                createCards(2);
            })
            /*Este for es el que se ocuparia, lode arriba es provisional para checar el funcionamiento
            for(let j=0;j<9;j++){
                let catego =
                catego.addEventListener("click",()=>{
                    createCards(a);
                })
            }
            createCards();*/
        }
        if(file=="Crear_formulario.js"){
            let scriptCreate = document.createElement("script");
            scriptCreate.setAttribute("src","../dynamics/js/NavInicio.js")
            body.appendChild(scriptCreate);
        }
    })
    .catch((error)=>{
        console.log(error.mesage)
    })
}
function createCards(a){
    let cardFeed = document.querySelector("#cardFeed");
    cardFeed.innerHTML = "";
    for(let i=0;i<a;i++){
        let card = document.createElement("div");
        card.classList.add("card")
        card.addEventListener("click",()=>{
            ask('Perfil.html');
        })
        cardFeed.appendChild(card);
    }
}
/* Genera feed principal */
fetch('Inicio.html')
    .then((response)=>{
        return response.text();
    })
    .then((then)=>{
        content.innerHTML = then;
        ask('Inicio.html');
        crear.addEventListener("click",()=>{
            ask('Crear_formulario.html');
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
