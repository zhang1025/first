package com.liaoyuan.web.entity;

import lombok.Data;
import org.apache.commons.lang3.StringUtils;

/**
 * Created by zj on 2017/5/14 0014.
 */
@Data
public class DepositBean {
    private int id;
    private String rid;
    private String name;
    private String numNo;
    private String coalCard;
    private double deposit;
    private String payPeople;
    private String refundPeople;
    private String inputPerson;
    private String usePerson;
    private String createtime;
    private String refundtime;
    private String status;

    public void setDeposit(String deposit){
        if(StringUtils.isBlank(deposit)){
            this.deposit = 0;
        }else{
            this.deposit =  Double.parseDouble(deposit);
        }
    }

    private  String beginDate;
    private String endDate;
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;


}
