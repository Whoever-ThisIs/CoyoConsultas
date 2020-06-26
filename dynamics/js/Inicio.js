function newCard(category, title, descripcion, inicio, inicio_hora, fin, fin_hora) {
  let tarjeta = $("<div>");
  let titulo = $("<h1>" + title + "</h1>");
  let txt = $("<p>" + descripcion + "</p>");
  tarjeta.append(titulo, txt);
  if (fin !== null && fin_hora !== null)
  {
    let i = $("<p>Fecha de inicio: " + inicio + "&nbsp;&nbsp;&nbsp;" + inicio_hora + "</p>");
    let f = $("<p>Fecha límite: " + fin + "&nbsp;&nbsp;&nbsp;" + fin_hora + "</p>");
    tarjeta.append(i, f);
  }
  $("#cardFeed").append(tarjeta);
}
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
    success:(resp)=>{
      $("#cardFeed").html("")
      console.log(typeof resp)
      console.log(JSON.parse(resp))
      let tarjetas = JSON.parse(resp);
      if(tarjetas.length == 0){
        $("#cardFeed").html("No hay formularios disponibles en este momento")
      }else{
        tarjetas.forEach((elem, index)=>{
          newCard(elem.id_categoria, elem.titulo, elem.descripcion, elem.inicio, elem.inicio_hora, elem.fin, elem.fin_hora)
        })
      }
    }
  })  
}    
$("#todo").click(()=>{
  getCardsInfo("1,2,3,4")
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
