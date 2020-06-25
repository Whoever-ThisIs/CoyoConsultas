////////////////////////////////////////////////////////////////////////////////
//////////////////////  Crear el formulario de respuesta  //////////////////////
////////////////////////////////////////////////////////////////////////////////

  //Se crea el id_form para obtenerlo luego por metodo POST en el php
  var id_formu = "94NVUO"
  getForm = new FormData();
  getForm.append("id_form", id_formu);//<== Ingrese aui el id del formulario
  //Se manda la peticion
  fetch('../dynamics/php/Resp_form.php', {
    method: 'POST',
    body: getForm
  })
  .then((response) => {
    // Se decodifica el resultado de JSON y genera un objeto
    return response.json();
  }).then((data) => {
    // Guarado ese objeto como "Formulario"
    var formulario = data;
    // Pongo en la página su nombre y descripcion
    $("#Nom_form").text(formulario.Titulo)
    $("#Desc_form").text(formulario.Desc)
    // Guardo variable de las preguntas de Formulario
    var preguntas = formulario[0].Preguntas;
    // Imprimo todas las preguntas
    for (var n = 0; n < preguntas.length; n++) {
      // Imprimo el nombre de la pregunta
      $("#Preguntas").append("<h3>Pregunta "+(n+1)+": "+preguntas[n].Titulo+"</h3>");
      //Guardo el id de esa pregunta, sus opciones
      var id_preg = preguntas[n].id_preg;
      var opciones = formulario[0].Preguntas[n].Opciones;
      //Creo el contenedor donde van a estar las opciones
      var divOpc = $("<div>")
      //Imprimo todas las opciones de cada pregunta en input radio
      for (var i = 0; i < opciones.length; i++) {
        var opc = $("<input type='radio' id='"+opciones[i].id_opc+"' name='"+id_preg+"' value='"+i+"'>");
        //Si es la primera pregunta la preseleciona
        if (i==0) {
          opc.prop('checked', true)
        }
        divOpc.append(opc)
        // La respuesta (el texto que el usuario ve) de la pregunta
        divOpc.append("<label for='"+opciones[i].id_opc+"'>"+opciones[i].valor+"</label><br>")
      }
      //Imprimo esa pregunta
      $("#Preguntas").append(divOpc)
    }
  });
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////  Subir el formulario de respuesta  //////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //Evento de subir la info
  $("#Enviar").click(()=>{
    //Se guarda los resultados de los radio
    sendForm = new FormData(document.getElementById('Formu'));
    sendForm.append("id_form", id_formu);//<== Ingrese aui el id del formulario
    //Se hace la peticion
    fetch('../dynamics/php/Respuesta_form.php', {
      method: 'POST',
      body: sendForm
    }).then((response) => {
      return response.text();
    }).then((text) => {
      console.log(text);
    })
  })
