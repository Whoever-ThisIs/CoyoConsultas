function cookieForm(id_form){
    document.cookie = "id_form=" + id_form;
    window.location = "./Responder_formulario.html";
  }
  /* Crea una nueva tarjeta por cada encuesta, dependiendo su categoria la clase y por lo tanto el color asignado */
  function newCard(category, id_form, title, descripcion, inicio, inicio_hora, fin, fin_hora) {
    let tarjeta = $("<div>");
    tarjeta.addClass("tarjeta");
    if(category==1){
      tarjeta.addClass("ciencia")
    }
    if(category==2){
      tarjeta.addClass("cultura")
    }
    if(category==3){
      tarjeta.addClass("deportes")
    }
    if(category==4){
      tarjeta.addClass("actividades")
    }  
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
      let f_ms = Date.parse(fin + " " + fin_hora);
      let ahora = new Date();
      ahora = ahora.getTime();
      let i = $("<p>Fecha de inicio: " + inicio + "&nbsp;&nbsp;&nbsp;" + inicio_hora + "</p>");
      let f = $("<p>Fecha límite: " + fin + "&nbsp;&nbsp;&nbsp;" + fin_hora + "</p>");
      tarjeta.append(i, f);
      if (ahora < i_ms || ahora > f_ms){
        boton.attr("disabled", true);
      }
    }
  }
  /* Realiza la peticion de la informacion que necesita dependiendo la categoria que se busca */
  function getCardsInfo(categoria){
    $.ajax({
      url:'../dynamics/php/EncuestasPublicas.php',
      method:'POST',
      data:{categoria:categoria},
      success:(resp)=>{
        $("#cardFeed").html("")
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
  /* Selectores que asignan los valores por categoria a cada opcion del nav */
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
  /* Para evitar volver complicado de leer el html, el grafico se pide a su correspondiente html y se coloca en la pagina */
  function bars(id){
    fetch('./BarsGraph.html')
    .then((response)=>{
      return response.text();
    })
    .then((text)=>{
      let barsAnimation = document.querySelector(id);
      barsAnimation.innerHTML=text;
    })
  }
  bars("#barsAnimation");
  bars("#barsAnimation2");