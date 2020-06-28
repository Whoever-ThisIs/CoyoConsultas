/* Evita que el codigo sea tedioso pidiendo la animacion */
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
      if (respuesta) {
        let usuario = new FormData();
        let id_us = document.querySelector("input[name='id']")
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
/* Permite traer la paginad e registro cuando se selecciona esa opcion */
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
            id1.pattern = "^\\d{9}$"
            id1.title = "El número de cuenta debe contener 9 números"
            id2.placeholder = "Ingrese su CURP"
            id2.maxLength = "18"
            id2.pattern = "^(([A-Z]{4})(\\d{2})((0[1-9])|(1[0-2]))((0[1-9])|(1[0-9])|(2[0-9])|(3[0-1]))([HM])(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)([A-Z]{2})(([A-Z0-9]{2})))$"
            id2.title = "Asegurate de que el CURP tenga el formato correcto"
            }
        function profesor(){
            tipo.value = "profesor"
            id1.placeholder = "Ingrese su RFC"
            id1.maxLength = "13"
            id1.pattern = "^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$"
            id1.title = "Asegurate de que el RFC tenga el formato correcto"
            id2.placeholder = "Ingrese su Núm. de Trab"
            id2.pattern = "^\\d{6}$"
            id2.maxLength = "6"
            id2.title = "El número de trabajador debe contener 6 números"
            }
        function funcionario(){
            tipo.value = "funcionario"
            id1.placeholder = "Ingrese su RFC"
            id1.maxLength = "13"
            id1.pattern = "^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$"
            id1.title = "Asegurate de que el RFC tenga el formato correcto"
            id2.placeholder = "Ingrese su Núm. de Trab"
            id2.pattern = "^\\d{6}$"
            id2.maxLength = "6"
            id2.title = "El número de trabajador debe contener 6 números"
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
/* Por default se ejecuta para que aparezca al entrar el ingreso */
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
function colors(){
    linearGradientB[0].classList.toggle("lineargradientG")
    }
/* let linearGradientB = document.querySelectorAll(".lineargradientB")
let boton = document.querySelector(".slider");
boton.addEventListener("click",colors());
 */
