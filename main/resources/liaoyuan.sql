/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : liaoyuan

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-09-17 14:27:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `a_name` varchar(255) DEFAULT NULL,
  `a_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('2', 'admin', 'admin');

-- ----------------------------
-- Table structure for `car`
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(255) DEFAULT NULL,
  `dm_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('2', 'ML0001', '2');
INSERT INTO `car` VALUES ('3', 'kke004', '2');
INSERT INTO `car` VALUES ('5', 'sdfs222', '1');
INSERT INTO `car` VALUES ('6', 'sdfsd ', '3');
INSERT INTO `car` VALUES ('8', 'MK1232', '1');
INSERT INTO `car` VALUES ('9', 'sdfsdf', '1');

-- ----------------------------
-- Table structure for `car_contract`
-- ----------------------------
DROP TABLE IF EXISTS `car_contract`;
CREATE TABLE `car_contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '合同唯一识别',
  `numNo` varchar(100) DEFAULT '' COMMENT '合同编号',
  `coalCard` varchar(50) DEFAULT NULL COMMENT '煤卡',
  `receiveName` varchar(100) DEFAULT '' COMMENT '客户名称 收货单位',
  `wells` varchar(100) DEFAULT NULL COMMENT '井区',
  `name` varchar(100) DEFAULT NULL COMMENT '煤炭种类，下拉形式',
  `orderCount` double DEFAULT '0' COMMENT '签订总量，也叫订单总量',
  `unitPrice` double DEFAULT '0' COMMENT '单价',
  `sendCount` double DEFAULT '0' COMMENT '已发运量',
  `inputPerson` varchar(100) DEFAULT NULL COMMENT '录入人',
  `usePerson` varchar(100) DEFAULT NULL COMMENT '经办人',
  `financePerson` varchar(100) DEFAULT NULL COMMENT '财务操作人',
  `settlement` varchar(100) DEFAULT NULL COMMENT '结算单位',
  `fund` varchar(100) DEFAULT NULL COMMENT '资金方式',
  `taxation` double DEFAULT NULL COMMENT '税金',
  `contractType` varchar(100) DEFAULT '3' COMMENT '合同类型，分为1公用煤，2零销煤，3其他，4职工煤',
  `forkliftFee` varchar(50) DEFAULT '0' COMMENT '铲车费，包括1包括铲车费，0不包括',
  `magneticCard` int(11) DEFAULT '0' COMMENT '磁卡编号,默认0表示没有,默认1表示已绑定，在绑定磁卡会更新',
  `orderTime` varchar(50) DEFAULT NULL COMMENT '签订日期',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '录入时间日期',
  `status` int(11) DEFAULT '0' COMMENT '合同状态,0表示尚未审核 -1未通过 1 解锁 2锁定 3正在发运 4已经结算  5财务审核通过 7价格调整作废合同  ',
  `billName` varchar(100) DEFAULT NULL COMMENT '公司名称',
  `address` varchar(100) DEFAULT NULL COMMENT '公司地址i',
  `billNo` varchar(100) DEFAULT NULL COMMENT '税号',
  `tel` varchar(50) DEFAULT NULL COMMENT '电话',
  `bankName` varchar(100) DEFAULT NULL COMMENT '开户银行',
  `bankNo` varchar(100) DEFAULT NULL COMMENT '账号',
  `paidInvoice` varchar(100) DEFAULT '0' COMMENT '已付发票',
  `unPaidInvoice` varchar(100) DEFAULT '0' COMMENT '未付发票',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_contract
-- ----------------------------
INSERT INTO `car_contract` VALUES ('1', '20170313', null, '白山市大业物贸有限公司', '六区', '洗粒', '166', '560', '50', '尹延财', '尹延财', null, null, null, null, '3', '0', '0', '2017-03-18', '2017-03-16 11:12:54', '0', null, null, null, null, null, null, '0', '0');
INSERT INTO `car_contract` VALUES ('2', '20170318', null, '中国石油天然气股份有限公司', '六区', '大煤矿', '100', '300', '50', '测试1', '测试1', null, null, null, null, '2', '0', '0', '2017-03-17', '2017-03-17 19:14:09', '2', null, null, null, null, null, null, '0', '0');
INSERT INTO `car_contract` VALUES ('4', '20170314', '11111', '吉林亚泰集团物资贸易有限公司', '六区', '大煤矿', '3143', '212', '0', '', '发特围', null, null, null, null, '4', '1', '0', '2017-03-19', '2017-03-19 21:58:01', '1', '中国发达色温发达色温范', '认为反倒是发的是废物发的方', '3142313131', '15312413121', '招商银行', '63232425800089832', '0', '0');
INSERT INTO `car_contract` VALUES ('6', '20170315', '', '白山市大业物贸有限公司', '六区', '低质煤', '1231', '12', '0', 'admin', '我听人说', null, null, null, null, '1', '1', '0', '2017-03-20', '2017-03-21 23:16:51', '0', '发的散热啊投入已经有看头康泰克', '的四个热管的过的好人re好1', '43213132313', '1532231233', '范德萨发生', '54324241313', '0', '0');
INSERT INTO `car_contract` VALUES ('7', '20170322', '45324313', '白山市大业物贸有限公司', '六区', '低质煤', '212', '22', '0', 'admin', '非师范', null, null, null, null, '1', '1', '0', '2017-03-22', '2017-03-22 23:54:57', '0', '非师范方式非师范方式', '付是否是否1', '13213123', '1231313121', '第三方士', '4123131313', '0', '0');
INSERT INTO `car_contract` VALUES ('9', '20170322', '41321212', '白山市大业物贸有限公司', '六区', '低质煤', '123', '12', '0', 'admin', '发顺丰', 'admin', '白山市大业物贸有限公司', '银行卡', '12.98', '2', '0', '0', '2017-03-23', '2017-03-23 23:44:46', '5', '防辐射法萨芬方式付方式方式  ', '付方式是否 方式服务而发师范大学', '234231313213', '1341451232123', '发的萨芬', '42413145345353', '0', '0');
INSERT INTO `car_contract` VALUES ('10', '20170505', null, '中国石油天然气股份有限', '三区', '低质煤', '120', '12', '0', 'admin', '范德萨', null, null, null, null, '2', '0', '0', '2017-05-14', '2017-05-14 20:26:54', '7', '发的撒个发达范德萨', '的份上', '3141231', '2131212121', '范德萨发的', '12141312121212', '0', '0');
INSERT INTO `car_contract` VALUES ('11', '20170507', null, '白山市大业物贸有限公司', '三区', '低质煤', '100', '12', '0', 'admin', '发的啥地方', null, null, null, null, '2', '0', '0', '2017-05-14', '2017-05-14 20:31:09', '7', '范德萨范德萨发的说法', '耳朵是谁发斯蒂芬', '313213212', '413211212', '吨数发到付', '132131312312', '0', '0');
INSERT INTO `car_contract` VALUES ('12', '20170508', '222222', '吉林亚泰水泥有限公司', '三区', '低质煤', '70', '12', '0', 'admin', '范德萨', 'admin', '吉林亚泰集团物资贸易有限公司', '支票', '40.8', '2', '0', '1', '2017-05-14', '2017-05-14 20:44:09', '5', '户人家火炬大厦范德萨', '特务发送到吨数', '14123112121', '6545465465', '唱收唱付', '131212313121', '0', '0');
INSERT INTO `car_contract` VALUES ('15', '20170507', null, '白山市大业物贸有限公司', '三区', '低质煤', '100', '20', '0', 'admin', '发的啥地方', null, null, null, '0', '2', '0', '0', '2017-05-14', '2017-05-19 00:54:13', '5', '范德萨范德萨发的说法', '耳朵是谁发斯蒂芬', '313213212', '413211212', '吨数发到付', '132131312312', '0', '0');
INSERT INTO `car_contract` VALUES ('16', '20170505', '1290792', '中国石油天然气股份有限', '三区', '低质煤', '120', '20', '0', 'admin', '范德萨', null, null, null, '0', '2', '0', '1', '2017-05-14', '2017-05-19 00:55:18', '5', '发的撒个发达范德萨', '的份上', '3141231', '2131212121', '范德萨发的', '12141312121212', '0', '0');
INSERT INTO `car_contract` VALUES ('17', '20170824', null, '吉林亚泰水泥有限公司', '六区', '低质煤', '12', '100', '0', 'admin', '范德萨', 'admin', '吉林亚泰集团物资贸易有限公司', '现金', '204', '1', '1', '0', '2017-08-24', '2017-08-24 21:28:56', '0', '给俄方的所得税范德萨', '天2范德萨范德萨范德萨', '2134132', '15023321222', '招商银行', '6212898998237085', '120', '100');
INSERT INTO `car_contract` VALUES ('20', '20170911', null, '吉林亚泰水泥有限公司', '六区', '低质煤', '100', '60', '10', 'admin', '发仨人', null, null, null, '0', '1', '1', '0', '2017-09-16', '2017-09-17 14:06:15', '7', '特发的说法方式豆腐范德萨', '和国际化看个后价格跟', 'DSF4324132', '15854424122', '中国银行', '6122868763456543', '0', '0');
INSERT INTO `car_contract` VALUES ('21', '20170911', null, '吉林亚泰水泥有限公司', '六区', '低质煤', '90', '70', '10', 'admin', '发仨人', 'admin', '吉林亚泰集团物资贸易有限公司', '现金', '1071', '1', '1', '0', '2017-09-16', '2017-09-17 14:11:52', '5', '特发的说法方式豆腐范德萨', '和国际化看个后价格跟', 'DSF4324132', '15854424122', '中国银行', '6122868763456543', '5000', '1000');

-- ----------------------------
-- Table structure for `car_type`
-- ----------------------------
DROP TABLE IF EXISTS `car_type`;
CREATE TABLE `car_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `N_LBBH` int(11) NOT NULL,
  `C_LBMC` varchar(255) DEFAULT NULL,
  `N_XSSX` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_type
