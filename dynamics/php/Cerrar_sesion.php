<?php
//iniciando sesión
  session_start();
  session_unset();
  session_destroy();
  setcookie("Sesion", "Destruida")
?>
