package com.liaoyuan.web.utils;

import javax.servlet.http.HttpServletRequest;
import java.util.regex.Pattern;

/**
 * Created by machaozhe on 2016-08-16.
 */
public class IpUtils {

    /**
     * ip(v4)检查格式的正则表达式
     */
    private static final String rule = "((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))";

    private static int INDEX = 2;

    private static int POWER = 26;

    private IpUtils(){}

    /**
     * ip匹配检查
     * @param ip
     * @return
     */
    public static boolean ipCheck(String ip) {
        return Pattern.matches(rule, ip);
    }

    /**
     * ip转换成十进制数
     * @param ip
     * @return
     */
    public static long transformIPtoNumber(String ip) {
        long result = 0;
        //是否是一个合法ip
        if(!ipCheck(ip)){
            return result;
        }
        String[] ips = ip.toString().split("\\.");
        for (int i = 0; i < ips.length; i++) {
            result += Integer.valueOf(ips[i]) * Math.pow(256, ips.length - 1 - i);
        }
        return result;
    }

    /**
     * 计算ip所在MySQL的分区
     * @param ip
     * @return
     */
    public static int calculatePartitions(long ip){

        return (int) (ip/Math.pow(INDEX, POWER)) + 1;
    }

    /**
     * 获取真实的IP地址(由于代理的原因无法获得真实IP)
     * @param request
     * @return
     */
    public static String gerRealIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        if (ip == null || ip.length() == 0){
            ip = "where is your IP";
        }
        return ip;
    }
}
