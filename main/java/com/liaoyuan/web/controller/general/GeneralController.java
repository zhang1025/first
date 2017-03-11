package com.liaoyuan.web.controller.general;

import com.liaoyuan.web.controller.base.BaseController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/test")
@Slf4j
public class GeneralController extends BaseController {

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public ModelAndView index(){
        System.out.println("=============index============");
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Map login(String user, String pw){
        Map<String,Object> result = new HashMap<>();
        if("admin".equals(user) ){
            result.put("status",1);
        }else{
            result.put("status",0);
        }
        return result;
    }


    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public ModelAndView main(){
        System.out.println("=============main============");
        return new ModelAndView("index");
    }
    /**
     * 登陆错误页面
     * @return
     */
    @RequestMapping(value = "/loginErr", method = RequestMethod.GET)
    public ModelAndView loginErr(){
        System.out.println("=============loginErr============");
        return new ModelAndView("login_err");
    }

}
