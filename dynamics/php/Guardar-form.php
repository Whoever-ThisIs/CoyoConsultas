<?php
  session_start();
  /**
   * Este programa recibe la información del usuario con
   * respecto a un formulario y lo va a creando
   */
  include ("Config.php");
  $conexion = connect();
  if(!$conexion) {
    echo "No se pudo conectar con el servidor. <br>
    Cuando llames a apoyo técnico, muéstrales el texto a continuación:";
    echo mysqli_connect_error()."<br>";
    echo mysqli_connect_errno()."<br>";
    exit();
  }else{
    if ($_POST["tipo"]==1) {
      $id = $_POST['idForm'];
      $categoria = $_POST['categoria'];
      $titulo = $_POST['titulo'];
      $rango = $_POST['rango'];
      $descripcion = $_POST['descripcion'];
      $usuario = $_SESSION['id'];
      $SQL_formulario = "INSERT INTO formulario(id_form, id_categoria, titulo, rango, descripcion, id_usuario) VALUES ('$id', $categoria, '$titulo', $rango, '$descripcion','$usuario');";
      $query_formulario = mysqli_query($conexion,$SQL_formulario);
    }
    elseif($_POST['tipo']==2){
      $id_pregunta = $_POST['idPregunta'];
      $id_form = $_POST['idForm'];
      $nombre_preg = $_POST['nombrePreg'];
      $SQL_pregunta = "INSERT INTO pregunta(id_pregunta, id_form, titulo) VALUES ('$id_pregunta','$id_form','$nombre_preg');";
      $query_pregunta = mysqli_query($conexion, $SQL_pregunta);   
    } 
    elseif($_POST['tipo']==3){
      $id_opcion = $_POST['idOpcion'];
      $id_pregunta = $_POST['idPreguntaOp'];
      $valor = $_POST['valor'];
      $SQL_opcion = "INSERT INTO opcion(id_opcion,id_pregunta,valor) VALUES('$id_opcion','$id_pregunta','$valor');";
      $query_opcion = mysqli_query($conexion,$SQL_opcion);
    }
    elseif($_POST['tipo']==4){
      $id_form = $_POST['idForm'];
      $inicioDia = $_POST['inicioDia'];
      $inicioHora = $_POST['inicioHora'];
      $finDia = $_POST['finDia'];
      $finHora = $_POST['finHora'];
      $SQL_fecha = "UPDATE formulario SET inicio = '$inicioDia', inicio_hora = '$inicioHora', fin = '$finDia', fin_hora = '$finHora' WHERE id_form = '$id_form'";
      $query_fecha = mysqli_query($conexion,$SQL_fecha);
    }
  }
?>