-- ----------------------------
INSERT INTO `car_type` VALUES ('1', '0', '翻斗车', '1');
INSERT INTO `car_type` VALUES ('3', '2', '大货车', '4');

-- ----------------------------
-- Table structure for `chezhong`
-- ----------------------------
DROP TABLE IF EXISTS `chezhong`;
CREATE TABLE `chezhong` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `coal_card` varchar(11) DEFAULT NULL,
  `car_type` varchar(255) DEFAULT NULL,
  `car_num` varchar(11) DEFAULT NULL,
  `into_time` datetime DEFAULT NULL,
  `into_czr` varchar(255) DEFAULT NULL,
  `into_zl` varchar(255) DEFAULT NULL,
  `out_time` datetime DEFAULT NULL,
  `out_zl` varchar(255) DEFAULT NULL,
  `out_czr` varchar(255) DEFAULT NULL,
  `jzl` varchar(255) DEFAULT NULL,
  `car_contract` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of chezhong
-- ----------------------------
INSERT INTO `chezhong` VALUES ('13', '222222', '大货车', 'sdfs222', '2017-05-19 19:00:27', 'admin', '12000', '2017-05-19 19:10:37', '25000', 'admin', '13000', '20170508');
INSERT INTO `chezhong` VALUES ('14', '222222', '翻斗车', 'sdfs222', '2017-05-19 19:18:46', 'admin', '10000', '2017-05-19 19:22:27', '20000', 'admin', '10000', '20170508');
INSERT INTO `chezhong` VALUES ('15', '222222', '大货车', 'MK1232', '2017-05-19 19:19:27', 'admin', '20000', '2017-05-19 19:21:04', '30000', 'admin', '10000', '20170508');
INSERT INTO `chezhong` VALUES ('16', '222222', '翻斗车', 'sdfsdf', '2017-05-19 19:23:30', 'admin', '12000', '2017-05-19 19:30:07', '25000', 'admin', '13000', '20170508');
INSERT INTO `chezhong` VALUES ('17', '222222', '翻斗车', 'sdfsdf', '2017-05-19 19:30:21', 'admin', '1', null, null, null, null, '20170508');

-- ----------------------------
-- Table structure for `coal_card`
-- ----------------------------
DROP TABLE IF EXISTS `coal_card`;
CREATE TABLE `coal_card` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cardId` int(11) DEFAULT NULL,
  `contractId` int(11) DEFAULT NULL,
  `orpaid` int(11) DEFAULT '1' COMMENT '1表示已交款，0表示已退款',
  PRIMARY KEY (`id`),
  KEY `contractId` (`contractId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coal_card
-- ----------------------------

-- ----------------------------
-- Table structure for `coal_card_money`
-- ----------------------------
DROP TABLE IF EXISTS `coal_card_money`;
CREATE TABLE `coal_card_money` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numNo` varchar(100) DEFAULT '' COMMENT '合同编号',
  `coalCard` varchar(50) DEFAULT NULL COMMENT '煤卡',
  `money` double DEFAULT '0',
  `infos` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `numNo` (`numNo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='绑定煤卡提前交款信息';

