package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.UserBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/13 0013
 */
@Repository
public interface IUserDao {
    int countUsers(UserBean role);
    List<UserBean> selectUsers(UserBean user);
    int alreadyUser(UserBean user);
    int insertUser(UserBean user);
    int editUserPw(UserBean user);
    int deleteUSer(@Param("id") int id);
    int editUser(UserBean user);
    List<Permission> getMenus(@Param("roleId") int roleId,@Param("account") String account);
    UserBean checkUser(String account);
    List<UserBean> getUsersInfo();
}
