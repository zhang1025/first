package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.IMarkerDao;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.MarketService;
import org.apache.ibatis.annotations.Param;
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
}
