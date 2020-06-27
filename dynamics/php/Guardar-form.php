<?php
  session_start();
  /**
   * Este programa recibe la información del usuario con
   * respecto a un formulario y lo va a creando
   */
  include("Config.php");
  include("Des-cifrado.php");
  $conexion = connect();
  if(!$conexion) {
    echo "No se pudo conectar con el servidor. <br>
    Cuando llames a apoyo técnico, muéstrales el texto a continuación:";
    echo mysqli_connect_error()."<br>";
    echo mysqli_connect_errno()."<br>";
    exit();
  }else{
    $tipo = escapeAll(escapeAll($_POST["tipo"]);
    // $tipo = 4;
    if ($tipo == 1) {
      $id = escapeAll(escapeAll($_POST['idForm']);
      $categoria = escapeAll(escapeAll($_POST['categoria']);
      $titulo = escapeAll(escapeAll($_POST['titulo']);
      $rango = escapeAll($_POST['rango']);
      $descripcion = escapeAll($_POST['descripcion']);
      $usuario = $_SESSION['id'];
      $SQL_formulario = "INSERT INTO formulario(id_form, id_categoria, titulo, rango, descripcion, id_usuario) VALUES ('$id', $categoria, '$titulo', $rango, '$descripcion','$usuario')";
      $query_formulario = mysqli_query($conexion,$SQL_formulario);
    }
    elseif($tipo == 2){
      $id_pregunta = escapeAll($_POST['idPregunta']);
      $id_form = escapeAll($_POST['idForm']);
      $nombre_preg = escapeAll($_POST['nombrePreg']);
      $SQL_pregunta = "INSERT INTO pregunta(id_pregunta, id_form, titulo) VALUES ('$id_pregunta','$id_form','$nombre_preg');";
      $query_pregunta = mysqli_query($conexion, $SQL_pregunta);
    }
    elseif($tipo == 3){
      $id_opcion = escapeAll($_POST['idOpcion']);
      $id_pregunta = escapeAll($_POST['idPreguntaOp']);
      $valor = escapeAll($_POST['valor']);
      $SQL_opcion = "INSERT INTO opcion(id_opcion,id_pregunta,valor) VALUES('$id_opcion','$id_pregunta','$valor');";
      $query_opcion = mysqli_query($conexion,$SQL_opcion);
    }
    elseif($tipo == 4){
      $id_form = escapeAll($_POST['idForm']);
      $inicioDia = escapeAll($_POST['inicioDia']);
      $inicioHora = escapeAll($_POST['inicioHora']);
      $finDia = escapeAll($_POST['finDia']);
      $finHora = escapeAll($_POST['finHora']);
      $SQL_fecha = "UPDATE formulario SET inicio = '$inicioDia', inicio_hora = '$inicioHora', fin = '$finDia', fin_hora = '$finHora' WHERE id_form = '$id_form'";
      $query_fecha = mysqli_query($conexion,$SQL_fecha);
    }
  }
?>
