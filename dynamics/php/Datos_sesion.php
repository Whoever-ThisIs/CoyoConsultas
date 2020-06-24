<?php
session_start();
$Datos = implode("~", $_SESSION);
echo json_encode($Datos);
?>
