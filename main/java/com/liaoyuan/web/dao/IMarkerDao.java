package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Repository
public interface IMarkerDao {

    //合同信息
    int countContractData(ContractBean bean);
    List<ContractBean> getTableContractData(ContractBean bean);
    int addContractInfo(ContractBean bean);
    int editContractInfo(ContractBean bean);
    int deleteContractInfo(@Param(value = "id") int id);

    int lockInfo(@Param(value = "id") int id);
    int unlockInfo(@Param(value = "id") int id);

    //外运与计划
    int countMonthPlanData(PlanBean bean);
    List<PlanBean> getTableMonthPlanData(PlanBean bean);
    int addMonthPlan(PlanBean bean);
    int editMonthPlan(PlanBean bean);
    int stopMonthPlan(@Param(value = "id") int id);
    int deleteMonthPlan(@Param(value = "id") int id);

    int countDayPlanData(PlanBean bean);
    List<PlanBean> getTableDayPlanData(PlanBean bean);
    int addDayPlan(PlanBean bean);
    int editDayPlan(PlanBean bean);
    int deleteDayPlan(@Param(value = "id") int id);
    int stopDayPlan(@Param(value = "monthId")int id);

}
