-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2023 at 05:43 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmarathon`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_hero`
--

CREATE TABLE `about_hero` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `paragraph` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `about_hero`
--

INSERT INTO `about_hero` (`id`, `file`, `title`, `description`, `paragraph`) VALUES
(1, 'manager/uploads/about_hero/1694447157mission_statement.jpg', 'Our Mission', 'The Accra Marathon promotes sportsmanship, healthy living and community engagement in celebrating the African spirit\r\n', 'We are dedicated to fostering sportsmanship, promoting healthy lifestyles, and fostering community engagement. By celebrating the vibrant African spirit, we empower individuals to thrive and unite through the powerÂ ofÂ sports.');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `profile` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access_granted` int(1) NOT NULL DEFAULT 0,
  `super_admin` int(1) NOT NULL DEFAULT 0,
  `default_password_set` int(1) NOT NULL DEFAULT 0,
  `main` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `fullname`, `username`, `profile`, `password`, `access_granted`, `super_admin`, `default_password_set`, `main`) VALUES
(1, 'adugyamfik33@gmail.com', 'Kwabena Adu Gyamfi', 'kadugyamfi', 'manager/uploads/profile/1694516383IMG-20190520-WA0063.jpg', '12345', 1, 1, 0, 1),
(2, 'msquireobeng@gmail.com', 'Michael Obeng', 'msquire', 'manager/uploads/profile/1694034089desktop_header_logo.png', '12345', 1, 1, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `atheletes`
--

CREATE TABLE `atheletes` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nationality` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `emergency_contact_name` varchar(255) NOT NULL,
  `emergency_contact_number` varchar(20) NOT NULL,
  `race_category_id` int(11) NOT NULL,
  `any_medical_condition` varchar(10) NOT NULL,
  `medical_info` text DEFAULT NULL,
  `expected_finish_time` varchar(50) DEFAULT NULL,
  `heard_about_race` varchar(50) DEFAULT NULL,
  `first_marathon` varchar(10) DEFAULT NULL,
  `yearly_race_count` varchar(50) DEFAULT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `racers_id` varchar(255) DEFAULT 'N/A',
  `status` varchar(50) NOT NULL DEFAULT 'registered',
  `race_date_id` int(11) NOT NULL,
  `race_completed` int(1) NOT NULL DEFAULT 0,
  `chip_number` varchar(255) NOT NULL DEFAULT 'N/A',
  `finish_time` varchar(255) NOT NULL DEFAULT 'N/A',
  `staff_status` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `summary` text NOT NULL,
  `content` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `blog_type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`) VALUES
(2, 'What is Accra Marathon ?', 'It is an annual marathon held in Ghana by the Dansoman Keep Fit Club.'),
(4, 'What is a marathon?', 'A marathon is a long-distance running race that covers a distance of 26.2 miles or 42.195 kilometers. It is one of the most popular and challenging races in the world.'),
(5, ' When and where is the marathon taking place?', 'The date and location of a marathon can vary, so be sure to check the event\'s official website or registration materials for this information.'),
(6, 'How do I register for a marathon?', 'Registration details are typically provided on the official marathon website. You\'ll need to fill out an online registration form, pay the registration fee, and follow any specific instructions provided.'),
(7, 'What is the average time it takes to complete a marathon?', 'The average time to complete a marathon varies widely depending on individual fitness levels, experience, and training. On average, it can take anywhere from 3 to 6 hours.'),
(8, 'Do I need to be an experienced runner to participate in a marathon?', 'While some marathons have entry requirements, many are open to both beginners and experienced runners. However, it\'s important to have a proper training plan in place to ensure your safety and success.');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `caption` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `file`, `caption`) VALUES
(4, 'manager/uploads/gallery/1698144953AI-medical-technology_G_1489956013-860x513.jpg', 'Medical Screening'),
(5, 'manager/uploads/gallery/1698144953what-is-subjective-data.jpg', 'Medical Screening'),
(6, 'manager/uploads/gallery/1698144953doctor-explaining-objective-subjective-data-results-1024x536 (1).jpeg', 'Medical Screening'),
(7, 'manager/uploads/gallery/1698144953doctor-explaining-objective-subjective-data-results-1024x536.webp', 'Medical Screening'),
(8, 'manager/uploads/gallery/1698144953Patient-Information-Landing-Page-Image.jpeg', 'Medical Screening'),
(9, 'manager/uploads/gallery/1698144953header_ba_patient_hd.jpg', 'Medical Screening'),
(10, 'manager/uploads/gallery/1698145158doctor-explaining-objective-subjective-data-results-1024x536.webp', 'Patient Information'),
(11, 'manager/uploads/gallery/1698145158what-is-subjective-data.jpg', 'Patient Information'),
(13, 'manager/uploads/gallery/1698145189what-is-subjective-data.jpg', 'Hello'),
(15, 'manager/uploads/gallery/1698152206image-028.png', 'Electrilab Technology'),
(19, 'manager/uploads/gallery/1698152206image-007.png', 'Electrilab Technology'),
(20, 'manager/uploads/gallery/1698152206image-002.png', 'Electrilab Technology');

