package com.liaoyuan.web.entity;

import lombok.Data;
import org.apache.commons.lang.StringUtils;

import java.io.Serializable;

/**
 * Created by zj on 2017/3/19 0019
 * 月计划 日计划bean
 * 添加对应的set方法是因为ajax传递后台bean的时候如果为空无法映射400错误的问题
 */
@Data
public class PlanBean implements Serializable{

    private int id;
    public void setId(String id) {
        if(StringUtils.isBlank(id)){
            this.id = 0;
        }else{
            this.id =  Integer.parseInt(id);
        }
    }

    //所属计划月数
    private String planMonth;


    private int rid; //收货单位id
    public void setRid(String rid) {
        if(StringUtils.isBlank(rid)){
            this.rid = 0;
        }else{
            this.rid =  Integer.parseInt(rid);
        }
    }

    private String name;//收货单位
    private int planCarNum;
    private int actualCarNum;
    public void setActualCarNum(String actualCarNum) {
        if(StringUtils.isBlank(actualCarNum)){
            this.actualCarNum = 0;
        }else{
            this.actualCarNum =  Integer.parseInt(actualCarNum);
        }
    }

    private double planTonnage;
    public void setPlanTonnage(String planTonnage) {
        if(StringUtils.isBlank(planTonnage)){
            this.planTonnage = 0;
        }else{
            this.planTonnage =  Double.parseDouble(planTonnage);
        }
    }
    //实发吨数
    private double actualSendedTonnage;
    public void setActualSendedTonnage(String actualSendedTonnage) {
        if(StringUtils.isBlank(actualSendedTonnage)){
            this.actualSendedTonnage = 0;
        }else{
            this.actualSendedTonnage =  Double.parseDouble(actualSendedTonnage);
        }
    }
    //实发煤款= 实发吨 * 单价
    private double actualSendedTotal;
    public void setActualSendedTotal(String actualSendedTotal) {
        if(StringUtils.isBlank(actualSendedTotal)){
            this.actualSendedTotal = 0;
        }else{
            this.actualSendedTotal =  Double.parseDouble(actualSendedTotal);
        }
    }

    //未发车数 = 计划车数减实发车数  planCarNum-actualCarNum
    private double unsendedCarNum;
    //未发吨数为计划吨数减累计实发吨数 planTonnoage- actualSendedTonnage
    private double unsendedTonnage;

    //实发单价
    private double actualUnitPrice;
    public void setActualUnitPrice(String actualUnitPrice) {
        if(StringUtils.isBlank(actualUnitPrice)){
            this.actualUnitPrice = 0;
        }else{
            this.actualUnitPrice =  Double.parseDouble(actualUnitPrice);
        }
    }

    private String wellsName;
    private String coalName;

    private String siteName;
    private String privateLine;
    private String settlement;
    private String method;
    private String usePerson;
    private String inputPerson;

    private int payId;
    public void setPayId(String payId) {
        if(StringUtils.isBlank(payId)){
            this.payId = 0;
        }else{
            this.payId =  Integer.parseInt(payId.trim());
        }
    }

    private String createtime;//录入时间
    private int status;
    public void setStatus(String status) {
        if(StringUtils.isBlank(status)){
            this.status = 0;
        }else{
            this.status =  Integer.parseInt(status);
        }
    }

    private String monthId;


    private String beginDate;
    private String endDate;

    private String searchType;

    private String excelType;

    //税率
    private String rate;
    private String shunting;
    private String entruck;
    //运费
    private double cost;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;

}
