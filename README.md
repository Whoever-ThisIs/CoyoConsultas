# CoyoConsultas
## Instalación del proyecto
### Requerimentos:
* Servidor Apache con PHP7 o posterior y Maria DB.
* Navegador Actualizado(Se recomienda Chrome).
* Carpeta del proyecto guardada como: "CoyoConsultas".
### Instalación del Proyecto:
* En caso de no contar con un servidor Apache con PHP 7.2 Y Maria DB, se recomienda descargar [XAMPP](https://www.apachefriends.org/download.html/) , de preferencia aceptar las configuraciones predeterminadas en la ruta de instalación.
* Copiar la carpeta del proyecto dentro de "xampp/htdocs".
#### Mac
* En caso de no contar con un servidor Apache con PHP 7.2 o superior y MySQL, se recomienda descargar [MAMP](https://www.mamp.info/en/downloads/).
* Copiar la carpeta del proyecto (CoyoConsultas) dentro de "MAMP/htdocs".
#### Base de datos
* Dentro de la carpeta del proyecto se encuentra la carpeta *data* con el archivo **DB_coco.sql**, que contiene la base de datos del proyecto.
* Se debe de importar al SGBD que use su servidor (por ejemplo, MySQL).
* Se recomienda que la base de datos se llame "coco". En caso de elegir otro nombre, modificar **Config.php**.
* Se recomienda tener los caracteres de la base de datos codificados en utf8mb4, de otro modo podrían surgir errores al realizar las consultas.
