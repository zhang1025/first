/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : liaoyuan

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-04-11 23:53:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `car_contract`
-- ----------------------------
DROP TABLE IF EXISTS `car_contract`;
CREATE TABLE `car_contract` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '合同唯一识别',
  `numNo` varchar(100) DEFAULT '' COMMENT '合同编号',
  `receiveName` varchar(100) DEFAULT '' COMMENT '客户名称 收货单位',
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
  `status` int(11) DEFAULT '0' COMMENT '合同状态,0表示尚未审核 -1未通过 1 解锁 2锁定 3正在发运 4已经结算',
  `billName` varchar(100) DEFAULT NULL COMMENT '公司名称',
  `address` varchar(100) DEFAULT NULL COMMENT '公司地址i',
  `billNo` varchar(100) DEFAULT NULL COMMENT '税号',
  `tel` varchar(50) DEFAULT NULL COMMENT '电话',
  `bankName` varchar(100) DEFAULT NULL COMMENT '开户银行',
  `bankNo` varchar(100) DEFAULT NULL COMMENT '账号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car_contract
-- ----------------------------
INSERT INTO `car_contract` VALUES ('1', '20170313', '白山市大业物贸有限公司', '洗粒', '166', '560', '50', '尹延财', '尹延财', null, null, null, null, '3', '0', '0', '2017-03-18', '2017-03-16 11:12:54', '0', null, null, null, null, null, null);
INSERT INTO `car_contract` VALUES ('2', '20170318', '中国石油天然气股份有限公司', '大煤矿', '100', '300', '50', '测试1', '测试1', null, null, null, null, '2', '0', '0', '2017-03-17', '2017-03-17 19:14:09', '2', null, null, null, null, null, null);
INSERT INTO `car_contract` VALUES ('4', '20170314', '吉林亚泰集团物资贸易有限公司', '大煤矿', '3143', '212', '0', '', '发特围', null, null, null, null, '4', '1', '0', '2017-03-19', '2017-03-19 21:58:01', '1', '中国发达色温发达色温范', '认为反倒是发的是废物发的方', '3142313131', '15312413121', '招商银行', '63232425800089832');
INSERT INTO `car_contract` VALUES ('6', '20170315', '白山市大业物贸有限公司', '低质煤', '1231', '12', '0', 'admin', '我听人说', null, null, null, null, '1', '1', '0', '2017-03-20', '2017-03-21 23:16:51', null, '发的散热啊投入已经有看头康泰克', '的四个热管的过的好人re好1', '43213132313', '1532231233', '范德萨发生', '54324241313');
INSERT INTO `car_contract` VALUES ('7', '20170322', '白山市大业物贸有限公司', '低质煤', '212', '22', '0', 'admin', '非师范', null, null, null, null, '1', '1', '0', '2017-03-22', '2017-03-22 23:54:57', null, '非师范方式非师范方式', '付是否是否1', '13213123', '1231313121', '第三方士', '4123131313');
INSERT INTO `car_contract` VALUES ('9', '20170322', '白山市大业物贸有限公司', '低质煤', '123', '12', '0', 'admin', '发顺丰', 'admin', '白山市大业物贸有限公司', '银行卡', '12.98', '2', '0', '0', '2017-03-23', '2017-03-23 23:44:46', '3', '防辐射法萨芬方式付方式方式  ', '付方式是否 方式服务而发师范大学', '234231313213', '1341451232123', '发的萨芬', '42413145345353');

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
  KEY `contractId` (`contractId`),
  CONSTRAINT `contractId` FOREIGN KEY (`contractId`) REFERENCES `car_contract` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of coal_card
-- ----------------------------

-- ----------------------------
-- Table structure for `diaoyun`
-- ----------------------------
DROP TABLE IF EXISTS `diaoyun`;
CREATE TABLE `diaoyun` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `wagonNo` varchar(100) DEFAULT NULL COMMENT '车皮号',
  `tonnage` double DEFAULT '0' COMMENT '吨数',
  `wellsName` varchar(255) DEFAULT NULL COMMENT '对应wells中的w_id井别',
  `coalName` varchar(255) DEFAULT NULL COMMENT '煤炭种类，对应dm_coal中的煤炭表',
  `siteName` varchar(255) DEFAULT NULL COMMENT '到站',
  `freight` double DEFAULT '0' COMMENT '运费',
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0' COMMENT '是否已传 0 没有  1已传',
  `dayId` int(11) DEFAULT NULL COMMENT '对应日计划id',
  `monthId` int(11) DEFAULT NULL COMMENT '对应的月计划id',
  PRIMARY KEY (`id`),
  KEY `dayId` (`dayId`),
  KEY `createtime` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of diaoyun
