function cookieForm(id_form){
  document.cookie = "id_form=" + id_form;
  window.location = "./Responder_formulario.html";
}
function newCard(category, id_form, title, descripcion, inicio, inicio_hora, fin, fin_hora) {
  let tarjeta = $("<div>");
  tarjeta.addClass("card")
  let titulo = $("<h1>" + title + "</h1>");
  let txt = $("<p>" + descripcion + "</p>");
  tarjeta.append(titulo, txt);
  if (fin !== null && fin_hora !== null)
  {
    let i = $("<p>Fecha de inicio: " + inicio + "&nbsp;&nbsp;&nbsp;" + inicio_hora + "</p>");
    let f = $("<p>Fecha límite: " + fin + "&nbsp;&nbsp;&nbsp;" + fin_hora + "</p>");
    tarjeta.append(i, f);
  }
  let boton = $("<button onclick=cookieForm('" + id_form + "')>Contesta</button>")
  tarjeta.append(boton);
  $("#cardFeed").append(tarjeta);
}
function getCardsInfo(categoria){
  $.ajax({
    url:'../dynamics/php/Inicio.php',
    method:'POST',
    data:{categoria:categoria},
    success:(resp)=>{
      console.log(typeof resp)
      console.log(JSON.parse(resp))
      let tarjetas = JSON.parse(resp);
      if(tarjetas.length == 0){
        $("#cardFeed").html("No hay formularios disponibles en este momento")
      }else{
        tarjetas.forEach((elem, index)=>{
          newCard(elem.id_categoria, elem.id_form, elem.titulo, elem.descripcion, elem.inicio, elem.inicio_hora, elem.fin, elem.fin_hora)
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
