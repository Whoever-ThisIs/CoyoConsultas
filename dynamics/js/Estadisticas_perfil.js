var ctxElab = $("#Elaboradas")[0].getContext('2d');
var ctxCont = $("#Contestadas")[0].getContext('2d');
//Se manda la peticion
fetch('../dynamics/php/Estadisticas_perfil.php')
.then((response) => {
  // Se decodifica el resultado de JSON y genera un objeto
  return response.json();
}).then((data) => {
  //Extraigo las categorias, (son las mismas para ambas :p)
  var categorias = new Array;
  for (var i = 0; i < data["Elaboradas"].Categorias.length; i++) {
    categorias.push(data["Elaboradas"].Categorias[i].Categoria)
  }
  //Extarigo Los resultados por categoria en contestadas
  var resulElaboradas = new Array;
  for (var i = 0; i < data["Elaboradas"].Categorias.length; i++) {
    resulElaboradas.push(data["Elaboradas"].Categorias[i].Total)
  }
  var grafElaboradas = new Chart (ctxElab,{
    type: "doughnut",
    data: {
      labels: categorias,
      datasets: [{
        backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c", "#2980b9"],
        data: resulElaboradas
      }]
    },
    options:{
      title:{
        display: true,
        text: "Formularios creados",
        fontSize: 20,
        fontColor: "#f6f6f6",
      }
    }
  });
  //Extarigo Los resultados por categoria en contestadas
  var resulContestadas = new Array;
  for (var i = 0; i < data["Contestadas"].Categorias.length; i++) {
    resulContestadas.push(data["Contestadas"].Categorias[i].Total)
  }
  var grafContestadas = new Chart(ctxCont, {
    type: "doughnut",
    data: {
      labels: categorias,
      datasets: [{
        backgroundColor: ["#2ecc71", "#f1c40f", "#e74c3c", "#2980b9"],
        data: resulContestadas
      }]
    },
    options:{
      title:{
        display: true,
        text: "Formularios contestados",
        fontSize: 20,
        fontColor: "#f6f6f6",
      }
    }
  });
})
