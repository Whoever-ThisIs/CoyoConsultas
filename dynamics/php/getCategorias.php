<?php
  include('Config.php');

  function getCat(){
    $con = connect();
    $result = mysqli_query($con, "SELECT * FROM categoria");
    $response = [];
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($response, $row);
    }
    return $response;
  }
  echo json_encode(getCat());
?>
