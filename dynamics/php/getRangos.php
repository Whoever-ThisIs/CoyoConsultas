<?php
  include('Config.php');

  function getRango(){
    $con = connect();
    $result = mysqli_query($con, "SELECT * FROM rango");
    $response = [];
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($response, $row);
    }
    return $response;
  }
  echo json_encode(getRango());
?>
