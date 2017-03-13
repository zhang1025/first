package com.liaoyuan.web.utils;

/**
 * Created by zj on 2017/3/13 0013.
 */
public class Constant {
    //用户密码加密key
    public static final String AES_ENCRYPT_KEY = "liaoyuan@data123";

    public static void main(String[] args) {
        String aa = AESUtil.encrypt("admin",AES_ENCRYPT_KEY);
        System.out.println("admin 加密="+aa);
        System.out.println("解密="+AESUtil.decrypt(aa,AES_ENCRYPT_KEY));
    }
}
