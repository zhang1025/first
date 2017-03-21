package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019
 */
public interface MarketService {

    //合同信息
    int countContractData(ContractBean bean);
    List<ContractBean> getTableContractData(ContractBean bean);

    int addContractInfo(ContractBean bean);
    int editContractInfo(ContractBean bean);
    int deleteContractInfo(int id);

    int lockInfo(int id);
    int unlockInfo(int id);

    //外运月计划
    int countMonthPlanData(PlanBean bean);
    List<PlanBean> getTableMonthPlanData(PlanBean bean);
    int addMonthPlan(PlanBean bean);
    int editMonthPlan(PlanBean bean);
    int stopMonthPlan(int id);
    int deleteMonthPlan(int id);
}
