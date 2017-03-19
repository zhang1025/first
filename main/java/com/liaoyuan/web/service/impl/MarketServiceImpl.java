package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.IMarkerDao;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.service.MarketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Service
public class MarketServiceImpl implements MarketService{

    @Autowired
    IMarkerDao iMarkerDao;

    @Override
    public int countContractData(ContractBean bean) {
        return iMarkerDao.countContractData(bean);
    }

    @Override
    public List<ContractBean> getTableContractData(ContractBean bean) {
        return iMarkerDao.getTableContractData(bean);
    }

    @Override
    public int addContractInfo(ContractBean bean) {
        return iMarkerDao.addContractInfo(bean);
    }

    @Override
    public int editContractInfo(ContractBean bean) {
        return iMarkerDao.editContractInfo(bean);
    }

    @Override
    public int deleteContractInfo(int id) {
        return iMarkerDao.deleteContractInfo(id);
    }

    @Override
    public int lockInfo(int id) {
        return iMarkerDao.lockInfo(id);
    }

    @Override
    public int unlockInfo(int id) {
        return iMarkerDao.unlockInfo(id);
    }
}