-- ----------------------------
-- Records of coal_card_money
-- ----------------------------
INSERT INTO `coal_card_money` VALUES ('1', '20170505', '1290792', '10000', null);

-- ----------------------------
-- Table structure for `coal_deposit`
-- ----------------------------
DROP TABLE IF EXISTS `coal_deposit`;
CREATE TABLE `coal_deposit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL COMMENT '客户名称',
  `numNo` varchar(100) DEFAULT NULL COMMENT '合同号',
  `coalCard` varchar(100) DEFAULT NULL COMMENT '煤卡号',
  `deposit` double DEFAULT '0' COMMENT '押金',
  `payPeople` varchar(100) DEFAULT NULL COMMENT '交款人',
  `refundPeople` varchar(100) DEFAULT NULL COMMENT '退款人',
  `inputPerson` varchar(100) DEFAULT NULL COMMENT '录入人',
  `usePerson` varchar(100) DEFAULT NULL COMMENT '操作人',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `refundtime` varchar(100) DEFAULT NULL COMMENT '退款时间',
  `status` int(11) DEFAULT '0' COMMENT ' 0 押金  -1已退款',
  PRIMARY KEY (`id`),
  KEY `numNo` (`numNo`),
  KEY `createtime` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='煤卡押金';

-- ----------------------------
-- Records of coal_deposit
-- ----------------------------
INSERT INTO `coal_deposit` VALUES ('1', '1', '吉林亚泰水泥有限公司', '20170501', '21314211', '50', '发的萨芬', '张三', 'admin', 'admin', '2017-05-14 18:14:20', '2017-05-14 18:30:52', '-1');
INSERT INTO `coal_deposit` VALUES ('2', '2', '中国石油天然气股份有限', '20170503', '745645321', '50', '与人发生', null, 'admin', null, '2017-05-14 18:28:31', '', '0');
INSERT INTO `coal_deposit` VALUES ('3', '2', '中国石油天然气股份有限', '20170505', '856745435', '70', '会过热的方式', null, 'admin', null, '2017-05-14 18:32:03', null, '0');

-- ----------------------------
-- Table structure for `customer_payment`
-- ----------------------------
DROP TABLE IF EXISTS `customer_payment`;
CREATE TABLE `customer_payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numNo` varchar(100) DEFAULT '' COMMENT '客户编号',
  `settlement` varchar(100) DEFAULT NULL COMMENT '结算单位',
  `usePerson` varchar(100) DEFAULT NULL COMMENT '经办人',
  `priorbalance` double DEFAULT '0' COMMENT '前期余额',
  `currentDeposit` double DEFAULT '0' COMMENT '本期存款',
  `planCar` int(11) DEFAULT '0' COMMENT '车数',
  `planTonnage` double DEFAULT '0' COMMENT '计划吨数',
  `coalMoney` double DEFAULT '0' COMMENT '煤款',
  `unitPrice` double DEFAULT '0' COMMENT '单价',
  `taxation` double DEFAULT '0' COMMENT '税金',
  `freight` double DEFAULT '0' COMMENT '运费',
  `entruck` double DEFAULT '0' COMMENT '装调费',
  `totalAmount` double DEFAULT '0' COMMENT '金额合计',
  `balance` double DEFAULT '0' COMMENT '余额',
  `fund` varchar(100) DEFAULT NULL COMMENT '资金方式',
  `freightName` varchar(100) DEFAULT NULL COMMENT '到站-站点',
  `auditPeople` varchar(100) DEFAULT NULL COMMENT '会计审计',
  `cashier` varchar(100) DEFAULT NULL COMMENT '出纳',
  `addPeople` varchar(100) DEFAULT NULL COMMENT '录入',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='客户交款信息';

-- ----------------------------
-- Records of customer_payment
-- ----------------------------
INSERT INTO `customer_payment` VALUES ('1', '20170516', '中国石油天然气股份有限公司', '粉丝地付', '22000', '1000', '5', '10', '1000', '100', '170', '0', '90.3', '1260.3', '21739.7', '现金', '沈阳站', 'sale', 'admin', 'admin', '2017-05-18 01:23:55', null);
INSERT INTO `customer_payment` VALUES ('2', '20170517', '吉林亚泰集团物资贸易有限公司', '范德萨', '45000', '1000', '10', '60', '6000', '100', '1020', '265.2', '541.8', '7827', '38173', '合同户', '东辽阳', 'sale', 'ceshi', 'admin', '2017-05-18 01:28:17', null);
INSERT INTO `customer_payment` VALUES ('3', '20170517', '吉林亚泰集团物资贸易有限公司', '范德萨', '1000', '1000', '20', '60', '1200', '20', '204', '265.2', '541.8', '2211', '-211', '现金', '东辽阳', 'admin', 'admin', 'admin', '2017-05-19 01:01:23', null);

-- ----------------------------
-- Table structure for `diaoyun`
-- ----------------------------
DROP TABLE IF EXISTS `diaoyun`;
CREATE TABLE `diaoyun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `wagonNo` varchar(100) DEFAULT NULL COMMENT '车皮号',
  `unitPrice` double DEFAULT '0' COMMENT '单价',
  `tonnage` double DEFAULT '0' COMMENT '吨数',
  `wellsName` varchar(255) DEFAULT NULL COMMENT '对应wells中的w_id井别',
  `coalName` varchar(255) DEFAULT NULL COMMENT '煤炭种类，对应dm_coal中的煤炭表',
  `siteName` varchar(255) DEFAULT NULL COMMENT '到站',
  `freight` double DEFAULT '0' COMMENT '运费',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0' COMMENT '是否已传 0 没有  1已传',
  `dayId` int(11) DEFAULT NULL COMMENT '对应日计划id',
  `monthId` int(11) DEFAULT NULL COMMENT '对应的月计划id',
  `type` int(11) DEFAULT '0' COMMENT '对于大客户用户，结算单--是否已经结算  0没有 1已结算',
  `type2` int(11) DEFAULT '0' COMMENT '对于大客户用户，汇款单--是否已经结算  0没有 1已回款',
  PRIMARY KEY (`id`),
  KEY `dayId` (`dayId`),
  KEY `createtime` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of diaoyun
