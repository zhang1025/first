package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/13 0013
 */
@Data
public class UserBean {
    private int id;
    private String account;
    private String pw;
    private int roleId;
    private String roleName;
    private String department;
    private String email;
    private String type;
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}