-- ----------------------------
INSERT INTO `diaoyun` VALUES ('1', '2', '中国石油天然气股份有限', '21321313', '2', '斜井', '大煤矿', '沈阳站', '452.15', '2017-03-29 23:26:37', '1', '8', '5');
INSERT INTO `diaoyun` VALUES ('2', '2', '中国石油天然气股份有限', '76575654', '5', '斜井', '大煤矿', '沈阳站', '452.15', '2017-03-31 22:05:26', '1', '8', '5');
INSERT INTO `diaoyun` VALUES ('3', '1', '吉林亚泰水泥有限公司', '512312', '2', '太平井', '洗精煤', '烟筒山', '734', '2017-03-31 22:38:17', '0', '9', '2');
INSERT INTO `diaoyun` VALUES ('4', '2', '中国石油天然气股份有限', '3213131321', '2', '斜井', '大煤矿', '沈阳站', '452.15', '2017-04-01 21:36:24', '1', '8', '5');
INSERT INTO `diaoyun` VALUES ('5', '3', '白山市大业物贸有限公司', '2312131', '3', '斜井', '大煤矿', '沈阳站', '452.15', '2017-04-01 22:04:51', '0', '7', '4');
INSERT INTO `diaoyun` VALUES ('6', '1', '吉林亚泰水泥有限公司', '865756', '3', '太平井', '洗精煤', '烟筒山', '734', '2017-04-04 21:26:19', '1', '9', '2');
INSERT INTO `diaoyun` VALUES ('7', '1', '吉林亚泰水泥有限公司', '3132131', '2', '三区', '低质煤', '沈阳站', '0', '2017-04-09 17:14:37', '1', '10', '6');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_freight
-- ----------------------------
INSERT INTO `dm_freight` VALUES ('2', '沈阳站', 'sy', '324.97', '452.15');
INSERT INTO `dm_freight` VALUES ('3', '鞍山', 'ass', '11111', '222');
INSERT INTO `dm_freight` VALUES ('4', '烟筒山', 'yt', '212', '734');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_receive
-- ----------------------------
INSERT INTO `dm_receive` VALUES ('1', '吉林亚泰水泥有限公司', 'zsy');
INSERT INTO `dm_receive` VALUES ('2', '中国石油天然气股份有限', 'as');
INSERT INTO `dm_receive` VALUES ('3', '白山市大业物贸有限公司', 'yg');

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
  `type` int(11) DEFAULT NULL COMMENT '0表示非重点，1表示重点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_settlement
-- ----------------------------
INSERT INTO `dm_settlement` VALUES ('1', '中国石油天然气股份有限公司', 'sd', '合同户', '个女生', '辽宁省', '0');
INSERT INTO `dm_settlement` VALUES ('2', '吉林亚泰集团物资贸易有限公司', 'uyd', '合同户', 'cds', '河北省', '1');
INSERT INTO `dm_settlement` VALUES ('3', '白山市大业物贸有限公司', 'ds1', '支票', '进入实施', '黑龙江', '0');
INSERT INTO `dm_settlement` VALUES ('5', '结算单位4', 'ww', '支票', '进入实施', '山西省', '1');
INSERT INTO `dm_settlement` VALUES ('6', '结算单位5', 'lu', '合同户', '发撒爱上', '山西省', '1');

-- ----------------------------
-- Table structure for `dm_site`
-- ----------------------------
DROP TABLE IF EXISTS `dm_site`;
CREATE TABLE `dm_site` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '站点表',
  `name` varchar(255) DEFAULT '' COMMENT '站点名称',
  `mnc` varchar(255) DEFAULT '' COMMENT '站点简记符',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dm_site
