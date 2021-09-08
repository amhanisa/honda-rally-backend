-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2021 at 12:11 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rally`
--

-- --------------------------------------------------------

--
-- Table structure for table `config`
--

CREATE TABLE `config` (
  `setting` varchar(50) NOT NULL,
  `value` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `config`
--

INSERT INTO `config` (`setting`, `value`) VALUES
('enable_website', '0');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `team` varchar(255) DEFAULT NULL,
  `score` int(11) DEFAULT 0,
  `type` enum('MANAGER','CONSUMENT','MEDIA','COMMUNITY') NOT NULL,
  `last_update` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id`, `team`, `score`, `type`, `last_update`) VALUES
(57, '234', 0, 'MANAGER', '2021-09-08 04:16:22'),
(58, '123', 1000, 'MANAGER', '2021-09-08 04:17:29'),
(59, 'comunitas', 1000, 'COMMUNITY', '2021-09-08 05:42:42'),
(60, 'comunirt', 200, 'COMMUNITY', '2021-09-08 05:42:36'),
(61, 'konsum', 0, 'CONSUMENT', '2021-09-08 04:57:49'),
(62, 'makan', 0, 'CONSUMENT', '2021-09-08 04:57:52'),
(63, 'media', 0, 'MEDIA', '2021-09-08 04:57:57'),
(64, 'meddd', 0, 'MEDIA', '2021-09-08 04:58:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`setting`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
