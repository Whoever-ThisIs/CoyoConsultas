$(document).ready(main);
let count = 1;
let coquito = document.querySelector(".cocoTitle")
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
    $('.menu_bar').click(()=>{
        coquito.classList.toggle("cocoTitle2")
    })
};
