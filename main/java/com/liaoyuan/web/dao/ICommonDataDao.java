package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.DataBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/14 0014
 */
@Repository
 public interface ICommonDataDao {


    
     int countData(DataBean bean);

    
     List<DataBean> getTableData(DataBean bean);
    


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


     int alreadyNameAdd(DataBean bean);

     int alreadyNameEdit(DataBean bean);

    
     int deleteCommon(@Param("id") int id, @Param("table") String model);

     List<DataBean> getListData(@Param("table") String model);
}
