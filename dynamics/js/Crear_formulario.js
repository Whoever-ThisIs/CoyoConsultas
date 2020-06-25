/**
 * Este programa muestra una interfaz gráfica para la manipulación de un objeto Formulario.
 * Permite editar la cantidad de preguntas y su contenido, al igual que sus
 * respuestas. Por último, a oetición del usuario se almacenan en la base de datos
 */
// Creación de las respuestas
//Consulta si ya hay una sesion abierta
fetch('../dynamics/php/Datos_sesion.php')
.then((respuesta)=>{
    return respuesta.json();
})
.then((text)=>{
  var datos = text.split("~");
})
class Opcion{
  constructor(id) {
    this.id = id;
    this.valor = "Opción" + id;
  }
}
// Creación de las preguntas
class Pregunta{
  constructor(id) {
    this.id = id;
    this.texto = "¿?";
    this.opciones = new Array();
    this.cOpciones = 0;
  }
  // Método para añadir opciones de respuesta
  addResp() {
    // Verifica que no supere el límite
    if (this.cOpciones < 10){
      let index = this.cOpciones;
      this.cOpciones++;
      // Crea una nueva opción dentro de pregunta
      this.opciones.push( new Opcion(this.cOpciones));
      let numOpc = this.cOpciones;
      //Se crea el p donde se guarda esto
      let newOpc = $("<p>");
      // Se añade el evento input (actualiza conforme se ingresa el valor)
      let input = $("<input>");
      input.attr('type', 'text');
      input.attr('name', "P-" + this.id + "-" + this.cOpciones);
      input.attr('placeholder', 'Ingrese su respuesta');
      input.attr('required');
      input.on('input', (e) => {
        this.opciones[index].valor = input.val();
      })
      newOpc.append(input);
      // Si hay mas de dos opciones en esa pregunta puedes eliminar esa opcion
      if (numOpc>2) {
        // Boton para eliminar esa opcion
        let btnElimOpc = $("<button type='button' class='Elim_Opc'>Eliminar</button>")
        btnElimOpc.click(()=>{
          newOpc.remove()
        });
        newOpc.append(btnElimOpc)
      }
      return newOpc
    }
  }
}
// Creación del formulario
class Formulario {
  constructor() {
    // Se añade el evento input (actualiza conforme se ingresa el valor del título)
    // Título de formulario
    this.titulo = "Formulario";
    $("#tituloForm").on('input', (e) => {
      this.titulo = $("#tituloForm").val();
    })
    // Descripción de formulario
    this.descripcion = "Descripción";
    $("#descripcion").on('input', (e) => {
      this.descripcion = $("#descripcion").val();
    })
    // Preguntas
    this.preguntas = new Array();
    this.cPreguntas = 0;
    // Categorías
    this.categoria = 1;
    $("#categoria").on('input', (e) => {
      this.categoria = $("#categoria").val();
    })
    // Rango
    this.rango = 1;
    $("#rango").on('input', (e) => {
      this.rango = $("#rango").val();
    })
    // Crea un id único
    let simbolos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var id_form = "";
    for (var i = 0; i < 6; i++) {
      id_form += simbolos.substr(Math.floor(Math.random() * simbolos.length), 1);
    }
    this.id = id_form;
    // Fechas //
    // Inicio
    this.inicioDia = "";
    this.inicioHora = "";
    // Fin
    this.finDia = "";
    this.finHora = "";
  }
  // Método para añadir preguntas
  addPreg() {
    // Verifica que no supere el límite
    if (this.cPreguntas < 5){
      let indexPregunta = this.cPreguntas;
      this.cPreguntas++;
      // Crea una nueva pregunta dentro de formulario
      this.preguntas.push(new Pregunta(this.cPreguntas));
      //Se crea el contenedor de la nueva pregunta
      let newPreg = $("<div>")
      newPreg.addClass("Pregunta")
      let numPreg = this.cPreguntas;//Se obtiene su numero de pregunta
      newPreg.attr('id', ("P-"+numPreg));//Se agrega su id
      newPreg.append("<h2>Pregunta "+numPreg+"</h2>")
      // Se añade el evento input (actualiza conforme se ingresa el valor)
      let input = $("<input>");
      input.attr('type', 'text');
      input.attr('name', "P-" + numPreg);
      input.attr('placeholder', 'Ingrese su pregunta');
      input.attr('required');
      input.on('input', (e) => {
        this.preguntas[indexPregunta].texto = input.val();
      })

      newPreg.append(input)//Su pregunta
      newPreg.append("<h3>Opciones de respuesta</h3>")
      ////**  Opciones de respuesta  **////
      //Boton para añadir una opcion extra
      let btnAñadirOpc = $("<button type='button' class='Añadir_Opc'>Añadir Opcion</button>")
      btnAñadirOpc.click(()=>{
        opciones.append(this.preguntas[indexPregunta].addResp())
      });
      //Contenedor de las opciones
      let opciones = $("<div>");
      opciones.addClass("Opciones")
      opciones.append(btnAñadirOpc)
      newPreg.append(opciones)
      $("body").append(newPreg)
      //Se añade las dos primeras respuestas
      for (var i = 0; i < 2; i++) {
        opciones.append(this.preguntas[indexPregunta].addResp())
      }
    }else{
      alert("Se ha alcanzado el número máximo de preguntas")
    }
  }
  /**
   * Método para generar los registros del formulario, preguntas y
   * opciones por primera vez en la base de datos.
   */
  guardarForm() {
    // Petición tipo 1
    var data = new FormData(document.getElementById('crearForm'));
    data.append("tipo", "1");
    data.append("idForm", this.id);
    data.append("categoria", this.categoria);
    data.append("titulo", this.titulo);
    data.append("rango", this.rango);
    console.log(this.descripcion);
    data.append("descripcion", this.descripcion);
    fetch("../dynamics/php/Guardar-form.php", {
      method: 'POST',
      body: data
    })
  }
  guardarFecha() {
    if (this.finDia !== "" && this.finHora !== ""){
      let data = new FormData();
      data.append("tipo", "4");
      data.append("inicioDia", this.inicioDia);
      data.append("inicioHora", this.inicioHora);
      data.append("finDia", this.finDia);
      data.append("finHora", this.finHora);
      fetch("../dynamics/php/Guardar-form.php", {
        method: 'POST',
        body: data
      })
    }
  }
  guardarPregunta () {
    //Petición tipo 2
    for (let i = 0; i < this.cPreguntas; i++) {
      let data = new FormData(document.getElementById('crearForm'));
      data.append("tipo", 2);
      // data.append("idPregunta", this.preguntas[i].id);
      data.append("idPregunta", this.id + "-" + i);
      data.append("idForm", this.id);
      data.append("nombrePreg", this.preguntas[i].texto);
      console.log(data);
      fetch("../dynamics/php/Guardar-form.php", {
        method: 'POST',
        body: data
      })
      for (let j = 0; j < this.preguntas[i].cOpciones; j++) {
        // Creación de respuestas
        data = new FormData(document.getElementById('crearForm'));
        data.append("tipo",3);
        //data.append("idOpcion",this.preguntas[i][j].id);
        //data.append("idPregunta", this.preguntas[i].id);
        data.append("idOpcion", this.id + "-" + i + "-" + j);
        data.append("idPreguntaOp", this.id + "-" + i);
        data.append("valor",this.preguntas[i].opciones[j].valor);
        //data.append("apoyo",this.apoyo);
        console.log(data);
        fetch("../dynamics/php/Guardar-form.php", {
          method: 'POST',
          body: data
        })
      }
    }
  }
  // Método para actualizar los registros
  modForm() {
    console.log("Do se puede")
  }

