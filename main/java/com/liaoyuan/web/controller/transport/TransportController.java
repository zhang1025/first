package com.liaoyuan.web.controller.transport;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.DiaoyunBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.service.TransportService;
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
import java.util.List;

/**
 * Created by zj on 2017/3/26 0026
 * 调运管理
 */
@RestController
@RequestMapping(value = "/transport")
@Slf4j
public class TransportController extends BaseController {

    @Autowired
    CommonDataService commonDataService;

    @Autowired
    HttpSession httpSession;
    @Autowired
    MarketService marketService;

    @Autowired
    TransportService transportService;

    /**
     * 查看日计划页面
     */
    @RequestMapping(value = "/dayPlan", method = RequestMethod.GET)
    public ModelAndView dayPlan(ModelMap modelMap){
        modelMap.put("wells",commonDataService.getListData(Constant.WELLS));
        modelMap.put("coals",commonDataService.getListData(Constant.COAL));
        modelMap.put("receives",commonDataService.getListData(Constant.RECEIVE));
        return new ModelAndView("/transport/showDayPlans");
    }

    /**
     * 发车调运页面
     */
    @RequestMapping(value = "/cars", method = RequestMethod.GET)
    public ModelAndView cars(ModelMap modelMap){
//        modelMap.put("wells",commonDataService.getListData(Constant.WELLS));
//        modelMap.put("coals",commonDataService.getListData(Constant.COAL));
//        modelMap.put("sites",commonDataService.getListData(Constant.SITE));
        modelMap.put("receives",commonDataService.getListData(Constant.RECEIVE));
        return new ModelAndView("/transport/dealDayPlanPage");
    }
    /**
     * 日计划table
     */
    @RequestMapping(value = "/get_plans_table", method = RequestMethod.POST)
    public void getMonthPlansTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        PlanBean bean = WebCommonDataUtils.getPlanData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
        List<PlanBean> gridData = marketService.getTableDayPlanData(bean);
        printDataTables(response, count, gridData);
    }

    /**
     * 根据日计划id获取对应的调运信息table
     */
    @RequestMapping(value = "/get_diaoyunInfo_table", method = RequestMethod.POST)
    public void getDiaoyunInfo_table(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DiaoyunBean bean = WebCommonDataUtils.getDiaoyunBean(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? transportService.countDealPlanData(bean.getDayId()) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<DiaoyunBean> gridData = transportService.getTableDealPlanData(bean);
        printDataTables(response, count, gridData);
    }

    /**
     * 调运 安排发车
     */
    @RequestMapping(value = "/addDealDayPlan", method = RequestMethod.POST)
    public Integer addDealDayPlan(DiaoyunBean bean) {
        return transportService.addDealDayPlan(bean);
    }
    /**
     * 编辑调运信息
     */
    @RequestMapping(value = "/editDealDayPlan", method = RequestMethod.POST)
    public Integer editDealDayPlan(DiaoyunBean bean) {
        return transportService.editDealDayPlan(bean);
    }
    /**
     * 发送调运计划  更改状态 已传
     */
    @RequestMapping(value = "/dealStatusDayPlan", method = RequestMethod.POST)
    public Integer dealStatusDayPlan(DiaoyunBean bean) {
        return transportService.dealStatusDayPlan(bean);
    }
}
