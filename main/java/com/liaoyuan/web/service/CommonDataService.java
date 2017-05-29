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
*  三个表字段的 公用modelOne方法
*/
    
    public int countData(DataBean bean);

    
    public List<DataBean> getTableData(DataBean bean);
    


//井区 站点  省份 城市 字段一致的 
    
    public int addModeOne(DataBean bean) ;

    
//资金方式 行业 字段一致的 
    
    public int addModelTwo(DataBean bean);

        
    public int addCoal(DataBean bean);
           
    public int addFreight(DataBean bean) ;

           
    public int addSettlement(DataBean bean) ;

  
//井区 站点  省份 城市 字段一致的 
    
    public int editModeOne(DataBean bean) ;

    
//资金方式 行业 字段一致的 
    
    public int editModelTwo(DataBean bean) ;

        
    public int editCoal(DataBean bean);
           
    public int editFreight(DataBean bean);
           
    public int editSettlement(DataBean bean);

    DataBean getSettlementForRate(DataBean bean);

    

    
    public int deleteCommon(int id, String model);


    public List<DataBean> getListData(String model);

 //查询kuangqu ---矿区数据
 List<KuangquBean> getKuangquInfo();
 //查询车牌
 List<DataBean> getChepaiInfo();

 int addLogs(PayLogs logs);
}
