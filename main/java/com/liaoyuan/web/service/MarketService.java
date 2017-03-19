package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.ContractBean;

import java.util.List;

/**
 * Created by zj on 2017/3/19 0019
 */
public interface MarketService {

    //合同信息
    int countContractData(ContractBean bean);
    List<ContractBean> getTableContractData(ContractBean bean);

    int addContractInfo(ContractBean bean);
    int editContractInfo(ContractBean bean);
    int deleteContractInfo(int id);

    int lockInfo(int id);
    int unlockInfo(int id);
}
