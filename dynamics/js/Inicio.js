function createCards(b){
    let cardFeed = document.querySelector("#cardFeed");
    cardFeed.innerHTML = "";
    for(let i=0;i<b;i++){
        let card = document.createElement("div");
        card.classList.add("card")
        card.addEventListener("click",()=>{
            window.location = '../../templates/Perfil.html'
        })
        cardFeed.appendChild(card);
    }
}

function getCardsInfo(categoria){
    $.ajax({
        url:'../dynamics/php/Inicio.php',
        method:'POST',
        data:{categoria:categoria},
        success:(resp)=>{console.log(resp)}
    })  
}    
        $("#todo").click(()=>{
            getCardsInfo("1")
        })
        $("#ciencia").click(()=>{
            getCardsInfo("1")
        })
        $("#cultura").click(()=>{
            getCardsInfo("2")
        })
        $("#deportes").click(()=>{
            getCardsInfo("3")
        })
        $("#actividades").click(()=>{
            getCardsInfo("4")
        })