  ////////*** Configuracion del formulario ***////////
  //Se agregan los rangos de disponibilidad
  addRangos(){
    fetch('../dynamics/php/getRangos.php')
      .then((response) => {
        return response.json();
      }).then((data) => {
        let select = document.getElementById('rango');
        data.forEach(element => {
          console.log(element);
          let new_option = document.createElement("option");
          new_option.value = element.id_rango;
          new_option.innerText = element.rango;
          select.appendChild(new_option);
        });
        document.getElementById('Form_config').appendChild(select)
      });
  }
  //Se agregan las Categorias
  addCategorias(){
    fetch('../dynamics/php/getCategorias.php')
    .then((response) => {
      return response.json();
    }).then((data) => {
      let select = $("#categoria");
      data.forEach(element => {
        let new_option = $("<option>");
        new_option.attr("value", element.id_categoria);
        new_option.text(element.categoria);
        select.append(new_option);
      });
      $("#Form_config").append(select)
    });
  }
  addDate () {
    var actual = new Date();
    //Se agrego el input date de Inicio
    $('#Form_config').append("Inicio: ")
    let fechaInicio = $("<input type='date' name='Inicio_dia' id='Inicio_dia' required>")
    // Obtención de fecha actual //
    // Día
    var diaInicio = actual.getDate();
    if (diaInicio<10) {
      diaInicio = "0"+diaInicio;
    }
    // Mes
    var mesInicio = actual.getMonth()
    if (mesInicio<10) {
      mesInicio = "0"+mesInicio;
    }
    // Año (aaaa)
    var añoInicio = actual.getFullYear();
    // Asignación de valores pt. 1
    fechaInicio.val(añoInicio+"-"+mesInicio+"-"+diaInicio)
    this.inicioDia = añoInicio + "-" + mesInicio + "-" + diaInicio;
    console.log(añoInicio+"-"+mesInicio+"-"+diaInicio);
    $('#Form_config').append(fechaInicio)
    //Se agrego el input tyme de Inicio
    let tiempoInicio = $("<input type='time' name='Inicio_hora' id='Inicio_hora' required>");
    // Hora
    var horaInicio = actual.getHours();
    if (horaInicio<10) {
      horaInicio= "0"+horaInicio
    }
    // Minutos
    var minutosInicio = actual.getMinutes()
    if (minutosInicio<10) {
      minutosInicio= "0"+minutosInicio
    }
    // Asignación de valores pt. 2
    tiempoInicio.val(horaInicio+":"+minutosInicio)
    this.inicioHora = horaInicio + ":" + minutosInicio;
    console.log(horaInicio+":"+minutosInicio);
    $('#Form_config').append(tiempoInicio)
    //Dia y Hora de cierre de formulario
    $('#Form_config').append("Fin: ")
    $('#Form_config').append("<input type='date' name='Fin_dia' id='Fin_dia' required>")
    $('#Form_config').append(("<input type='time' name='Fin_hora' id='Fin_hora' required>"))
    // Creación de eventos
    $("#Inicio_dia").on('input', (e) => {
      this.inicioDia = $("#Inicio_dia").val();
    })
    $("#Inicio_hora").on('input', (e) => {
      this.inicioHora = $("#Inicio_hora").val();
    })
    $("#Fin_dia").on('input', (e) => {
      this.finDia = $("#Fin_dia").val();
    })
    $("#Fin_hora").on('input', (e) => {
      this.finHora = $("#Fin_hora").val();
    })
  }
}

// Instancia formulario
let form = new Formulario();
// Creación de configuración
form.addPreg();
form.addRangos();
form.addCategorias();
form.addDate();
//Boton para añadir preguntas
$("#Anadir_preg").click(()=>{
  form.addPreg();
})

$("#Eliminar_preg").click(()=>{
  if (form.cPreguntas<=1) {
    alert("Debes tener almenos una pregunta")
  }else {
    $("#P-"+(form.cPreguntas)).remove();
    //Restea los valores
    form.cPreguntas--;
    form.preguntas.pop()
  }
})



var btnCrear = $("<button type='button' name='button' id='Crear_form'>Crear Formulario</button>")
btnCrear.click(()=>{
  console.log("Yamete kudasai")
})
let buttonGuardar = $("<button id='Guardar'>Guardar formulario</button>");
buttonGuardar.click(()=>{
  form.guardarForm();
  form.guardarPregunta();
  form.guardarFecha();
})
$('#Form_config').append(buttonGuardar)
$('#Form_config').append("<br><br>")
$('#Form_config').append(btnCrear)
