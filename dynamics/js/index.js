$(document).ready(main);
var count = 1;
    function main(){
        $('.menu_bar').click(function(){

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
function pedir(file){
    let form = document.querySelector("#formularioPublico")
    fetch(file)
    .then((respuestita)=>{
        return respuestita.text();
    })
    .then((textito)=>{
        form.innerHTML(textito);
    })
}
let ingreso = document.querySelector("#formInicio");
let registro = document.querySelector("#formRegistro");
ingreso.addEventListener("click",()=>{
    pedir('Perfil.html');
})
registro.addEventListener("click",()=>{
    pedir('Registro.html');
})
