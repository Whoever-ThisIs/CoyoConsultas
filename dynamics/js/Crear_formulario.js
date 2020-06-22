function añadirPreg() {
  //Se crea el contenedor de la nueva pregunta
  let newPreg = $("<div>")
  newPreg.addClass("Pregunta")
  let numPreg = ($(".Pregunta").length+1);//Se calcula su numero de pregunta
  newPreg.attr('id', ("P-"+numPreg));//Se agrega su id
  let nomPreg =$("<h2>Pregunta "+numPreg+"</h2>")
  let btnElimPreg = $("<button type='button' class='Elim_Preg'>Eliminar</button>")
  btnElimPreg.click(()=>{
    newPreg.remove()
  });
  if (numPreg>1) {
    nomPreg.append(btnElimPreg)
  }
  newPreg.append(nomPreg)
  newPreg.append("<input type='text' name='P-"+numPreg+"' placeholder='Ingrese su pregunta' required>")//Su pregunta
  newPreg.append("<h3>Opciones de respuesta</h3>")
  ////**  Opciones de respuesta  **////
  //Boton para añadir una opcion extra
  let btnAñadirOpc = $("<button type='button' class='Añadir_Opc'>Añadir Opcion</button>")
  btnAñadirOpc.click(()=>{
    opciones.append(añadirResp(numPreg))
  });
  //Contenedor de las opciones
  let opciones = $("<div>");
  opciones.addClass("Opciones")
  opciones.append(btnAñadirOpc)
  newPreg.append(opciones)
  if (numPreg<=5) {
    $("body").append(newPreg)
    //Se añade las dos primeras respuestas
    for (var i = 0; i < 2; i++) {
      opciones.append(añadirResp(numPreg ))
    }
  }
}
function añadirResp(numPregunta) {
  /*Aqui se calcula cuantos hijos (respuestas) hay en las opciones
    El valor de numero de pregunta es igual A sus hijos(total adentro)
    -1(El boton de añadir)+1(La respuesta actual) por eso lo siguiente*/
  let numOpc = ($("#P-"+numPregunta).children()[3].children.length);
  //Se crea el p donde se guarda esto
  let newOpc = $("<p>")
  newOpc.append("<input type='text' placeholder='Ingrese su respuesta' required>")
  //Si hay mas de dos opciones en esa pregunta puedes eliminar esa opcion
  if (numOpc>2) {
    //Boton para eliminar esa opcion
    let btnElimOpc = $("<button type='button' class='Elim_Opc'>Eliminar</button>")
    btnElimOpc.click(()=>{
      newOpc.remove()
    });
    newOpc.append(btnElimOpc)
  }
  if (numOpc<=10) {
    return newOpc
  }
}
//Boton para añadir preguntas
$("#Anadir_preg").click(()=>{
  añadirPreg();
})
//Añade la primera pregunta
añadirPreg();
