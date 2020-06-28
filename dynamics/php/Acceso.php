<?php
  include("Des-cifrado.php");
  include_once "Config.php";
  //Puse de input del post un "usuario". Cambienlo a lo que pongan bien en el formulario.
  $id = escapeAll($_POST['id']);
  $psw = escapeAll($_POST['password']);
  if (preg_match('/.+\@.+\..+/',$id)) {
    $preresult = "SELECT password, sal FROM usuario WHERE correo LIKE '%$id%'";
  }
  else {
    $preresult = "SELECT password, sal FROM usuario WHERE id_usuario LIKE '%$id%'";
  }
  function checkProfile($preresult, $psw)
  {
  	$con = connect();

  	$result = mysqli_query($con,$preresult);

  	$response = [];
  	while($row = mysqli_fetch_assoc($result))
  	{
  		array_push($response, $row);
  	}
  	return acceso($psw,$response[0]["password"],$response[0]["sal"]);
  }
  echo json_encode(checkProfile($preresult, $psw));



?>
