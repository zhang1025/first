package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.PlanBean;

/**
 * Created by zj on 2017/3/26 0026.
 */
public interface TransportService {

    //调运 对应日计划编辑车皮号
    int dealDayPlan(PlanBean bean);
}
