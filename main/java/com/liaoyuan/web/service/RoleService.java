package com.liaoyuan.web.service;

import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.RoleBean;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by zj on 2017/3/13 0013
 */
public interface RoleService {

    List<RoleBean> listRoles();

    int countRoles(RoleBean role);
    List<RoleBean> selectRoles(RoleBean role);

    int insertRole(RoleBean role);
    int deleteRole(int roleId);
    int editRole(RoleBean role);
    int selectPermissionsOfRole(@Param("roleId") int roleId);
    List<Permission> selectBindPermission(int roleId);
    List<Permission> selectUnbindPermission(int roleId);
    int insertPermission(int roleId, String permissionIds);
    int deletePermission(int roleId, String permissionIds);
}
