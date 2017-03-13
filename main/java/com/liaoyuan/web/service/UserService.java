package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.UserBean;

import java.util.List;
import java.util.Map;

/**
 * Created by zj on 2017/3/13 0013
 */
public interface UserService {
    int countUsers(UserBean role);
    List<UserBean> selectUsers(UserBean user);

    int insertUser(UserBean user);
    int deleteUSer(int id);
    int editUser(UserBean user);
    Map<String,List<Permission>> getMenus(int roleId);

    UserBean getUserFromAccount(String account);
}
