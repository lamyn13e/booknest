-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 30, 2025 lúc 05:56 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `dbbansach`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book`
--

CREATE TABLE `book` (
  `book_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `description` text DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `price` double NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  `created_by` bigint(20) NOT NULL,
  `author` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `book`
--

INSERT INTO `book` (`book_id`, `created_date`, `description`, `img_url`, `modified_date`, `price`, `title`, `category_id`, `created_by`, `author`) VALUES
(1, NULL, 'Những tiên đoán về công nghệ và xã hội tương lai.', 'https://307a0e78.vws.vegacdn.vn/view/v2/image/img.fm_audio_book/0/0/0/2360.jpg?v=3&w=480&h=700', NULL, 199000, 'Lược sử tương lai', 1, 3, 'Văn Lương'),
(2, NULL, 'Hướng dẫn xây dựng ứng dụng enterprise với Spring Boot.', 'https://www.oreilly.com/api/v2/epubs/9781484287927/files/images/978-1-4842-8792-7_CoverFigure.jpg', NULL, 249000, 'Spring Boot từ cơ bản đến nâng cao', 2, 3, 'Xuân Ánh'),
(3, NULL, 'Phương pháp Lean Startup dành cho doanh nhân.', 'https://salt.tikicdn.com/ts/product/99/df/29/8ef1fb67e07d24037c10a128c9fe647c.jpg', NULL, 179000, 'Khởi nghiệp tinh gọn', 3, 3, 'Lương Chí Khang');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `category_id` bigint(20) NOT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`category_id`, `created_date`, `modified_date`, `name`) VALUES
(1, NULL, NULL, 'Khoa học viễn tưởng'),
(2, NULL, NULL, 'Công nghệ thông tin'),
(3, NULL, NULL, 'Kinh doanh & Khởi nghiệp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `order_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_amount` double DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`order_id`, `order_date`, `status`, `total_amount`, `user_id`) VALUES
(1, '2025-07-30 19:44:12', 'PAID', 647000, 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` bigint(20) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  `book_id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_items`
--

INSERT INTO `order_items` (`order_item_id`, `quantity`, `unit_price`, `book_id`, `order_id`) VALUES
(1, 1, 249000, 2, 1),
(2, 2, 199000, 1, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `review`
--

CREATE TABLE `review` (
  `review_id` bigint(20) NOT NULL,
  `comment` text DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `book_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `role`
--

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'ROLE_ADMIN'),
(2, 'ROLE_CUSTOMER'),
(3, 'ROLE_SELLER');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `mota` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`user_id`, `avatar`, `created_date`, `email`, `full_name`, `modified_date`, `mota`, `password`) VALUES
(1, NULL, NULL, 'admin@gmail.com', 'Mai Xuan Hieu', NULL, NULL, '$2a$10$KkBjzCspy73KS7L13JrHne6kC88U2bixSVvdYVM/ylyaKL5hILKZe'),
(2, NULL, NULL, 'customer@gmail.com', 'Guest', NULL, NULL, '$2a$10$LELJUqEIvfD0XASkyUL.q.IK1sqgFrOLmKx2EjBYEIakD89VE0y72'),
(3, NULL, NULL, 'seller@gmail.com', 'Hieu Xuan', NULL, NULL, '$2a$10$KkBjzCspy73KS7L13JrHne6kC88U2bixSVvdYVM/ylyaKL5hILKZe');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user_role`
--

CREATE TABLE `user_role` (
  `role_id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user_role`
--

INSERT INTO `user_role` (`role_id`, `user_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `FKam9riv8y6rjwkua1gapdfew4j` (`category_id`),
  ADD KEY `FKkjuhf186v8xfqqig9k2hsol5r` (`created_by`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `UK_46ccwnsi9409t36lurvtyljak` (`name`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `FKqscqcme08spiyt2guyqdj72eh` (`book_id`),
  ADD KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`);

--
-- Chỉ mục cho bảng `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `FK70yrt09r4r54tcgkrwbeqenbs` (`book_id`),
  ADD KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`);

--
-- Chỉ mục cho bảng `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Chỉ mục cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`role_id`,`user_id`),
  ADD KEY `FK859n2jvi8ivhui0rl0esws6o` (`user_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `book`
--
ALTER TABLE `book`
  MODIFY `book_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `review`
--
ALTER TABLE `review`
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `book`
--
ALTER TABLE `book`
  ADD CONSTRAINT `FKam9riv8y6rjwkua1gapdfew4j` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `FKkjuhf186v8xfqqig9k2hsol5r` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Các ràng buộc cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `FKqscqcme08spiyt2guyqdj72eh` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`);

--
-- Các ràng buộc cho bảng `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK70yrt09r4r54tcgkrwbeqenbs` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`),
  ADD CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Các ràng buộc cho bảng `user_role`
--
ALTER TABLE `user_role`
  ADD CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `FKa68196081fvovjhkek5m97n3y` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
