package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/5/30 0030.
 */
@Data
public class ChengzhongBean {

    private int id;
    //coal_card
    private String coalCard;
    private String carType;
    private String carNum;
    //入矿时间
    private String intoTime;
    //入矿称重人
    private String intoCzr;

    //入矿重量
    private String intoZl;
    private String outTime;
    //出矿重量
    private String outZl;
    private String outCzr;
    private String  jzl;

    //合同号
    private String carContract;
    //客户名称
    private String receiveName;
    //煤种
    private String name;

    private String kuangqu;


    private String beginDate;
    private String endDate;
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
