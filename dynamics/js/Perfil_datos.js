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

function editar(datos){
  console.log("editar");
  $("#profileMail").html("<input type='text' id='edcorreo' name='edcorreo' placeholder='Nuevo correo'></input>")
  $(".profile").html("Subir imágen<br><input type='file' name='edimg'></input><br>Tomar foto<br><input type='file' name='newimg'></input>")
  // $(".profileCover").prepend("<button type='button' id='edimg'>Subir imágen</button>")
  $(".bearbeiten").html("<input type='text' id='oldPass' name='oldPass' placeholder='Contraseña anterior'></input><br>"+
    "<input type='text' id='newPass' name='newPass' placeholder='Contraseña nueva'></input><br>"+
    "<input type='hidden' value='"+datos[0]+" name='id'></input>"+
    "<button type='button' id='save'>Guardar cambios</button>")

  $("#save").click(()=>{
    let data = new FormData(document.getElementById('formy'));
    fetch('../dynamics/php/Editar_perfil.php', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      document.getElementById('formy').reset();
    }).catch((message)=>{
      alert(message);
    });

    // window.location.reload();
  });
}



$("#editar").click(editar);
