package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/12 0012
 */
@Data
public class UserBean {
    private int id;
    private String username;
    private String account;
    private String pw;
    private int roleId;
    private String roleName;
    private String email;
    private String tel;
    private int status;
}
