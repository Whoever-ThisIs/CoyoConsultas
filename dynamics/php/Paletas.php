<?php
  session_start();
  include("Config.php");
  function setColors(){
    $tipo = $_POST['tipo'];
    switch ($tipo) {
      case 1:
        $array = ["#F9FFC1","#FFE54E","#FBB028","#E14F0A","#7F282F"];
        break;

      case 2:
        $array = ["#2A2A2A","#8F55B4","#93A2E0","#93A2E0","#C5D1DD"];
        break;
    }
    $con = connect();
    mysqli_query($con,"UPDATE usuario SET perfil = $tipo WHERE id_usuario LIKE '$_SESSION[id]'");
    return $array;
  }


  echo json_encode(setColors());
?>
