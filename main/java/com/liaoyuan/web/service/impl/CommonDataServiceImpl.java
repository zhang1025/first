package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ICommonDataDao;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.service.CommonDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by zj on 2017/3/14
 */
@Service
public class CommonDataServiceImpl implements CommonDataService {

    @Autowired
    ICommonDataDao iCommonDataDao;

    @Override
    public int countCity(DataBean bean) {
        return iCommonDataDao.countCity(bean);
    }

    @Override
    public int countCoal(DataBean bean) {
        return iCommonDataDao.countCoal(bean);
    }

    @Override
    public int countFreight(DataBean bean) {
        return 0;
    }

    @Override
    public int countFund(DataBean bean) {
        return 0;
    }

    @Override
    public int countIndustry(DataBean bean) {
        return 0;
    }

    @Override
    public int countProvince(DataBean bean) {
        return 0;
    }

    @Override
    public int countReceive(DataBean bean) {
        return 0;
    }

    @Override
    public int countSettlement(DataBean bean) {
        return 0;
    }

    @Override
    public int countSite(DataBean bean) {
        return 0;
    }

    @Override
    public int countWells(DataBean bean) {
        return iCommonDataDao.countWells(bean);
    }

    @Override
    public List<DataBean> getTableCity(DataBean bean) {
        return iCommonDataDao.getTableCity(bean);
    }

    @Override
    public List<DataBean> getTableCoal(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableFreight(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableFund(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableIndustry(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableProvince(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableReceive(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableSettlement(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableSite(DataBean bean) {
        return null;
    }

    @Override
    public List<DataBean> getTableWells(DataBean bean) {
        return iCommonDataDao.getTableWells(bean);
    }

    @Override
    public int addCity(DataBean bean) {
        return iCommonDataDao.addCity(bean);
    }

    @Override
    public int addCoal(DataBean bean) {
        return 0;
    }

    @Override
    public int addFreight(DataBean bean) {
        return 0;
    }

    @Override
    public int addFund(DataBean bean) {
        return 0;
    }

    @Override
    public int addIndustry(DataBean bean) {
        return 0;
    }

    @Override
    public int addProvince(DataBean bean) {
        return 0;
    }

    @Override
    public int addReceive(DataBean bean) {
        return 0;
    }

    @Override
    public int addSettlement(DataBean bean) {
        return 0;
    }

    @Override
    public int addSite(DataBean bean) {
        return 0;
    }

    @Override
    public int addWells(DataBean bean) {
        return iCommonDataDao.addWells(bean);
    }

    @Override
    public int editCity(DataBean bean) {
        return 0;
    }

    @Override
    public int editCoal(DataBean bean) {
        return 0;
    }

    @Override
    public int editFreight(DataBean bean) {
        return 0;
    }

    @Override
    public int editFund(DataBean bean) {
        return 0;
    }

    @Override
    public int editIndustry(DataBean bean) {
        return 0;
    }

    @Override
    public int editProvince(DataBean bean) {
        return 0;
    }

    @Override
    public int editReceive(DataBean bean) {
        return 0;
    }

    @Override
    public int editSettlement(DataBean bean) {
        return 0;
    }

    @Override
    public int editSite(DataBean bean) {
        return 0;
    }

    @Override
    public int editWells(DataBean bean) {
        return iCommonDataDao.editWells(bean);
    }

    @Override
    public int deleteCity( int id) {
        return iCommonDataDao.deleteCity(id);
    }

    @Override
    public int deleteCoal( int id) {
        return iCommonDataDao.deleteCoal(id);
    }

    @Override
    public int deleteFreight( int id) {
        return 0;
    }

    @Override
    public int deleteFund( int id) {
        return 0;
    }

    @Override
    public int deleteIndustry( int id) {
        return 0;
    }

    @Override
    public int deleteProvince( int id) {
        return 0;
    }

    @Override
    public int deleteReceive( int id) {
        return 0;
    }

    @Override
    public int deleteSettlement( int id) {
        return 0;
    }

    @Override
    public int deleteSite( int id) {
        return 0;
    }

    @Override
    public int deleteWells( int id) {
        return iCommonDataDao.deleteWells(id);
    }
}
