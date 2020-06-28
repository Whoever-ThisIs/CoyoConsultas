//Favicon
$("head").append("<link rel='apple-touch-icon' sizes='180x180' href='../statics/media/favicon/apple-touch-icon.png'>")
$("head").append("<link rel='icon' type='image/png' sizes='32x32' href='../statics/media/favicon/favicon-32x32.png'>")
$("head").append("<link rel='icon' type='image/png' sizes='16x16' href='../statics/media/favicon/favicon-16x16.png'>")
$("head").append("<link rel='manifest' href='../statics/media/favicon/site.webmanifest'>")
$("head").append("<link rel='mask-icon' href='../statics/media/favicon/safari-pinned-tab.svg' color='#5bbad5'>")
$("head").append("<meta name='msapplication-TileColor' content='#b91d47'>")
$("head").append("<meta name='theme-color' content='#ffffff'>")
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
            window.location = '../'
        })
        $("#fontAwesome").attr("href", "../libs/fontawesome_free-5-13-0/css/all.min.css");
        $("#indexCss").attr("href", "../statics/css/index.css");
    }
}
function navPublic(path){
    fetch(path)
    .then((response)=>{
        return response.text();
    })
    .then((text)=>{
        console.log(text);
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
            };
            main();
        })
        }
    })
}
if(window.location.pathname=='/CoyoConsultas/'){
  navPublic('./templates/NavPublico.html')
}
else{
  navPublic('./NavPublico.html')
}
