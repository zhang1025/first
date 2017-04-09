package com.liaoyuan.web.entity;

import com.liaoyuan.web.service.UserService;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by zj on 2017/3/13 0013
 */
@Data
@NoArgsConstructor
public class UserBean {

    public UserBean(String pw,String account){
        this.pw = pw;
        this.account = account;
    }

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
