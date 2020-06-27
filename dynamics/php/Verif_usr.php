<?php
  include("Config.php");
  include("Des-cifrado.php");
  $con = connect();
  session_start();
  $id_form = isset($_POST['id_form']) ? escapeAll($_POST['id_form']) : "";
  $id_usr = isset($_SESSION['id']) ? $_SESSION['id'] : "";

  $SQL_tipo_usr = "SELECT tipo_usr FROM tipo WHERE id_tipo IN(SELECT id_tipo FROM usuario WHERE id_usuario = '$id_usr');";
  $query_tipo_usr = mysqli_query($con,$SQL_tipo_usr);
  $tipo_usr_array = mysqli_fetch_array($query_tipo_usr);
  $tipo_usr = $tipo_usr_array[0];

  $SQL_rango = "SELECT rango FROM rango WHERE id_rango IN(SELECT rango FROM formulario WHERE id_form='$id_form');";
  $query_rango = mysqli_query($con,$SQL_rango);
  $rango_array = mysqli_fetch_array($query_rango);
  $rango = $rango_array[0];


  if($rango == "Público"){
    echo true;
  }elseif ($rango == "Alumnos y profesores") {
    if(isset($_SESSION['id'])){
      echo true;
    }else{
      echo "0";
    }
  }elseif ($rango == "Alumnos") {
    if($tipo_usr == "Alumno"){
      echo true;
    }else{
      echo "0";
    }
  }elseif ($rango == "Profesores") {
    if($tipo_usr == "Profesor" || $tipo_usr == "Administrador"){
      echo true;
    }else{
      echo "0";
    }
  }else{
    echo "0";
  }
?>