-- ----------------------------
INSERT INTO `dm_site` VALUES ('1', '沈阳站', 'sy');
INSERT INTO `dm_site` VALUES ('2', '鞍山', 'ass');
INSERT INTO `dm_site` VALUES ('3', '东辽阳', 'ly');
INSERT INTO `dm_site` VALUES ('4', '烟筒山', 'yt');

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
INSERT INTO `dm_wells` VALUES ('11', 'fds', 's');

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
INSERT INTO `out_day_plan` VALUES ('10', '1', '吉林亚泰水泥有限公司', '12', '1', '56', '2', '120', '三区', '低质煤', '沈阳站', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '富商大贾', 'admin', '2017-04-04 21:32:56', '1250', '1', '6');

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
  `createtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payId` int(11) DEFAULT NULL COMMENT '交款单号',
  `status` int(11) DEFAULT '1' COMMENT '该月计划是否被终止，默认1表示正常，-1表示被终止',
  PRIMARY KEY (`id`),
  KEY `time` (`createtime`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of out_month_plan
-- ----------------------------
INSERT INTO `out_month_plan` VALUES ('2', '1', '吉林亚泰水泥有限公司', '50', '1', '120', '3', '132', '太平井', '洗精煤', '烟筒山', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '看韩剧', 'admin', '2017-03-23 23:31:49', '1490', '1');
INSERT INTO `out_month_plan` VALUES ('3', '2', '中国石油天然气股份有限', '50', '0', '120', '0', '58', '六区', '低质煤', '东辽阳', '公司专', '中国石油天然气股份有限公司', '支票', '二房东', 'admin', '2017-03-23 23:31:50', '5223', '1');
INSERT INTO `out_month_plan` VALUES ('4', '3', '白山市大业物贸有限公司', '123', '0', '231', '0', '52', '斜井', '大煤矿', '沈阳站', '公司专', '白山市大业物贸有限公司', '合同户', '都是热饭', 'admin', '2017-03-23 23:31:51', '5151', '1');
INSERT INTO `out_month_plan` VALUES ('5', '2', '中国石油天然气股份有限', '123', '3', '123', '9', '120', '斜井', '大煤矿', '沈阳站', '公司专', '中国石油天然气股份有限公司', '合同户', '具体一点', 'admin', '2017-03-23 23:56:57', '8768', '1');
INSERT INTO `out_month_plan` VALUES ('6', '1', '吉林亚泰水泥有限公司', '123', '1', '123', '2', '12', '太平井', '低质煤', '鞍山', '公司专', '吉林亚泰集团物资贸易有限公司', '合同户', '热污染', 'admin', '2017-03-24 23:37:34', '1255', '-1');

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
INSERT INTO `t_permission` VALUES ('14', '/finance/payment', '客户交款', '客户交款', '财务管理', '6');
INSERT INTO `t_permission` VALUES ('15', '/finance/remit', '汇款单录入', '汇款单录入', '财务管理', '7');
INSERT INTO `t_permission` VALUES ('16', '/finance/balance', '结算单录入', '结算单录入', '财务管理', '8');
INSERT INTO `t_permission` VALUES ('17', '/finance/df', '地付信息', '地付信息', '财务管理', '9');
INSERT INTO `t_permission` VALUES ('19', '/transport/dayPlan', '查询日计划', '查询日计划', '调运管理', '11');
INSERT INTO `t_permission` VALUES ('20', '/transport/cars', '发车调运', '发车调运', '调运管理', '12');
INSERT INTO `t_permission` VALUES ('21', '/transport/scheduleJob', '管理销售调度', '管理销售调度', '调运管理', '13');
INSERT INTO `t_permission` VALUES ('22', '/coal/waybill ', '货运单操作', '货运单操作', '煤质管理', '20');
INSERT INTO `t_permission` VALUES ('23', '/coal/card', '煤卡绑定', '煤卡绑定', '煤质管理', '21');
INSERT INTO `t_permission` VALUES ('24', '/coal/deposit', '煤卡押金', '煤卡押金', '煤质管理', '22');
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
INSERT INTO `t_permission` VALUES ('37', '/weigh/emptyWeight', '空车称重', '空车称重', '地付过磅管理', '15');
INSERT INTO `t_permission` VALUES ('38', '/weigh/shippingDetails', '发运明细', '发运明细', '地付过磅管理', '16');

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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', 'admin', '48AD68465C333B2EBC473E449E2C01CC', '1', '管理员11', null, '0');
INSERT INTO `t_user` VALUES ('2', null, 'sale', '6260D03DDF3B435CD20CF3B681E65575', '2', '销售部门11', null, '0');
INSERT INTO `t_user` VALUES ('3', null, 'ceshi', '5BFEE76D5F023163BB64B7CADF9D01EB', '2', '测试', null, '0');
