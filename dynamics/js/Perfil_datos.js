  
function getCookie(name){
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(document.cookie);
  return (value != null) ? unescape(value[1]) : false;
}

let dismissVal = 1;
let cookieVal = getCookie("cookieVal");

//Consulta si ya hay una sesion abierta
fetch('../dynamics/php/Datos_sesion.php')
  .then((respuesta)=>{
      return respuesta.json();
  })
  .then((text)=>{
    var datos = text.split("~");
    //Elige la imagen
    $(".profile").css("background-image","url('../statics/media/img/profilepics/"+datos[0]+".jpg')");
    $(".profileName")[0].append(datos[1]+" "+datos[2]+" "+datos[3])
    $("#profileMail").text("Correo: "+datos[4])
    $("#profileBirth").text("Fecha de nacimiento: "+datos[5])
    $("#editar").click(editar);
    //Esta cookies dice que algo ha sido cambiado en el perfil
    if (cookieVal) {
      //Si existe la borra y despliega el mensaje adecuado
      document.cookie = "cookieVal=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      $(".bearbeiten").append("<h1 class='borrable'>Tus datos han sido actualizados. El como se ven desplegados en tu perfil se actualizara la proxima vez que inicies sesión</h1><br>"+
      //Elimina el mensaje
      "<button class='borrable' type='button' id='dismiss' name='dismiss'>Aceptar</button>");
      $("#dismiss").click(()=>{
        $(".borrable").remove();
      })
    }
  })

//Inserta los campos de cambio y realiza la petición
function editar(){
  //Inputs del form
  $("#profileMail").html("<input type='text' id='edcorreo' name='edcorreo' placeholder='Nuevo correo'></input>")
  $(".profile").html("<span class='fa fa-camera'></span><br><input type='file' name='edimg'></input><br>")//Tomar foto<br><input type='file' name='newimg'></input>")
  $(".bearbeiten").html("<input type='text' id='oldPass' name='oldPass' placeholder='Contraseña anterior'></input><br>"+
  "<input type='text' id='newPass' name='newPass' placeholder='Contraseña nueva'></input><br>"+
  "<input type='submit' id='save' value='Guardar Cambios'></input>")
  //Al presionar submit
  document.getElementById('formy').addEventListener('submit', (e) => {
    e.preventDefault();
    //Crea la petición
    let data = new FormData(document.getElementById('formy'));
    fetch('../dynamics/php/Editar_perfil.php', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((data) => {
      //Establece la cookie que indica que algo ha sido cambiado
      document.cookie="cookieVal=egal";
      setTimeout(()=>{
        //Recarga la página
        window.location.reload();
      },1000)
    }).catch((message)=>{
      //Si algo ha ido mal regresa un mensaje que indica que algo ha fallado
      document.getElementById('formy').reset();
      if (dismissVal > 0) {
        $(".bearbeiten").append("<h1 class='borrable'>Asegurate de haber ingresado los datos correctos</h1><br>"+
        "<button class='borrable' type='button' id='dismiss' name='dismiss'>Aceptar</button>");
        dismissVal--;
      }
      $("#dismiss").click(()=>{
        dismissVal = 1;
        $(".borrable").remove();
      })
    });
  });
}

document.getElementById('Paleta').addEventListener('submit', (e) => {
  e.preventDefault();
  let dato = new FormData(document.getElementById('Paleta'));
  fetch('../dynamics/php/Paletas.php', {
    method: 'POST',
    body: dato
  }).then((response) => {
    return response.text();
  }).then((dato) => {
    document.cookie="colores="+dato;
  });
});
