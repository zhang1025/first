package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.FinanceDao;
import com.liaoyuan.web.entity.CustomerPayment;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PayLogs;
import com.liaoyuan.web.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zj on 2017/5/17 0017.
 */
@Service
public class FinanceServiceImpl implements FinanceService {

    @Autowired
    FinanceDao financeDao;


    @Override
    public int countPaymentData(CustomerPayment bean) {
        return financeDao.countPaymentData(bean);
    }

    @Override
    public List<CustomerPayment> getPaymentTableData(CustomerPayment bean) {
        return financeDao.getPaymentTableData(bean);
    }

    @Override
    public DataBean checkRate(int id) {
        return financeDao.checkRate(id);
    }

    @Override
    public int addPaymentInfo(CustomerPayment bean,DataBean dataBean) {
        bean.setPriorbalance("0");//前期存款为0
        double rate = Double.parseDouble(dataBean.getRate());
        //调车费率
        double shunting = Double.parseDouble(dataBean.getShunting());
        //装车费率
        double entruck = Double.parseDouble(dataBean.getEntruck());

        bean.setCoalMoney(String.format("%.2f",
                Double.parseDouble(bean.getUnitPrice())*Double.parseDouble(bean.getPlanTonnage())));
        bean.setTaxation(String.format("%.2f",
                Double.parseDouble(bean.getCoalMoney())*rate));

        //获取运费信息
        DataBean dd = financeDao.selectRateFromFreight(bean.getFreightName(),bean.getPlanTonnage());
        bean.setFreight(dd==null?"0":String.format("%.2f",dd.getCost()));
        //装调费的计算方式是：吨数*（调车费率+装车费率）
        bean.setEntruck(String.format("%.2f",
                (shunting+entruck)*Double.parseDouble(bean.getPlanTonnage())));
        //金额合计 = 煤款+税款+装调费+运费
        bean.setTotalAmount(String.format("%.2f",
                Double.parseDouble(bean.getCoalMoney())+Double.parseDouble(bean.getTaxation())
                +Double.parseDouble(bean.getFreight())+Double.parseDouble(bean.getEntruck())));
        //余额的计算方式为：前期存款+本期存款-金额合计。
        bean.setBalance(String.format("%.2f",
                Double.parseDouble(bean.getCurrentDeposit())-Double.parseDouble(bean.getTotalAmount())));
        return financeDao.addPaymentInfo(bean);
    }

    public int appendPayInfo(int id,String appendPay){
        CustomerPayment bean = financeDao.getInfoFromId(id);
        bean.setCurrentDeposit(appendPay);
        bean.setPriorbalance(String.format("%.2f",
                Double.parseDouble(appendPay)+Double.parseDouble(bean.getPriorbalance())));
        //余额的计算方式为：前期存款+本期存款-金额合计。
        bean.setBalance(String.format("%.2f",Double.parseDouble(bean.getPriorbalance())+
                Double.parseDouble(bean.getCurrentDeposit())-Double.parseDouble(bean.getTotalAmount())));
        return financeDao.appendPayInfo(bean);
    }
    @Override
    public int addLogs(PayLogs logs) {
        return financeDao.addLogs(logs);
    }
}
