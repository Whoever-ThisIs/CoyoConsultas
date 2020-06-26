//Funcion para randomizar el orden de los colores
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
//Se crea el id_form para obtenerlo luego por metodo POST en el php
var id_formu = "94NVUO"
var bckgdColors = ["#8A2BE2", "#FFD700", "#DC143C", "#00FF7F",
                   "#FF4500", "#1E90FF", "#C71585", "#FF00FF",
                   "#20B2AA", "#32CD32", "#6A5ACD", "#FF6347"];
getForm = new FormData();
getForm.append("id_form", id_formu);//<== Ingrese aui el id del formulario
//Se manda la peticion
fetch('../dynamics/php/Resultados_final_form.php', {
  method: 'POST',
  body: getForm
})
.then((response) => {
  // Se decodifica el resultado de JSON y genera un objeto
  return response.json();
}).then((data) => {
  // Guarado ese objeto como "Formulario"
  var formulario = data;
  // Pongo en la página su nombre y descripcion
  $("#Nom_form").text(formulario.Titulo)
  $("#Desc_form").text(formulario.Descripcion)
  $("#Tot_form").text(formulario.Total)
  console.log(formulario.Preguntas);
  for (var i = 0; i < formulario.Preguntas.length; i++) {
    console.log(formulario.Preguntas[i]);
    var div = $("<div>");
    div.addClass("Grafica");
    var canva = $("<canvas id='P-"+(i+1)+"'></canvas>")
    var ctx = canva[0].getContext('2d');
    div.append(canva)
    var grafResul = new Chart (ctx,{
      type: "doughnut",
      data: {
        labels: formulario.Preguntas[i].Labels,
        datasets: [{
          borderColor: "#242424",
          backgroundColor: shuffle(bckgdColors),
          data: formulario.Preguntas[i].Data
        }]
      },
      options:{
        title:{
          display: true,
          text: formulario.Preguntas[i].Titulo,
          fontSize: 30,
          fontColor: "#f6f6f6",
        }
      }
    });
    $("#Graficas").append(div)
  }
})
