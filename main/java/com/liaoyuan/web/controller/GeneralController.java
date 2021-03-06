package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.Permission;
import com.liaoyuan.web.entity.SessionUser;
import com.liaoyuan.web.entity.UserBean;
import com.liaoyuan.web.service.UserService;
import com.liaoyuan.web.utils.AESUtil;
import com.liaoyuan.web.utils.Constant;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/general")
@Slf4j
public class GeneralController extends BaseController {

    @Autowired
    HttpSession httpSession;

    @Autowired
    UserService userService;


    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView index(){
        System.out.println("=============login============");
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ModelAndView logout(){
        httpSession.removeAttribute(SessionUser.SESSION_ROOT_KEY);
        httpSession.removeAttribute(SessionUser.SESSION_USER);
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/submit_login", method = RequestMethod.POST)
    public Integer login(String account, String pw){
        UserBean bean =  userService.getUserFromAccount(StringUtils.trim(account));
        if(bean == null){
           return -1;
        }
        if(!StringUtils.trim(pw).equals(AESUtil.decrypt(bean.getPw(), Constant.AES_ENCRYPT_KEY))){
            return -2;
        }
        SessionUser sessionUser = (SessionUser)httpSession.getAttribute(SessionUser.SESSION_ROOT_KEY);
        if(sessionUser == null ){
            sessionUser = new SessionUser();
        }
        sessionUser.setBean(bean);
        httpSession.setAttribute(SessionUser.SESSION_ROOT_KEY,sessionUser);
        httpSession.setAttribute(SessionUser.SESSION_USER,account);
        //获取该用户的权限菜单
        Map<String,List<Permission>> map = userService.getMenus(bean.getRoleId());
        if(map==null || map.size()<=0){
            return -3;
        }
        sessionUser.setMenuMap(map);
        return 1;
    }


    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView homepage(){
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public ModelAndView welcome(){
        return new ModelAndView("welcome");
    }
    /**
     * 登陆错误页面 无权限
     */
    @RequestMapping(value = "/loginErr", method = RequestMethod.GET)
    public ModelAndView loginErr(){
        System.out.println("=============loginErr============");
        return new ModelAndView("login_err");
    }

    @RequestMapping(value = "/updatePw", method = RequestMethod.POST)
    public Integer updatePw(String oldPw,String newPw1) {
        String account = (String)httpSession.getAttribute(SessionUser.SESSION_USER);
        UserBean bean =  userService.getUserFromAccount(account);
        if(bean == null){
           return  -1;
        }
        if(!oldPw.equals(AESUtil.decrypt(bean.getPw(), Constant.AES_ENCRYPT_KEY))){
          return -2;
        }
        return userService.editUserPw(new UserBean(newPw1,account));
    }

    //header
    @RequestMapping(value = "/updatePwPage", method = RequestMethod.GET)
    public ModelAndView showHeader(){
        log.debug("---------enter function {}  ,visit {}","showHeader","header");
        return new ModelAndView("updatePw");
    }
    /**
     * 获取数据报表对应的平台数据
     * @param jsonString 参数
     * @throws Exception
     */
    @RequestMapping(value = "/get_data_table", method = RequestMethod.POST)
    public void getDataTable( HttpServletResponse response,
                             @RequestParam("dt_json") String jsonString)  throws Exception {
        log.debug("-----------enter function {}  ,visit {}---------","get_data_table","getDataTable");
        printDataTables(response, 0, new ArrayList());
    }

}
