-- MySQL dump 10.13  Distrib 5.7.37, for Linux (x86_64)
--
-- Host: localhost    Database: tims
-- ------------------------------------------------------
-- Server version	5.7.37-0ubuntu0.18.04.1

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
-- Table structure for table `Operators`
--

DROP TABLE IF EXISTS `Operators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Operators` (
  `id` varchar(30) NOT NULL,
  `operatorName` varchar(30) DEFAULT NULL,
  `iban` varchar(34) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Operators`
--

LOCK TABLES `Operators` WRITE;
/*!40000 ALTER TABLE `Operators` DISABLE KEYS */;
INSERT INTO `Operators` VALUES ('KO07','egnatia','A000 1111 2222 3333');
/*!40000 ALTER TABLE `Operators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Passes`
--

DROP TABLE IF EXISTS `Passes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Passes` (
  `id` varchar(30) NOT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  `charge` double DEFAULT NULL,
  `OperatorId` varchar(30) DEFAULT NULL,
  `StationId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OperatorId` (`OperatorId`),
  KEY `StationId` (`StationId`),
  CONSTRAINT `Passes_ibfk_1` FOREIGN KEY (`OperatorId`) REFERENCES `Operators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Passes_ibfk_2` FOREIGN KEY (`StationId`) REFERENCES `Stations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Passes`
--

LOCK TABLES `Passes` WRITE;
/*!40000 ALTER TABLE `Passes` DISABLE KEYS */;
/*!40000 ALTER TABLE `Passes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Stations`
--

DROP TABLE IF EXISTS `Stations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Stations` (
  `id` varchar(30) NOT NULL,
  `stationName` varchar(30) DEFAULT NULL,
  `OperatorId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OperatorId` (`OperatorId`),
  CONSTRAINT `Stations_ibfk_1` FOREIGN KEY (`OperatorId`) REFERENCES `Operators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Stations`
--

LOCK TABLES `Stations` WRITE;
/*!40000 ALTER TABLE `Stations` DISABLE KEYS */;
/*!40000 ALTER TABLE `Stations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags`
--

DROP TABLE IF EXISTS `Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags` (
  `id` varchar(30) NOT NULL,
  `credits` double DEFAULT NULL,
  `OperatorId` varchar(30) DEFAULT NULL,
  `VehicleId` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `OperatorId` (`OperatorId`),
  KEY `VehicleId` (`VehicleId`),
  CONSTRAINT `Tags_ibfk_1` FOREIGN KEY (`OperatorId`) REFERENCES `Operators` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Tags_ibfk_2` FOREIGN KEY (`VehicleId`) REFERENCES `Vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags`
--

LOCK TABLES `Tags` WRITE;
/*!40000 ALTER TABLE `Tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `Tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vehicles`
--

DROP TABLE IF EXISTS `Vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Vehicles` (
  `id` varchar(30) NOT NULL,
  `licenseYear` int(11) DEFAULT NULL,
  `licensePlate` varchar(8) DEFAULT NULL,
  `licenseCountry` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vehicles`
--

LOCK TABLES `Vehicles` WRITE;
/*!40000 ALTER TABLE `Vehicles` DISABLE KEYS */;
/*!40000 ALTER TABLE `Vehicles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-05  2:21:49
