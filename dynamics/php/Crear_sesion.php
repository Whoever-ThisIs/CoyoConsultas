<?php
  include_once "Config.php";
  include("Des-cifrado.php");
  //Puse de input del post un "usuario". Cambienlo a lo que pongan bien en el formulario.
  $id = escapeAll($_POST['id']);
  if (preg_match('/.+\@.+\..+/',$id)) {
    $preresult = "SELECT * FROM usuario LEFT JOIN tipo ON usuario.id_tipo=tipo.id_tipo WHERE correo LIKE '%$id%'";
  }
  else {
    $preresult = "SELECT * FROM usuario LEFT JOIN tipo ON usuario.id_tipo=tipo.id_tipo WHERE id_usuario LIKE '%$id%'";
  }
  	$con = connect();
  	$result = mysqli_query($con,$preresult);
  	$response = [];
  	while($row = mysqli_fetch_assoc($result))
  	{
  		array_push($response, $row);
  	}
    session_start();
    $_SESSION['id']=$response[0]["id_usuario"];
    $_SESSION['Nombre']=$response[0]["nombre"];
    $_SESSION['ApellidoP']=$response[0]["paterno"];
    $_SESSION['ApellidoM']=$response[0]["materno"];
    $_SESSION['Correo']=$response[0]["correo"];
    $_SESSION['nacimiento']=$response[0]["nacimiento"];
    $_SESSION['Bloqueado']=$response[0]["bloqueado"];
    $_SESSION['tipo']=$response[0]["tipo_usr"];
