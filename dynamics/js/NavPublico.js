/* Agrega eventos a la navbar, como index y las paginas no estan en el mismo directorio entonces un condicional asigna las rutas */
function eventlis(){
    let creditosP = document.querySelector("#creditosP");
    let ayudaP = document.querySelector("#ayudaP");
    let encuestasP = document.querySelector("#encuestasP");
    let resultadosP = document.querySelector("#resultadosP");
    if(window.location.pathname=='/CoyoConsultas/'){
        creditosP.addEventListener("click",()=>{
            window.location = './templates/Creditos.html'
        })
        ayudaP.addEventListener("click",()=>{
            window.location = './templates/Ayuda.html'
        })
        encuestasP.addEventListener("click",()=>{
            window.location = './templates/EncuestasPublico.html'
        })
        resultadosP.addEventListener("click",()=>{
            window.location.reload();
        })
    }
    else{
        creditosP.addEventListener("click",()=>{
            window.location = './Creditos.html'
        })
        ayudaP.addEventListener("click",()=>{
            window.location = './Ayuda.html'
        })
        encuestasP.addEventListener("click",()=>{
            window.location = './EncuestasPublico.html'
        })
        resultadosP.addEventListener("click",()=>{
            window.location = '../index.html'
        })
    }
}
function navPublic(path){
fetch(path)
.then((response)=>{
    return response.text();
})
.then((text)=>{
    let header = document.querySelector(".publicNav")
    header.innerHTML = text;
    eventlis();
    let count = 1;
    function main(){
        $('.menu_bar').click(()=>{
            if(count == 1){
            $('nav').animate({
                left: '0'
            });
            count = 0;
            } else {
            count = 1;
            $('nav').animate({
                left: '-100%'
            });
            }
        });
    };
    main();
})
}
if(window.location.pathname=='/CoyoConsultas/'){
    navPublic('./templates/NavPublico.html')
}
else{
    navPublic('./NavPublico.html')
}