-- ----------------------------
INSERT INTO `diaoyun` VALUES ('1', '2', '中国石油天然气股份有限', '21321313', '12', '2', '斜井', '大煤矿', '沈阳站', '452.15', '2017-03-29 23:26:37', '2', '8', '5', '0', '0');
INSERT INTO `diaoyun` VALUES ('2', '2', '中国石油天然气股份有限', '76575654', '12', '5', '斜井', '大煤矿', '沈阳站', '452.15', '2017-03-31 22:05:26', '2', '8', '5', '1', '0');
INSERT INTO `diaoyun` VALUES ('3', '1', '吉林亚泰水泥有限公司', '512312', '132', '2', '太平井', '洗精煤', '烟筒山', '734', '2017-03-31 22:38:17', '2', '9', '2', '0', '0');
INSERT INTO `diaoyun` VALUES ('4', '2', '中国石油天然气股份有限', '3213131321', '12', '2', '斜井', '大煤矿', '沈阳站', '452.15', '2017-04-01 21:36:24', '2', '8', '5', '0', '0');
INSERT INTO `diaoyun` VALUES ('5', '3', '白山市大业物贸有限公司', '2312131', '52', '3', '斜井', '大煤矿', '沈阳站', '452.15', '2017-04-01 22:04:51', '2', '7', '4', '0', '0');
INSERT INTO `diaoyun` VALUES ('6', '1', '吉林亚泰水泥有限公司', '865756', '132', '3', '太平井', '洗精煤', '烟筒山', '734', '2017-04-04 21:26:19', '2', '9', '2', '0', '0');
INSERT INTO `diaoyun` VALUES ('7', '1', '吉林亚泰水泥有限公司', '3132131', '132', '2', '三区', '低质煤', '沈阳站', '0', '2017-04-09 17:14:37', '1', '10', '6', '0', '0');

-- ----------------------------
-- Table structure for `dm_city`
-- ----------------------------
DROP TABLE IF EXISTS `dm_city`;
CREATE TABLE `dm_city` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '城市表',
  `name` varchar(255) DEFAULT '' COMMENT '城市名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '城市简记符',
  `pid` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_city
-- ----------------------------
INSERT INTO `dm_city` VALUES ('1', '北京', 'bj', '0');
INSERT INTO `dm_city` VALUES ('2', '天津', 'tj1', '0');
INSERT INTO `dm_city` VALUES ('3', '哈尔滨', 'sd', '0');
INSERT INTO `dm_city` VALUES ('4', '青岛', 'qd', '0');

-- ----------------------------
-- Table structure for `dm_coal`
-- ----------------------------
DROP TABLE IF EXISTS `dm_coal`;
CREATE TABLE `dm_coal` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '煤炭品种',
  `name` varchar(255) DEFAULT '' COMMENT '煤炭名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '煤炭简记符',
  `kind` varchar(255) DEFAULT '' COMMENT '煤炭种类',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_coal
-- ----------------------------
INSERT INTO `dm_coal` VALUES ('1', '大煤矿', 'gd', '大煤矿');
INSERT INTO `dm_coal` VALUES ('2', '低质煤', 'sd', '低质煤');
INSERT INTO `dm_coal` VALUES ('3', '洗精煤', 'cs', '洗精煤');
INSERT INTO `dm_coal` VALUES ('4', '洗粒', 'lq', '洗粒');

-- ----------------------------
-- Table structure for `dm_freight`
-- ----------------------------
DROP TABLE IF EXISTS `dm_freight`;
CREATE TABLE `dm_freight` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '运费表',
  `name` varchar(255) DEFAULT '' COMMENT '站点名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '站点简记符',
  `tonnage` double DEFAULT '0' COMMENT '吨数',
  `cost` double DEFAULT '0' COMMENT '运费',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_freight
-- ----------------------------
INSERT INTO `dm_freight` VALUES ('2', '沈阳站', 'sy', '70', '452.15');
INSERT INTO `dm_freight` VALUES ('3', '鞍山', 'ass', '60', '222');
INSERT INTO `dm_freight` VALUES ('4', '烟筒山', 'yt', '60', '734');
INSERT INTO `dm_freight` VALUES ('5', '东辽阳', 'ly', '60', '265.2');

-- ----------------------------
-- Table structure for `dm_fund`
-- ----------------------------
DROP TABLE IF EXISTS `dm_fund`;
CREATE TABLE `dm_fund` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '资金方式',
  `name` varchar(255) DEFAULT '' COMMENT '资金方式名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_fund
-- ----------------------------
INSERT INTO `dm_fund` VALUES ('1', '现金');
INSERT INTO `dm_fund` VALUES ('2', '支票');
INSERT INTO `dm_fund` VALUES ('3', '银行卡');
INSERT INTO `dm_fund` VALUES ('4', '合同户');

-- ----------------------------
-- Table structure for `dm_industry`
-- ----------------------------
DROP TABLE IF EXISTS `dm_industry`;
CREATE TABLE `dm_industry` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '行业名称',
  `name` varchar(255) DEFAULT '' COMMENT '行业名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_industry
-- ----------------------------
INSERT INTO `dm_industry` VALUES ('1', 'cds');
INSERT INTO `dm_industry` VALUES ('3', '发撒爱上');
INSERT INTO `dm_industry` VALUES ('4', '个女生');
INSERT INTO `dm_industry` VALUES ('5', '进入实施');

-- ----------------------------
-- Table structure for `dm_platenumber`
-- ----------------------------
DROP TABLE IF EXISTS `dm_platenumber`;
CREATE TABLE `dm_platenumber` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '车牌信息',
  `name` varchar(255) DEFAULT '' COMMENT '车牌名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_platenumber
-- ----------------------------
INSERT INTO `dm_platenumber` VALUES ('1', '京A');
INSERT INTO `dm_platenumber` VALUES ('2', '辽B-');

-- ----------------------------
-- Table structure for `dm_province`
-- ----------------------------
DROP TABLE IF EXISTS `dm_province`;
CREATE TABLE `dm_province` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '省份表',
  `name` varchar(255) DEFAULT '' COMMENT '省份名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '省份简记符',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_province
-- ----------------------------
INSERT INTO `dm_province` VALUES ('1', '辽宁省', 'ln');
INSERT INTO `dm_province` VALUES ('2', '黑龙江', 'hl');
INSERT INTO `dm_province` VALUES ('4', '河北省', 'hb');
INSERT INTO `dm_province` VALUES ('5', '山西省', 'sx');

-- ----------------------------
-- Table structure for `dm_receive`
-- ----------------------------
DROP TABLE IF EXISTS `dm_receive`;
CREATE TABLE `dm_receive` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '收货单位',
  `name` varchar(255) DEFAULT '' COMMENT '收货单位名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '收货单位简记符',
  `jiecun` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_receive
-- ----------------------------
INSERT INTO `dm_receive` VALUES ('1', '吉林亚泰水泥有限公司', 'zsy', '1200');
INSERT INTO `dm_receive` VALUES ('2', '中国石油天然气股份有限', 'as', '1520');
INSERT INTO `dm_receive` VALUES ('3', '白山市大业物贸有限公司', 'yg', '1450');

