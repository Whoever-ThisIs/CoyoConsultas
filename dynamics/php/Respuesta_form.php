<?php
  session_start();
  /**
   * Este programa recibe la información del usuario con
   * respecto a un formulario y lo va a creando
   */
  include ("Config.php");
  $conexion = connect();
  if(!$conexion) {
    echo "No se pudo conectar con el servidor. <br>
    Cuando llames a apoyo técnico, muéstrales el texto a continuación:";
    echo mysqli_connect_error()."<br>";
    echo mysqli_connect_errno()."<br>";
    exit();
  }else{
    $id_form = $_POST['id_form'];
    $id_usu = $_SESSION['id'];
    $query_opc = mysqli_query($conexion, "SELECT id_form  FROM contestada WHERE id_usuario='$id_usu'");
    $Contestar=true;
      while ($opc = mysqli_fetch_array($query_opc)) {
        echo var_dump($opc);
        if ($opc['id_form'] == $id_form) {
          echo "YA HAS CONTESTADO ESE FORMULARIO";
          echo "\n";
          $Contestar=false;
        }
      }
    if ($Contestar) {
      echo "Subir info";
      mysqli_query($conexion, "INSERT INTO contestada (id_usuario, id_form) VALUES ('$id_usu','$id_form')");
      for ($i=0; $i < count($_POST)-1 ; $i++) {
        $id_preg = $id_form."-".$i;
        $id_resp = $id_preg."-".$_POST[$id_preg];
        mysqli_query($conexion, "INSERT INTO respuesta (id_pregunta, respuesta) VALUES ('$id_preg','$id_resp')");
      }
    }
  }
?>
