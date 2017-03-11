package com.liaoyuan.web.controller.general;

import com.liaoyuan.web.controller.base.BaseController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/liaoyuan")
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


    @RequestMapping(value = "/homepage", method = RequestMethod.GET)
    public ModelAndView homepage(){
        //要判断是否登录
        System.out.println("=============homepage============");
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public ModelAndView main(){
        System.out.println("=============main============");
        return new ModelAndView("main");
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

    @RequestMapping(value = "/data", method = RequestMethod.GET)
    public ModelAndView showData(){
        log.debug("---------enter function {}  ,visit {}","showData","data");
        return new ModelAndView("/general/dataReport");
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
