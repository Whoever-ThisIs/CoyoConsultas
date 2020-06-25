-- MySQL dump 10.13  Distrib 5.7.26, for osx10.10 (x86_64)
--
-- Host: localhost    Database: coco
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categoria` (
  `id_categoria` tinyint(4) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(25) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Ciencia'),(2,'Cultura'),(3,'Deportes'),(4,'Actividades académicas');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contestada`
--

DROP TABLE IF EXISTS `contestada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contestada` (
  `id_contestada` smallint(16) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(13) NOT NULL,
  `id_form` varchar(6) NOT NULL,
  `id_respuesta` int(20) DEFAULT NULL,
  PRIMARY KEY (`id_contestada`),
  KEY `FK_id_usuario` (`id_usuario`),
  KEY `FK_id_form` (`id_form`),
  KEY `FK_id_respuesta` (`id_respuesta`),
  CONSTRAINT `FK_id_form` FOREIGN KEY (`id_form`) REFERENCES `formulario` (`id_form`),
  CONSTRAINT `FK_id_respuesta` FOREIGN KEY (`id_respuesta`) REFERENCES `respuesta` (`id_respuesta`),
  CONSTRAINT `FK_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contestada`
--

LOCK TABLES `contestada` WRITE;
/*!40000 ALTER TABLE `contestada` DISABLE KEYS */;
/*!40000 ALTER TABLE `contestada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formulario` (
  `id_form` varchar(6) NOT NULL,
  `id_categoria` tinyint(4) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `inicio` date DEFAULT NULL,
  `fin` date DEFAULT NULL,
  `rango` tinyint(4) NOT NULL,
  `reportes` smallint(13) DEFAULT '0',
  `inicio_hora` time DEFAULT NULL,
  `fin_hora` time DEFAULT NULL,
  `descripcion` text NOT NULL,
  `id_usuario` varchar(13) NOT NULL,
  PRIMARY KEY (`id_form`),
  KEY `FK_id_categoria` (`id_categoria`),
  KEY `FK_rango` (`rango`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `FK_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `FK_rango` FOREIGN KEY (`rango`) REFERENCES `rango` (`id_rango`),
  CONSTRAINT `formulario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES ('1MQG6R',2,'¿Por qué conocí tu faz, por qué tienes que retorcerte en la lumbre? No sé lo que hago, mi vivir se está terminando',NULL,NULL,3,0,NULL,NULL,'¿Por qué vine a vivir si no puedo hacer algo sobre esta tierra?','319014216'),('4NVM6N',1,'Título genérico pt5',NULL,NULL,1,0,NULL,NULL,'Ulalá, chulada','319014216'),('68PBUU',1,'Wey ya!',NULL,NULL,1,0,NULL,NULL,'Ulalá chulada que no funciona','319014216'),('7ZQS4A',1,'Título genérico pt4',NULL,NULL,1,0,NULL,NULL,'Queti','319014216'),('878WEE',1,'Formulario',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('CQ5MEP',1,'Percibo lo secreto, lo oculto','2020-06-04','2020-05-24',1,0,'00:59:00','22:00:00','¡Oh vosotros señores! Así somos, somos mortales, de cuatro en cuatro nosotros los hombres','319014216'),('EE00G5',2,'Una flor blanca y una roja las hiciste llegar a mis manos',NULL,NULL,3,0,NULL,NULL,'Conocí la mitad de tu iluminar, ','319014216'),('FNMVVQ',1,'Prueba 2',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('H3UQJQ',1,'Título genérico pt3',NULL,NULL,1,0,NULL,NULL,'Queti','319014216'),('J60CW8',1,'Prueba 4',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('NNT56L',1,'Parajillo, ¿por qué cantas?',NULL,NULL,1,0,NULL,NULL,' Yo canto porque estoy alegre','319014216'),('PD7CM8',1,'Prueba 3',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('PP8ZRV',1,'Formulario',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('Q06J83',1,'Título genérico pt2',NULL,NULL,1,0,NULL,NULL,'Queti','319014217'),('QP2YA0',1,'Prueba 6',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('R5PRJ8',1,'Prueba 5',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('RSBMRA',1,'Prueba 6',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('S6FENX',1,'Prueba 3',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('TCUNHL',1,'Prueb',NULL,NULL,1,0,NULL,NULL,'Descripción','319014216'),('uwuuwu',1,'Formulario asombroso',NULL,NULL,1,0,NULL,NULL,'Queti','319014217'),('Y0H8N',1,'Título genérico pt4',NULL,NULL,1,0,NULL,NULL,'Lorem ipsum dolor sit amet','319014216'),('Y0RCMD',1,'Título genérico pt8',NULL,NULL,1,0,NULL,NULL,'Uwuwuwuwuwuwuwuwuwuwuuwuwuwuwuw','319014216'),('ZK8XER',1,'Título Genérico',NULL,NULL,1,0,NULL,NULL,'Queti','319014217');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcion`
--

DROP TABLE IF EXISTS `opcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opcion` (
  `id_opcion` varchar(12) NOT NULL,
  `id_pregunta` varchar(9) NOT NULL,
  `valor` text NOT NULL,
  `apoyo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_opcion`),
  KEY `FK_id_pregunta` (`id_pregunta`),
  CONSTRAINT `FK_id_pregunta` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcion`
--

LOCK TABLES `opcion` WRITE;
/*!40000 ALTER TABLE `opcion` DISABLE KEYS */;
INSERT INTO `opcion` VALUES ('4NVM6N-2-0','4NVM6N-2','Clarobviamente',NULL),('4NVM6N-2-1','4NVM6N-2','Chi',NULL),('68PBUU-1-0','68PBUU-1','m',NULL),('68PBUU-1-1','68PBUU-1','123',NULL),('68PBUU-2-0','68PBUU-2','456',NULL),('68PBUU-2-1','68PBUU-2','789',NULL),('68PBUU-3-0','68PBUU-3','111',NULL),('68PBUU-3-1','68PBUU-3','222',NULL),('7ZQS4A-0-0','7ZQS4A-0','Verdadero',NULL),('878WEE-0-0','878WEE-0','Opción1',NULL),('878WEE-0-1','878WEE-0','Opción2',NULL),('CQ5MEP-0-1','CQ5MEP-0','Nadie en jade, nadie en oro se convertirá',NULL),('CQ5MEP-1-0','CQ5MEP-1',' todos nos iremos',NULL),('CQ5MEP-1-1','CQ5MEP-1','Allá, de igual modo. nadie quedará',NULL),('CQ5MEP-2-0','CQ5MEP-2','Como una pintura, nos iremos borrando.',NULL),('CQ5MEP-2-1','CQ5MEP-2','Como una flor, nos iremos secando aquí sobre la tierra.',NULL),('FNMVVQ-1-0','FNMVVQ-1','Opción1',NULL),('FNMVVQ-1-1','FNMVVQ-1','Opción2',NULL),('FNMVVQ-2-0','FNMVVQ-2','Opción1',NULL),('FNMVVQ-2-1','FNMVVQ-2','Opción2',NULL),('H3UQJQ-0-0','H3UQJQ-0','Do',NULL),('H3UQJQ-0-1','H3UQJQ-0','No',NULL),('Q06J83-0-0','Q06J83-0','1',NULL),('Q06J83-0-1','Q06J83-0','A',NULL),('Q06J83-0-2','Q06J83-0','F',NULL),('Q06J83-1-0','Q06J83-1','No',NULL),('Q06J83-1-1','Q06J83-1','Noo',NULL),('RSBMRA-0-0','RSBMRA-0','Opción0',NULL),('RSBMRA-0-1','RSBMRA-0','Opción1',NULL),('TCUNHL-0-0','TCUNHL-0','Opción1',NULL),('TCUNHL-0-1','TCUNHL-0','Opción2',NULL);
/*!40000 ALTER TABLE `opcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id_pregunta` varchar(9) NOT NULL,
  `id_form` varchar(6) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  PRIMARY KEY (`id_pregunta`),
  KEY `FK_id_form_1` (`id_form`),
  CONSTRAINT `FK_id_form_1` FOREIGN KEY (`id_form`) REFERENCES `formulario` (`id_form`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES ('4NVM6N-0','4NVM6N','Carlos'),('4NVM6N-2','4NVM6N','Tamara'),('68PBUU-0','68PBUU','qwertyu'),('68PBUU-1','68PBUU','wertyuiop'),('68PBUU-2','68PBUU','asdfgh'),('68PBUU-3','68PBUU','sdfghjklñ'),('7ZQS4A-0','7ZQS4A','¿Que es una descripción?'),('878WEE-0','878WEE','¿?'),('CQ5MEP-0','CQ5MEP','todos habremos de irnos'),('CQ5MEP-1','CQ5MEP',' en la tierra quedará guardado, '),('CQ5MEP-2','CQ5MEP','conjuntamente habrá que perecer, nosotros iremos así a su casa.'),('FNMVVQ-1','FNMVVQ','¿?'),('FNMVVQ-2','FNMVVQ','¿?'),('H3UQJQ-0','H3UQJQ','Wey ya'),('Q06J83-0','Q06J83','¿Galletas?'),('Q06J83-1','Q06J83','¿El verde es un color creativo?'),('RSBMRA-0','RSBMRA','¿?'),('TCUNHL-0','TCUNHL','¿?');
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rango`
--

DROP TABLE IF EXISTS `rango`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rango` (
  `id_rango` tinyint(4) NOT NULL AUTO_INCREMENT,
  `rango` varchar(25) NOT NULL,
  PRIMARY KEY (`id_rango`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rango`
--

LOCK TABLES `rango` WRITE;
/*!40000 ALTER TABLE `rango` DISABLE KEYS */;
INSERT INTO `rango` VALUES (1,'Público'),(2,'Alumnos'),(3,'Profesores'),(4,'Alumnos y profesores');
/*!40000 ALTER TABLE `rango` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `respuesta` (
  `id_respuesta` int(20) NOT NULL AUTO_INCREMENT,
  `id_pregunta` varchar(9) NOT NULL,
  `respuesta` varchar(12) NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  KEY `FK_id_pregunta_1` (`id_pregunta`),
  KEY `FK_respuesta` (`respuesta`),
  CONSTRAINT `FK_id_pregunta_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`),
  CONSTRAINT `FK_respuesta` FOREIGN KEY (`respuesta`) REFERENCES `opcion` (`id_opcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo` (
  `id_tipo` tinyint(2) NOT NULL AUTO_INCREMENT,
  `tipo_usr` varchar(13) NOT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` VALUES (1,'Alumno'),(2,'Profesor'),(3,'Administrador');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `id_usuario` varchar(13) NOT NULL,
  `id_tipo` tinyint(2) NOT NULL,
  `password` text NOT NULL,
  `nacimiento` date NOT NULL,
  `correo` varchar(200) NOT NULL,
  `bloqueado` tinyint(1) DEFAULT '0',
  `extra` varchar(18) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `paterno` varchar(20) NOT NULL,
  `materno` varchar(20) NOT NULL,
  `sal` text,
  `perfil` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `FK_id_tipo` (`id_tipo`),
  CONSTRAINT `FK_id_tipo` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('319014216',1,'aZFYaAekvQKrDQd4du2evBRdijEP3Z5/ey1S5kyXNJoLIkI23qcHcCw6SYt0oaj6Mwsqbysl0S5N0tv2Fm3LNYj99x0zwGTxNSPl8k+0FII=','2020-06-05','uwu@example.com',0,'curp','Lenin','Pavón','Alvarez','H35af$&qLcBfkrK',NULL),('319014217',1,'uwu','2020-06-10','uwu@example.com',0,'pal','Lenin','Pavón','Alvarez',NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-25 11:08:19
