package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ICommonDataDao;
import com.liaoyuan.web.entity.ChepaiBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.KuangquBean;
import com.liaoyuan.web.entity.PayLogs;
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
    public int countData(DataBean bean) {
        bean = dealBean(bean);
        if(bean.getModel().contains("freight")){//运费表信息
            return iCommonDataDao.countFreight(bean);
        }
        if(bean.getModel().contains("settlement")){//结算单位表
            return iCommonDataDao.countSettlement(bean);
        }
        return iCommonDataDao.countData(bean);
    }


    @Override
    public List<DataBean> getTableData(DataBean bean) {
        bean = dealBean(bean);
        if(bean.getModel().contains("freight")){//运费表信息
            return iCommonDataDao.getTableFreight(bean);
        }
        if(bean.getModel().contains("settlement")){//结算单位表
            return iCommonDataDao.getTableSettlement(bean);
        }
        return iCommonDataDao.getTableData(bean);
    }

    //封装bean
    private DataBean dealBean(DataBean bean) {
        bean.setTable("dm_" + bean.getModel());
        return bean;
    }


    //name值是否存在
    public boolean isAlreadyExist(DataBean bean,int type) {
        bean = dealBean(bean);
        if(type==1){//添加时
            return iCommonDataDao.alreadyNameAdd(bean) > 0;
        }else{
            return iCommonDataDao.alreadyNameEdit(bean) > 0;
        }

    }

    /**
     * 三个表字段的 公用modelOne方法
     */
    //井区 站点  省份 城市 字段一致的
    @Override
    public int addModeOne(DataBean bean) {
        if (isAlreadyExist(bean,1)) {
            return -1;
        }
        return iCommonDataDao.addModeOne(bean);
    }


    //资金方式 行业 字段一致的  一个字段的
    @Override
    public int addModelTwo(DataBean bean) {
        if (isAlreadyExist(bean,1)) {
            return -1;
        }
        return iCommonDataDao.addModelTwo(bean);
    }

    @Override
    public int addCoal(DataBean bean) {
        if (isAlreadyExist(bean,1)) {
            return -1;
        }
        return iCommonDataDao.addCoal(bean);
    }

    @Override
    public int addFreight(DataBean bean) {
        bean = dealBean(bean);
        return iCommonDataDao.addFreight(bean);
    }

    @Override
    public int addSettlement(DataBean bean) {
        if (isAlreadyExist(bean,1)) {
            return -1;
        }
        return iCommonDataDao.addSettlement(bean);
    }


    //井区 站点  省份 城市 字段一致的
    @Override
    public int editModeOne(DataBean bean) {
        if (isAlreadyExist(bean,0)) {
            return -1;
        }
        return iCommonDataDao.editModeOne(bean);
    }


    //资金方式 行业 字段一致的
    @Override
    public int editModelTwo(DataBean bean) {
        if (isAlreadyExist(bean,0)) {
            return -1;
        }
        return iCommonDataDao.editModelTwo(bean);
    }

    @Override
    public int editCoal(DataBean bean) {
        if (isAlreadyExist(bean,0)) {
            return -1;
        }
        return iCommonDataDao.editCoal(bean);
    }

    @Override
    public int editFreight(DataBean bean) {
        bean = dealBean(bean);
        return iCommonDataDao.editFreight(bean);
    }

    @Override
    public int editSettlement(DataBean bean) {
        if (isAlreadyExist(bean,0)) {
            return -1;
        }
        return iCommonDataDao.editSettlement(bean);
    }


    //查询kuangqu ---矿区数据
    public List<KuangquBean> getKuangquInfo(){
        return iCommonDataDao.getKuangquInfo();
    }

    public List<DataBean> getChepaiInfo(){
        return iCommonDataDao.getChepaiInfo();
    }

    public DataBean getSettlementForRate(DataBean bean){
       return iCommonDataDao.getSettlementForRate(bean);
    }
    @Override
    public int deleteCommon(int id, String model) {
        return iCommonDataDao.deleteCommon(id, "dm_" + model);
    }

    //获取list数据 方便select填充
    public List<DataBean> getListData(String model) {
        return iCommonDataDao.getListData("dm_" + model);
    }
    public int addLogs(PayLogs logs){
        return iCommonDataDao.addLogs(logs);
    }

}
