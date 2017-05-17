package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.DiaoyunBean;

import java.util.List;

/**
 * Created by zj on 2017/3/26 0026.
 */
public interface TransportService {

    int countDealPlanData(DiaoyunBean bean);
    List<DiaoyunBean> getTableDealPlanData(DiaoyunBean bean);

    int addDealDayPlan(DiaoyunBean bean);
    int editDealDayPlan(DiaoyunBean bean);

    int dealStatusDayPlan(DiaoyunBean bean);

    int checkPlanCars( int dayId);

}
