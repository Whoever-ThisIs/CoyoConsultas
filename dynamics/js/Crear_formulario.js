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
          newOpc.empty()
        });
        newOpc.append(btnElimOpc)
      }
      return newOpc
    }
  }
}

class Formulario {
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
        console.log(numPreg);
        opciones.append(this.preguntas[indexPregunta].addResp())
      }
    }else{
      alert("Se ha alcanzado el número máximo de preguntas")
    }
  }
}

//Añade la primera pregunta
let form = new Formulario();
form.addPreg();
//Boton para añadir preguntas
$("#Anadir_preg").click(()=>{
  form.addPreg();
})
