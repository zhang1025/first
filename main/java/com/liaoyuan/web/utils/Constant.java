package com.liaoyuan.web.utils;


/**
 * Created by zj on 2017/3/13 0013
 */
public class Constant {
    /**
     * 维护信息表 table名字后缀 dm_coal
     */
    //煤种
    public static final String COAL = "coal";
    //站点
    public static final String SITE = "site";
    //井区
    public static final String WELLS = "wells";
    //城市
    public static final String CITY = "city";
    //省份
    public static final String PROVINCE = "province";
    //运费
    public static final String FREIGHT = "freight";
    //资金方式
    public static final String FUND = "fund";
    //行业名称
    public static final String INDUSTRY = "industry";
    //车牌信息
    public static final String PLATRNUMBER = "platenumber";
    //收货单位
    public static final String RECEIVE = "receive";
    //结算单位
    public static final String SETTLEMENT = "settlement";


    //打印 文件存放路径地址
//    public static final String FILEPTH = "C:\\printTest";
    public static final String FILEPTH = "/print/hetong";

    //用户密码加密key
    public static final String AES_ENCRYPT_KEY = "liaoyuan@data123";

    public static void main(String[] args) {
        String aa = AESUtil.encrypt("admin",AES_ENCRYPT_KEY);
        System.out.println("admin 加密="+aa);
        System.out.println("解密="+AESUtil.decrypt(aa,AES_ENCRYPT_KEY));
    }
}
