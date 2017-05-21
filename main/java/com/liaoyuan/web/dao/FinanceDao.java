package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/5/17 0017
 * 财务管理
 */
@Repository
public interface FinanceDao {
    int countPaymentData(CustomerPayment bean);

    List<CustomerPayment> getPaymentTableData(CustomerPayment bean);

    DataBean checkRate(@Param("id") int id);
    DataBean getRateInfoFromSettName(@Param("settlement") String st);
    int addPaymentInfo(CustomerPayment bean);
    DataBean selectRateFromFreight(@Param("name") String name,@Param("tonnage") String tonnage);

    CustomerPayment getInfoFromId(@Param("id") int id);

    int appendPayInfo(CustomerPayment bean);

    int addLogs(PayLogs logs);

    int dealBalanceInfo(List ids);
    int cancelBalanceInfo(List ids);
    int paymentInfo(List ids);
    List<DiaoyunBean> getDiaoyunInfoFromIds(List ids);
}
