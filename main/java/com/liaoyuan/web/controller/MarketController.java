package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.entity.SessionUser;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.Constant;
import com.liaoyuan.web.utils.DataTableUtils;
import com.liaoyuan.web.utils.ExcelUtils;
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
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by zj on 2017/3/18 0018
 * 销售管理
 */
@RestController
@RequestMapping(value = "/market")
@Slf4j
public class MarketController extends BaseController {

    @Autowired
    CommonDataService commonDataService;

    @Autowired
    HttpSession httpSession;
    @Autowired
    MarketService marketService;
    /**
     * 合同管理
     */
    @RequestMapping(value = "/contract", method = RequestMethod.GET)
    public ModelAndView contract(ModelMap modelMap){
        log.info("=============合同管理============");
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> settlements = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        List<DataBean> wells = commonDataService.getListData(Constant.WELLS);
        modelMap.put("wells",wells);
        modelMap.put("coals",coals);
        modelMap.put("settlements",settlements);//结算单位
        modelMap.put("receives",receiveName);//收货单位 客户
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/market/contractPage");
    }
    @RequestMapping(value = "/get_contract_table", method = RequestMethod.POST)
    public void getUserDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        ContractBean bean = WebCommonDataUtils.getContractData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countContractData(bean) : bean.getIRecordsTotal();
        List<ContractBean> gridData = marketService.getTableContractData(bean);
        printDataTables(response, count, gridData);
    }
    @RequestMapping(value = "/addContractInfo", method = RequestMethod.POST)
    public Integer addContractInfo(ContractBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.addContractInfo(bean);
    }
    @RequestMapping(value = "/editContractInfo", method = RequestMethod.POST)
    public Integer editContractInfo(ContractBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.editContractInfo(bean);
    }
    @RequestMapping(value = "/deleteContractInfo", method = RequestMethod.POST)
    public Integer deleteContractInfo(String id) {
        return  marketService.deleteContractInfo(Integer.parseInt(id));
    }
    @RequestMapping(value = "/balanceContractInfo", method = RequestMethod.POST)
    public Integer balanceContractInfo(String id) {
        return  marketService.balanceContractInfo(Integer.parseInt(id));
    }

    /**
     * 根据id获取合同信息
     */
    @RequestMapping(value = "/getInfoFromId", method = RequestMethod.POST)
    public ContractBean getInfoFromId(String id) {
        return  marketService.getContractInfoFromId(Integer.parseInt(id));
    }

    @RequestMapping(value = "/lockInfo", method = RequestMethod.POST)
    public Integer lockInfo(String id,int type) {
        int rtn = 0;
        if(type ==1){ //锁定
            for (String s : id.split(",")) {
                if(marketService.lockInfo(Integer.parseInt(s))>0){
                    rtn++;
                }
            }
            return rtn;
        }
        if(type == 2){
            for (String s : id.split(",")) {
                if(marketService.unlockInfo(Integer.parseInt(s))>0){
                    rtn++;
                }
            }
            return rtn;
        }
        return -1;
    }

    /**
     * 打印合同信息
     */
    @RequestMapping(value = "/printInfo", method = RequestMethod.POST)
    public int printInfo(int id) {
        return marketService.printContractInfo(id);
    }
    @RequestMapping(value = "/monthPlan", method = RequestMethod.GET)
    public ModelAndView monthPlan(ModelMap modelMap){
        log.info("=============monthPlan============");
        modelMap.put("coals",commonDataService.getListData(Constant.COAL));
        modelMap.put("sites",commonDataService.getListData(Constant.SITE));
        modelMap.put("receives",commonDataService.getListData(Constant.RECEIVE));
        modelMap.put("wells",commonDataService.getListData(Constant.WELLS));
        modelMap.put("settlements",commonDataService.getListData(Constant.SETTLEMENT));
        modelMap.put("funds",commonDataService.getListData(Constant.FUND));
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/market/monthPlanPage");
    }
    /**
     * 日计划页面
     * @return
     */
    @RequestMapping(value = "/dayPlan", method = RequestMethod.GET)
    public ModelAndView dayPlan(ModelMap modelMap){
        modelMap.put("wells",commonDataService.getListData(Constant.WELLS));
        modelMap.put("coals",commonDataService.getListData(Constant.COAL));
        return new ModelAndView("/market/dayPlanPage");
    }
    /**
     * 月计划 日计划管理
     */
    @RequestMapping(value = "/get_plans_table", method = RequestMethod.POST)
    public void getMonthPlansTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        PlanBean bean = WebCommonDataUtils.getPlanData(jsonString);
        int count = 0;
        List<PlanBean> gridData = new ArrayList<>();

        if(bean!=null && bean.getSearchType().equals("month")){
            count = bean.getIRecordsTotal() == 0 ? marketService.countMonthPlanData(bean) : bean.getIRecordsTotal();
            gridData = marketService.getTableMonthPlanData(bean);
        }
        if(bean!=null && bean.getSearchType().equals("day")){
            count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
            gridData = marketService.getTableDayPlanData(bean);
        }
        //展示某一个月计划对应的日计划信息  不分页 最后一行显示合并信息
        if(bean!=null && bean.getSearchType().equals("dayNoPage")){
            count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
            bean.setIDisplayLength(count);//不分页  显示全部
            gridData = marketService.getTableDayPlanData(bean);
        }
        printDataTables(response, count, gridData);
    }
    @RequestMapping(value = "/addMonthPlan", method = RequestMethod.POST)
    public Integer addMonthPlan(PlanBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.addMonthPlan(bean);
    }
    @RequestMapping(value = "/editMonthPlan", method = RequestMethod.POST)
    public Integer editMonthPlan(PlanBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.editMonthPlan(bean);
    }

    @RequestMapping(value = "/stopMonthPlan", method = RequestMethod.POST)
    public Integer stopMonthPlan(String id) {
        int rtn = 0;
        String[] args = id.split(",");
        for (String s : args) {
            if(marketService.stopMonthPlan(Integer.parseInt(s))>0){
                rtn++;
            }
        }
        return rtn==args.length?1:-1;
    }
    @RequestMapping(value = "/deleteMonthPlan", method = RequestMethod.POST)
    public Integer deleteMonthPlan(String id) {
        int rtn = 0;
        String[] args = id.split(",");
        for (String s : args) {
            if(marketService.deleteMonthPlan(Integer.parseInt(s))>0){
                rtn++;
            }
        }
        return rtn==args.length?1:-1;
    }

    //添加日计划
    @RequestMapping(value = "/addDayPlan", method = RequestMethod.POST)
    public Integer addDayPlan(PlanBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.addDayPlan(bean);
    }
    @RequestMapping(value = "/editDayPlan", method = RequestMethod.POST)
    public Integer editDayPlan(PlanBean bean) {
        bean.setInputPerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.editDayPlan(bean);
    }
    //删除日计划
    @RequestMapping(value = "/deleteDayPlan", method = RequestMethod.POST)
    public Integer deleteDayPlan(int id) {
        return marketService.deleteDayPlan(id);
    }

    //中止对应月计划的昨日计划
    @RequestMapping(value = "/stopDayPlan", method = RequestMethod.POST)
    public Integer stopDayPlan(int monthId) {
        return marketService.stopDayPlan(monthId);
    }

    /**
     * 日计划页面
     */
    @RequestMapping(value = "/contrastInfo", method = RequestMethod.GET)
    public ModelAndView contrastInfo(ModelMap modelMap){
        modelMap.put("wells",commonDataService.getListData(Constant.WELLS));
        modelMap.put("coals",commonDataService.getListData(Constant.COAL));
        return new ModelAndView("/market/contrastPage");
    }

    /**
     *导出 合同 excel数据
     */
    @RequestMapping(value = "/export_excel_data", method = RequestMethod.GET)
    public void exportData(ContractBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        int count = bean.getIRecordsTotal() == 0 ? marketService.countContractData(bean) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<ContractBean> gridData = marketService.getTableContractData(bean);
        columnnames = DataTableUtils.getExcelHTColumnName();
        List<List<Object>> datas = DataTableUtils.getExcelHTDataLists(gridData);
        String fileName = URLEncoder.encode("合同信息数据", "utf-8")+".xls";
        ExcelUtils.exportExcel(columnnames,datas,fileName,response);
    }

    /**
     *导出 外运月计划excel数据
     */
    @RequestMapping(value = "/export_plan_excel_data", method = RequestMethod.GET)
    public void exportPlanData(PlanBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        List<List<Object>> datas ;
        String excelName = "";
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        int count;
        List<PlanBean> gridData;  String fileName;
        if(bean.getSearchType().equals("month")){
            excelName = "外运月计划信息数据";
            count = bean.getIRecordsTotal() == 0 ? marketService.countMonthPlanData(bean) : bean.getIRecordsTotal();
            bean.setIDisplayLength(count);
            gridData = marketService.getTableMonthPlanData(bean);
            if("contrast".equals(bean.getExcelType())){
                excelName = "计划与发出对比信息";
                columnnames = DataTableUtils.getExcelPlanDBColumnName();
                datas = DataTableUtils.getExcelPlanDBDataLists(gridData);
            }else{
                columnnames = DataTableUtils.getExcelPlanColumnName();
                datas = DataTableUtils.getExcelPlanDataLists(gridData);
            }
            fileName = URLEncoder.encode(excelName, "utf-8")+".xls";
        }else{
            count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
            bean.setIDisplayLength(count);
            gridData = marketService.getTableDayPlanData(bean);
            columnnames = DataTableUtils.getExcelPlanColumnName();
            datas = DataTableUtils.getExcelPlanDataLists(gridData);
            fileName = URLEncoder.encode("外运销售日计划信息数据", "utf-8")+".xls";
        }
        ExcelUtils.exportExcel(columnnames,datas,fileName,response);
    }
}
