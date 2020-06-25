<?php
  include('config.php');
  include('Des-cifrado.php');

  $error = 0;
  $validador = false;
  $con = connect();
  // if (isset($_POST['edcorreo'])) {
  //   $correo = $_POST['edcorreo']
  // }
  // if (isset($_POST['edcorreo'])) {
  //   $correo = $_POST['edcorreo']
  // }
  if (isset($_POST['edcorreo'])) {
    $correo = $_POST['edcorreo'];
  }
  if (isset($_POST['newPass'])) {
    $new = $_POST['newPass'];
  }
  if (isset($_POST['oldPass'])) {
    $old = $_POST['oldPass'];
  }
  $id = $_POST['id'];

  // Solo correo
  if (!isset($_POST['oldPass'])&&!isset($_POST['newPass'])&&isset($_POST['edcorreo'])) {
    if (!sameMail($con,$correo)) {
      $inquiry = "UPDATE usuario SET correo = '$correo' WHERE id_usuario = '%$id%'";
      $validador = true;
    }
  }

  //Solo contraseña
  if (isset($_POST['oldPass'])&&isset($_POST['newPass'])&&!isset($_POST['edcorreo'])) {
    if (checkPass($con,$old)) {
      $inquiry = "UPDATE usuario SET password = '$new' WHERE id_usuario = '%$id%'";
      $validador = true;
    }
  }

  //Ambos
  if (isset($_POST['oldPass'])&&isset($_POST['newPass'])&&isset($_POST['edcorreo'])) {
    if (checkPass($con,$old)&&!sameMail($con,$correo)) {
      $inquiry = "UPDATE usuario SET password = '$new', correo = '$correo' WHERE id_usuario = '%$id%'";
      $validador = true;
    }
  }


  function checkPass($con,$old){
    $checkPass = "SELECT password, sal FROM usuario WHERE id_usuario LIKE '%$id%'";
    $resultPass = mysqli_query($con,$checkPass);
    $response = [];

    while($row = mysqli_fetch_assoc($resultPass))
    {
      array_push($response, $row);
    }
    if ($response > 0) {
      return acceso($old,$response[0]["password"],$response[0]["sal"]);
    }
  }

  function sameMail($con,$correo){
    $checkMail = "SELECT correo FROM usuario WHERE id_usuario LIKE '%$id%'";
    $resultMail = mysqli_query($con,$checkMail);
    if ($resultMail == $correo) {
      return true;
    }
    else {
      return false;
    }
  }

  function update($con,$inquiry){
    if ($validador) {
      return mysqli_query($con, $inquiry);
    }
  }
  echo json_encode(update($con,$inquiry));



?>
