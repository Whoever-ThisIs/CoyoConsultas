/**Este programa verifica si un usuario puede
 * responder una encuesta y le permite contestarla y guarda sus
 * resultados si cuenta con la autorización, o lo devuelve a la
 * página de inicio
 */
// Función para obtener el valor de una cookie
function getCookie(name) {
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : false;
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////  Crear el formulario de respuesta  //////////////////////
////////////////////////////////////////////////////////////////////////////////
// Se obtiene el valor del formulario
var id_formu = getCookie("id_form");
// Verifica que existe
if(id_formu != false){
  // Se crea el id_form para obtenerlo luego por metodo POST en el php
  getForm = new FormData();
  getForm.append("id_form", id_formu);
  // Se obtiene la autorización del usuario
  fetch('../dynamics/php/Verif_usr.php', {
    method: 'POST',
    body: getForm
  })
  .then(respuesta => respuesta.text())
  .then((bool_usr) => {
    // Si tiene la autorización, se muestra
    if(bool_usr == 1){
      // Se pide el formulario
      fetch('../dynamics/php/Resp_form.php', {
        method: 'POST',
        body: getForm
      })
      .then((response) => {
        // Se decodifica el resultado de JSON y genera un objeto
        return response.json();
      }).then((data) => {
        // Se guarda el objeto como "Formulario"
        var formulario = data;
        // Se pone en la página su nombre y descripcion
        $("#Nom_form").text(formulario.Titulo)
        $("#Desc_form").text(formulario.Desc)
        // Guardo variable de las preguntas de Formulario
        var preguntas = formulario[0].Preguntas;
        // Se imprimen las preguntas
        for (var n = 0; n < preguntas.length; n++) {
          // Se imprime el nombre de la pregunta
          $("#Preguntas").append("<h3>Pregunta "+(n+1)+": "+preguntas[n].Titulo+"</h3>");
          // Se guarda el id de esa pregunta, sus opciones
          var id_preg = preguntas[n].id_preg;
          var opciones = formulario[0].Preguntas[n].Opciones;
          // Se crea el contenedor donde van a estar las opciones
          var divOpc = $("<div>")
          // Imprimo todas las opciones de cada pregunta en input radio
          for (var i = 0; i < opciones.length; i++) {
            var opc = $("<input type='radio' id='"+opciones[i].id_opc+"' name='"+id_preg+"' value='"+i+"'>");
            // Si es la primera opcion la preseleciona
            if (i==0) {
              opc.prop('checked', true)
            }
            divOpc.append(opc)
            // La respuesta (el texto que el usuario ve) de la pregunta
            divOpc.append("<label for='"+opciones[i].id_opc+"'>"+opciones[i].valor+"</label><br>")
          }
          // Se imprime esa pregunta
          $("#Preguntas").append(divOpc)
        }
      });
      ////////////////////////////////////////////////////////////////////////////////
      //////////////////////  Subir el formulario de respuesta  //////////////////////
      ////////////////////////////////////////////////////////////////////////////////
      // Evento de subir la info
      $("#Enviar").click(()=>{
        //Se guarda los resultados de los radio
        sendForm = new FormData(document.getElementById('Formu'));
        sendForm.append("id_form", id_formu);//<== Ingrese aui el id del formulario
        // Se hace la peticion
        fetch('../dynamics/php/Respuesta_form.php', {
          method: 'POST',
          body: sendForm
        }).then((response) => {
          return response.text();
        }).then((text) => {
          console.log(text);
        })
      })
      // Sin autorización se redirige a inicio
    }else{
      window.location = "./Inicio.html";
    }
  })
}else{
  // Si no existe el formulario se redirige a inicio
  window.location = "./Inicio.html";
}
