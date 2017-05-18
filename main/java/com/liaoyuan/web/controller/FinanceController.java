package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.*;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.FinanceService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.service.UserService;
import com.liaoyuan.web.utils.Constant;
import com.liaoyuan.web.utils.WebCommonDataUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
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
 * Created by zj on 2017/4/9 0009
 * 财务管理
 */
@RestController
@RequestMapping(value = "/finance")
@Slf4j
public class FinanceController extends BaseController {
    @Autowired
    CommonDataService commonDataService;

    @Autowired
    HttpSession httpSession;
    @Autowired
    MarketService marketService;
    @Autowired
    UserService userService;

    @Autowired
    FinanceService financeService;

    /**
     * 外运客户交款 页面
     */
    @RequestMapping(value = "/payment", method = RequestMethod.GET)
    public ModelAndView payment(ModelMap modelMap){
        log.info("=========财务====外运客户交款============");
        List<DataBean> st = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> funds = commonDataService.getListData(Constant.FUND);
        List<DataBean> sites = commonDataService.getListData(Constant.SITE);
        List<UserBean> users = userService.getUsersInfo();
        modelMap.put("users",users);
        modelMap.put("funds",funds);
        modelMap.put("settlements",st);
        modelMap.put("sites",sites);
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/finance/paymentPage");
    }
    @RequestMapping(value = "/get_payment_table", method = RequestMethod.POST)
    public void getPaymentTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        CustomerPayment bean = WebCommonDataUtils.getCustomerPaymentData(jsonString);
        int count =  bean.getIRecordsTotal() == 0 ? financeService.countPaymentData(bean):bean.getIRecordsTotal();
        List<CustomerPayment> gridData =financeService.getPaymentTableData(bean) ;
        printDataTables(response, count, gridData);
    }
    /**
     * 根据结算单位查询是否配置了相应税率
     */
    @RequestMapping(value = "/checkRate", method = RequestMethod.POST)
    public Integer checkRate(int id){
        DataBean bean = financeService.checkRate(id);
        if(null==bean || StringUtils.isBlank(bean.getRate()) || "0".equals(bean.getRate())){
            return -1;
        }
        return 1;
    }

    //添加客户交款信息
    @RequestMapping(value = "/addPaymentInfo", method = RequestMethod.POST)
    public Integer addPaymentInfo(CustomerPayment bean){
        DataBean dataBean = financeService.checkRate(Integer.parseInt(bean.getId()));
        int rtn = financeService.addPaymentInfo(bean,dataBean);
        if(rtn > 0){
            financeService.addLogs(new PayLogs(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)),
                    bean.getSettlement(),bean.getCurrentDeposit(),"新增客户交款信息"));
        }
        return rtn;
    }

    //追加交款信息
    @RequestMapping(value = "/appendPayInfo", method = RequestMethod.POST)
    public Integer appendPayInfo(int id,String appendPay){
        int rtn = financeService.appendPayInfo(id,appendPay);
        if(rtn > 0){
            financeService.addLogs(new PayLogs(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)),
                    "",appendPay,"追加--客户交款"+appendPay));
        }
        return rtn;
    }

    /**
     * 结算单 页面
     */
    @RequestMapping(value = "/balance", method = RequestMethod.GET)
    public ModelAndView balance(ModelMap modelMap){
        log.info("=========财务====结算单============");
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        List<DataBean> st = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> funds = commonDataService.getListData(Constant.FUND);
        modelMap.put("coals",coals);
        modelMap.put("funds",funds);
        modelMap.put("settlements",st);
        modelMap.put("receives",receiveName);//收货单位 客户
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/finance/balancePage");
    }

    @RequestMapping(value = "/get_balance_table", method = RequestMethod.POST)
    public void getBalanceTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        PlanBean bean = WebCommonDataUtils.getPlanData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
        List<PlanBean> gridData = marketService.getTableDayPlanData(bean);
        DataBean db ;
        //获取到日计划信息，重新组合数据  税率等信息
        for (PlanBean pb : gridData) {
            db = financeService.getRateInfoFromSettName(pb.getSettlement());
            pb.setActualSendedTotal(String.format("%.2f",
                    pb.getActualSendedTonnage()*pb.getActualUnitPrice()));
            pb.setRate(String.format("%.2f",
                    pb.getActualSendedTotal()*(db==null?0:Double.parseDouble(db.getRate()))));
            if(db==null){
                pb.setEntruck("0");
                pb.setShunting("0");
            }else{
                pb.setEntruck(String.format("%.2f",pb.getPlanTonnage()*Double.parseDouble(db.getEntruck())));
                pb.setShunting(String.format("%.2f",pb.getPlanTonnage()*Double.parseDouble(db.getShunting())));
            }

            db = financeService.selectRateFromFreight(pb.getSiteName(),String.valueOf(pb.getPlanTonnage()));
            pb.setCost(db==null?0:db.getCost());
        }
        printDataTables(response, count, gridData);
    }


    /**
     * 汇款单录入 页面
     */
    @RequestMapping(value = "/remit", method = RequestMethod.GET)
    public ModelAndView remit(ModelMap modelMap){
        log.info("=========财务====汇款单录入============");
        return new ModelAndView("/finance/remitPage");
    }
    @RequestMapping(value = "/get_remit_table", method = RequestMethod.POST)
    public void getRemitTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        int count = 0;
        List<ContractBean> gridData = new ArrayList<>();
        printDataTables(response, count, gridData);
    }

    /**
     * 地付信息管理页面
     */
    @RequestMapping(value = "/df", method = RequestMethod.GET)
    public ModelAndView contract(ModelMap modelMap){
        log.info("=========财务====合同管理============");
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> settlements = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> funds = commonDataService.getListData(Constant.FUND);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        modelMap.put("coals",coals);
        modelMap.put("settlements",settlements);
        modelMap.put("funds",funds);
        modelMap.put("receives",receiveName);//收货单位 客户
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/finance/contractPage");
    }

    //编辑添加财务信息
    @RequestMapping(value = "/editContractInfo", method = RequestMethod.POST)
    public Integer editContractInfo(ContractBean bean) {
        bean.setFinancePerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.editContractInfoForFinance(bean);
    }

    //更新审核状态
    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
    public Integer updateStatus(int id, int status) {
        return marketService.updateStatus(id,status);
    }
}
