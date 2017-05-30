package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.*;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019
 */
public interface MarketService {

    //合同信息
    int countContractData(ContractBean bean);
    List<ContractBean> getTableContractData(ContractBean bean);
    List<ContractBean> getTableDetailContractData(ContractBean bean);

    int addContractInfo(ContractBean bean);
    int editContractInfo(ContractBean bean);
    int editContractInfoForFinance(ContractBean bean);
    int deleteContractInfo(int id);
    ContractBean getContractInfoFromId(int id);

    int balanceContractInfo(int id);
    int updatePriceInfo(int id,double currentPrize ,int subType);
    int addTonnageContractInfo(int id,String tonnage);


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
    int bindlingCard(int id,String cardNo,String money,String numNo);
    int unBindingCard(int id);

    //车重信息数据
    int countChengzhongData(ChengzhongBean bean);
    List<ChengzhongBean> getTableChengzhongData(ChengzhongBean bean);

    //查看外运调运数据
    int countDiaoyunData(DiaoyunBean bean);
    List<DiaoyunBean> getDiaoyunListData(DiaoyunBean bean);
}
