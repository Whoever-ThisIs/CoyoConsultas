$(document).ready(main);
var count = 1;
    function main(){
        $('.menu_bar').click(function(){

        if(count == 1){
        $('nav').animate({
            left: '0'
        });
        count = 0;
        } else {
        count = 1;
        $('nav').animate({
            left: '-100%'
        });
        }
    });
};
function acceso() {
    let data = new FormData(document.getElementById('formAcceso'));
    fetch(`../dynamics/php/Acceso.php`, {
      method: 'POST',
      body: data
    }).then((response) => {
      console.log(response);
      return response.json();
    }).then((respuesta) => {
      console.log(respuesta);
      if (respuesta) {
        console.log("si entraste");
        window.location = "../index.html"
      }
    })
    .catch((message) =>
      console.log(message))
  }
  function alumno(){
    tipo.value = "alumno"
    labelId1.innerText = "Núm. de cuenta"
    id1.placeholder = "Ingrese su Núm. de cuenta"
    id1.maxLength = "9"
    labelId2.innerText = "CURP"
    id2.placeholder = "Ingrese su CURP"
    id2.maxLength = "18"
    }
    function profesor(){
    tipo.value = "profesor"
    labelId1.innerText = "Núm. de RFC"
    id1.placeholder = "Ingrese su RFC"
    id1.maxLength = "13"
    labelId2.innerText = "Núm. de Trabajador"
    id2.placeholder = "Ingrese su Núm. de Trab"
    id2.maxLength = "6"
    }
    function funcionario(){
    tipo.value = "funcionario"
    labelId1.innerText = "Núm. de RFC"
    id1.placeholder = "Ingrese su RFC"
    id1.maxLength = "13"
    labelId2.innerText = "Núm. de Trabajador"
    id2.placeholder = "Ingrese su Núm. de Trab"
    id2.maxLength = "6"
    }
    function registro() {
        let data = new FormData(document.getElementById('miForm'));
        fetch('../dynamics/php/Registro.php', {
            method: 'POST',
            body: data
            })
            .then((response) => {
            return response.text();
            }).then((data) => {
            alert(data);
            document.getElementById('miForm').reset();
            }).catch((message)=>{
            alert(message);
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
        var labelId1 = document.querySelector("label[for='id1']");
        var id2 = document.querySelector("input[name='id2']");
        var labelId2 = document.querySelector("label[for='id2']");
        var password = document.querySelector("input[name='password']");
        //Validador de contraseña segura
        password.addEventListener("blur",()=>{
        let mensajePsw = document.createElement("p")
        mensajePsw.classList.add("Error_psw")
        //El mensaje de error ya creado
        if (document.querySelector("p.Error_psw")!=null) {
            //Cambien el regex como crean conveniente
            if (password.value.search(/^(?=[\w!#$@%&*^+-]*\d)(?=[\w!#$@%&*^+-]*[A-Z])(?=[\w!#@$%&*^+-]*[a-z])(?=[\w!#$%&*^+@-]*[!#$%&*@^+-])\S{8,100}$/)>=0) {
            document.querySelector("p.Error_psw").innerText = "Contraseña segura"
            }else {
            document.querySelector("p.Error_psw").innerText = "Contraseña insegura"
            }
        }else {
            if (!(password.value.search(/^(?=[\w!#$@%&*^+-]*\d)(?=[\w!#$@%&*^+-]*[A-Z])(?=[\w!#@$%&*^+-]*[a-z])(?=[\w!#$%&*^+@-]*[!#$%&*@^+-])\S{8,100}$/)>=0)) {
            mensajePsw.innerText = "Contraseña insegura"
            document.getElementsByTagName("form")[0].insertBefore(mensajePsw, tipo)
            }
        }

        })
        //---------Registro---------//
        /////Añadimos un manejador de eventos para cuando el formulario se envíe/////
        document.getElementById('miForm').addEventListener('submit', (e) => {
        e.preventDefault();
        registro();
        })
        })

    })

//-----------Acceso------------//
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