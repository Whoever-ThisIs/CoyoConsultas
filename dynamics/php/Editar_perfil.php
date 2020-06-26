<?php
  session_start();
  include('Config.php');
  include('Des-cifrado.php');

  $validador = false;
  $con = connect();

  $correo = $_POST['edcorreo'];
  $new = $_POST['newPass'];
  $old = $_POST['oldPass'];
  $id = $_SESSION['id'];

  if ($_FILES['edimg']['type']=="image/png"||$_FILES['edimg']['type']=="image/jpg"||$_FILES['edimg']['type']=="image/jpeg") {
    $ext=pathinfo($_FILES['edimg']['name'],PATHINFO_EXTENSION);
    $carpeta="../../statics/media/img/profilepics/";
    $destino = $carpeta.$id.".".$ext;
    move_uploaded_file($_FILES['edimg']['tmp_name'],$destino);
    mysqli_query($con,"UPDATE usuario SET perfil = 1 WHERE id_usuario = $id");
    $validador = true;
  }


  if ($old != "" && $new != "") {
    $salt = salt();
    $password = registro($new,$salt);
  }

  // Solo correo
  if ($correo != "" && $new == "" && $old == "") {
    if (!sameMailAll($con,$correo,$id)&&!sameMailSelf($con,$correo,$id)) {
      $inquiry = "UPDATE usuario SET correo = '$correo' WHERE id_usuario = $id";
      $validador = true;
    }
  }

  //Solo contraseña
  if ($correo == "" && $new != "" && $old != "") {
    if (checkPass($con,$old,$id)) {
      $inquiry = "UPDATE usuario SET password = '$password', sal = '$salt' WHERE id_usuario = $id";
      $validador = true;
    }
  }

  //Ambos
  if ($correo != "" && $new != "" && $old != "") {
    if (checkPass($con,$old,$id)&&!sameMailAll($con,$correo,$id)&&!sameMailSelf($con,$correo,$id)) {
      $inquiry = "UPDATE usuario SET password = '$password', sal = '$salt', correo = '$correo' WHERE id_usuario = $id";
      $validador = true;
    }
  }


  function checkPass($con,$old,$id){
    $checkPass = "SELECT password, sal FROM usuario WHERE id_usuario LIKE $id";
    $resultPass = mysqli_query($con,$checkPass);
    $response = [];

    while($row = mysqli_fetch_assoc($resultPass))
    {
      array_push($response, $row);
    }
    if ($response > 0) {
      if (acceso($old,$response[0]["password"],$response[0]["sal"])) {
        return true;
      }else {
        return false;
      }
    }
  }

  function sameMailAll($con,$correo,$id){
    $checkMailAll = "SELECT correo FROM usuario WHERE correo LIKE '$correo'";
    $resultMailAll = mysqli_query($con,$checkMailAll);

    $responseAll = [];
    while($row = mysqli_fetch_assoc($resultMailAll))
    {
      array_push($responseAll, $row);
    }

    if (count($responseAll) > 0) {
      return true;
    }else{
      return false;
    }
  }

  function sameMailSelf($con,$correo,$id){
    $checkMailSelf = "SELECT correo FROM usuario WHERE id_usuario LIKE $id AND correo LIKE '$correo'";
    $resultMailSelf = mysqli_query($con,$checkMailSelf);

    $responseSelf = [];
    while($row = mysqli_fetch_assoc($resultMailSelf))
    {
      array_push($responseSelf, $row);
    }

    if (count($responseSelf) > 0) {
      return true;
    }else {
      return false;
    }
  }

  function update($con,$inquiry,$validador){
    if ($validador == true) {
      return mysqli_query($con, $inquiry);
    }
    else {
      return "Error";
    }
  }
  echo json_encode(update($con,$inquiry,$validador));



?>
