package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ICoalDao;
import com.liaoyuan.web.entity.DepositBean;
import com.liaoyuan.web.service.CoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zj on 2017/4/11
 */
@Service
public class CoalServiceImpl implements CoalService {

    @Autowired
    ICoalDao iCoalDao;

    @Override
    public int countCoalDepositData(DepositBean bean) {
        return iCoalDao.countCoalDepositData(bean);
    }

    @Override
    public List<DepositBean> getDepositTableData(DepositBean bean) {
        return iCoalDao.getDepositTableData(bean);
    }

    @Override
    public int depositTotal() {
        return iCoalDao.depositTotal();
    }

    @Override
    public int refundTotal() {
        return iCoalDao.depositTotal()-iCoalDao.refundTotal();
    }

    @Override
    public int addDepositInfo(DepositBean bean) {
        return iCoalDao.addDepositInfo(bean);
    }

    @Override
    public int refundInfo(int id, String refund, String usePeople) {
        return iCoalDao.refundInfo(id,refund,usePeople);
    }
}
