CREATE TABLE   IF NOT EXISTS  `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` NOT NULL varchar(255) DEFAULT NULL,
  `name` NOT NULL varchar(255) DEFAULT NULL,
  `major` varchar(255) DEFAULT NULL, -- 用户专业领域
  `marked` longtext DEFAULT NULL, -- 用户已经打过的标签
  `create_time` varchar(20) DEFAULT NULL,
  `modified_time` varchar(20) DEFAULT NULL,
  `score` int(11) DEFAULT 0, -- 用户积分
  `level` int(11) DEFAULT 0, -- 用户等级
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user_info` set name='admin001', email='admin001@example.com', password='123456';