-- ----------------------------
-- Table structure for `dm_settlement`
-- ----------------------------
DROP TABLE IF EXISTS `dm_settlement`;
CREATE TABLE `dm_settlement` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '结算单位表',
  `name` varchar(255) DEFAULT '' COMMENT '结算单位名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '结算单位简记符',
  `method` varchar(255) DEFAULT '' COMMENT '结算方式',
  `industry` varchar(255) DEFAULT '' COMMENT '结算行业',
  `province` varchar(255) DEFAULT '' COMMENT '结算省份',
  `rateNo` varchar(50) DEFAULT '0' COMMENT '费率编号',
  `rate` varchar(100) DEFAULT '0' COMMENT '税率',
  `shunting` varchar(100) DEFAULT '0' COMMENT '调车费率',
  `entruck` varchar(100) DEFAULT '0' COMMENT '装车费率',
  `type` int(11) DEFAULT NULL COMMENT '0表示非重点，1表示重点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_settlement
-- ----------------------------
INSERT INTO `dm_settlement` VALUES ('1', '中国石油天然气股份有限公司', 'sd', '合同户', '个女生', '辽宁省', '01', '0.17', '5.67', '3.36', '0');
INSERT INTO `dm_settlement` VALUES ('2', '吉林亚泰集团物资贸易有限公司', 'uyd', '合同户', 'cds', '河北省', '02', '0.17', '5.67', '3.36', '1');
INSERT INTO `dm_settlement` VALUES ('3', '白山市大业物贸有限公司', 'ds1', '支票', '进入实施', '黑龙江', '03', '0.17', '5.67', '3.36', '0');
INSERT INTO `dm_settlement` VALUES ('5', '结算单位4', 'ww', '支票', '进入实施', '山西省', '04', '0.17', '5.67', '3.36', '1');
INSERT INTO `dm_settlement` VALUES ('6', '结算单位5', 'lu', '合同户', '发撒爱上', '山西省', '05', '0.17', '5.67', '3.36', '1');

-- ----------------------------
-- Table structure for `dm_site`
-- ----------------------------
DROP TABLE IF EXISTS `dm_site`;
CREATE TABLE `dm_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '站点表',
  `name` varchar(255) DEFAULT '' COMMENT '站点名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '站点简记符',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_site
-- ----------------------------
INSERT INTO `dm_site` VALUES ('1', '辽宁省沈阳站', 'sy');
INSERT INTO `dm_site` VALUES ('2', '辽宁省鞍山', 'ass');
INSERT INTO `dm_site` VALUES ('3', '辽宁省东辽阳', 'ly');
INSERT INTO `dm_site` VALUES ('4', '辽宁省烟筒山', 'yt');
INSERT INTO `dm_site` VALUES ('5', '吉林省辽阳站', 'ly');

-- ----------------------------
-- Table structure for `dm_wells`
-- ----------------------------
DROP TABLE IF EXISTS `dm_wells`;
CREATE TABLE `dm_wells` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '井区表',
  `name` varchar(255) DEFAULT '' COMMENT '井区名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '井区简记符',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_wells
-- ----------------------------
INSERT INTO `dm_wells` VALUES ('1', '斜井', 'xj');
INSERT INTO `dm_wells` VALUES ('2', '六区', 'lq');
INSERT INTO `dm_wells` VALUES ('3', '太平井', 't');
INSERT INTO `dm_wells` VALUES ('4', '中心付煤场', 'z');
INSERT INTO `dm_wells` VALUES ('5', '三区', 'sq');
INSERT INTO `dm_wells` VALUES ('6', '机运区', 'je');
INSERT INTO `dm_wells` VALUES ('10', '倾井', 'sd');
INSERT INTO `dm_wells` VALUES ('11', '测试', 's');

-- ----------------------------
-- Table structure for `houche`
-- ----------------------------
DROP TABLE IF EXISTS `houche`;
CREATE TABLE `houche` (
  `hc_id` int(11) NOT NULL AUTO_INCREMENT,
  `hc_name` varchar(255) DEFAULT NULL,
  `hc_password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of houche
-- ----------------------------
INSERT INTO `houche` VALUES ('1', 'huoche', 'huoche');

-- ----------------------------
-- Table structure for `houchemenu`
-- ----------------------------
DROP TABLE IF EXISTS `houchemenu`;
CREATE TABLE `houchemenu` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_type` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of houchemenu
-- ----------------------------
INSERT INTO `houchemenu` VALUES ('36', null, '查看今日发运', 'see_all');

-- ----------------------------
-- Table structure for `kongchefubang`
-- ----------------------------
DROP TABLE IF EXISTS `kongchefubang`;
CREATE TABLE `kongchefubang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chengzhong_id` int(11) DEFAULT NULL,
  `into_zl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of kongchefubang
-- ----------------------------

-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `m_id` int(11) NOT NULL AUTO_INCREMENT,
  `m_type` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('28', '0', '西安矿区', 'company_one');
INSERT INTO `menu` VALUES ('29', '0', '金宝屯矿区', 'company_two');
INSERT INTO `menu` VALUES ('30', '0', '龙家堡矿区', 'company_three');
INSERT INTO `menu` VALUES ('33', '0', '数据查询', 'data_search');

-- ----------------------------
-- Table structure for `out_day_plan`
-- ----------------------------
DROP TABLE IF EXISTS `out_day_plan`;
CREATE TABLE `out_day_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL COMMENT '收货单位编号',
  `name` varchar(255) DEFAULT '' COMMENT '收货单位，对应dm_receive表',
  `planCarNum` int(11) NOT NULL DEFAULT '0' COMMENT '日计划车数',
  `actualCarNum` int(11) NOT NULL DEFAULT '0' COMMENT '日实发车数',
  `planTonnage` double DEFAULT '0' COMMENT '日计划吨数',
  `actualSendedTonnage` double DEFAULT '0' COMMENT '日实发吨数',
  `actualUnitPrice` double DEFAULT '0' COMMENT '实发单价',
  `wellsName` varchar(255) DEFAULT NULL COMMENT '对应wells中的w_id井别',
  `coalName` varchar(255) DEFAULT NULL COMMENT '煤炭种类，对应dm_coal中的煤炭表',
  `siteName` varchar(255) DEFAULT NULL COMMENT '到站',
  `privateLine` varchar(255) DEFAULT NULL COMMENT '专用线',
  `settlement` varchar(255) DEFAULT NULL COMMENT '结算单位',
  `method` varchar(255) DEFAULT NULL COMMENT '结算方式，对应dm_settlement中的s_method',
  `usePerson` varchar(255) DEFAULT NULL COMMENT '经办人',
  `inputPerson` varchar(255) DEFAULT NULL COMMENT '录入人',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payId` int(11) DEFAULT NULL COMMENT '交款单号',
  `status` int(11) DEFAULT '1' COMMENT '该日计划是否被终止，默认1表示正常，-1表示被终止',
  `month_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mpd_id` (`month_id`),
  KEY `createtime` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_day_plan
