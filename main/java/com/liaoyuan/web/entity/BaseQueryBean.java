package com.liaoyuan.web.entity;

import lombok.Data;

import java.util.List;


@Data
public class BaseQueryBean {

    public BaseQueryBean(){}

    public BaseQueryBean(String game){
        this.game = game;
    }

    public BaseQueryBean(String begin,String end,String game){
        this.begin = begin;
        this.end = end;
        this.game = game;
    }

    //工程国内1 / 海外2
    private String isClient;
    //账号
    private String account;

    //查询的开始时间
    private String begin;

    //查询的结束时间
    private String end;

    //查询的游戏简称 = 数据库名称
    private String game;


    //查询的表名称
    private String table;


    //查询的表名称alis别名
    private String tableAlias;


    //查询数据列1
    private String column;

    //留存,玩家流失等级 (例如 留存 retention_01)等
    private String num;

    //留存,玩家流失等级 计算用的number
    private int days;
    
    //查询条件type 区分是否根据chanel server分组 type=0或type=1或type=2
    private String searchType;

    //数据报表类型
    private String qryFlag;

    //导出excle数据报表类型
    private String excelType;

    private String status;

    //付费收入中使用
    private String type;

    private String money;

    //运营数据中使用
    private String select;
    
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
    
}
