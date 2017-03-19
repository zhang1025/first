package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.ContractBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Repository
public interface IMarkerDao {

    //合同信息
    int countContractData(ContractBean bean);
    List<ContractBean> getTableContractData(ContractBean bean);
    int addContractInfo(ContractBean bean);
    int editContractInfo(ContractBean bean);
    int deleteContractInfo(@Param(value = "id") int id);

    int lockInfo(@Param(value = "id") int id);
    int unlockInfo(@Param(value = "id") int id);
}
