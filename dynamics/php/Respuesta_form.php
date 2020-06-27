<?php
  session_start();
  include("Config.php");
  include("Des-cifrado.php");
  $conexion = connect();
  //Conecta con la base de datos
  if(!$conexion) {
    echo "No se pudo conectar con el servidor. <br>
    Cuando llames a apoyo técnico, muéstrales el texto a continuación:";
    echo mysqli_connect_error()."<br>";
    echo mysqli_connect_errno()."<br>";
    exit();
  }else{
    //Consultas si el usuario si el usuario ya resolvio ese formulario
    $id_form = escapeAll($_POST['id_form']);
    $id_usu = $_SESSION['id'];
    $query_opc = mysqli_query($conexion, "SELECT id_form  FROM contestada WHERE id_usuario='$id_usu'");
    $Contestar=true;
      while ($opc = mysqli_fetch_array($query_opc)) {
        if ($opc['id_form'] == $id_form) {
          echo "YA HAS CONTESTADO ESE FORMULARIO";
          $Contestar=false;
        }
      }
    if ($Contestar) {//Si no lo ha hecho sube la informacion
      echo "Subir info";
      //Sube los datos del formulario de usuario a contestada
      mysqli_query($conexion, "INSERT INTO contestada (id_usuario, id_form) VALUES ('$id_usu','$id_form')");
      //Obtiene el id de esa contestacion
      $contest = mysqli_query($conexion, "SELECT id_contestada  FROM contestada WHERE id_usuario='$id_usu' AND id_form='$id_form' ");
      while ($cnt = mysqli_fetch_array($contest)) {
        //Guarda ese valor para insertarlo en la respuesta
        $id_cnt = $cnt['id_contestada'];
      }
      for ($i=0; $i < count($_POST)-1 ; $i++) {
        //Sube todas las respuestas
        $id_preg = $id_form."-".$i;
        $id_resp = $id_preg."-".$_POST[$id_preg];
        mysqli_query($conexion, "INSERT INTO respuesta (id_pregunta, respuesta, id_contestada) VALUES ('$id_preg','$id_resp', '$id_cnt')");
      }
    }
  }
?>
