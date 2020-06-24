/**
 * Este programa muestra una interfaz gráfica para la manipulación de un objeto Formulario. 
 * Permite editar la cantidad de preguntas y su contenido, al igual que sus
 * respuestas. Por último, a oetición del usuario se almacenan en la base de datos
 */
// Creación de las respuestas
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
    this.titulo = "Formulario";
    $("#tituloForm").on('input', (e) => {
      this.titulo = $("#tituloForm").val();
    })
    this.preguntas = new Array();
    this.cPreguntas = 0;
    this.categoria = 1;
    this.rango = 1;
    // Crea un id único
    let simbolos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var id_form = "";
    for (var i = 0; i < 6; i++) {
      id_form += simbolos.substr(Math.round(Math.random() * simbolos.length), 1);
    }
    this.id = id_form;
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
    let data = new FormData();
    data.append("tipo", 1);
    data.append("idForm", this.id);
    data.append("categoria", this.categoria);
    data.append("titulo", this.titulo);
    data.append("rango", this.rango);

    fetch("../dynamics/php/Guardar-form.php", {
      method: 'POST',
      body: data
    })
    for (let i = 0; i < this.cPreguntas; i++) {
      // Creación de preguntas
      for (let j = 0; j < this.preguntas[i].cOpciones; j++) {
        // Creación de respuestas        
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
    let fechaInicio = $("<input type='date' name='Inicio_dia' required>")
    var diaInicio = actual.getDate();
    if (diaInicio<10) {
      diaInicio = "0"+diaInicio;
    }
    var mesInicio = actual.getMonth()
    if (mesInicio<10) {
      mesInicio = "0"+mesInicio;
    }
    var añoInicio = actual.getFullYear();
    fechaInicio.val(añoInicio+"-"+mesInicio+"-"+diaInicio)
    console.log(añoInicio+"-"+mesInicio+"-"+diaInicio);
    $('#Form_config').append(fechaInicio)
    
    //Se agrego el input tyme de Inicio
    let tiempoInicio = $("<input type='time' name='Inicio_hora' required>")
    var horaInicio = actual.getHours();
    if (horaInicio<10) {
      horaInicio= "0"+horaInicio
    }
    var minutosInicio = actual.getMinutes()
    if (minutosInicio<10) {
      minutosInicio= "0"+minutosInicio
    }
    console.log(horaInicio+":"+minutosInicio);
    tiempoInicio.val(horaInicio+":"+minutosInicio)
    $('#Form_config').append(tiempoInicio)
    
    //Dia y Hora de cierre de formulario
    $('#Form_config').append("Fin: ")
    $('#Form_config').append("<input type='date' name='Fin_dia' required>")
    $('#Form_config').append(("<input type='time' name='Fin_hora' required>"))
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
let buttonGuardar = $("<button id='Guardar' onclick='form.guardarForm()'>Guardar formulario</button>");
$('#Form_config').append(buttonGuardar)
$('#Form_config').append("<br><br>")
$('#Form_config').append(btnCrear)
