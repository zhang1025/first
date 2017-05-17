package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.CustomerPayment;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PayLogs;

import java.util.List;

/**
 * Created by zj on 2017/5/17 0017
 */
public interface FinanceService {

    int countPaymentData(CustomerPayment bean);

    List<CustomerPayment> getPaymentTableData(CustomerPayment bean);

    DataBean checkRate( int id);
    int addPaymentInfo(CustomerPayment bean,DataBean dataBean);

    int appendPayInfo(int id,String appendPay);

    int addLogs(PayLogs logs);
}