-- --------------------------------------------------------

--
-- Table structure for table `home_hero`
--

CREATE TABLE `home_hero` (
  `id` int(11) NOT NULL,
  `background_color` varchar(255) NOT NULL,
  `slide1_image` varchar(255) NOT NULL,
  `slide2_image` varchar(255) NOT NULL,
  `slide3_image` varchar(255) NOT NULL,
  `slide1_text_right` text NOT NULL,
  `slide1_text_left` text NOT NULL,
  `slide2_text_right` text NOT NULL,
  `slide2_text_left` text NOT NULL,
  `slide3_text_right` text NOT NULL,
  `slide3_text_left` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `home_hero`
--

INSERT INTO `home_hero` (`id`, `background_color`, `slide1_image`, `slide2_image`, `slide3_image`, `slide1_text_right`, `slide1_text_left`, `slide2_text_right`, `slide2_text_left`, `slide3_text_right`, `slide3_text_left`) VALUES
(1, '#00a9ac', 'manager/uploads/home_hero/1694447037slider-1.png', 'manager/uploads/home_hero/1693916272download.jpeg', 'manager/uploads/home_hero/1693916272nikedrippingswoosh_600x.webp', 'find your', 'fast', 'lets run', 'burn fats', 'we rise', 'in the morning');

-- --------------------------------------------------------

--
-- Table structure for table `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `location` text NOT NULL,
  `facebook_url` varchar(255) NOT NULL,
  `instagram_url` varchar(255) NOT NULL,
  `twitter_url` varchar(255) NOT NULL,
  `youtube_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `info`
--

INSERT INTO `info` (`id`, `email`, `phone`, `location`, `facebook_url`, `instagram_url`, `twitter_url`, `youtube_url`) VALUES
(1, 'fnbmarathon@accra.gh', '0123456789', '562 Nyonmotso St, Accra', 'https://web.facebook.com/dansomankeepfitclub', 'https://www.instagram.com/dkfc_rats_rabbits/', 'https://www.instagram.com/dkfc_rats_rabbits/', 'https://www.instagram.com/dkfc_rats_rabbits/');

-- --------------------------------------------------------

--
-- Table structure for table `race_category`
--

CREATE TABLE `race_category` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `price` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `race_category`
--

INSERT INTO `race_category` (`id`, `name`, `price`) VALUES
(2, 'Civil Service ', '500.00'),
(3, 'Corperate', '150.00'),
(4, 'Juniors', '20.00');

-- --------------------------------------------------------

--
-- Table structure for table `race_date`
--

CREATE TABLE `race_date` (
  `id` int(11) NOT NULL,
  `date` varchar(100) NOT NULL,
  `done` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `race_date`
--

INSERT INTO `race_date` (`id`, `date`, `done`) VALUES
(1, 'Nov 11,2023 12:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_hero`
--

CREATE TABLE `register_hero` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `route_hero`
--

CREATE TABLE `route_hero` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `paragraph` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `route_hero`
--

INSERT INTO `route_hero` (`id`, `file`, `title`, `description`, `paragraph`) VALUES
(1, 'manager/uploads/route_hero/1694447392map.jpg', 'Map with route', 'The route begins on the East coast of the city at THE POINT in Nungua, near the Junction Mall. It then passes through the central business district in Makola and the most densely populated areas of Accra. The route proceeds to Kaneshie Market Street, and concludes in the southwest at DansomanÂ Estate.', 'Over the years, attempts were made to finish the race at the Accra Sports Stadium or the Black Star Square; but the end result had been very poor patronage of the closing ceremonies, which climaxesÂ theÂ event.');

-- --------------------------------------------------------

--
-- Table structure for table `sponsors`
--

CREATE TABLE `sponsors` (
  `id` int(11) NOT NULL,
  `file` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  `tag` varchar(150) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

CREATE TABLE `video` (
  `id` int(11) NOT NULL,
  `video_url` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_hero`
--
ALTER TABLE `about_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `atheletes`
--
ALTER TABLE `atheletes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_hero`
--
ALTER TABLE `home_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `race_category`
--
ALTER TABLE `race_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `race_date`
--
ALTER TABLE `race_date`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register_hero`
--
ALTER TABLE `register_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `route_hero`
--
ALTER TABLE `route_hero`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sponsors`
--
ALTER TABLE `sponsors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_hero`
--
ALTER TABLE `about_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `atheletes`
--
ALTER TABLE `atheletes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `home_hero`
--
ALTER TABLE `home_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `race_category`
--
ALTER TABLE `race_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `race_date`
--
ALTER TABLE `race_date`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `register_hero`
--
ALTER TABLE `register_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `route_hero`
--
ALTER TABLE `route_hero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sponsors`
--
ALTER TABLE `sponsors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
