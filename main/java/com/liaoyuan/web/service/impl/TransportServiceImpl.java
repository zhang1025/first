package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ITransportDao;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by zj on 2017/3/26 0026
 */
@Service
public class TransportServiceImpl implements TransportService {

    @Autowired
    ITransportDao iTransportDao;

    /**
     *调运 对应日计划编辑车皮号
     */
    @Override
    public int dealDayPlan(PlanBean bean){
        return iTransportDao.dealDayPlan(bean);
    }
}
