package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/19 0019.
 * 合同管理 bean
 */
@Data
public class ContractBean {
    private  int id;
    private String numNo;
    private String settlement;
    private String name;//煤炭种类
    private double orderCount;
    private double unitPrice;
    //预交金额 = orderCount * unitPrice
    private double prepaidAmount;
    private double sendCount;
    //剩余量为 orderCount- sendCount
    private double leftCount;
    //发运金额 sendCount*unitPrice
    private double sendPrice;
    //剩余金额 prepaidAmount-sendPrice
    private double leftPrice;
    private String inputPerson;
    private String usePerson;
    private String contractType;
    private String forkliftFee;
    private int magneticCard;

    private String orderTime;//签订日期
    private String createtime;//录入时间
    private String status;

    private String billName;
    private String address;
    private String billNo;
    private String tel;
    private String bankName;
    private String bankNo;

    private String beginDate;
    private String endDate;



    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
