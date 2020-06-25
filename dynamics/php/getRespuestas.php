<?php
  session_start();
  //Me conecto con la base de datos
  include('Config.php');
  $con = connect();
  //Obtengo el id del form,ulario a extraer
  $id_formu = "94NVUO";
  $id_usu = $_SESSION['id'];
  //Obtrengo toda la informacion de ese formulario
  $result = mysqli_query($con, "SELECT * FROM contestada
    LEFT JOIN respuesta ON contestada.id_contestada=respuesta.id_contestada
    WHERE contestada.id_form='$id_formu' AND contestada.id_usuario='$id_usu'");
  $Resultados=[];
  while ($sep = mysqli_fetch_array($result)) {
    array_push($Resultados, [
      "pregunta"=>$sep['id_pregunta'],
      "respuesta"=>$sep['respuesta']]);
  }
  echo json_encode($Resultados);

 ?>
