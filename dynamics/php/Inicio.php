
<?php
include ("Config.php");
$conexion = connect();
if(!$conexion) {
    exit();
}
else{
    $cat=$_POST['categoria'];
    $SQL_cards= "SELECT id_form, id_categoria, titulo, descripcion, rango, inicio, inicio_hora, fin, fin_hora FROM formulario WHERE id_categoria IN ($cat);";
    $query_cards = mysqli_query( $conexion,$SQL_cards);
    $poll = [];
    while ($row = mysqli_fetch_assoc($query_cards)) {
    array_push($poll, $row);
    }
    echo json_encode($poll);
}

?>
