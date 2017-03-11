package com.liaoyuan.web.utils;
/**
 * Created by Administrator on 2016/8/11
 */

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * ScheduleUtils
 * 定时工具类
 * @author pengyang@ledo.com
 * @date 2016/8/11
 */
@Component
public class ScheduleUtils {

    /**
     * 每天0点删除昨天的实时趋势图缓存数据
     */
    @Scheduled(cron="0 0 0 * * *")
    public void clearRealTimeTrendMap(){

    }
}
