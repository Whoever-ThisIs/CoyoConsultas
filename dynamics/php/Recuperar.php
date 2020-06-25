<?php
include('config.php');

function recuperar(){
  $con = connect();

  $resultA = "SELECT * FROM formulario WHERE id_form LIKE '$_POST[recuperar]'";
  $resultB = "SELECT * FROM pregunta WHERE id_form LIKE '$_POST[recuperar]'";

	$response = [];

  $result = mysqli_query($con,$resultA);

	while($row = mysqli_fetch_assoc($result))
	{
		array_push($response, $row);
	}

  // while($row = mysqli_fetch_assoc($resultB))
  // {
  //   array_push($response, $row);
  // }

	return $response;
}
echo json_encode(recuperar());

?>
