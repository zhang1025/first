package com.liaoyuan.web.controller.market;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.entity.SessionUser;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
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
        List<DataBean> coals = commonDataService.getListData("coal");
        List<DataBean> settlements = commonDataService.getListData("settlement");
        modelMap.put("coals",coals);
        modelMap.put("settlements",settlements);
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
        return marketService.addContractInfo(bean);
    }
    @RequestMapping(value = "/editContractInfo", method = RequestMethod.POST)
    public Integer editContractInfo(ContractBean bean) {
        return marketService.editContractInfo(bean);
    }
    @RequestMapping(value = "/deleteContractInfo", method = RequestMethod.POST)
    public Integer deleteContractInfo(String id) {
        int rtn = 0;
        String[] args = id.split(",");
        for (String s : args) {
            if(marketService.deleteContractInfo(Integer.parseInt(s))>0){
                rtn++;
            }
        }
        return rtn==args.length?1:-1;
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

    @RequestMapping(value = "/monthPlan", method = RequestMethod.GET)
    public ModelAndView monthPlan(ModelMap modelMap){
        log.info("=============monthPlan============");
        modelMap.put("coals",commonDataService.getListData("coal"));
        modelMap.put("sites",commonDataService.getListData("site"));
        modelMap.put("receives",commonDataService.getListData("receive"));
        modelMap.put("wells",commonDataService.getListData("wells"));
        modelMap.put("settlements",commonDataService.getListData("settlement"));
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/market/monthPlanPage");
    }

    @RequestMapping(value = "/dayPlan", method = RequestMethod.GET)
    public ModelAndView dayPlan(){
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
        printDataTables(response, count, gridData);
    }
    @RequestMapping(value = "/addMonthPlan", method = RequestMethod.POST)
    public Integer addMonthPlan(PlanBean bean) {
        return marketService.addMonthPlan(bean);
    }
    @RequestMapping(value = "/editMonthPlan", method = RequestMethod.POST)
    public Integer editMonthPlan(PlanBean bean) {
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
        return marketService.addDayPlan(bean);
    }
    @RequestMapping(value = "/editDayPlan", method = RequestMethod.POST)
    public Integer editDayPlan(PlanBean bean) {
        return marketService.editDayPlan(bean);
    }
    //删除日计划
    @RequestMapping(value = "/deleteDayPlan", method = RequestMethod.POST)
    public Integer deleteDayPlan(int id) {
        return marketService.deleteDayPlan(id);
    }


    /**
     *导出 合同 excel数据
     */
    @RequestMapping(value = "/export_excel_data", method = RequestMethod.GET)
    public void exportData(ContractBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
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
        int count;
        List<PlanBean> gridData;  String fileName;
        if(bean.getSearchType().equals("month")){
            count = bean.getIRecordsTotal() == 0 ? marketService.countMonthPlanData(bean) : bean.getIRecordsTotal();
            bean.setIDisplayLength(count);
            gridData = marketService.getTableMonthPlanData(bean);
            columnnames = DataTableUtils.getExcelPlanColumnName();
            datas = DataTableUtils.getExcelPlanDataLists(gridData);
            fileName = URLEncoder.encode("外运月计划信息数据", "utf-8")+".xls";
        }else{
            count = bean.getIRecordsTotal() == 0 ? marketService.countDayPlanData(bean) : bean.getIRecordsTotal();
            bean.setIDisplayLength(count);
            gridData = marketService.getTableDayPlanData(bean);
            columnnames = DataTableUtils.getExcelPlanColumnName();
            datas = DataTableUtils.getExcelPlanDataLists(gridData);
            fileName = URLEncoder.encode("外运日计划信息数据", "utf-8")+".xls";
        }
        ExcelUtils.exportExcel(columnnames,datas,fileName,response);
    }
}
