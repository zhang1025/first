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
    int editContractInfoForFinance(ContractBean bean);
    int deleteContractInfo(int id);
    int balanceContractInfo(int id);
    int printContractInfo( int id);

    int updateStatus(int id, int status);
    int lockInfo(int id);
    int unlockInfo(int id);

    //外运月计划
    int countMonthPlanData(PlanBean bean);
    List<PlanBean> getTableMonthPlanData(PlanBean bean);
    int addMonthPlan(PlanBean bean);
    int editMonthPlan(PlanBean bean);
    int stopMonthPlan(int id);
    int deleteMonthPlan(int id);

    int countDayPlanData(PlanBean bean);
    List<PlanBean> getTableDayPlanData(PlanBean bean);
    int addDayPlan(PlanBean bean);
    int editDayPlan(PlanBean bean);
    int deleteDayPlan(int id);
    int stopDayPlan(int id);

    //给合同绑定煤卡
    int bindlingCard(int id,String cardNo);
    int unBindingCard(int id);
}
