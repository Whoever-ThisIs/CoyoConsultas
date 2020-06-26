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
    console.log(datos);
    $(".profile").css("background-image","url('../statics/media/img/profilepics/"+datos[0]+".jpg')");
    $(".profileName")[0].append(datos[1]+" "+datos[2]+" "+datos[3])
    $("#profileMail").text("Correo: "+datos[4])
    $("#profileBirth").text("Fecha de nacimiento: "+datos[5])
    $("#editar").click(editar);
    if (cookieVal) {
      document.cookie = "cookieVal=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      $(".bearbeiten").append("<h1 class='borrable'>Tus datos han sido actualizados. El como se ven desplegados en tu perfil se actualizara la proxima vez que inicies sesión</h1><br>"+
      "<button class='borrable' type='button' id='dismiss' name='dismiss'>Aceptar</button>");
      $("#dismiss").click(()=>{
        $(".borrable").remove();
      })
    }
  })

function editar(){
  $("#profileMail").html("<input type='text' id='edcorreo' name='edcorreo' placeholder='Nuevo correo'></input>")
  $(".profile").html("Subir imágen<br><input type='file' name='edimg'></input><br>")//Tomar foto<br><input type='file' name='newimg'></input>")
  // $(".profileCover").prepend("<button type='button' id='edimg'>Subir imágen</button>")
  $(".bearbeiten").html("<input type='text' id='oldPass' name='oldPass' placeholder='Contraseña anterior'></input><br>"+
  "<input type='text' id='newPass' name='newPass' placeholder='Contraseña nueva'></input><br>"+
  "<input type='submit' id='save' value='Guardar Cambios'></input>")
  document.getElementById('formy').addEventListener('submit', (e) => {
    e.preventDefault();
    let data = new FormData(document.getElementById('formy'));
    fetch('../dynamics/php/Editar_perfil.php', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      document.cookie="cookieVal=egal";
      setTimeout(()=>{
        window.location.reload();
      },1000)
    }).catch((message)=>{
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
