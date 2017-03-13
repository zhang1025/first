package com.liaoyuan.web.controller.manager;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.RoleBean;
import com.liaoyuan.web.entity.UserBean;
import com.liaoyuan.web.service.RoleService;
import com.liaoyuan.web.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by zj on 2017/3/13 0013
 */
@RestController
@RequestMapping(value = "/system")
@Slf4j
public class SystemController extends BaseController {
    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;


    @RequestMapping(value = "/show_user_page", method = RequestMethod.GET)
    public ModelAndView showUsers(ModelMap modelMap){
        log.info("================showUsers page==================");
        List<RoleBean> list = roleService.listRoles();
        modelMap.put("roles", list);
        return new ModelAndView("/system/user");
    }

    /**
     * @param jsonString 参数
     * @throws Exception
     */
    @RequestMapping(value = "/get_users_table", method = RequestMethod.POST)
    public void getUserDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        // 把参数 转换为Map
        Map<String, Object> params = jsonToMap(jsonString);
        UserBean bean = new UserBean();
        int iDisplayLength = Integer.parseInt(params.get("iDisplayLength")+"");
        int iDisplayStart = Integer.parseInt(params.get("iDisplayStart")+"");
        int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal")+"");
        BeanUtils.populate(bean, params);
        bean.setIDisplayLength(iDisplayLength);
        bean.setIDisplayStart(iDisplayStart);
        bean.setIRecordsTotal(iRecordsTotal);
        int count = bean.getIRecordsTotal()== 0 ?userService.countUsers(bean): bean.getIRecordsTotal();
        List<UserBean> gridData = userService.selectUsers(bean);
        printDataTables(response, count, gridData);
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public Integer addUser(UserBean bean){
        return userService.insertUser(bean);
    }

    @RequestMapping(value = "/editUser", method = RequestMethod.POST)
    public Integer editUser(UserBean bean){
        return userService.editUser(bean);
    }

    @RequestMapping(value = "/deleteUser", method = RequestMethod.POST)
    public Integer deleteUser(int id){
        return userService.deleteUSer(id);
    }






    @RequestMapping(value = "/show_role_page", method = RequestMethod.GET)
    public ModelAndView showRoles(ModelMap modelMap){
        log.info("================showRoles page==================");
        List<RoleBean> list = roleService.listRoles();
        modelMap.put("roles", list);
        return new ModelAndView("/system/role");
    }
    /**
     * @param jsonString 参数
     * @throws Exception
     */
    @RequestMapping(value = "/get_roles_table", method = RequestMethod.POST)
    public void getRoleDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        // 把参数 转换为Map
        Map<String, Object> params = jsonToMap(jsonString);
        RoleBean bean = new RoleBean();
        int iDisplayLength = Integer.parseInt(params.get("iDisplayLength")+"");
        int iDisplayStart = Integer.parseInt(params.get("iDisplayStart")+"");
        int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal")+"");
        BeanUtils.populate(bean, params);
        bean.setIDisplayLength(iDisplayLength);
        bean.setIDisplayStart(iDisplayStart);
        bean.setIRecordsTotal(iRecordsTotal);
        int count = bean.getIRecordsTotal()== 0 ?roleService.countRoles(bean): bean.getIRecordsTotal();
        List<RoleBean> gridData = roleService.selectRoles(bean);
        printDataTables(response, count, gridData);
    }
    @RequestMapping(value = "/addRole", method = RequestMethod.POST)
    public Integer addRole(RoleBean bean){
        return roleService.insertRole(bean);
    }

    @RequestMapping(value = "/editRole", method = RequestMethod.POST)
    public Integer editRole(RoleBean bean){
        return roleService.editRole(bean);
    }

    @RequestMapping(value = "/deleteRole", method = RequestMethod.POST)
    public Integer deleteRole(int id){
        return roleService.deleteRole(id);
    }


    @RequestMapping(value = "/getBindPermission", method = RequestMethod.POST)
    public List<Permission> getBindPermission(int roleId){
        return  roleService.selectBindPermission(roleId);
    }

    @RequestMapping(value = "/getUnbindPermission", method = RequestMethod.POST)
    public List<Permission> getUnbindPermission(int roleId){
        return  roleService.selectUnbindPermission(roleId);
    }

    @RequestMapping(value = "/bind_permissions", method = RequestMethod.POST)
    public Integer bindPermission(int roleId,String permissionIds){
        int result = 0;
        if (StringUtils.isBlank(permissionIds)){
            return result;
        }
        return roleService.insertPermission(roleId,permissionIds);
    }

    @RequestMapping(value = "/unbind_permissions", method = RequestMethod.POST)
    public Integer unbindPermission(int roleId,String permissionIds){
        int result = 0;
        if (StringUtils.isBlank(permissionIds)){
            return result;
        }
        return roleService.deletePermission(roleId,permissionIds);
    }
}
