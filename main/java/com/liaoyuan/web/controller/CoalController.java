package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.DepositBean;
import com.liaoyuan.web.entity.SessionUser;
import com.liaoyuan.web.service.CoalService;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.Constant;
import com.liaoyuan.web.utils.WebCommonDataUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
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

    @Autowired
    CoalService coalService;

    @Autowired
    CommonDataService commonDataService;

    @Autowired
    HttpSession httpSession;


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
    public ModelAndView card (ModelMap modelMap){
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        modelMap.put("coals",coals);
        modelMap.put("receives",receiveName);//收货单位 客户
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
    public ModelAndView deposit (ModelMap modelMap){
        List<DataBean> settlements = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        modelMap.put("settlements",settlements);//结算单位
        modelMap.put("receives",receiveName);//收货单位 客户
        return new ModelAndView("/coal/deposit");
    }
    @RequestMapping(value = "/bindingCard", method = RequestMethod.POST)
    public Integer bindingCard(int id,String coalCard,String money,String numNo) {
        return  marketService.bindlingCard(id,coalCard,money,numNo);
    }
    @RequestMapping(value = "/unBindingCard", method = RequestMethod.POST)
    public Integer unBindingCard(int id) {
        return  marketService.unBindingCard(id);
    }


    @RequestMapping(value = "/get_deposit_table", method = RequestMethod.POST)
    public void getDepositTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DepositBean bean = WebCommonDataUtils.getDepositBean(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? coalService.countCoalDepositData(bean) : bean.getIRecordsTotal();
        List<DepositBean> gridData = coalService.getDepositTableData(bean);
        printDataTables(response, count, gridData);
    }
    //提交缴款信息
    @RequestMapping(value = "/depositSubmit", method = RequestMethod.POST)
    public Integer depositSubmit(DepositBean bean){
        bean.setInputPerson(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return coalService.addDepositInfo(bean);
    }
    //退款
    @RequestMapping(value = "/refund", method = RequestMethod.POST)
    public Integer refund(int id,String refundPeople){
        return coalService.refundInfo(id,refundPeople,String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
    }

    //总缴费
    @RequestMapping(value = "/total", method = RequestMethod.POST)
    public Integer total(){
        return coalService.depositTotal();
    }
    //剩余
    @RequestMapping(value = "/surplus", method = RequestMethod.POST)
    public Integer surplus(){
        return coalService.refundTotal();
    }
}
