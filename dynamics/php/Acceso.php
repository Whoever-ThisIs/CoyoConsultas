<?php
  include("Config.php");
  include("Des-cifrado.php");
  //Puse de input del post un "usuario". Cambienlo a lo que pongan bien en el formulario.
  if (preg_match('/.+\@.+\..+/',$_POST['usuario'])) {
    $preresult = "SELECT password, sal FROM usuario WHERE correo LIKE '%$_POST[usuario]%'";
  }
  else {
    $preresult = "SELECT password, sal FROM usuario WHERE id_usuario LIKE '%$_POST[usuario]%'";
  }
  function checkProfile($preresult)
  {
  	$con = connect();

  	$result = mysqli_query($con,$preresult);

  	$response = [];
  	while($row = mysqli_fetch_assoc($result))
  	{
  		array_push($response, $row);
  	}
  	return acceso($_POST['password'],$response[0],$response[1]);
  }
  echo json_encode(checkProfile($preresult));



?>
