package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.ChengzhongBean;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DiaoyunBean;
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
    int editContractInfoForFinance(ContractBean bean);
    int deleteContractInfo(@Param(value = "id") int id);
    int balanceContractInfo(@Param(value = "id") int id);
    int updateStatusForAdjust(@Param(value = "id") int id);
    int addNewInfoForAdjust(ContractBean bean);
    int addTonnageInfo(@Param(value = "id") int id,@Param(value = "addTonnage") double at);


    ContractBean getContractInfoFromId(@Param(value = "id") int id);

    int lockInfo(@Param(value = "id") int id);
    int unlockInfo(@Param(value = "id") int id);

    int updateStatus(@Param(value = "id") int id,@Param(value = "status") int status);


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
    int deleteDayPlanOfMonth(@Param(value = "monthId") int id);
    int stopDayPlanOfMonth(@Param(value = "monthId")int id);
    int stopDayPlan(@Param(value = "monthId")int id);

    int bindingCard(@Param(value = "id")int id,@Param(value = "cardNo")String cardNo);
    int unBindingCard(@Param(value = "id")int id);
    int insertCoalCardMoney(@Param(value = "cardNo")String cardNo,
                            @Param(value = "money")String money,
                            @Param(value = "numNo")String numNo);

    //车重信息数据
    int countChengzhongData(ChengzhongBean bean);
    List<ChengzhongBean> getTableChengzhongData(ChengzhongBean bean);

    //查看调运信息
    int countDiaoyunData(DiaoyunBean bean);
    List<DiaoyunBean> getDiaoyunListData(DiaoyunBean bean);
}
