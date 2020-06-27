fetch('../dynamics/php/Datos_sesion.php')
  .then((respuesta)=>{
      return respuesta.json();
  })
  .then((text)=>{
    var datos = text.split("~");
    //Sustituye el true por : datos[7]=="Admin"
    //Confirma que quien entro aqui tenga rango admin en su usuario
    if (true) {
      //Si lo es hace la consulta de toda la informacion del usuario
      fetch('../dynamics/php/List_usuarios.php')
      .then((response) => {
        // Se decodifica el resultado de JSON y genera un objeto
        return response.json();
      }).then((data) => {
        data.forEach((elem, index) => {
          //Se inserta cada valor en una fila para luego insertarse
          var row = $("<tr>");
          row.append("<td>"+elem.id_us+"</td>");
          row.append("<td>"+elem.Nombre+"</td>");
          row.append("<td>"+elem.tipo+"</td>");
          var btnBloq = $("<button>")
          if (elem.bloqueado==true) {
            /*************** Boton de desbloquear usuario ***************/
            /*********************************************************/
            btnBloq.html("Desbloquear")
            btnBloq.click(()=>{
              bloqUs = new FormData();
              bloqUs.append("id_us", elem.id_us);
              bloqUs.append("Accion", "Desbloquear");
              // Se obtiene la autorización del usuario
              fetch('../dynamics/php/Bloquear_usuario.php', {
                method: 'POST',
                body: bloqUs
              })
              .then((respuesta) => {
                return respuesta.text();
              }).then((mensaje) => {
                if (mensaje=="Usuario desbloqueado") {
                  console.log("Todo Ok");
                  window.location.reload()
                }else {
                  console.log("Algo salio mal");
                }
              })
            })
          }else {
            /*************** Boton de bloquear usuario ***************/
            /*********************************************************/
            btnBloq.html("Bloquear")
            btnBloq.click(()=>{
              bloqUs = new FormData();
              bloqUs.append("id_us", elem.id_us);
              bloqUs.append("Accion", "Bloquear");
              // Se obtiene la autorización del usuario
              fetch('../dynamics/php/Bloquear_usuario.php', {
                method: 'POST',
                body: bloqUs
              })
              .then((respuesta) => {
                return respuesta.text();
              }).then((mensaje) => {
                if (mensaje=="Usuario bloqueado") {
                  console.log("Todo Ok");
                  window.location.reload()
                }else {
                  console.log("Algo salio mal");
                }
              })
            })
          }
          var columnBloq = $("<td>");
          columnBloq.append(btnBloq)
          row.append(columnBloq);
          //Inserta todo en la tabla
          $("#List_usu").append(row);
        });
      });
    }else {
      alert("No tiene permiso de entrar en esta página")
      window.location = './Inicio.html'
    }
  })
