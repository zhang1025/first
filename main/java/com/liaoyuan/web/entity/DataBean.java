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

    private String coleType;

    private int tonnage;

    private double cost;

    private String method;
    private String industry;

    private String province;

    private int type;


    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
