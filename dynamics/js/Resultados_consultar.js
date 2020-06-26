console.log($("#Tab_elab"));
console.log($("#Tab_contest"));
fetch('../dynamics/php/Perfil_resultados.php')
.then((response) => {
  // Se decodifica el resultado de JSON y genera un objeto
  return response.json();
}).then((data) => {
  data.Contestadas.forEach((elem, index) => {
    var row = $("<tr>")
    row.append("<td>"+elem.Titulo+"</td>");
    row.append("<td>"+elem.Descripcion+"</td>");
    var btnCont = $("<button>")
    btnCont.html("Checar <i class='fas fa-eye'></i>")
    btnCont.click(()=>{
      window.location = './Resultado_encuesta.html'
      document.cookie = "Res_id_form="+elem.id_form;
    });
    var columnBtn =  $("<td>")
    columnBtn.append(btnCont)
    row.append(columnBtn);
    $("#Tab_contest").append(row);
  });
  data.Elaboradas.forEach((elem, index) => {
    var row = $("<tr>")
    row.append("<td>"+elem.Titulo+"</td>");
    row.append("<td>"+elem.Descripcion+"</td>");
    var btnElab = $("<button>")
    btnElab.html("Checar <i class='fas fa-eye'></i>")
    btnElab.click(()=>{
      window.location = './Resultados_final_form.html'
      document.cookie = "Res_fin_id_form="+elem.id_form;
    });
    var columnBtn =  $("<td>")
    columnBtn.append(btnElab)
    row.append(columnBtn);
    $("#Tab_elab").append(row);
  });
})
