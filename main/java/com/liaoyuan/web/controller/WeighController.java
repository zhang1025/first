package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zj on 2017/4/11
 * 地付过磅管理
 */
@RestController
@RequestMapping(value = "/weigh")
@Slf4j
public class WeighController extends BaseController {

    /**
     * 空车称重 页面
     */
    @RequestMapping(value = "/emptyWeight", method = RequestMethod.GET)
    public ModelAndView payment(ModelMap modelMap){
        log.info("=========地付过磅管理====空车称重============");
        return new ModelAndView("/weigh/emptyWeightPage");
    }
    @RequestMapping(value = "/get_emptyWeight_table", method = RequestMethod.POST)
    public void getEmptyWeightTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        int count = 0;
        List<ContractBean> gridData = new ArrayList<>();
        printDataTables(response, count, gridData);
    }

    /**
     * 发运明细 页面
     */
    @RequestMapping(value = "/shippingDetails", method = RequestMethod.GET)
    public ModelAndView shippingDetails(ModelMap modelMap){
        return new ModelAndView("/weigh/shippingDetails");
    }
    @RequestMapping(value = "/get_shippingDetails_table", method = RequestMethod.POST)
    public void getShippingDetailsTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        int count = 0;
        List<ContractBean> gridData = new ArrayList<>();
        printDataTables(response, count, gridData);
    }
}
