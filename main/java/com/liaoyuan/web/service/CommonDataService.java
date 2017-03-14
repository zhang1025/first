package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.*;
import com.liaoyuan.web.entity.DataBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zj on 2017/3/14
 */
public interface CommonDataService {
    /**
     * 查找
     */
    int countCity(DataBean bean);
    int countCoal(DataBean bean);
    int countFreight(DataBean bean);
    int countFund(DataBean bean);
    int countIndustry(DataBean bean);
    int countProvince(DataBean bean);
    int countReceive(DataBean bean);
    int countSettlement(DataBean bean);
    int countSite(DataBean bean);
    int countWells(DataBean bean);

    List<DataBean> getTableCity(DataBean bean);
    List<DataBean> getTableCoal(DataBean bean);
    List<DataBean> getTableFreight(DataBean bean);
    List<DataBean> getTableFund(DataBean bean);
    List<DataBean> getTableIndustry(DataBean bean);
    List<DataBean> getTableProvince(DataBean bean);
    List<DataBean> getTableReceive(DataBean bean);
    List<DataBean> getTableSettlement(DataBean bean);
    List<DataBean> getTableSite(DataBean bean);
    List<DataBean> getTableWells(DataBean bean);

    /**
     * 增加
     */
    int addCity(DataBean bean);
    int addCoal(DataBean bean);
    int addFreight(DataBean bean);
    int addFund(DataBean bean);
    int addIndustry(DataBean bean);
    int addProvince(DataBean bean);
    int addReceive(DataBean bean);
    int addSettlement(DataBean bean);
    int addSite(DataBean bean);
    int addWells(DataBean bean);

    /**
     * 編輯
     */
    int editCity(DataBean bean);
    int editCoal(DataBean bean);
    int editFreight(DataBean bean);
    int editFund(DataBean bean);
    int editIndustry(DataBean bean);
    int editProvince(DataBean bean);
    int editReceive(DataBean bean);
    int editSettlement(DataBean bean);
    int editSite(DataBean bean);
    int editWells(DataBean bean);

    /**
     * 刪除
     */
    int deleteCity(@Param(value = "id") int id);
    int deleteCoal(@Param(value = "id") int id);
    int deleteFreight(@Param(value = "id") int id);
    int deleteFund(@Param(value = "id") int id);
    int deleteIndustry(@Param(value = "id") int id);
    int deleteProvince(@Param(value = "id") int id);
    int deleteReceive(@Param(value = "id") int id);
    int deleteSettlement(@Param(value = "id") int id);
    int deleteSite(@Param(value = "id") int id);
    int deleteWells(@Param(value = "id") int id);
}
