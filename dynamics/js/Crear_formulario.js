class Opcion{
  constructor(id) {
    this.id = id;
    this.valor = "Opción" + id;
  }
}

class Pregunta{
  constructor(id) {
    this.id = id;
    this.opciones = new Array();
    this.cOpciones = 0;
  }
  addResp() {
    /*Aqui se calcula cuantos hijos (respuestas) hay en las opciones
      El valor de numero de pregunta es igual A sus hijos(total adentro)
      -1(El boton de añadir)+1(La respuesta actual) por eso lo siguiente*/
    if (this.cOpciones < 10){
      this.cOpciones++;
      this.opciones.push( new Opcion(this.cOpciones));
      let numOpc = this.cOpciones;
      //Se crea el p donde se guarda esto
      let newOpc = $("<p>")
      newOpc.append("<input type='text' placeholder='Ingrese su respuesta' required>")
      //Si hay mas de dos opciones en esa pregunta puedes eliminar esa opcion
      if (numOpc>2) {
        //Boton para eliminar esa opcion
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

class Formulario {
  crearId(){
    //Generador de id Para el formulario
    let simbolos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var id_form = "";
    for (var i = 0; i < 6; i++) {
      id_form += simbolos.substr(Math.round(Math.random() * simbolos.length), 1);
    }
  }
  constructor() {
    this.titulo = "Formulario";
    this.preguntas = new Array();
    this.cPreguntas = 0;
  }
  addPreg() {
    if (this.cPreguntas < 5){
      let indexPregunta = this.cPreguntas;
      this.cPreguntas++;
      this.preguntas.push(new Pregunta(this.cPreguntas));
      //Se crea el contenedor de la nueva pregunta
      let newPreg = $("<div>")
      newPreg.addClass("Pregunta")
      let numPreg = this.cPreguntas;//Se obtiene su numero de pregunta
      newPreg.attr('id', ("P-"+numPreg));//Se agrega su id
      newPreg.append("<h2>Pregunta "+numPreg+"</h2>")
      newPreg.append("<input type='text' name='P-"+numPreg+"' placeholder='Ingrese su pregunta' required>")//Su pregunta
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
  guardarForm() {
    //Insercion de datos del formulario
    console.log("id_form = " + id_form);
    console.log("Titulo = " + $("input[name='Titulo']").val());
    console.log("reportes = " + 0);
    for (var i = 0; i < form.cPreguntas; i++) {
      //Se crea una pregunta
      let id_preg = id_form + "-P" + (i + 1)
      let tituloPreg = $("input[name='P-" + (i + 1) + "']").val()
      //"INSERT INTO pregunta (id_pregunta, id_form, titulo) VALUES ('id_preg','id_form', 'tituloPreg')"
      for (var n = 0; n < form.preguntas[i].cOpciones; n++) {
        //Aqui se crean las opciones de esa pregunta
        //Se crea el id_de la opcion
        let id_opc = id_preg + "-" + (n + 1)
        //Obtiene el valor del input de esa opcion
        let valorOpc = $("#P-" + (i + 1))[0].children[3].children[n + 1].getElementsByTagName("input")[0].value
        //"INSERT INTO opcion (id_opcion, id_pregunta, valor) VALUES ('id_opc','id_preg', 'valorOpc')"
        console.log("Pregunta " + id_preg + ", opcion:" + (n + 1));
      }
    }
  }
  modForm() {

  }
}

//Añade la primera pregunta
let form = new Formulario();
form.addPreg();
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

