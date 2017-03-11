package com.liaoyuan.web.utils;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Properties;

/**
 * Created by zj on 2016/11/28 0028
 * 读取Properties 配置信息
 */
@Slf4j
public class PropertiesUtils {

    private static Properties properties;
    //记录文件修改时间
    private static long lastModified = 0;

    private static void init(){
        properties = new Properties();
        URL url = PropertiesUtils.class.getClassLoader().getResource("/config/httpUrl.properties");
        if(url == null){
            log.error("httpUrl.properties filePath is error");
        }else{
            String filePath = url.getPath();
            log.info("httpUrl.properties filePath is ",filePath);
            try {
                FileInputStream  fis = new FileInputStream(filePath);
                properties.load(fis);
            }catch (IOException e){
                log.error("httpUrl.properties filePath is error");
                e.printStackTrace();
            }
        }
    }
    public static String getPropertiesInfo(String key){
        if(properties == null || isPropertiesModified()){
            init();
        }
        return properties.get(key).toString();
    }
    //配置文件修改之后重新加载
    private static boolean isPropertiesModified(){
        URL url = PropertiesUtils.class.getClassLoader().getResource("/config/httpUrl.properties");
        if(url == null) {
            log.error("httpUrl.properties filePath is error");
            return false;
        }
        File file =  new File(url.getPath());
        long fileModified = file.lastModified();
        if(fileModified > lastModified){
            lastModified = fileModified;
            return true;
        }
        return false;
    }
}
