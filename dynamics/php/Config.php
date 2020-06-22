<?php
/**
 * Este documento configura la conexión con la base de datos
 */
define('servidor', '127.0.0.1');
define('user', 'root');
define('password', '');
define('db', 'coco');

function connect()
{
	$conn = mysqli_connect(servidor, user, password, db);

	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	return $conn;
}
