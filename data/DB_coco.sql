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
  PRIMARY KEY (`id_contestada`),
  KEY `FK_id_usuario` (`id_usuario`),
  KEY `FK_id_form` (`id_form`),
  CONSTRAINT `FK_id_form` FOREIGN KEY (`id_form`) REFERENCES `formulario` (`id_form`),
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
  PRIMARY KEY (`id_form`),
  KEY `FK_id_categoria` (`id_categoria`),
  KEY `FK_rango` (`rango`),
  CONSTRAINT `FK_id_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  CONSTRAINT `FK_rango` FOREIGN KEY (`rango`) REFERENCES `rango` (`id_rango`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcion`
--

DROP TABLE IF EXISTS `opcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opcion` (
  `id_opcion` int(32) NOT NULL AUTO_INCREMENT,
  `id_pregunta` int(20) NOT NULL,
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
/*!40000 ALTER TABLE `opcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta` (
  `id_pregunta` int(20) NOT NULL AUTO_INCREMENT,
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
  `id_pregunta` int(20) NOT NULL,
  `respuesta` int(32) NOT NULL,
  PRIMARY KEY (`id_respuesta`),
  KEY `id_pregunta` (`id_pregunta`),
  KEY `FK_respuesta` (`respuesta`),
  CONSTRAINT `FK_respuesta` FOREIGN KEY (`respuesta`) REFERENCES `opcion` (`id_opcion`),
  CONSTRAINT `respuesta_ibfk_1` FOREIGN KEY (`id_pregunta`) REFERENCES `pregunta` (`id_pregunta`)
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
INSERT INTO `usuario` VALUES ('319014217',1,'uwu','2020-06-10','uwu@example.com',0,'pal','Lenin','Pavón','Alvarez',NULL);
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

-- Dump completed on 2020-06-21 16:06:59
