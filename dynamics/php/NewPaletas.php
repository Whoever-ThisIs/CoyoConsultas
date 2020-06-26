<?php
  session_start();
  include("Config.php");

  function setColors(){
    $con = connect();
    $result = mysqli_query($con,"SELECT perfil FROM USUARIO WHERE id_usuario LIKE '$_SESSION[id]'");

    $response= [];
    while($row = mysqli_fetch_assoc($result))
    {
      array_push($response, $row);
    }

    switch ($response[0]["perfil"]) {
      case 1:
        $array = ["#F9FFC1","#FFE54E","#FBB028","#E14F0A","#7F282F"];
        break;

      case 2:
        $array = ["#2A2A2A","#8F55B4","#93A2E0","#93A2E0","#C5D1DD"];
        break;
    }
    return $array;
  }
  echo json_encode(setColors());
?>
