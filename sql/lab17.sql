-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2026 at 12:53 AM
-- Server version: 12.2.2-MariaDB
-- PHP Version: 8.5.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lab17`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`luccat_db`@`localhost` PROCEDURE `sp_get_user_auth_context` (IN `p_username` VARCHAR(50))   BEGIN
SELECT u.username, u.nombre, u.password, u.correo
FROM usuarios u
WHERE u.username = p_username
LIMIT 1;

SELECT DISTINCT pr.nombre_privilegio
FROM tiene t
INNER JOIN posee p ON p.id_rol = t.id_rol
INNER JOIN privilegios pr ON pr.id = p.id_privilegio
WHERE t.id_usuario = p_username;
END$$

CREATE DEFINER=`luccat_db`@`localhost` PROCEDURE `sp_list_personajes` (IN `p_nombre` VARCHAR(100))   BEGIN
IF p_nombre IS NULL OR TRIM(p_nombre) = '' THEN
SELECT p.id, p.nombre, p.descripcion, t.tipo, p.imagen
FROM personajes p
INNER JOIN tipo t ON t.id = p.tipo_id
ORDER BY p.nombre;
ELSE
SELECT p.id, p.nombre, p.descripcion, t.tipo, p.imagen
FROM personajes p
INNER JOIN tipo t ON t.id = p.tipo_id
WHERE p.nombre LIKE CONCAT('%', p_nombre, '%')
ORDER BY p.nombre;
END IF;
END$$

CREATE DEFINER=`luccat_db`@`localhost` PROCEDURE `sp_register_user` (IN `p_username` VARCHAR(50), IN `p_nombre` VARCHAR(100), IN `p_password_hash` VARCHAR(500), IN `p_correo` VARCHAR(100), IN `p_default_role_id` INT)   BEGIN
DECLARE v_exists INT DEFAULT 0;
DECLARE v_role_exists INT DEFAULT 0;

DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
ROLLBACK;
SELECT 0 AS ok, 'REGISTER_FAILED' AS message;
END;

START TRANSACTION;

SELECT COUNT(*) INTO v_exists
FROM usuarios
WHERE username = p_username;

IF v_exists > 0 THEN
ROLLBACK;
SELECT 0 AS ok, 'USERNAME_EXISTS' AS message;
ELSE
SELECT COUNT(*) INTO v_role_exists
FROM roles
WHERE id = p_default_role_id;

IF v_role_exists = 0 THEN
ROLLBACK;
SELECT 0 AS ok, 'ROLE_NOT_FOUND' AS message;
ELSE
INSERT INTO usuarios(username, nombre, password, correo)
VALUES (p_username, p_nombre, p_password_hash, p_correo);

INSERT INTO tiene(id_usuario, id_rol)
VALUES (p_username, p_default_role_id);

COMMIT;
SELECT 1 AS ok, 'USER_CREATED' AS message;
END IF;
END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `personajes`
--

CREATE TABLE `personajes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `imagen` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `personajes`
--

