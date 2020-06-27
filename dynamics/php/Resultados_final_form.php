<?php
  //Me conecto con la base de datos
  include('Config.php');
  include("Des-cifrado.php");
  $con = connect();
  //Obtengo el id del form,ulario a extraer
  $id_formu = escapeAll($_POST['id_form']);
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
  //SE guardan las preguntas en el arreglo de pra luego hacer la consulta
  $Formulario[]= ["Preguntas" => $Pregunta];

  ///***********************   Datos para graficar   ***********************////
  ///***********************************************************************////
  //Creo la variable donde se alamcenara los resultados de las preguntas a graficar
  $Preguntas=[];
  //Por cada pregunta hara este proceso
  for ($i=0; $i <count($Formulario[0]["Preguntas"]) ; $i++) {
    $id_pregu =$Formulario[0]["Preguntas"][$i]["id_preg"];//id de la pregunta
    $Data=[]; //Variable donde de se guardaran los reultados de cada opcion
    $Labels=[]; //Variable que guarda el nombre de cada opcion
    for ($n=0; $n <count($Formulario[0]["Preguntas"][$i]["Opciones"]) ; $n++) {
      $id_opcio = $Formulario[0]["Preguntas"][$i]["Opciones"][$n]["id_opc"];//id de la opcion
      //Consulta cuantas personas votaron por esa opcion en el formulario
      $SQL_preg = "SELECT COUNT(respuesta.respuesta) FROM contestada
        LEFT JOIN respuesta ON contestada.id_contestada=respuesta.id_contestada
        WHERE contestada.id_form='$id_formu' AND respuesta.id_pregunta='$id_pregu' AND respuesta.respuesta='$id_opcio'";
      $query_preg = mysqli_query($con, $SQL_preg);
      //Inserta la cantidad de respuestas en $Data y su nombre en $Labels
      while ($preg = mysqli_fetch_array($query_preg)) {
        $Data[]=$preg["COUNT(respuesta.respuesta)"];
        $Labels[]=$Formulario[0]["Preguntas"][$i]["Opciones"][$n]["valor"];
      }
    }
    //Guarda los reultados de cada pregunta en el arreglo preguntas
    $Preguntas[]=[
      "Labels" => $Labels,
      "Data" => $Data,
      "Titulo" => $Formulario[0]["Preguntas"][$i]["Titulo"]
    ];
  }
  //Consulta cuantas personas respondieron ese formulario
  $SQL_preg = "SELECT COUNT(id_form) FROM contestada WHERE contestada.id_form='$id_formu'";
  $query_preg = mysqli_query($con, $SQL_preg);
  // Inserta el dato de cuantos contestaron junto al nombre del formulario, su descripcion
  // y el arreglo de preguntas juntoa todos estos valores
  if ($tot = mysqli_fetch_array($query_preg)) {
    $Graficar=[
      "Titulo"=>$Formulario["Titulo"],
      "Descripcion"=>$Formulario["Desc"],
      "Total"=> $tot["COUNT(id_form)"],
      "Preguntas"=>$Preguntas
    ];
  }
  echo json_encode($Graficar);
 ?>
