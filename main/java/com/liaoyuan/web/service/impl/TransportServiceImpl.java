package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ITransportDao;
import com.liaoyuan.web.entity.DiaoyunBean;
import com.liaoyuan.web.service.TransportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by zj on 2017/3/26 0026
 */
@Service
public class TransportServiceImpl implements TransportService {

    @Autowired
    ITransportDao iTransportDao;


    @Override
    public int countDealPlanData( int id) {
        return iTransportDao.countDealPlanData(id);
    }

    @Override
    public List<DiaoyunBean> getTableDealPlanData(DiaoyunBean bean) {
        List<DiaoyunBean> list = iTransportDao.getTableDealPlanData(bean);
        //  不分页  最后一行显示合并吨数
        double tonnage = 0;
        if(null!=list && !list.isEmpty()){
            for (DiaoyunBean diaoyunBean : list) {
                tonnage += diaoyunBean.getTonnage();
            }
            DiaoyunBean db = new DiaoyunBean();
            db.setTonnage(String.valueOf(tonnage));
            list.add(db);
        }
        return list;
    }

    @Override
    public int addDealDayPlan(DiaoyunBean bean) {
        return iTransportDao.addDealDayPlan(bean);
    }

    @Override
    public int editDealDayPlan(DiaoyunBean bean) {
        return iTransportDao.editDealDayPlan(bean);
    }

    //更改调运状态  已传的同时更新对应的日计划与月计划实发车以及吨数信息
    @Override
    @Transactional(rollbackFor = Exception.class)
    public int dealStatusDayPlan( DiaoyunBean bean) {
        int rtn = iTransportDao.dealStatusDayPlan(bean.getId());
        if(rtn > 0){
            iTransportDao.updateDayInfo(bean);
           iTransportDao.updateMonthInfo(bean);
        }
        return rtn;
    }

}
