<?php
  //Inicio Session
  session_start();
  //Me conecto con la base de datos
  include('Config.php');
  $con = connect();
  //id del usuario a Bloquear
  $id_usu = $_POST['id_us'];
  $Accion = $_POST['Accion'];
  //Obtengo el id del formulario a extraer
  if ($Accion=="Bloquear") {
    $result = mysqli_query($con, "SELECT bloqueado FROM usuario WHERE id_usuario='$id_usu'");
    //Checa que haya un usuario con ese id
    if ($Datos = mysqli_fetch_array($result)) {
      //Checa que no este bloqueado
      if ($Datos[0]==false) {
        //Manda la accion para bloquear
        $result = mysqli_query($con, "UPDATE usuario SET bloqueado='1' WHERE id_usuario='$id_usu'");
        //Si salio bien todo manda el mensaje
        if ($result) {
          echo "Usuario bloqueado";
        }
      }
    }
  }elseif ($Accion=="Desbloquear") {
    $result = mysqli_query($con, "SELECT bloqueado FROM usuario WHERE id_usuario='$id_usu'");
    //Checa que haya un usuario con ese id
    if ($Datos = mysqli_fetch_array($result)) {
      //Checa que este bloqueado
      if ($Datos[0]==true) {
        //Manda la accion para bloquear
        $result = mysqli_query($con, "UPDATE usuario SET bloqueado='0' WHERE id_usuario='$id_usu'");
        //Si salio bien todo manda el mensaje
        if ($result) {
          echo "Usuario desbloqueado";
        }
      }
    }
  }
 ?>
