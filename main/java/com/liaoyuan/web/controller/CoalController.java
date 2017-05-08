package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.service.CoalService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.WebCommonDataUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zj on 2017/4/11
 * 煤质管理
 */
@RestController
@RequestMapping("/coal")
@Slf4j
public class CoalController extends BaseController{

    @Autowired
    MarketService marketService;


    /**
     * 货运单操作页面
     */
    @RequestMapping(value = "/waybill", method = RequestMethod.GET)
    public ModelAndView waybill (){
        return new ModelAndView("/coal/waybill");
    }
    @RequestMapping(value = "/get_waybill_table", method = RequestMethod.POST)
    public void getPaymentTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        int count = 0;
        List<ContractBean> gridData = new ArrayList<>();
        printDataTables(response, count, gridData);
    }
    /**
     * 煤卡绑定页面
     */
    @RequestMapping(value = "/card", method = RequestMethod.GET)
    public ModelAndView card (){
        return new ModelAndView("/coal/card");
    }
    @RequestMapping(value = "/get_card_table", method = RequestMethod.POST)
    public void getCardTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        ContractBean bean = WebCommonDataUtils.getContractData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countContractData(bean) : bean.getIRecordsTotal();
        List<ContractBean> gridData = marketService.getTableContractData(bean);
        printDataTables(response, count, gridData);
    }
    /**
     * 煤卡押金页面
     */
    @RequestMapping(value = "/deposit", method = RequestMethod.GET)
    public ModelAndView deposit (){
        return new ModelAndView("/coal/deposit");
    }
    @RequestMapping(value = "/get_deposit_table", method = RequestMethod.POST)
    public void getDepositTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        int count = 0;
        List<ContractBean> gridData = new ArrayList<>();
        printDataTables(response, count, gridData);
    }

    @RequestMapping(value = "/bindingCard", method = RequestMethod.POST)
    public Integer bindingCard(int id,String coalCard) {
        return  marketService.bindlingCard(id,coalCard);
    }
    @RequestMapping(value = "/unBindingCard", method = RequestMethod.POST)
    public Integer unBindingCard(int id) {
        return  marketService.unBindingCard(id);
    }
}
