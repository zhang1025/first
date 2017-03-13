package com.liaoyuan.web.service.impl;


import com.liaoyuan.web.dao.IRoleDao;
import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.RoleBean;
import com.liaoyuan.web.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zj on 2017/3/13 0013
 */
@Service
@Slf4j
public class RoleServiceImpl implements RoleService {

    @Autowired
    IRoleDao iRoleDao;

    @Override
    public List<RoleBean> listRoles(){
        return iRoleDao.listRoles();
    }

    @Override
    public int countRoles(RoleBean role) {
        return iRoleDao.countRoles(role);
    }

    @Override
    public List<RoleBean> selectRoles(RoleBean role) {
        return iRoleDao.selectRoles(role);
    }

    @Override
    public int insertRole(RoleBean role) {
        int rtn = iRoleDao.alreadyRole(role);
        if(rtn > 0){
            return -1;
        }
        return iRoleDao.insertRole(role);
    }

    @Override
    public int deleteRole(int roleId) {
        return iRoleDao.deleteRole(roleId);
    }

    @Override
    public int editRole(RoleBean role) {
        int rtn = iRoleDao.alreadyRole(role);
        if(rtn > 0){
            return -1;
        }
        return iRoleDao.editRole(role);
    }

    @Override
    public int selectPermissionsOfRole(int roleId){
        return iRoleDao.selectPermissionsOfRole(roleId);
    }
    @Override
    public List<Permission> selectBindPermission(int roleId) {
        List<Permission> list = iRoleDao.selectBindPermission(roleId);
        if (CollectionUtils.isEmpty(list)) {
            log.debug("selectBindPermission can not find any row");
            return new ArrayList<>();
        }
        return list;
    }

    @Override
    public List<Permission> selectUnbindPermission(int roleId) {
        List<Permission> list = iRoleDao.selectUnbindPermission(roleId);
        if (CollectionUtils.isEmpty(list)) {
            log.debug("selectUnbindPermission can not find any row");
            return new ArrayList<>();
        }
        return list;
    }

    @Override
    public int insertPermission(int roleId, String permissionIds) {
        List<Integer> permissionIdList = stringsToIntegerList(permissionIds);
        int rtn = 0;int records = 0;
        for (Integer permission : permissionIdList) {
            records = iRoleDao.insertPermission(roleId,permission);
            if(records > 0){
                rtn ++;
            }
        }
        if (rtn != permissionIdList.size()){
            throw new RuntimeException();
        }
        return rtn;
    }

    @Override
    public int deletePermission(int roleId, String permissionIds) {
        List<Integer> permissionIdList = stringsToIntegerList(permissionIds);
        int rtn = 0;int records = 0;
        for (Integer permission : permissionIdList) {
            records = iRoleDao.deletePermission(roleId,permission);
            if(records > 0){
                rtn ++;
            }
        }
        if (rtn != permissionIdList.size()){
            throw new RuntimeException();
        }
        return rtn;
    }

    /**
     * 将字符串转换成集合
     *
     * @param strings
     *            以逗号分割的字符串
     * @return 具体日期
     */
    public static List<Integer> stringsToIntegerList(String strings) {
        List<Integer> integerList = new ArrayList<>();
        if (strings == null)
            return integerList;
        if (!strings.contains(",")) {
            integerList.add(Integer.parseInt(strings));
        } else {
            String[] stringList = strings.split(",");
            for (int i = 0; i < stringList.length; i++) {
                integerList.add(Integer.parseInt(stringList[i]));
            }
        }

        return integerList;
    }
}
