package com.liaoyuan.web.controller;


import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.SessionUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

/**
 * sso对接跳转的地址控制
 */
@RestController
@RequestMapping("/authc")
@Slf4j
public class AuthorityController extends BaseController {

    @Autowired
    private HttpSession httpSession;
    /**
     * 心跳检测
     * 页面停留事件过长，判断session是否已经失效
     */
    @RequestMapping(value = "/checkSession",method = RequestMethod.POST)
    public Map<String,Object> checkSession() {
        Map<String,Object> map = new HashMap<>();
        SessionUser sessionUser = (SessionUser)httpSession.getAttribute(SessionUser.SESSION_ROOT_KEY);
        map.put("status",sessionUser==null?-1:1);
        return map;
    }
}
