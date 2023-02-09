CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullName` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `account` WRITE;
INSERT INTO `account` VALUES (1,NULL,'waqas@email.com','$2b$10$ZYfz3X7IO5WdcUqw/5F7M.VlNtXrV7O5O9vxBZ10xrT10c3BWGJNq'),(2,NULL,'adf@sdfasd','$2b$10$ch8Pf7.738qM8ya5PrWuUOE/h1.cwkSLPV..e.UXA/3BuYx1wbVr2');

UNLOCK TABLES;



DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `phone` varchar(500) DEFAULT NULL,
  `note` varchar(5000) DEFAULT NULL,
  `todaysPickup` varchar(500) DEFAULT NULL,
  `meals` varchar(500) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `customer` WRITE;INSERT INTO `customer` VALUES (1,'Aakash','aakash@email.com','+91254546','adsfladskjfkdashjkfhasdkjfsadl','10','5',1),(2,'Salman','asdf@sadfas','asdfasd','asdf','10','10',1),(3,'dasfkasdhfh','dashfkjlah@dasjkflk','46546546','asdhfkjlads','10','10',NULL);

UNLOCK TABLES;


DROP TABLE IF EXISTS `pickups`;

CREATE TABLE `pickups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customerid` int DEFAULT NULL,
  `pickup` int DEFAULT NULL,
  `enrtydate` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `pickups` WRITE;
/*!40000 ALTER TABLE `pickups` DISABLE KEYS */;
INSERT INTO `pickups` VALUES (1,1,3,'2023-02-09 17:54:00'),(2,1,4,'2023-02-09 22:54:00');
/*!40000 ALTER TABLE `pickups` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_account`(
in _email varchar(500),
in _password varchar(1000)
)
BEGIN
INSERT INTO `account`(`email`,`password`)values(_email,_password);
select * from `account` where id =last_insert_id();
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_customer`(
in _name varchar(500),
in _email varchar(500),
in _phone varchar(500),
in _note varchar(5000),
in _todaysPickup varchar(500),
in _meals varchar(500),
in _userid int

)
BEGIN
INSERT INTO `customer`(`name`,`email`,`phone`,`note`,`todaysPickup`,`meals`,`userid`)
VALUES(_name,_email,_phone,_note,_todaysPickup,_meals,_userid);
select * from `customer` where id =last_insert_id();

END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_pickup`(
in _customerid int,
in _number int
)
BEGIN
INSERT INTO `pickups`
(`customerid`,`pickup`,`enrtydate`)VALUES
(_customerid,_number,now());
select * from  `pickups` where customerid =_customerid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_customers`(
in _userid int
)
BEGIN
select * from `customer` where userid = _userid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_pickups`(
in _cid int
)
BEGIN
select * from pickups where customerid = _cid;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_get_user_by_email`(
in _email varchar(500)
)
BEGIN
select * from `account` where email = _email;
END ;;
DELIMITER ;
;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_customer`(
in _name varchar(500),
in _email varchar(500),
in _phone varchar(500),
in _note varchar(5000),
in _todaysPickup varchar(500),
in _meals varchar(500),
in _id int

)
BEGIN
UPDATE `customer`
SET
`name` = _name,
`email` = _email,
`phone` = _phone,
`note` = _note,
`todaysPickup` = _todaysPickup,
`meals` = _meals
WHERE `id` = _id;
select * from `customer` where id = _id;
END ;;
DELIMITER ;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_pickups`(
in _id int,
in _cid int,
in _num int,
in _date datetime

)
BEGIN
UPDATE `pickups`
SET
`customerid` = _cid,
`pickup` = _num,
`enrtydate` = _date
WHERE `id` = _id;
select * from  `pickups` where customerid =_cid;
END ;;
DELIMITER ;

