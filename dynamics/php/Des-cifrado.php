<?php
  include("Config.php");
  define("KENNWORT","DagehtmeinSchlafrhythmuslos");
  define("HASH","sha256");
  define("METHOD","SEED-OFB");

  //Cifrado inicial
  function cifrar($text){
    $key=openssl_digest(KENNWORT, HASH);
    $iv_len=openssl_cipher_iv_length(METHOD);
    $iv=openssl_random_pseudo_bytes($iv_len);
    $rawCif=openssl_encrypt($text,METHOD,$key,OPENSSL_RAW_DATA,$iv);

    $textoCifrado=base64_encode($iv.$rawCif);
    return $textoCifrado;
  }

  //Descifrado
  function descifrar($textoCifrado){
    $key=openssl_digest(KENNWORT, HASH);
    $iv_len=openssl_cipher_iv_length(METHOD);
    $cifrado=base64_decode($textoCifrado);
    $iv=substr($cifrado,0,$iv_len);
    $rawCif=substr($cifrado,$iv_len);

    $original=openssl_decrypt($rawCif,METHOD,$key,OPENSSL_RAW_DATA,$iv);
    return $original;
  }

  //Codificación Atbash para una capa extra de seguridad
  function atbash($text)
  {
    $a_z = range('a', 'z');
    $z_a = range('z', 'a');
    $text = preg_replace("/[^a-z0-9]+/", "", strtolower($text));
    $len = strlen($text);

    $count = 0;
    $codificado = [];
    foreach (str_split($text) as $char) {
        $count++;
        if (is_numeric($char)) {
            $codificado[] = $char;
        }
        if (ctype_lower($char)) {
            $codificado[] = $z_a[array_search($char, $a_z)];
        }
    }
    return implode('', $codificado);
  }

  //Creación de la sal
  function salt(){
    $todo="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&/()=?";
    $len=strlen($todo);
    $salt='';
    for ($i=0; $i < 15; $i++) {
      $salt .= $todo[rand(0, $len - 1)];
    }
    return $salt;
  }

  //Creación de la pimienta
  function pepper($text){
    $abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $lon=strlen($abc);
    $pepper='';
    for ($a=0; $a < 2; $a++) {
      $pepper .= $abc[rand(0, $lon - 1) ];
    }
    $text .= $pepper;
    return $text;
  }

  //Hasheo de contraseña
  function registro($contra,$salt){
    $contra1=atbash($contra);
    $contra2=pepper($contra1);
    $contra3 = $contra2.$salt;
    $password=openssl_digest($contra3, HASH);
    $password1=cifrar($password);
    return $password1;
  }

  //Consulta de contraseña guardada en base datos (proporcionada)
  function acceso($icontra,$password1,$salt){
    $password2=descifrar($password1);
    $icontra1=atbash($icontra);
    $abc="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $len=strlen($abc);
    // $true=0;
    for ($j=0; $j < $len; $j++) {
      for ($k=0; $k < $len; $k++) {
        $icontra3=$icontra1.$abc[$j].$abc[$k].$salt;
        $ipassword=openssl_digest($icontra3, HASH);
        if ($ipassword==$password2) {
          // $true++;
          return true;
        }
      }
    }
    return false;
    // return $true;
  }

  //Seguridad
  function escapeAll($cadena){
    $con = connect();
    $a = htmlentities($cadena, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $b = strip_tags($a);
    return mysql_real_escape_string($con,$b);
  }

?>
