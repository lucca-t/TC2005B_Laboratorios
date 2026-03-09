-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lab17
-- ------------------------------------------------------
-- Server version	9.5.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ 'f3eccb67-c025-11f0-98d7-00410e2c03ac:1-179';

--
-- Table structure for table `personajes`
--

DROP TABLE IF EXISTS `personajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo_id` int NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tipo_id` (`tipo_id`),
  CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes`
--

LOCK TABLES `personajes` WRITE;
/*!40000 ALTER TABLE `personajes` DISABLE KEYS */;
INSERT INTO `personajes` VALUES (1,'Logan Roy','Founder and CEO of Waystar Royco, a ruthless media mogul who rules his family and empire with an iron fist. His manipulative nature and refusal to cede control drive the central conflict of the series.',1,'https://static.wikia.nocookie.net/succession/images/f/f2/LoganRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613094149','2026-03-05 18:18:37'),(2,'Kendall Roy','Logan\'s eldest son and perpetual heir apparent, caught between ambition and insecurity. He oscillates between attempting hostile takeovers of Waystar and crawling back to his father\'s approval.',2,'https://static.wikia.nocookie.net/succession/images/0/09/KendallRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613093831','2026-03-05 18:18:37'),(3,'Roman Roy','The youngest Roy son, hiding sharp instincts behind a wall of irreverent humor and self-sabotage. He craves his father\'s love more than the throne but would never admit it.',3,'https://static.wikia.nocookie.net/succession/images/e/e8/RomanRoyCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230617051956','2026-03-05 18:18:37'),(4,'Siobhan \'Shiv\' Roy','Logan\'s only daughter, a political operative who pivots to the family business believing she can outmaneuver her brothers. Her confidence often blinds her to how little power she actually holds.',4,'https://static.wikia.nocookie.net/succession/images/8/85/SiobhanRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230614211118','2026-03-05 18:18:37'),(5,'Greg Hirsch','Logan\'s grand-nephew, a bumbling outsider who stumbles into the Roy orbit and quietly accumulates leverage. His apparent naivete masks a surprising talent for self-preservation.',3,'https://static.wikia.nocookie.net/succession/images/5/5e/GregHirschCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230622215700','2026-03-05 18:18:37');
/*!40000 ALTER TABLE `personajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `character` varchar(100) NOT NULL,
  `text` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (1,'Logan Roy','I love you but you are not serious people.'),(2,'Kendall Roy','I am the eldest boy.'),(3,'Roman Roy','Everything is always about everything, all the time.'),(4,'Siobhan Roy','I don\'t get embarrassed.'),(5,'Greg Hirsch','You can\'t make a Tomelette without breaking some Greggs.'),(6,'Logan Roy','What you\'re feeling right now, that\'s the pain of losing.'),(7,'Kendall Roy','We are nothing.');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` VALUES (1,'Patriarch'),(2,'Heir'),(3,'Wildcard'),(4,'Strategist');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-05 12:22:08
