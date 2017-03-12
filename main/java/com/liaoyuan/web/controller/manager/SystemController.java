package com.liaoyuan.web.controller.manager;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.BaseQueryBean;
import com.liaoyuan.web.utils.JsonParserUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Map;

/**
 * Created by zj on 2017/3/12
 * 权限后台管理
 */
@RestController
@RequestMapping("/system")
@Slf4j
public class SystemController extends BaseController{
    @Autowired
    private HttpSession session;

    /**
     * user列表
     */
    @RequestMapping(value = "/show_user_page", method = RequestMethod.GET)
    public ModelAndView userPage() {

        return new ModelAndView("/system/user");
    }

    @RequestMapping(value = "/get_user_table", method = RequestMethod.POST)
    public void getDataTable(HttpServletResponse response,
                             @RequestParam("dt_json") String jsonString)   throws Exception {
        // 把参数 转换为Map
        Map<String, Object> params = jsonToMap(jsonString);
        BaseQueryBean bean = JsonParserUtil.getBaseBeanFromMap(params);
        //分页的总记录数没必要每次都查，获取url中的总数参数判断是否需要查询
//        int count = bean.getIRecordsTotal()== 0 ?iReportDataService.getPlatReportDataCount(bean): bean.getIRecordsTotal();
//        List<ReportData> gridData = iReportDataService.getReportDataPlatGrid(bean);
        printDataTables(response, 0, new ArrayList());
    }
    /**
     * 添加user
     */
    @RequestMapping(value = "/addUser", method = RequestMethod.POST)
    public int addUser() {

        return 1;
    }
    /**
     * 编辑user
     */
    @RequestMapping(value = "/editUser", method = RequestMethod.POST)
    public int editUser() {

        return 1;
    }
    @RequestMapping(value = "/delUser", method = RequestMethod.POST)
    public int delUser() {

        return 1;
    }

    /**
     * 角色列表
     */
    @RequestMapping(value = "/show_role_page", method = RequestMethod.GET)
    public ModelAndView RolePage() {

        return new ModelAndView("/system/role");
    }
    @RequestMapping(value = "/get_role_table", method = RequestMethod.POST)
    public void getRoleDataTable( HttpServletResponse response,
                             @RequestParam("dt_json") String jsonString)   throws Exception {
        log.debug("-----------enter function {} ,visit {}---------","get_role_table","getRoleDataTable");
        // 把参数 转换为Map
        Map<String, Object> params = jsonToMap(jsonString);
        BaseQueryBean bean = JsonParserUtil.getBaseBeanFromMap(params);
        //分页的总记录数没必要每次都查，获取url中的总数参数判断是否需要查询
//        int count = bean.getIRecordsTotal()== 0 ?iReportDataService.getPlatReportDataCount(bean): bean.getIRecordsTotal();
//        List<ReportData> gridData = iReportDataService.getReportDataPlatGrid(bean);
        printDataTables(response, 0, new ArrayList());
    }
    /**
     * 添加role
     */
    @RequestMapping(value = "/addRole", method = RequestMethod.POST)
    public int addRole() {

        return 1;
    }
    /**
     * 编辑role
     */
    @RequestMapping(value = "/editRole", method = RequestMethod.POST)
    public int editRole() {

        return 1;
    }
    @RequestMapping(value = "/delRole", method = RequestMethod.POST)
    public int delRole() {

        return 1;
    }
}
