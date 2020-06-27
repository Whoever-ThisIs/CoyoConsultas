function cookieForm(id_form){
    document.cookie = "id_form=" + id_form;
    window.location = "./Responder_formulario.html";
  }
  function newCard(category, id_form, title, descripcion, inicio, inicio_hora, fin, fin_hora) {
    let tarjeta = $("<div>");
    tarjeta.addClass("tarjeta");
    let titulo = $("<h1>" + title + "</h1>");
    let txt = $("<p>" + descripcion + "</p>");
    tarjeta.append(titulo, txt);
    tarjeta.addClass("card");
    let boton = $("<button>")
    boton.text("Contesta")
    boton.attr("onclick", "cookieForm('" + id_form + "')")
    tarjeta.append(boton);
    $("#cardFeed").append(tarjeta);
    if (fin !== null && fin_hora !== null)
    {
      let i_ms = Date.parse(inicio + " " + inicio_hora);
      console.log(title)
      console.log("Inicio: " + i_ms)
      let f_ms = Date.parse(fin + " " + fin_hora);
      console.log("Fin: " + f_ms)
      let ahora = new Date();
      ahora = ahora.getTime();
      console.log("Ahora: " + ahora)
      let i = $("<p>Fecha de inicio: " + inicio + "&nbsp;&nbsp;&nbsp;" + inicio_hora + "</p>");
      let f = $("<p>Fecha límite: " + fin + "&nbsp;&nbsp;&nbsp;" + fin_hora + "</p>");
      tarjeta.append(i, f);
      if (ahora < i_ms || ahora > f_ms){
        boton.attr("disabled", true);
      }
    }
  }
  function getCardsInfo(categoria){
    $.ajax({
      url:'../dynamics/php/EncuestasPublicas.php',
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
          $("#cardFeed").html("")
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
  $("#todo").trigger("click")