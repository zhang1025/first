package com.liaoyuan.web.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by zj on 2017/5/17 0017
 * 记录交款记录
 */
@Data
@NoArgsConstructor
public class PayLogs {

    public PayLogs(String account,String settlement,String currentDeposit,String description){
        this.account=account;
        this.settlement = settlement;
        this.currentDeposit = currentDeposit;
        this.description = description;
    }
    private int id;
    private String account;
    private String settlement;
    private String currentDeposit;
    private String description;
}
