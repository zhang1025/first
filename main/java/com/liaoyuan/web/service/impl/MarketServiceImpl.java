package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.IMarkerDao;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Service
public class MarketServiceImpl implements MarketService{

    @Autowired
    IMarkerDao iMarkerDao;

    @Override
    public int countContractData(ContractBean bean) {
        return iMarkerDao.countContractData(bean);
    }

    @Override
    public List<ContractBean> getTableContractData(ContractBean bean) {
        return iMarkerDao.getTableContractData(bean);
    }

    @Override
    public int addContractInfo(ContractBean bean) {
        return iMarkerDao.addContractInfo(bean);
    }

    @Override
    public int editContractInfo(ContractBean bean) {
        return iMarkerDao.editContractInfo(bean);
    }

    @Override
    public int deleteContractInfo(int id) {
        return iMarkerDao.deleteContractInfo(id);
    }

    @Override
    public int lockInfo(int id) {
        return iMarkerDao.lockInfo(id);
    }

    @Override
    public int unlockInfo(int id) {
        return iMarkerDao.unlockInfo(id);
    }

    //外运月计划
    @Override
    public int countMonthPlanData(PlanBean bean) {
        return iMarkerDao.countMonthPlanData(bean);
    }

    @Override
    public List<PlanBean> getTableMonthPlanData(PlanBean bean) {
        return iMarkerDao.getTableMonthPlanData(bean);
    }

    @Override
    public int addMonthPlan(PlanBean bean) {
        return iMarkerDao.addMonthPlan(bean);
    }

    @Override
    public int editMonthPlan(PlanBean bean) {
        return iMarkerDao.editMonthPlan(bean);
    }

    public int stopMonthPlan(int id){
        return iMarkerDao.stopMonthPlan(id);
    }
    @Override
    public int deleteMonthPlan(int id) {
        return iMarkerDao.deleteMonthPlan(id);
    }
    //外运日计划
    public int countDayPlanData(PlanBean bean){
        return iMarkerDao.countDayPlanData(bean);
    }
    public List<PlanBean> getTableDayPlanData(PlanBean bean){
        List<PlanBean> list = iMarkerDao.getTableDayPlanData(bean);
        int dayPlanCar=0,dayActualCar=0,dayPlanTonnage=0,dayActualTonnage=0;
        if(null!=list && !list.isEmpty()){
            for (PlanBean pb : list) {
                dayPlanCar += pb.getPlanCarNum();
                dayActualCar += pb.getActualCarNum();
                dayPlanTonnage += pb.getPlanTonnage();
                dayActualTonnage += pb.getActualSendedTonnage();
            }
            PlanBean planBean = new PlanBean();
            //增加最后一行合计统计
//            planBean.setName("合计");
            planBean.setPlanCarNum(dayPlanCar);
            planBean.setActualCarNum(String.valueOf(dayActualCar));
            planBean.setPlanTonnage(String.valueOf(dayPlanTonnage));
            planBean.setActualSendedTonnage(String.valueOf(dayActualTonnage));
            planBean.setUnsendedCarNum(dayPlanCar-dayActualCar);
            planBean.setUnsendedTonnage(dayPlanTonnage - dayActualTonnage);
            list.add(planBean);
        }
        return list;
    }
    public int addDayPlan(PlanBean bean){
        return iMarkerDao.addDayPlan(bean);
    }
    public int editDayPlan(PlanBean bean){
        return iMarkerDao.editDayPlan(bean);
    }
    public int deleteDayPlan(int id){
        return  iMarkerDao.deleteDayPlan(id);
    }
}
