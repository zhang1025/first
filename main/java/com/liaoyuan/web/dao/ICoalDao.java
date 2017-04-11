package com.liaoyuan.web.dao;

import org.springframework.stereotype.Repository;

/**
 * Created by zj on 2017/4/11
 * 煤质管理
 */
@Repository
public interface ICoalDao {

    int countCoalData();

    int addCoalInfo();
}
