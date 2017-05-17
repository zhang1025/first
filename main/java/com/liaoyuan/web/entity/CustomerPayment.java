package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/5/17 0017
 * 客户交款信息
 */
@Data
public class CustomerPayment {

    private String id;
    private String numNo;
    private String settlement;//结算单位
    private String usePerson;//经办人
    private String priorbalance;//'前期余额
    private String currentDeposit;//本期存款
    private String planCar;
    private String planTonnage;
    private String coalMoney;//煤款
    private String unitPrice;
    private String taxation;
    private String freight;//运费
    private String entruck;//装调费',
    private String totalAmount;
    private String balance;//余额
    private String fund;//资金方式
    private String auditPeople;//会计审计
    private String cashier;//出纳
    private String addPeople;//录入
    private String createtime;

    //到站站点
    private String freightName;

    private int status;

    private String beginDate;
    private String endDate;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;


}