INSERT INTO `personajes` (`id`, `nombre`, `descripcion`, `tipo_id`, `imagen`, `created_at`) VALUES
(1, 'Logan Roy', 'Founder and CEO of Waystar Royco, a ruthless media mogul who rules his family and empire with an iron fist. His manipulative nature and refusal to cede control drive the central conflict of the series.', 1, 'https://static.wikia.nocookie.net/succession/images/f/f2/LoganRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613094149', '2026-03-05 18:18:37'),
(2, 'Kendall Roy', 'Logan\'s eldest son and perpetual heir apparent, caught between ambition and insecurity. He oscillates between attempting hostile takeovers of Waystar and crawling back to his father\'s approval.', 2, 'https://static.wikia.nocookie.net/succession/images/0/09/KendallRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230613093831', '2026-03-05 18:18:37'),
(3, 'Roman Roy', 'The youngest Roy son, hiding sharp instincts behind a wall of irreverent humor and self-sabotage. He craves his father\'s love more than the throne but would never admit it.', 3, 'https://static.wikia.nocookie.net/succession/images/e/e8/RomanRoyCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230617051956', '2026-03-05 18:18:37'),
(4, 'Siobhan \'Shiv\' Roy', 'Logan\'s only daughter, a political operative who pivots to the family business believing she can outmaneuver her brothers. Her confidence often blinds her to how little power she actually holds.', 4, 'https://static.wikia.nocookie.net/succession/images/8/85/SiobhanRoyCharacterInfobox.jpg/revision/latest/scale-to-width-down/1000?cb=20230614211118', '2026-03-05 18:18:37'),
(5, 'Greg Hirsch', 'Logan\'s grand-nephew, a bumbling outsider who stumbles into the Roy orbit and quietly accumulates leverage. His apparent naivete masks a surprising talent for self-preservation.', 3, 'https://static.wikia.nocookie.net/succession/images/5/5e/GregHirschCharacterInfobox.png/revision/latest/scale-to-width-down/1000?cb=20230622215700', '2026-03-05 18:18:37'),
(6, 'Tom Wambsgans', 'Shiv\'s hubby', 4, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fsuccession%2Fimages%2Fc%2Fc6%2FTomWambsgansCharacterInfobox.png%2Frevision%2Flatest%3Fcb%3D20230622124627&f=1&nofb=1&ipt=06b0f3914b3cd15f3157a475337aa15b9fc74ca6f8b8ed6afbe407bf3dcedfba', '2026-03-09 16:02:42'),
(7, '', '', 3, '', '2026-03-09 17:46:27'),
(8, 'Gerri', '(spoilers) she gets freaky w roman', 4, '/uploads/1774331455074-gerri.png', '2026-03-24 05:50:55');

-- --------------------------------------------------------

--
-- Table structure for table `posee`
--

CREATE TABLE `posee` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `posee`
--

INSERT INTO `posee` (`id_rol`, `id_privilegio`, `created_at`) VALUES
(1, 1, '2026-03-12 06:00:22'),
(2, 1, '2026-03-12 06:00:22'),
(2, 2, '2026-03-12 06:00:22');

-- --------------------------------------------------------

--
-- Table structure for table `privilegios`
--

CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL,
  `nombre_privilegio` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `privilegios`
--

INSERT INTO `privilegios` (`id`, `nombre_privilegio`, `created_at`) VALUES
(1, 'ver_personajes', '2026-03-12 05:58:25'),
(2, 'crear_personajes', '2026-03-12 05:58:25');

-- --------------------------------------------------------

--
-- Table structure for table `quotes`
--

CREATE TABLE `quotes` (
  `id` int(11) NOT NULL,
  `character` varchar(100) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `quotes`
--

INSERT INTO `quotes` (`id`, `character`, `text`) VALUES
(1, 'Logan Roy', 'I love you but you are not serious people.'),
(2, 'Kendall Roy', 'I am the eldest boy.'),
(3, 'Roman Roy', 'Everything is always about everything, all the time.'),
(4, 'Siobhan Roy', 'I don\'t get embarrassed.'),
(5, 'Greg Hirsch', 'You can\'t make a Tomelette without breaking some Greggs.'),
(6, 'Logan Roy', 'What you\'re feeling right now, that\'s the pain of losing.'),
(7, 'Kendall Roy', 'We are nothing.');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nombre_rol`, `created_at`) VALUES
(1, 'invocador', '2026-03-12 05:58:19'),
(2, 'administrador', '2026-03-12 05:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `tiene`
--

CREATE TABLE `tiene` (
  `id_usuario` varchar(50) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tiene`
--

INSERT INTO `tiene` (`id_usuario`, `id_rol`, `created_at`) VALUES
('lalo', 1, '2026-03-12 06:03:15'),
('oompalucca', 2, '2026-03-12 06:00:28'),
('test_sp_user', 1, '2026-04-08 00:52:24');

-- --------------------------------------------------------

--
-- Table structure for table `tipo`
--

CREATE TABLE `tipo` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tipo`
--

INSERT INTO `tipo` (`id`, `tipo`) VALUES
(1, 'Patriarch'),
(2, 'Heir'),
(3, 'Wildcard'),
(4, 'Strategist');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `username` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`username`, `nombre`, `password`, `correo`, `created_at`) VALUES
('lalo', 'Eduardo Juárez', '$2b$12$UJ2byG01W5wdq0DZscYtquEzNN/t9DeMJUjb/B85g3UMi92/za5ty', 'lalo@aol.com', '2026-03-12 06:02:55'),
('oompalucca', 'Lucca', '$2b$12$vCJt3oWHUoN.UrIizmDu0uapMar4xa8UbNfIiuvhUr5o6ISGXqw5C', 'oompalucca@gmail.com', '2026-03-10 04:06:23'),
('test_sp_user', 'Test User', '$2b$12$dummyhash', 'test@example.com', '2026-04-08 00:52:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_id` (`tipo_id`);

--
-- Indexes for table `posee`
--
ALTER TABLE `posee`
  ADD PRIMARY KEY (`id_rol`,`id_privilegio`),
  ADD KEY `id_privilegio` (`id_privilegio`);

--
-- Indexes for table `privilegios`
--
ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `quotes`
--
ALTER TABLE `quotes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id_usuario`,`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indexes for table `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `personajes`
--
ALTER TABLE `personajes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `privilegios`
--
ALTER TABLE `privilegios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `quotes`
--
ALTER TABLE `quotes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tipo`
--
ALTER TABLE `tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `tipo` (`id`);

--
-- Constraints for table `posee`
--
ALTER TABLE `posee`
  ADD CONSTRAINT `posee_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
  ADD CONSTRAINT `posee_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`);

--
-- Constraints for table `tiene`
--
ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`username`),
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
