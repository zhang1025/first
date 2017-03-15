package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/14 0014.
 */
@Data
public class DataBean {
    private int id;
    private String name;
    private String mnc;
    private int pId;

    //吨数
    private int tonnage;

    //运费
    private double cost;

    private String method;
    private String industry;

    private String province;
    //煤炭种类
    private String kind;

    //重点非重点
    private int type;


    private String model;
    private String table;



    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
