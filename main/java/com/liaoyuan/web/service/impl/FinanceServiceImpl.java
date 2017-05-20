package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.FinanceDao;
import com.liaoyuan.web.entity.CustomerPayment;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.DiaoyunBean;
import com.liaoyuan.web.entity.PayLogs;
import com.liaoyuan.web.service.FinanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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


    //获取结算单位对用的税率信息
    @Override
    public DataBean checkRate(int id) {
        return financeDao.checkRate(id);
    }

    public DataBean getRateInfoFromSettName( String st){
        return financeDao.getRateInfoFromSettName(st);
    }
    public DataBean selectRateFromFreight(String name, String tonnage){
        return financeDao.selectRateFromFreight(name,tonnage);
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
        if(dd==null){
            return -1;
        }
        bean.setFreight(String.format("%.2f",dd.getCost()));
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

        //前期余额
        bean.setBalance(String.format("%.2f",Double.parseDouble(bean.getPriorbalance())+
                Double.parseDouble(bean.getCurrentDeposit())-Double.parseDouble(bean.getTotalAmount())));
        //追加之后 前期余额==追加前的余额
        bean.setPriorbalance(bean.getBalance());

        bean.setCurrentDeposit(appendPay);
//        bean.setPriorbalance(String.format("%.2f",
//                Double.parseDouble(appendPay)+Double.parseDouble(bean.getPriorbalance())));
        //余额的计算方式为：前期存款+本期存款-金额合计。
        bean.setBalance(String.format("%.2f",Double.parseDouble(bean.getPriorbalance())+
                Double.parseDouble(bean.getCurrentDeposit())-Double.parseDouble(bean.getTotalAmount())));
        return financeDao.appendPayInfo(bean);
    }
    @Override
    public int addLogs(PayLogs logs) {
        return financeDao.addLogs(logs);
    }


    public  DiaoyunBean getDiaoyunInfoFromIds(String ids,String st){
        List listIds = new ArrayList();
        for (String s : ids.split(",")) {
            listIds.add(Integer.parseInt(s));
        }
        List<DiaoyunBean> list = financeDao.getDiaoyunInfoFromIds(listIds);
        DataBean db = financeDao.getRateInfoFromSettName(st);//税率 装车调车费率
        double totalTonnage = 0;
        DiaoyunBean newBean = new DiaoyunBean();
        if(list!=null && !list.isEmpty()){
            for (DiaoyunBean bean : list) {
                totalTonnage += bean.getTonnage();
            }
            newBean = list.get(0);//日计划信息中除去调运吨数其他的调运信息一致
        }
        newBean.setTotalTonnage(totalTonnage);
        newBean.setCoalMoney(newBean.getUnitPrice()*newBean.getTotalTonnage());
        if(db != null){
            newBean.setTaxation(newBean.getTotalTonnage()*Double.parseDouble(db.getRate()));
            newBean.setShunting(newBean.getTotalTonnage()*Double.parseDouble(db.getShunting()));
            newBean.setEntruck(newBean.getTotalTonnage()*Double.parseDouble(db.getEntruck()));
        }
        //计算运费  根据吨数和计算单位 结算表中找他的运费信息
        DataBean cost = financeDao.selectRateFromFreight(st,String.valueOf(newBean.getTotalTonnage()));
        if(cost!=null){
            newBean.setFreight(String.valueOf(cost.getCost()));
        }else{
            newBean.setFreight(String.valueOf("0"));
        }
        double all = newBean.getCoalMoney()+newBean.getEntruck()+newBean.getShunting()
                +newBean.getTaxation()+newBean.getFreight();
        newBean.setAllMoney(Double.parseDouble(String.format("%.2f",all)));
        return newBean;
    }

    public int dealBalanceInfo(String ids){
        List listIds = new ArrayList();
        for (String s : ids.split(",")) {
            listIds.add(Integer.parseInt(s));
        }
       return financeDao.dealBalanceInfo(listIds);
    }

    public int cancelBalanceInfo(String ids){
        List listIds = new ArrayList();
        for (String s : ids.split(",")) {
            listIds.add(Integer.parseInt(s));
        }
        return financeDao.cancelBalanceInfo(listIds);
    }
}
