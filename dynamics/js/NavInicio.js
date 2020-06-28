//Consulta si ya hay una sesion abierta
fetch('../dynamics/php/Validar_sesion.php')
.then((respuesta)=>{
    return respuesta.text();
})
.then((text)=>{
  if (text==true) {
    //Si no esta abierta te manda a index
    window.location = '../'
  }else {
    //Si no te permite continuar
    cookiePaleta();
    console.log("Sesion iniciada");
  }
})

function cookiePaleta(){
  let data;
  fetch("../dynamics/php/NewPaletas.php",{
    method: 'POST',
    body: data
  }).then((response) => {
    return response.text();
  }).then((data) => {
    //Establece la cookie que indica que algo ha sido cambiado
    document.cookie="colores="+data;
  });
}
/* Permite que la navbar te ayude a navegar por el sitio  */
function eventlis(){
    let crear = document.querySelector("#crear");
    let inicio = document.querySelector("#inicio");
    let perfil = document.querySelector("#perfil");
    let cerrar = document.querySelector("#cerrar");
    crear.addEventListener("click",()=>{
        window.location = './Crear_formulario.html'
    })
    inicio.addEventListener("click",()=>{
        window.location = './Inicio.html'
    })
    perfil.addEventListener("click",()=>{
        window.location = './Perfil.html'
    })
    cerrar.addEventListener("click",()=>{
      document.cookie = "colores=;expires=Thu, 04 Jun 2010 00:00:00 GMT";
      //Consulta si ya hay una sesion abierta
      fetch('../dynamics/php/Cerrar_sesion.php')
      .then((respuesta)=>{
        console.log(respuesta.text());
        console.log("Sesion cerrada");
        window.location.reload()
      })
    })
    /** Lista de usuarios en caso de ser admin**/
    fetch('../dynamics/php/Datos_sesion.php')
      .then((respuesta)=>{
          return respuesta.json();
      })
      .then((text)=>{
        var datos = text.split("~");
        //Sustituye el true por : datos[7]=="Admin"
        //Confirma que quien entro aqui tenga rango admin en su usuario
        if (datos[7]=="Admin") {
          document.querySelector(".nav nav ul").style.paddingLeft  = "35%";
          var liAdmin = document.createElement("li");
          var aAdmin = document.createElement("a");
          aAdmin.innerText = "Usuarios";
          aAdmin.id = "Usuarios";
          aAdmin.href = "#";
          liAdmin.appendChild(aAdmin);
          document.getElementsByTagName("ul")[0].appendChild(liAdmin);
          liAdmin.addEventListener("click",()=>{
            window.location = './List_usuarios.html'
          })
        }
      })
}
fetch('NavInicio.html')
.then((respuesta)=>{
    return respuesta.text();
})
.then((text)=>{
    let navBar = document.querySelector(".navBar");
    navBar.innerHTML = text;
    eventlis();
})

function eventfoo(){
  let insta = document.querySelector("#insta");
  let twitter = document.querySelector("#twitter");
  let facebook = document.querySelector("#facebook");
  insta.addEventListener("click",()=>{
      window.location = 'https://www.instagram.com/coyoconsultas/?hl=es-la'
  })
  twitter.addEventListener("click",()=>{
      window.location = 'https://twitter.com/COCO91481505'
  })
  facebook.addEventListener("click",()=>{
      window.location = 'https://www.facebook.com/CoyoConsultas-COCO-110062144094022/?modal=admin_todo_tour'
  })
}
fetch('./FooterInicio.html')
.then((respuesta)=>{
  return respuesta.text();
})
.then((text)=>{
  let footerInicio = document.querySelector(".footerInicio");
  footerInicio.innerHTML = text;
  eventfoo();
})
