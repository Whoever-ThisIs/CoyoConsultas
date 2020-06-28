fetch('../dynamics/php/Datos_sesion.php')
  .then((respuesta)=>{
      return respuesta.json();
  })
  .then((text)=>{
    var datos = text.split("~");
    //Sustituye el true por : datos[7]=="Admin"
    //Confirma que quien entro aqui tenga rango admin en su usuario
    if (datos[7]=="Admin") {
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
          btnBloq.addClass("bloq")
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
          /*************** Boton de eliminar usuario ***************/
          /*********************************************************/
          var btnElim = $("<button>")
          btnElim.html("<i class='fas fa-trash'></i>");
          btnElim.addClass("Elim")
          btnElim.click(()=>{
            let alerta = $("<div id='alerta-mostar'>")
            alerta.css( "cursor", "inherit")
            alerta.addClass("alerta-fond")
            let contenido = $("<div>")
            contenido.addClass("alerta-cont")
            contenido.append("<h1 class='Titulo'>¿Desea eliminas a "+elem.Nombre+"?</h1>");
            contenido.append("<h4> Si elimina a un usurario sus formularios y respuestas seran eliminadas tambien, esto puede llegar a influir en la respuestas y estadisticas de otros usuarios</h4>");
            let btnNop = $("<button>");
            btnNop.text("NO");
            btnNop.css( "background-color", "gray")
            btnNop.click(()=>{
              alerta.remove();
            })
            let btnSip = $("<button>");
            btnSip.text("SI")
            btnSip.css( "background-color", "red")
            btnSip.click(()=>{
              alerta.remove();
              var elimUs = new FormData();
              elimUs.append("id_us", elem.id_us);
              // Se obtiene la autorización del usuario
              fetch('../dynamics/php/Eliminar_usuario.php', {
                method: 'POST',
                body: elimUs
              })
              .then((respuesta) => {
                return respuesta.text();
              }).then((mensaje) => {
                if (mensaje=="Datos eliminados") {
                  console.log("Todo Ok");
                  window.location.reload()
                }else {
                  console.log("Algo salio mal");
                }
              })
            })
            contenido.append(btnNop)
            contenido.append(btnSip)
            alerta.append(contenido);
            $("body").append(alerta)
          })
          var columnElim = $("<td>");
          columnElim.append(btnElim)
          row.append(columnElim);
          //Inserta todo en la tabla
          $("#List_usu").append(row);
        });
      });
    }else {
      window.location = './Inicio.html'
    }
  })
