package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PayLogs;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/14 0014
 */
@Repository
public interface ICommonDataDao {


    
    //维护数据功能查询信息获取 
     int countData(DataBean bean);

    
     List<DataBean> getTableData(DataBean bean);



//运费表信息获取 
     int countFreight(DataBean bean);

    
     List<DataBean> getTableFreight(DataBean bean);
    

//结算表信息获取 
     int countSettlement(DataBean bean);

    
     List<DataBean> getTableSettlement(DataBean bean);


//井区 站点  省份 城市 字段一致的 
    
     int addModeOne(DataBean bean) ;

    
//资金方式 行业 字段一致的 
    
     int addModelTwo(DataBean bean);

        
     int addCoal(DataBean bean);
           
     int addFreight(DataBean bean) ;

           
     int addSettlement(DataBean bean) ;

  
//井区 站点  省份 城市 字段一致的 
    
     int editModeOne(DataBean bean) ;

    
//资金方式 行业 字段一致的 
    
     int editModelTwo(DataBean bean) ;

        
     int editCoal(DataBean bean);
           
     int editFreight(DataBean bean);
           
     int editSettlement(DataBean bean);
     DataBean getSettlementForRate(DataBean bean);


     int alreadyNameAdd(DataBean bean);
     int alreadyNameEdit(DataBean bean);
    
     int deleteCommon(@Param("id") int id, @Param("table") String model);

     List<DataBean> getListData(@Param("table") String model);

     // 根据name获取对应的信息
     DataBean getInfoFromName(@Param("table") String model,@Param("name") String name);

     int addLogs(PayLogs logs);
}
