<?php
  session_start();
  //Me conecto con la base de datos
  include('Config.php');
  $con = connect();
  //Obtengo el id del formulario a extraer
  $id_usu = $_SESSION['id'];
  //Obtrengo toda las encuestas que fueron contestdas por el usuario
  $result = mysqli_query($con, "SELECT descripcion, id_form, titulo FROM formulario WHERE id_usuario='$id_usu'");
  $Elaboradas=[];
  while ($sep = mysqli_fetch_array($result)) {
    $Elaboradas[]=[
      "Titulo" => $sep['titulo'],
      "Descripcion" => $sep['descripcion'],
      "id_form" => $sep['id_form']
    ];
  }
  //Obtrengo toda las encuestas que fueron contestdas por el usuario
  $result = mysqli_query($con, "SELECT formulario.descripcion, formulario.id_form, formulario.titulo FROM contestada
            LEFT JOIN formulario ON contestada.id_form=formulario.id_form WHERE contestada.id_usuario='$id_usu'");
  $Contestados=[];
  while ($sep = mysqli_fetch_array($result)) {
    $Contestados[]=[
      "Titulo" => $sep['titulo'],
      "Descripcion" => $sep['descripcion'],
      "id_form" => $sep['id_form']
    ];
  }
  $Resultado=[
    "Elaboradas" => $Elaboradas,
    "Contestadas" => $Contestados
  ];
  echo json_encode($Resultado);

 ?>
