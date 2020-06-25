<?php
  //Me conecto con la base de datos
  include('Config.php');
  $con = connect();
  //Obtengo el id del form,ulario a extraer
  $id_formu = $_POST['id_form'];
  //Obtrengo toda la informacion de ese formulario
  $result = mysqli_query($con, "SELECT * FROM formulario WHERE id_form='$id_formu'");
  //Creo el arreglo que se me va a devolver
  $Formulario=[];
  //Guardo la info de formnulario
  while ($Datos = mysqli_fetch_array($result)) {
    $Formulario=[
      "Titulo" => $Datos['titulo'],
      "Desc" => $Datos['descripcion']
    ];
  }
  //Consulto todas las preguntas de ese formulario
  $SQL_preg = "SELECT pregunta.id_pregunta, pregunta.titulo FROM formulario
    LEFT JOIN pregunta ON formulario.id_form=pregunta.id_form
    WHERE formulario.id_form='$id_formu'";
  $query_preg = mysqli_query($con, $SQL_preg);
  //Arreglo donde se guardan las preguntas
  $Pregunta = [];
  while ($preg = mysqli_fetch_array($query_preg)) {
    //Se optiene el id de esa pregunta
    $id_preg = $preg['id_pregunta'];
    //Se solicita todas las opciones de esa pregunta
    $query_opc = mysqli_query($con, "SELECT opcion.id_pregunta, opcion.id_opcion, opcion.valor FROM formulario
      LEFT JOIN pregunta ON formulario.id_form=pregunta.id_form
      LEFT JOIN opcion ON pregunta.id_pregunta=opcion.id_pregunta
      WHERE pregunta.id_pregunta='$id_preg'");
      //Variable donde se guardan todas las opciones
      $Opciones=[];
      while ($opc = mysqli_fetch_array($query_opc)) {
        //Se guardan todas las opciones
        $Opciones[]=[
          "id_opc"  => $opc['id_opcion'],
          "valor" => $opc['valor']
        ];
      }
      //Se guardan las preguntas y las opciones
    $Pregunta[]=[
      "id_preg"  => $id_preg,
      "Titulo"  => $preg['titulo'],
      "Opciones" => $Opciones
    ];
  }
  //SE guardan las preguntas en el arreglo de regreso
  $Formulario[]= ["Preguntas" => $Pregunta];
  //Se regresa el arreglo
  echo json_encode($Formulario);
 ?>
