# CoyoConsultas
Sitio Web para crear y responder formularios hecho por **NEMPP10**.
### Características:
* Creación de formularios con un máximo de 5 preguntas cerradas y 10 opciones en cada una.
* Interfaz gráfica para el seguimiento de los resultados.
* Opciones de privacidad para los formularios (Público, sólo alumnos, sólo maestros, alumnos y maestros)
* Interfaz para responder formularios
* Almacenamiento de resultados, formularios y usuarios en la misma base de datos
## Instalación del proyecto
### Requerimentos:
* Servidor Apache con PHP7 o posterior y Maria DB.
* Navegador Actualizado(Se recomienda Chrome).
* Carpeta del proyecto guardada como: "CoyoConsultas".
### Instalación del Proyecto:
#### Windows
* En caso de no contar con un servidor Apache con PHP 7.2 Y Maria DB, se recomienda descargar [XAMPP](https://www.apachefriends.org/download.html/) , de preferencia aceptar las configuraciones predeterminadas en la ruta de instalación.
* Copiar la carpeta del proyecto dentro de "xampp/htdocs".
#### Mac
* En caso de no contar con un servidor Apache con PHP 7.2 o superior y MySQL, se recomienda descargar [MAMP](https://www.mamp.info/en/downloads/).
* Copiar la carpeta del proyecto (CoyoConsultas) dentro de "MAMP/htdocs".
#### Base de datos
* Dentro de la carpeta del proyecto se encuentra la carpeta *data* con el archivo **DB_coco.sql**, que contiene la base de datos del proyecto.
* Se debe de importar al SGBD que use su servidor (por ejemplo, MySQL).
* Se debe crear un usuario con los siguientes permisos
  - DELETE
  - INSERT
  - SELECT
  - UPDATE
  * La configuración por defecto es la de un usuario de nombre **coco** cuya contraseña es su mismo nombre.
* Se recomienda que la base de datos se llame "coco". En caso de elegir otro nombre, modificar **Config.php**.
* Se recomienda tener los caracteres de la base de datos codificados en utf8mb4, aunque debido a las configuraciones de seguridad no es necesario.
### Configuración del Proyecto:
* Se debe de adaptar el archivo **Config.php** para adaptarse al SGBD y poder conectarse a él.
* El administrador usa el id *MELM8305281H0* y la contraseña *ContraSegura6178_* con el correo *uwu@example.com*. Se puede cambiar su perfil.
## Créditos
#### Creado por **NEMPP10**(Nos Esforzamos Mucho, porfi ponganos 10)
##### Integrantes
| Integrante         | Rol                                                                                      |
|--------------------|------------------------------------------------------------------------------------------|
| Tamara Arenas      | Desarrolladora frontend y asistente en backend (JS)                                      |
| Abraham López      | Seguridad y asistente en backend (PHP/JS)                                                |
| Mariana Melo       | Desarrolladora frontend, líder del departamento de animación y asistente en backend (JS) |
| Lenin Pavón        | Desarrollador backend (PHP/SQL/JS)                                                       |
| Carlos Villafranca | Desarrollador backend (PHP/JS)                                                           |


## Comentarios adicionales
* Se debe de iniciar sesión para contestar una encuesta
* Falta implementar la búsqueda por código
* Los elementos que modifica la paleta son pocos
* Los compañeros que sacamos 3.5 en el primer proyecto agradecemos eternamente el tener la oportunidad de trabajar con un equipo tan talentoso, inteligente, creativo y capaz como lo es éste, y de igual forma agradecemos a los instructores por asignarnos estos compañeros.
* Hay diversos programas sin comentarios o sin comentarios de la calidad necesaria, esperamos que no dificulte el entendimiento el código
* Agradecemos a los mentores del Curso Web 2020 por su incansable esfuerzo, su apoyo y el habernos podido dar este espacio de crecimiento personal y grupal. En serio, muchísimas gracias.🦖







