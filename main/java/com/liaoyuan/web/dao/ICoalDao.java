package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.DepositBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/4/11
 * 煤质管理
 */
@Repository
public interface ICoalDao {

    int countCoalDepositData(DepositBean bean);

    List<DepositBean> getDepositTableData(DepositBean bean);

    int depositTotal();
    int refundTotal();

    int addDepositInfo(DepositBean bean);

    int refundInfo(@Param("id")int id,@Param("backPeople")String backPeople,@Param("usePeople")String usePeople);
}
