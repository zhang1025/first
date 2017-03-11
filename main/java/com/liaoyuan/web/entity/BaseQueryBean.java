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

    public BaseQueryBean(String begin,String end,String game,List<String> roleChannels){
        this.begin = begin;
        this.end = end;
        this.game = game;
        this.roleChannels = roleChannels;
    }

    //工程国内1 / 海外2
    private String isClient;
    //账号
    private String account;

    //查询的开始时间
    private String begin;

    //查询的结束时间
    private String end;

    //平台
    private String plat;

    //渠道
    private String channel;

    //区服
    private String server;

    //国家
    private String country;

    //查询的游戏简称 = 数据库名称
    private String game;

    //联合查询表名2
    private String game2;

    //查询的表名称
    private String table;

    //table 联合查询时可能用到
    private String table2;

    //查询的表名称alis别名
    private String tableAlias;

    //联合查询时可能用到 表alis别名
    private String tableAlias2;

    //查询数据列1
    private String column;

    //联合查询时可能用到 查询数据列2
    private String column2;

    //当前游戏角色下限制的渠道查看权限信息
    private List<String> roleChannels;

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

    //每日产出，玩家付费中使用
    private String state;

    private String status;

    //付费收入中使用
    private String c;

    //付费收入中使用
    private String type;

    private String money;

    //运营数据中使用
    private String select;

    //商城统计中使用
    private String mall;

    //vip等級
    private String vipLevel;
    
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
    
}
