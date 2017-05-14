package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.DepositBean;

import java.util.List;

/**
 * Created by zj on 2017/4/11 0011.
 */
public interface CoalService {

    int countCoalDepositData(DepositBean bean);

    List<DepositBean> getDepositTableData(DepositBean bean);

    int depositTotal();
    int refundTotal();

    int addDepositInfo(DepositBean bean);

    int refundInfo(int id,String refund,String usePeople);
}
