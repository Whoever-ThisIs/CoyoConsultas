<?php
  include "Config.php";
  // Falta validación de variables
  $conexion = connect();
  if(!$conexion) {
    echo "No se pudo conectar con el servidor. <br>
    Cuando llames a apoyo técnico, muéstrales el texto a continuación:";
    echo mysqli_connect_error()."<br>";
    echo mysqli_connect_errno()."<br>";
    exit();
  }
  else {
    $nombre = (isset($_POST['nombre']) && $_POST['nombre'] != "") ? $_POST['nombre'] : false ;
    $paterno = (isset($_POST['paterno']) && $_POST['paterno'] != "") ? $_POST['paterno'] : false ;
    $materno = (isset($_POST['materno']) && $_POST['materno'] != "") ? $_POST['materno'] : false ;
    $fecha = (isset($_POST['fecha']) && $_POST['fecha'] != "") ? $_POST['fecha'] : false ;
    $correo = (isset($_POST['correo']) && $_POST['correo'] != "") ? $_POST['correo'] : false ;
    $id1 = (isset($_POST['id1']) && $_POST['id1'] != "") ? $_POST['id1'] : false ;
    $id2 = (isset($_POST['id2']) && $_POST['id2'] != "") ? $_POST['id2'] : false ;
    $password = (isset($_POST['password']) && $_POST['password'] != "") ? $_POST['password'] : false ;
    $tipo = (isset($_POST['tipo']) && $_POST['tipo'] != "") ? $_POST['tipo'] : false ;
  
    if($nombre === false || $paterno === false || $materno === false || $fecha === false || $correo === false || $id1 === false || $id2 === false || $password === false || $tipo === false ){
      echo "Error al recibir sus datos, por favor reingréselos";
    }
    else{
      if($tipo == "alumno"){
        $tipo = 1;
      }elseif ($tipo == "profesor") {
        $tipo = 2;
      }else{
        $tipo = 3;
      }
  
      $SQL_usr = "INSERT INTO usuario(id_usuario, id_tipo, password, nacimiento, correo, extra, nombre, paterno, materno) VALUES ('$id1', $tipo, '$password', '$fecha', '$correo', '$id2', '$nombre', '$paterno', '$materno')";
      $query_usr = mysqli_query($conexion,$SQL_usr);
    
      echo $SQL_usr;
    }

  }
?>
