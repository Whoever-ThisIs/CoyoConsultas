<?php
  session_start();
  include('Config.php');
  include('Des-cifrado.php');

  $validador = 0;
  $imagen = false;
  $con = connect();

  //Recuperación de inputs
  $correo = escapeAll($_POST['edcorreo']);
  $new = escapeAll($_POST['newPass']);
  $old = escapeAll($_POST['oldPass']);
  $id = escapeAll($_SESSION['id']);

  //Mueve la imágen proporcionada a su carpeta correspondiente
  if ($_FILES['edimg']['type']=="image/jpg") {
    $ext=pathinfo($_FILES['edimg']['name'],PATHINFO_EXTENSION);
    $carpeta="../../statics/media/img/profilepics/";
    $destino = $carpeta.$id.".".$ext;
    move_uploaded_file($_FILES['edimg']['tmp_name'],$destino);
    mysqli_query($con,"UPDATE usuario SET perfil = 1 WHERE id_usuario = '$id'");
    $imagen++;
  }

  //Hashea la nueva contraseña solo si ambos campos han sido llenados
  if ($old != "" && $new != "") {
    $salt = salt();
    $password = registro($new,$salt);
  }

  // Solo correo
  if ($correo != "" && $new == "" && $old == "") {
    if (!sameMailAll($con,$correo,$id)&&!sameMailSelf($con,$correo,$id)) {
      $inquiry = "UPDATE usuario SET correo = '$correo' WHERE id_usuario = '$id'";
      $validador++;
    }
  }

  //Solo contraseña
  if ($correo == "" && $new != "" && $old != "") {
    if (checkPass($con,$old,$id)) {
      $inquiry = "UPDATE usuario SET password = '$password', sal = '$salt' WHERE id_usuario = '$id'";
      $validador++;
    }
  }

  //Ambos
  if ($correo != "" && $new != "" && $old != "") {
    if (checkPass($con,$old,$id)&&!sameMailAll($con,$correo,$id)&&!sameMailSelf($con,$correo,$id)) {
      $inquiry = "UPDATE usuario SET password = '$password', sal = '$salt', correo = '$correo' WHERE id_usuario = '$id'";
      $validador++;
    }
  }

  //Checa que la contraseña vieja ingresada sea correcta, regresa true si es correcto
  function checkPass($con,$old,$id){
    $checkPass = "SELECT password, sal FROM usuario WHERE id_usuario LIKE '$id'";
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

  //Revisa que el correo no sea el mismo que el de otra cuenta en la base, regresa tru si hay coincidencias
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

  //Revisa que el correo igresado no sea el mismo que ya existe con tu perfil, regresa true si hay coincidencia
  function sameMailSelf($con,$correo,$id){
    $checkMailSelf = "SELECT correo FROM usuario WHERE id_usuario LIKE '$id' AND correo LIKE '$correo'";
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

  //Realiza el cambio en la base
  function update($con,$inquiry,$validador){
    return mysqli_query($con, $inquiry);
  }

  if ($validador > 0 && !$imagen) {
    echo json_encode(update($con,$inquiry,$validador));
  }
  elseif ($imagen) {
    echo json_encode(true);
  }



?>
