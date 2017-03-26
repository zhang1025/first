package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.PlanBean;
import org.springframework.stereotype.Repository;

/**
 * Created by zj on 2017/3/26 0026
 */
@Repository
public interface ITransportDao {
    int dealDayPlan(PlanBean bean);
}
