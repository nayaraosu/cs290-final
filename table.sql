DROP TABLE IF EXISTS `users`;
  CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `hash` char(60) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


DROP TABLE IF EXISTS `routes`;
CREATE TABLE IF NOT EXISTS `routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11),
  `name` varchar(255) NOT NULL,
  `link` text,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uid`) REFERENCES users (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE IF NOT EXISTS `locations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` text,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uid`) REFERENCES users (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

DROP TABLE IF EXISTS `ride`;
CREATE TABLE IF NOT EXISTS `ride` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `ride_date` datetime DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  `lid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`uid`) REFERENCES users (`id`),
  FOREIGN KEY (`rid`) REFERENCES routes (`id`),
  FOREIGN KEY (`lid`) REFERENCES locations (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



CREATE TABLE IF NOT EXISTS `user_roles` (
  `uid` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  
  FOREIGN KEY  (`uid`) REFERENCES users (`id`),
  FOREIGN KEY (`role_id`) REFERENCES roles (`id`)
  
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


