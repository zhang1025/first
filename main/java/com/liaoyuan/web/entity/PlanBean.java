package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/19 0019
 * 月计划 日计划bean
 */
@Data
public class PlanBean {
    private int id;
    private int rid; //收货单位id
    private String name;//收货单位
    private int planCarNum;
    private int actualCarNum;

    private double planTonnage;
    private double actualSendedTonnage;
    //未发车数 = 计划车数减实发车数  planCarNum-actualCarNum
    private double unsendedCarNum;
    //未发吨数为计划吨数减累计实发吨数 planTonnoage- actualSendedTonnage
    private double unsendedTonnage;

    //实发单价
    private double actualUnitPrice;

    private String wellsName;
    private String coalName;

    private String siteName;
    private String privateLine;
    private String settlement;
    private String method;
    private String usePerson;
    private String inputPerson;

    private int payId;

    private String createtime;//录入时间
    private int status;

    private int monthId;
    private String beginDate;
    private String endDate;

    private String searchType;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;

}
