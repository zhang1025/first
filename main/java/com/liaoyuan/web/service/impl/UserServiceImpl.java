package com.liaoyuan.web.service.impl;


import com.liaoyuan.web.dao.IUserDao;
import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.UserBean;
import com.liaoyuan.web.service.UserService;
import com.liaoyuan.web.utils.AESUtil;
import com.liaoyuan.web.utils.Constant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zj on 2017/3/13 0013
 */
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    @Autowired
    IUserDao iUserDao;

    @Override
    public int countUsers(UserBean role) {
        return iUserDao.countUsers(role);
    }

    @Override
    public List<UserBean> selectUsers(UserBean user) {
        List<UserBean> list = iUserDao.selectUsers(user);
        for (UserBean bean : list) {
            bean.setPw(AESUtil.decrypt(bean.getPw(), Constant.AES_ENCRYPT_KEY));
        }
        return list;
    }

    @Override
    public int insertUser(UserBean user) {
        int rtn = iUserDao.alreadyUser(user);
        if(rtn > 0){
            return -1;
        }
        user.setPw(AESUtil.encrypt(user.getPw(),Constant.AES_ENCRYPT_KEY));
        return iUserDao.insertUser(user);
    }

    @Override
    public int deleteUSer(int id) {
        return iUserDao.deleteUSer(id);
    }

    @Override
    public int editUser(UserBean user) {
        int rtn = iUserDao.alreadyUser(user);
        if(rtn > 0){
            return -1;
        }
        user.setPw(AESUtil.encrypt(user.getPw(),Constant.AES_ENCRYPT_KEY));
        return iUserDao.editUser(user);
    }

    @Override
    public int editUserPw(UserBean user) {
        user.setPw(AESUtil.encrypt(user.getPw(),Constant.AES_ENCRYPT_KEY));
        return iUserDao.editUserPw(user);
    }


    /**
     * 通过account获取用户信息
     */
    @Override
    public UserBean getUserFromAccount(String account){
        return iUserDao.checkUser(account);
    }

    /**
     * 通过角色id获取用户的权限列表菜单
     */
    @Override
    public Map<String,List<Permission>> getMenus(int roleId,String account) {
        Map<String,List<Permission>> map = new LinkedHashMap<>();
        List<Permission> list = iUserDao.getMenus(roleId,account);
        List<Permission> menuEntityList;
        for (Permission permission : list) {
            if(map.containsKey(permission.getMenuName())){
                menuEntityList = map.get(permission.getMenuName());
                menuEntityList.add(permission);
            }else{
                menuEntityList = new ArrayList<>();
                menuEntityList.add(permission);
                map.put(permission.getMenuName(),menuEntityList);
            }
        }
        return map;
    }


    public  List<UserBean> getUsersInfo(){
        return iUserDao.getUsersInfo();
    }
}
