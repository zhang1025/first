package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.CustomerPayment;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.DiaoyunBean;
import com.liaoyuan.web.entity.PayLogs;

import java.util.List;

/**
 * Created by zj on 2017/5/17 0017
 */
public interface FinanceService {

    int countPaymentData(CustomerPayment bean);

    List<CustomerPayment> getPaymentTableData(CustomerPayment bean);

    DataBean checkRate( int id);


    DataBean getRateInfoFromSettName( String st);
    DataBean selectRateFromFreight(String name, String tonnage);


    int addPaymentInfo(CustomerPayment bean,DataBean dataBean);

    int appendPayInfo(int id,String appendPay);

    int addLogs(PayLogs logs);

    int dealBalanceInfo(String ids);
    int cancelBalanceInfo(String ids);
    DiaoyunBean getDiaoyunInfoFromIds(String ids,String st);
}
