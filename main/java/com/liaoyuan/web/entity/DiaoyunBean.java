package com.liaoyuan.web.entity;

import lombok.Data;
import org.apache.commons.lang.StringUtils;

import java.io.Serializable;

/**
 * Created by zj on 2017/3/28 0028
 */
@Data
public class DiaoyunBean implements Serializable {

    private int id;
    public void setId(String id) {
        if(StringUtils.isBlank(id)){
            this.id = 0;
        }else{
            this.id =  Integer.parseInt(id);
        }
    }

    private int rid;
    public void setRid(String rid) {
        if(StringUtils.isBlank(rid)){
            this.rid = 0;
        }else{
            this.rid =  Integer.parseInt(rid);
        }
    }

    private String name;

    private String wagonNo;

    private double tonnage;
    public void setTonnage(String tonnage) {
        if(StringUtils.isBlank(tonnage)){
            this.tonnage = 0;
        }else{
            this.tonnage =  Double.parseDouble(tonnage);
        }
    }
    //单价
    private double unitPrice;
    public void setUnitPrice(String unitPrice) {
        if(StringUtils.isBlank(unitPrice)){
            this.unitPrice = 0;
        }else{
            this.unitPrice =  Double.parseDouble(unitPrice);
        }
    }

    private double freight;
    public void setFreight(String freight) {
        if(StringUtils.isBlank(freight)){
            this.freight = 0;
        }else{
            this.freight =  Double.parseDouble(freight);
        }
    }


    private String wellsName;
    private String coalName;

    private String siteName;

    private String createtime;

    private Integer status;
    public void setStatus(String status) {
        if(StringUtils.isBlank(status)){
            this.status = null;
        }else{
            this.status =  Integer.parseInt(status);
        }
    }

    //对应的日计划id
    private Integer dayId;
    public void setDayId(String dayId) {
        if(StringUtils.isBlank(dayId)){
            this.dayId = null;
        }else{
            this.dayId =  Integer.parseInt(dayId);
        }
    }
    //对应的月计划id
    private int monthId;
    public void setMonthId(String monthId) {
        if(StringUtils.isBlank(monthId)){
            this.monthId = 0;
        }else{
            this.monthId =  Integer.parseInt(monthId);
        }
    }

    //合计
    private double totalTonnage;
    private double coalMoney;
    private double taxation;
    private double shunting;
    private double entruck;
    private double cost;

    //合计金额
    private double allMoney;


    //对于大客户用户，结算单--是否已经结算  0没有 1已结算
    private String type;
    //对于大客户用户，回款单--是否应该回款  0已回款 1未回款
    private String type2;
    private String beginDate;
    private String endDate;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;

}
