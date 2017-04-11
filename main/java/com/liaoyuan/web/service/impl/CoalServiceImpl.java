package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.ICoalDao;
import com.liaoyuan.web.service.CoalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by zj on 2017/4/11
 */
@Service
public class CoalServiceImpl implements CoalService {

    @Autowired
    ICoalDao iCoalDao;

    @Override
    public int countCoalData() {
        return 0;
    }

    @Override
    public int addCoalInfo() {
        return 0;
    }
}
