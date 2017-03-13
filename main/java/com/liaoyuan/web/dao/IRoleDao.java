package com.liaoyuan.web.dao;

import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.RoleBean;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by zj on 2017/3/13 0013
 */
@Repository
public interface IRoleDao {

    //角色列表
    List<RoleBean> listRoles();

    //table
    int countRoles(RoleBean role);
    List<RoleBean> selectRoles(RoleBean role);

    int alreadyRole(RoleBean role);
    int insertRole(RoleBean role);
    int deleteRole(@Param("roleId") int roleId);
    int editRole(RoleBean role);
    int selectPermissionsOfRole(@Param("roleId") int roleId);
    List<Permission> selectBindPermission(@Param("roleId") int roleId);
    List<Permission> selectUnbindPermission(@Param("roleId") int roleId);
    int insertPermission(@Param("roleId") int roleId,@Param("permissionId") int permissionId);
    int deletePermission(@Param("roleId") int roleId,@Param("permissionId") int permissionId);

}
