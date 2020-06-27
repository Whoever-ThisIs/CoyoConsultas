<?php
  session_start();
  //Me conecto con la base de datos
  include('Config.php');
  include("Des-cifrado.php");
  $con = connect();
  //Obtengo el id del form,ulario a extraer
  $id_usu = escapeAll($_SESSION['id']);
  //Obtengo todas las categorias que hay
  $result = mysqli_query($con, "SELECT * FROM categoria");
  $categorias=[];
  while ($categ = mysqli_fetch_array($result)) {
    $categorias[]=$categ['categoria'];
  }

  ////////////////////////   Formularios Elaborados  ///////////////////////////
  //Obtengo cuantos formularios en total elaboro
  $result = mysqli_query($con, "SELECT COUNT(id_usuario) FROM formulario WHERE id_usuario='$id_usu'");
  while ($elab = mysqli_fetch_array($result)) {
    $totalElab = $elab['COUNT(id_usuario)'];
  }
  //Obtengo por cada categoria existente cuantos creo
  $catElab = [];
  for ($i=0; $i < count($categorias); $i++) {
    $result = mysqli_query($con, "SELECT COUNT(id_usuario) FROM formulario
    LEFT JOIN categoria ON formulario.id_categoria=categoria.id_categoria
    WHERE id_usuario='$id_usu' AND categoria.categoria='$categorias[$i]'");
    if ($elab = mysqli_fetch_array($result)) {
      $catElab[]=[
        "Categoria"=> $categorias[$i],
        "Total" => $elab["COUNT(id_usuario)"]
      ];
    }
  }
  $Elaboradas = [
    "Total" => $totalElab,
    "Categorias" => $catElab
  ];
  // var_dump($Elaboradas);
  ////////////////////////   Formularios Contestados  //////////////////////////
  //Obtengo cuantos formularios en total elaboro
  $result = mysqli_query($con, "SELECT COUNT(id_usuario) FROM contestada WHERE id_usuario='$id_usu'");
  while ($conts = mysqli_fetch_array($result)) {
    $totalConts= $conts['COUNT(id_usuario)'];
  }
  //Obtengo por cada categoria existente cuantos creo
  $catConts = [];
  for ($i=0; $i < count($categorias); $i++) {
    $result = mysqli_query($con, "SELECT COUNT(contestada.id_usuario) FROM contestada
    LEFT JOIN formulario ON contestada.id_form=formulario.id_form
    LEFT JOIN categoria ON formulario.id_categoria=categoria.id_categoria
    WHERE contestada.id_usuario='$id_usu' AND categoria.categoria='$categorias[$i]'");
    if ($conts = mysqli_fetch_array($result)) {
      $catConts[]=[
        "Categoria"=> $categorias[$i],
        "Total" => $conts["COUNT(contestada.id_usuario)"]
      ];
    }
  }
  $Contestadas = [
    "Total" => $totalConts,
    "Categorias" => $catConts
  ];
  $Estadisticas=[
    "Elaboradas" => $Elaboradas,
    "Contestadas" => $Contestadas
  ];
    echo json_encode($Estadisticas);
 ?>