-- ----------------------------
INSERT INTO `out_day_plan` VALUES ('6', '3', '白山市大业物贸有限公司', '12', '0', '70', '0', '52', '斜井', '大煤矿', '沈阳站', '公司专', '白山市大业物贸有限公司', '合同户', '都是热饭', 'admin', '2017-03-28 22:01:35', '5151', '1', '4');
INSERT INTO `out_day_plan` VALUES ('7', '3', '白山市大业物贸有限公司', '10', '0', '80', '0', '52', '斜井', '大煤矿', '沈阳站', '公司专', '白山市大业物贸有限公司', '合同户', '都是热饭', 'admin', '2017-03-28 22:01:48', '5151', '1', '4');
INSERT INTO `out_day_plan` VALUES ('8', '2', '中国石油天然气股份有限', '20', '3', '50', '9', '12', '斜井', '大煤矿', '沈阳站', '公司专', '中国石油天然气股份有限公司', '合同户', '具体一点', 'admin', '2017-03-28 22:02:02', '8768', '1', '5');
INSERT INTO `out_day_plan` VALUES ('9', '1', '吉林亚泰水泥有限公司', '11', '1', '40', '3', '132', '太平井', '洗精煤', '烟筒山', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '看韩剧', 'admin', '2017-03-28 22:02:15', '1490', '1', '2');
INSERT INTO `out_day_plan` VALUES ('10', '1', '吉林亚泰水泥有限公司', '12', '1', '90', '2', '120', '三区', '低质煤', '沈阳站', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '富商大贾', 'admin', '2017-04-04 21:32:56', '1250', '1', '6');

-- ----------------------------
-- Table structure for `out_month_plan`
-- ----------------------------
DROP TABLE IF EXISTS `out_month_plan`;
CREATE TABLE `out_month_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL COMMENT '收货单位编号',
  `name` varchar(200) DEFAULT NULL COMMENT '收货单位，对应dm_receive表中的r_name',
  `planCarNum` int(11) DEFAULT NULL COMMENT '计划车数',
  `actualCarNum` int(11) DEFAULT '0' COMMENT '累计实发车数',
  `planTonnage` double DEFAULT '0' COMMENT '计划吨数',
  `actualSendedTonnage` double DEFAULT '0' COMMENT '累计实发吨数',
  `actualUnitPrice` double DEFAULT '0' COMMENT '实发单价',
  `wellsName` varchar(255) DEFAULT NULL COMMENT '对应wells中的w_id井别',
  `coalName` varchar(255) DEFAULT NULL COMMENT '煤炭种类，对应dm_coal中的煤炭表',
  `siteName` varchar(255) DEFAULT NULL COMMENT '到站',
  `privateLine` varchar(255) DEFAULT NULL COMMENT '专用线',
  `settlement` varchar(255) DEFAULT NULL COMMENT '结算单位',
  `method` varchar(255) DEFAULT NULL COMMENT '结算方式，对应dm_settlement中的s_method',
  `usePerson` varchar(255) DEFAULT NULL COMMENT '经办人',
  `inputPerson` varchar(255) DEFAULT NULL COMMENT '录入人',
  `planMonth` varchar(50) DEFAULT '所属月份',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payId` int(11) DEFAULT NULL COMMENT '交款单号',
  `status` int(11) DEFAULT '1' COMMENT '该月计划是否被终止，默认1表示正常，-1表示被终止',
  PRIMARY KEY (`id`),
  KEY `time` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_month_plan
-- ----------------------------
INSERT INTO `out_month_plan` VALUES ('2', '1', '吉林亚泰水泥有限公司', '50', '1', '120', '3', '132', '太平井', '洗精煤', '烟筒山', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '看韩剧', 'admin', '所属月份', '2017-03-23 23:31:49', '1490', '1');
INSERT INTO `out_month_plan` VALUES ('3', '2', '中国石油天然气股份有限', '50', '0', '120', '0', '58', '六区', '低质煤', '东辽阳', '公司专', '中国石油天然气股份有限公司', '支票', '二房东', 'admin', '所属月份', '2017-03-23 23:31:50', '5223', '1');
INSERT INTO `out_month_plan` VALUES ('4', '3', '白山市大业物贸有限公司', '123', '0', '231', '0', '52', '斜井', '大煤矿', '沈阳站', '公司专', '白山市大业物贸有限公司', '合同户', '都是热饭', 'admin', '所属月份', '2017-03-23 23:31:51', '5151', '1');
INSERT INTO `out_month_plan` VALUES ('5', '2', '中国石油天然气股份有限', '123', '3', '123', '9', '120', '斜井', '大煤矿', '沈阳站', '公司专', '中国石油天然气股份有限公司', '合同户', '具体一点', 'admin', '所属月份', '2017-03-23 23:56:57', '8768', '1');
INSERT INTO `out_month_plan` VALUES ('6', '1', '吉林亚泰水泥有限公司', '123', '1', '123', '2', '12', '太平井', '低质煤', '鞍山', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '热污染', 'admin', '所属月份', '2017-03-24 23:37:34', '1255', '-1');
INSERT INTO `out_month_plan` VALUES ('7', '1', '吉林亚泰水泥有限公司', '12', '0', '840', '0', '100', '六区', '低质煤', '鞍山', '沈阳', '吉林亚泰集团物资贸易有限公司', '现金', '范德萨', 'admin', '2017-09', '2017-08-24 21:26:34', '1244978', '1');

-- ----------------------------
-- Table structure for `pay_logs`
-- ----------------------------
DROP TABLE IF EXISTS `pay_logs`;
CREATE TABLE `pay_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '交款记录',
  `account` varchar(255) DEFAULT '' COMMENT '操作人',
  `settlement` varchar(255) DEFAULT '' COMMENT '结算单位',
  `currentDeposit` varchar(200) DEFAULT '0' COMMENT '本期存款',
  `description` varchar(300) DEFAULT '',
  `createtime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pay_logs
