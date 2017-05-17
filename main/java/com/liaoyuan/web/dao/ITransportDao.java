package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.DiaoyunBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/26 0026
 */
@Repository
public interface ITransportDao {
    int countDealPlanData(DiaoyunBean bean);
    List<DiaoyunBean> getTableDealPlanData(DiaoyunBean bean);

    int addDealDayPlan(DiaoyunBean bean);
    int editDealDayPlan(DiaoyunBean bean);

    int dealStatusDayPlan(@Param(value = "id") int id);

    //更改调运状态 已传的同时更新对应日计划和月计划的实发车以及实发吨数
    int updateDayInfo(DiaoyunBean bean);
    int updateMonthInfo(DiaoyunBean bean);

    int checkPlanCars(@Param(value = "dayId") int dayId);
}
