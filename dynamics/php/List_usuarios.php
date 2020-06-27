<?php
  //Inicio Session
  session_start();
  //Me conecto con la base de datos
  include('Config.php');
  $con = connect();
  //Obtengo el id del form,ulario a extraer
  $result = mysqli_query($con, "SELECT * FROM usuario
    LEFT JOIN tipo ON usuario.id_tipo=tipo.id_tipo
  ");
  //Arreglo donde se regresaran los usuarios
  $Usuarios=[];
  //Guardo la info de formnulario
  while ($Datos = mysqli_fetch_array($result)) {
    $Usuarios[]=[
      "id_us" => $Datos['id_usuario'],
      "Nombre" => $Datos['paterno']." ".$Datos['materno']." ".$Datos['nombre'],
      "tipo" => $Datos['tipo_usr'],
      "bloqueado" => $Datos['bloqueado']
    ];
  }
  echo json_encode($Usuarios);
 ?>