-- ----------------------------
INSERT INTO `pay_logs` VALUES ('1', 'admin', '中国石油天然气股份有限公司', '2000', '新增客户交款信息', '2017-05-18 01:23:55');
INSERT INTO `pay_logs` VALUES ('2', 'admin', '吉林亚泰集团物资贸易有限公司', '5000', '新增客户交款信息', '2017-05-18 01:28:17');
INSERT INTO `pay_logs` VALUES ('3', 'admin', '销售部门', '增补合同', '增补20吨', '2017-05-19 00:31:52');
INSERT INTO `pay_logs` VALUES ('4', 'admin', '销售部门', '增补合同', '', '2017-05-19 00:33:30');
INSERT INTO `pay_logs` VALUES ('5', 'admin', '销售部门', '合同结算', '退款840元', '2017-05-19 00:35:59');
INSERT INTO `pay_logs` VALUES ('6', 'admin', '销售部门', '调整价格', '发的萨芬', '2017-05-19 00:41:05');
INSERT INTO `pay_logs` VALUES ('7', 'admin', '销售部门', '调整价格', '调整价格12到20', '2017-05-19 00:51:35');
INSERT INTO `pay_logs` VALUES ('8', 'admin', '销售部门', '调整价格', '调整价格12-20', '2017-05-19 00:54:13');
INSERT INTO `pay_logs` VALUES ('9', 'admin', '销售部门', '调整价格', '调整价格12-20', '2017-05-19 00:55:18');
INSERT INTO `pay_logs` VALUES ('10', 'admin', '', '3000', '追加--客户交款3000', '2017-05-19 00:55:58');
INSERT INTO `pay_logs` VALUES ('11', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:56:29');
INSERT INTO `pay_logs` VALUES ('12', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:56:48');
INSERT INTO `pay_logs` VALUES ('13', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:56:59');
INSERT INTO `pay_logs` VALUES ('14', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:56:59');
INSERT INTO `pay_logs` VALUES ('15', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:57:18');
INSERT INTO `pay_logs` VALUES ('16', 'admin', '', '10000', '追加--客户交款10000', '2017-05-19 00:57:18');
INSERT INTO `pay_logs` VALUES ('17', 'admin', '吉林亚泰集团物资贸易有限公司', '5000', '新增客户交款信息', '2017-05-19 01:01:23');
INSERT INTO `pay_logs` VALUES ('18', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:01:40');
INSERT INTO `pay_logs` VALUES ('19', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:01:40');
INSERT INTO `pay_logs` VALUES ('20', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:01:59');
INSERT INTO `pay_logs` VALUES ('21', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:01:59');
INSERT INTO `pay_logs` VALUES ('22', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:02:18');
INSERT INTO `pay_logs` VALUES ('23', 'admin', '', '1000', '追加--客户交款1000', '2017-05-19 01:11:38');
INSERT INTO `pay_logs` VALUES ('24', 'admin', '财务部门', '计算金额输入', '结算了id=4,2 的调运信息', '2017-05-20 23:46:25');
INSERT INTO `pay_logs` VALUES ('25', 'admin', '财务部门', '反结按钮--取消已经结算', '取消结算id=4 的调运信息', '2017-05-20 23:46:33');
INSERT INTO `pay_logs` VALUES ('26', 'admin', '财务部门', '编辑合同信息', '结算单位=吉林亚泰集团物资贸易有限公司,已付合同款=120,未付合同款=100', '2017-08-24 21:54:29');
INSERT INTO `pay_logs` VALUES ('27', 'admin', '销售部门', '调整价格', '', '2017-09-17 14:01:45');
INSERT INTO `pay_logs` VALUES ('28', 'admin', '销售部门', '调整价格', '', '2017-09-17 14:06:15');
INSERT INTO `pay_logs` VALUES ('29', 'admin', '销售部门', '调整价格', '', '2017-09-17 14:11:52');
INSERT INTO `pay_logs` VALUES ('30', 'admin', '财务部门', '编辑合同信息', '结算单位=吉林亚泰集团物资贸易有限公司,已付合同款=5000,未付合同款=1000', '2017-09-17 14:16:16');

-- ----------------------------
-- Table structure for `t_permission`
-- ----------------------------
DROP TABLE IF EXISTS `t_permission`;
CREATE TABLE `t_permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `resource_url` varchar(255) NOT NULL,
  `resource_name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `menu_name` varchar(255) DEFAULT NULL,
  `resource_order` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`permission_id`),
  UNIQUE KEY `uk_resourceUrl` (`resource_url`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_permission
-- ----------------------------
INSERT INTO `t_permission` VALUES ('1', '/system/show_user_page', '用户管理', '用户管理', '系统管理', '98');
INSERT INTO `t_permission` VALUES ('2', '/system/show_role_page', '角色管理', '角色管理', '系统管理', '99');
INSERT INTO `t_permission` VALUES ('11', '/market/monthPlan', '外运-月计划管理', '外运-月计划管理', '销售管理', '1');
INSERT INTO `t_permission` VALUES ('12', '/market/dayPlan', '外运-日计划管理', '外运-日计划管理', '销售管理', '2');
INSERT INTO `t_permission` VALUES ('13', '/market/contract', '地付合同管理', '地付合同管理', '销售管理', '3');
INSERT INTO `t_permission` VALUES ('14', '/finance/payment', '外运客户付款 ', '外运客户付款 ', '财务管理', '6');
INSERT INTO `t_permission` VALUES ('15', '/finance/remit', '回款单录入', '回款单录入', '财务管理', '8');
INSERT INTO `t_permission` VALUES ('16', '/finance/balance', '结算单录入', '结算单录入', '财务管理', '9');
INSERT INTO `t_permission` VALUES ('17', '/finance/df', '合同审核', '合同审核', '财务管理', '10');
INSERT INTO `t_permission` VALUES ('19', '/transport/dayPlan', '查询日计划', '查询日计划', '调运管理', '11');
INSERT INTO `t_permission` VALUES ('20', '/transport/cars', '发车调运', '发车调运', '调运管理', '12');
INSERT INTO `t_permission` VALUES ('21', '/transport/scheduleJob', '管理销售调度', '管理销售调度', '调运管理', '13');
INSERT INTO `t_permission` VALUES ('22', '/coal/waybill ', '货运单操作', '货运单操作', '煤卡管理', '20');
INSERT INTO `t_permission` VALUES ('23', '/coal/card', '煤卡绑定', '煤卡绑定', '煤卡管理', '21');
INSERT INTO `t_permission` VALUES ('24', '/coal/deposit', '煤卡押金', '煤卡押金', '煤卡管理', '22');
INSERT INTO `t_permission` VALUES ('25', '/common/cityPage', '城市信息', '城市信息', '数据维护', '34');
INSERT INTO `t_permission` VALUES ('26', '/common/coalPage', '煤炭品种', '煤炭品种', '数据维护', '39');
INSERT INTO `t_permission` VALUES ('27', '/common/freightPage', '运费信息', '运费信息', '数据维护', '38');
INSERT INTO `t_permission` VALUES ('28', '/common/fundPage', '资金方式', '资金方式', '数据维护', '37');
INSERT INTO `t_permission` VALUES ('29', '/common/industryPage', '行业信息', '行业信息', '数据维护', '36');
INSERT INTO `t_permission` VALUES ('30', '/common/provincePage', '省份信息', '省份信息', '数据维护', '33');
INSERT INTO `t_permission` VALUES ('31', '/common/receivePage', '收货单位', '收货单位', '数据维护', '35');
INSERT INTO `t_permission` VALUES ('32', '/common/settlementPage', '结算单位', '结算单位', '数据维护', '40');
INSERT INTO `t_permission` VALUES ('33', '/common/sitePage', '站点信息', '站点信息', '数据维护', '32');
INSERT INTO `t_permission` VALUES ('34', '/common/wellsPage', '井区信息', '井区信息', '数据维护', '31');
INSERT INTO `t_permission` VALUES ('35', '/common/platePage', '车牌信息', '车牌信息', '数据维护', '41');
INSERT INTO `t_permission` VALUES ('36', '/market/contrastInfo', '计划与发出对比', '外运-计划与发出对比', '销售管理', '4');
INSERT INTO `t_permission` VALUES ('39', '/finance/dfPayment', '地付客户付款 ', '地付客户付款', '财务管理', '7');

-- ----------------------------
-- Table structure for `t_permission_mapping`
-- ----------------------------
DROP TABLE IF EXISTS `t_permission_mapping`;
CREATE TABLE `t_permission_mapping` (
  `mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) DEFAULT NULL,
  `permission_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mapping_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_permission_mapping
-- ----------------------------
INSERT INTO `t_permission_mapping` VALUES ('1', '1', '11');
INSERT INTO `t_permission_mapping` VALUES ('2', '1', '12');
INSERT INTO `t_permission_mapping` VALUES ('3', '1', '13');
INSERT INTO `t_permission_mapping` VALUES ('4', '1', '14');
INSERT INTO `t_permission_mapping` VALUES ('5', '1', '15');
INSERT INTO `t_permission_mapping` VALUES ('6', '1', '16');
INSERT INTO `t_permission_mapping` VALUES ('7', '1', '17');
INSERT INTO `t_permission_mapping` VALUES ('8', '1', '18');
INSERT INTO `t_permission_mapping` VALUES ('9', '1', '19');
INSERT INTO `t_permission_mapping` VALUES ('10', '1', '20');
INSERT INTO `t_permission_mapping` VALUES ('11', '1', '1');
INSERT INTO `t_permission_mapping` VALUES ('12', '1', '2');
INSERT INTO `t_permission_mapping` VALUES ('13', '1', '3');
INSERT INTO `t_permission_mapping` VALUES ('14', '1', '4');
INSERT INTO `t_permission_mapping` VALUES ('15', '1', '22');
INSERT INTO `t_permission_mapping` VALUES ('16', '1', '23');
INSERT INTO `t_permission_mapping` VALUES ('18', '1', '24');
INSERT INTO `t_permission_mapping` VALUES ('19', '1', '21');
INSERT INTO `t_permission_mapping` VALUES ('20', '1', '25');
INSERT INTO `t_permission_mapping` VALUES ('21', '1', '26');
INSERT INTO `t_permission_mapping` VALUES ('22', '1', '27');
INSERT INTO `t_permission_mapping` VALUES ('23', '1', '28');
INSERT INTO `t_permission_mapping` VALUES ('24', '1', '29');
INSERT INTO `t_permission_mapping` VALUES ('25', '1', '30');
INSERT INTO `t_permission_mapping` VALUES ('26', '1', '31');
INSERT INTO `t_permission_mapping` VALUES ('27', '1', '32');
INSERT INTO `t_permission_mapping` VALUES ('28', '1', '33');
INSERT INTO `t_permission_mapping` VALUES ('29', '1', '34');
INSERT INTO `t_permission_mapping` VALUES ('30', '2', '11');
INSERT INTO `t_permission_mapping` VALUES ('31', '2', '12');
INSERT INTO `t_permission_mapping` VALUES ('32', '2', '13');
INSERT INTO `t_permission_mapping` VALUES ('33', '1', '35');
INSERT INTO `t_permission_mapping` VALUES ('34', '1', '36');
INSERT INTO `t_permission_mapping` VALUES ('35', '2', '36');
INSERT INTO `t_permission_mapping` VALUES ('37', '1', '37');
INSERT INTO `t_permission_mapping` VALUES ('38', '1', '38');

-- ----------------------------
-- Table structure for `t_role`
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  `described` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES ('1', '管理员角色', '管理员角色');
INSERT INTO `t_role` VALUES ('2', '销售组角色', '销售组角色');
INSERT INTO `t_role` VALUES ('3', '财务组角色', '财务组角色');
INSERT INTO `t_role` VALUES ('4', '煤质组角色', '煤质组角色');
INSERT INTO `t_role` VALUES ('5', '调运组角色', '调运组角色');

-- ----------------------------
-- Table structure for `t_user`
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `account` varchar(255) DEFAULT NULL,
  `pw` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_account` (`account`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', 'admin', '48AD68465C333B2EBC473E449E2C01CC', '1', '管理员11', null, '0');
INSERT INTO `t_user` VALUES ('2', null, 'sale', '6260D03DDF3B435CD20CF3B681E65575', '2', '销售部门11', null, '0');
INSERT INTO `t_user` VALUES ('3', null, 'ceshi', '5BFEE76D5F023163BB64B7CADF9D01EB', '2', '测试', null, '0');
INSERT INTO `t_user` VALUES ('4', null, '123', '3C5BA64A9962BE6B2E0BBDFE611D7D38', '1', '调运', null, '0');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) DEFAULT NULL,
  `userQX` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'admin', '0');
INSERT INTO `users` VALUES ('2', '1', '1', '1');
INSERT INTO `users` VALUES ('3', '11', '11', '1');

-- ----------------------------
-- Table structure for `zhongchechefubang`
-- ----------------------------
DROP TABLE IF EXISTS `zhongchechefubang`;
CREATE TABLE `zhongchechefubang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chengzhong_id` int(11) DEFAULT NULL,
  `out_zl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zhongchechefubang
-- ----------------------------
