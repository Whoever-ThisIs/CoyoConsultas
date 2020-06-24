//Consulta si ya hay una sesion abierta
fetch('../dynamics/php/Datos_sesion.php')
.then((respuesta)=>{
    return respuesta.json();
})
.then((text)=>{
  var datos = text.split("~");
  console.log(datos);
  $(".profileName")[0].append(datos[1]+" "+datos[2]+" "+datos[3])
  $("#profileMail").text("Correo: "+datos[4])
  $("#profileBirth").text("Fecha de nacimiento: "+datos[5])
})
