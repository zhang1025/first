package com.liaoyuan.web.entity;

import lombok.Data;

/**
 * Created by zj on 2017/3/13 0013
 */
@Data
public class RoleBean {

    private int roleId;
    private String roleName;
    private String described;
    private int status;
    //分页用
    private int iDisplayStart;
    private int iDisplayLength;
    private int iRecordsTotal;
}
