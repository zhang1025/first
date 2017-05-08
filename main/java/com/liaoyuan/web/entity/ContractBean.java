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


    //合同卡号
    private String coalCard;

    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
