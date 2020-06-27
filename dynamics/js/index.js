fetch('./Templates/AnimationGraph.html')
.then((response)=>{
    return response.text();
})
.then((text)=>{
    document.getElementById("cocoAnimation").innerHTML= text;
})
function acceso() {
    let data = new FormData(document.getElementById('formAcceso'));
    fetch('./dynamics/php/Acceso.php', {
      method: 'POST',
      body: data
    }).then((response) => {
      return response.text();
    }).then((respuesta) => {
      console.log(respuesta);
      if (respuesta) {
        let usuario = new FormData();
        let id_us = document.querySelector("input[name='id']")
        console.log(id_us.value);
        usuario.append("id", id_us.value);
        fetch('./dynamics/php/Crear_sesion.php', {
          method: 'POST',
          body: usuario
        }).then((response) => {
          window.location = './templates/Inicio.html'
        })
      }
    })
    .catch((message) =>
      console.log(message))
  }
    function registro() {
        let data = new FormData(document.getElementById('miForm'));
        fetch('./dynamics/php/Registro.php', {
            method: 'POST',
            body: data
            })
            .then((response) => {
            return response.text();
            }).then((data) => {
            document.getElementById('miForm').reset();
            }).catch((message)=>{
            console.log(message);
            });
    }

let formIngreso = document.querySelector("#formIngreso");
let formRegistro = document.querySelector("#formRegistro");
let divRegistro = document.querySelector("#publicForm");
formRegistro.addEventListener("click",()=>{
    fetch('./templates/Registro.html')
    .then((respuesta)=>{
        return respuesta.text();
    })
    .then((text)=>{
        divRegistro.innerHTML = text;
            //////*** Modificar Inputs ***/////
        var tipo = document.querySelector("input[name='tipo']");
        var id1 = document.querySelector("input[name='id1']");
        var id2 = document.querySelector("input[name='id2']");
        var password = document.querySelector("input[name='password']");
        var alumnoBtt = document.querySelector("#alumno");
        var profesorBtt = document.querySelector("#profesor");
        var funcionarioBtt = document.querySelector("#funcionario");
        alumnoBtt.addEventListener("click",()=>{
            alumno();
        })
        profesorBtt.addEventListener("click",()=>{
            profesor();
        })
        funcionarioBtt.addEventListener("click",()=>{
            funcionario();
        })
        function alumno(){
            tipo.value = "alumno"
            id1.placeholder = "Ingrese su Núm. de cuenta"
            id1.maxLength = "9"
            id2.placeholder = "Ingrese su CURP"
            id2.maxLength = "18"
            }
        function profesor(){
            tipo.value = "profesor"
            id1.placeholder = "Ingrese su RFC"
            id1.maxLength = "13"
            id2.placeholder = "Ingrese su Núm. de Trab"
            id2.maxLength = "6"
            }
        function funcionario(){
            tipo.value = "funcionario"
            id1.placeholder = "Ingrese su RFC"
            id1.maxLength = "13"
            id2.placeholder = "Ingrese su Núm. de Trab"
            id2.maxLength = "6"
            }
        //---------Registro---------//
        /////Añadimos un manejador de eventos para cuando el formulario se envíe/////
        document.getElementById('miForm').addEventListener('submit', (e) => {
        e.preventDefault();
        registro();
        })
        })

    })
//-----------Acceso------------//
fetch('./templates/Acceso.html')
.then((response)=>{
    return response.text();
})
.then((text)=>{
    divRegistro.innerHTML = text;
    document.getElementById('formAcceso').addEventListener('submit', (e) => {
        e.preventDefault();
        acceso();
      })
    })
formIngreso.addEventListener("click",()=>{
    fetch('./templates/Acceso.html')
    .then((response)=>{
        return response.text();
    })
    .then((text)=>{
        divRegistro.innerHTML = text;
        document.getElementById('formAcceso').addEventListener('submit', (e) => {
            e.preventDefault();
            acceso();
          })
        })
    })
