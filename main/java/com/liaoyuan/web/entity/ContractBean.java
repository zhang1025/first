package com.liaoyuan.web.entity;

import lombok.Data;
import org.apache.commons.lang.StringUtils;

/**
 * Created by zj on 2017/3/19 0019.
 * 合同管理 bean
 */
@Data
public class ContractBean {
    private  int id;
    private String numNo;
    private String receiveName;
    private String settlement;
    private String wells;//井区
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

    private String financePerson;
    //税金
    private double taxation;
    public void setTaxation(String taxation) {
        if(StringUtils.isBlank(taxation)){
            this.taxation = 0;
        }else{
            this.taxation =  Double.parseDouble(taxation);
        }
    }

    private String fund;
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

    private double shunting; //调车费
    public void setShunting(String shunting) {
        if(StringUtils.isBlank(shunting)){
            this.shunting = 0;
        }else{
            this.shunting =  Double.parseDouble(shunting);
        }
    }
    private double entruck; //装车费
    public void setEntruck(String entruck) {
        if(StringUtils.isBlank(entruck)){
            this.entruck = 0;
        }else{
            this.entruck =  Double.parseDouble(entruck);
        }
    }
    private String allMoney;

    //合同 煤卡卡号
    private String coalCard;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
