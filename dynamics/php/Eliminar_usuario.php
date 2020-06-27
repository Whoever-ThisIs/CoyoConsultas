<?php
  //Inicio Session
  session_start();
  //Me conecto con la base de datos
  if ($_SESSION["tipo"]=="Alumno") {
    $id_usu = $_POST['id_us'];
    include('Config.php');
    $con = connect();
    ///////////   Elimina los registros que de el en contestada y respuesta    /////////////
    //////**********************************************************************/////
    $contesta = mysqli_query($con, "SELECT id_contestada FROM contestada WHERE id_usuario='$id_usu'");
    while ($cont = mysqli_fetch_array($contesta)) {
      // var_dump($cont[0]);
      $id_cont = $cont[0];
      //Destruye todas las respuestas
      $respondi = mysqli_query($con, "DELETE FROM respuesta WHERE id_contestada='$id_cont'");
    }
    //Sustituir por destruir
    $contesta = mysqli_query($con, "DELETE FROM contestada WHERE id_usuario='$id_usu'");

    ///////////   Elimina los de las otras personas de sus formularios    /////////////
    //////**********************************************************************/////
    $formula = mysqli_query($con, "SELECT id_form FROM formulario WHERE id_usuario='$id_usu'");
    while ($formu = mysqli_fetch_array($formula)) {
      $id_formu = $formu[0];
      $contesta = mysqli_query($con, "SELECT id_contestada FROM contestada WHERE id_usuario='$id_formu'");
      while ($cont = mysqli_fetch_array($contesta)) {
        // var_dump($cont[0]);
        $id_cont = $cont[0];
        //Destruye todas las respuestas
        $respondi = mysqli_query($con, "DELETE FROM respuesta WHERE id_contestada='$id_cont'");
      }
      //Sustituir por destruir
      $contesta = mysqli_query($con, "DELETE FROM contestada WHERE id_usuario='$id_formu'");
    }

    ////////    Elimina los registros en en formulario, pregunta y opcion    /////////
    //////**********************************************************************/////
    $formula = mysqli_query($con, "SELECT id_form FROM formulario WHERE id_usuario='$id_usu'");
    while ($formu = mysqli_fetch_array($formula)) {

      $id_formu = $formu[0];
      $pregunt = mysqli_query($con, "SELECT id_pregunta FROM pregunta WHERE id_form='$id_formu'");
      while ($preg = mysqli_fetch_array($pregunt)) {

        $id_preg = $preg[0];
        //Destruyte todas las opciones
        $opcion = mysqli_query($con, "DELETE FROM opcion WHERE id_pregunta='$id_preg'");
      }
      //Destruye todas las preguntas
      $pregunt = mysqli_query($con, "DELETE FROM pregunta WHERE id_form='$id_formu'");
    }
    //Destruye todos los formularios
    $formula = mysqli_query($con, "DELETE FROM formulario WHERE id_usuario='$id_usu'");

    ////////                      Elimina el usuario                         /////////
    //////**********************************************************************/////
    $usuar = mysqli_query($con, "DELETE FROM usuario WHERE id_usuario='$id_usu'");
    if ($usuar) {
      echo ("Datos eliminados");
    }else{
      echo ("Ocurrio un error");
    }
  }else{
    echo "No tiene acesso a esta página";
  }
 ?>
