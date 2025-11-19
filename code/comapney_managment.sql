-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 14, 2025 at 07:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `comapney_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `companeys`
--

CREATE TABLE `companeys` (
  `id` int(11) NOT NULL,
  `companeyName` varchar(255) DEFAULT NULL,
  `companeyEmail` varchar(255) DEFAULT NULL,
  `companeyPhone` varchar(255) DEFAULT NULL,
  `companeyAddress` varchar(255) DEFAULT NULL,
  `companeyDoc` varchar(255) DEFAULT NULL,
  `user` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companeys`
--

INSERT INTO `companeys` (`id`, `companeyName`, `companeyEmail`, `companeyPhone`, `companeyAddress`, `companeyDoc`, `user`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Codiant', 'codiant@gmail.com', '8989898989', 'Indore', '1763146102476-Aarti Makwana Resume.pdf', 1, '2025-11-14 18:49:12', '2025-11-14 18:49:12', NULL),
(2, 'Creative AI', 'creative@gmail.com', '8987487895', 'Indore', '1763146283362-Aarti Makwana Resume (1).pdf', 2, '2025-11-14 18:51:46', '2025-11-14 18:51:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `companeyusers`
--

CREATE TABLE `companeyusers` (
  `id` int(11) NOT NULL,
  `companeyId` int(11) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `companeyusers`
--

INSERT INTO `companeyusers` (`id`, `companeyId`, `firstName`, `lastName`, `email`, `address`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Andrew', 'andy', 'andrew@gmail.com', 'Indore', '1763146129014-images.jpg', '2025-11-14 18:49:12', '2025-11-14 18:49:12'),
(2, 1, 'Methew', 'meth', 'methew@gmail.com', 'Indore', '1763146149741-forest1.jpg', '2025-11-14 18:49:12', '2025-11-14 18:49:12'),
(3, 2, 'Andrew', 'meher', 'andrew@gmail.com', 'Indore', '1763146304815-images.jpg', '2025-11-14 18:51:46', '2025-11-14 18:51:46');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `user`, `token`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzYzMTQ2MDc2LCJleHAiOjE3NjMxNTMyNzZ9.2xorD0umjY35DadNFHoHYR9e61shMaZzTVkz1lE2-Tc', '2025-11-14 18:47:56', '2025-11-14 18:47:56'),
(2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzYzMTQ2MjYwLCJleHAiOjE3NjMxNTM0NjB9.beOZL9Qlj6VtHVFT0dSTiiPtQ8SQr08656PgkL4bTQE', '2025-11-14 18:51:00', '2025-11-14 18:51:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `email`, `password`, `mobile`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Aarti Makwana', 'Aarti', 'aartimakwana2408@gmail.com', '$2a$10$PuzV2IafAbX9zjQDdcD39uavCav.oXuU.oQvfm7llQjqR171.GRuW', NULL, 'user', '2025-11-14 18:47:45', '2025-11-14 18:47:45'),
(2, 'Andrew kingston', 'Andrew', 'andrew@gmail.com', '$2a$10$5L64mQfx/g1Plpc.tgFjc.uH.3DltuhDa96lastAyTgwW.SrceXky', NULL, 'user', '2025-11-14 18:50:53', '2025-11-14 18:50:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `companeys`
--
ALTER TABLE `companeys`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companeyusers`
--
ALTER TABLE `companeyusers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `companeyId` (`companeyId`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companeys`
--
ALTER TABLE `companeys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `companeyusers`
--
ALTER TABLE `companeyusers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `companeyusers`
--
ALTER TABLE `companeyusers`
  ADD CONSTRAINT `companeyusers_ibfk_1` FOREIGN KEY (`companeyId`) REFERENCES `companeys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
