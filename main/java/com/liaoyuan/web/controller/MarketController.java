package com.liaoyuan.web.controller;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.*;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.*;
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
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    //退款 结账
    @RequestMapping(value = "/balanceContractInfo", method = RequestMethod.POST)
    public Integer balanceContractInfo(String id,String remarks1) {
        int rtn = marketService.balanceContractInfo(Integer.parseInt(id));
        if(rtn > 0){
            commonDataService.addLogs(new PayLogs(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)),
                    "销售部门","合同结算",remarks1));
        }
        return  rtn;
    }
    /**
     * 调整价格
     * 更改原来的合同作废，在原来的合同里应该是有那个sendCount这个，
     * 这个是按照发出去的煤更新的，重新插入一条合同信息，然后价格就写调整后的价格，
     * 如果是再交钱的，就直接吨数是原合同还没拉走的吨数；
     * 如果是余额折算，则吨数直接就变为剩余款项/调整后的价格
     */
    @RequestMapping(value = "/updatePriceInfo", method = RequestMethod.POST)
    public Integer updatePriceInfo(int id,String remarks2,
                                   double currentPrize ,int subType){
        int rtn =  marketService.updatePriceInfo(id,currentPrize,subType);
        if(rtn > 0){
            commonDataService.addLogs(new PayLogs(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)),
                    "销售部门","调整价格",remarks2));
        }
        return rtn;
    }
    //追加合同  增加吨数
    @RequestMapping(value = "/addTonnageContractInfo", method = RequestMethod.POST)
    public Integer addTonnageContractInfo(int id,String addTonnage,String remarks3){
        int rtn =  marketService.addTonnageContractInfo(id,addTonnage);
        if(rtn > 0){
            commonDataService.addLogs(new PayLogs(String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)),
                    "销售部门","增补合同",remarks3));
        }
        return rtn;
    }
    /**
     * 根据id获取合同信息
     */
    @RequestMapping(value = "/getInfoFromId", method = RequestMethod.POST)
    public ContractBean getInfoFromId(String id) {
        ContractBean bean = marketService.getContractInfoFromId(Integer.parseInt(id));
        DecimalFormat df  =new DecimalFormat("#.00");
        bean.setPrepaidAmount(Double.parseDouble(df.format(bean.getOrderCount()*bean.getUnitPrice())));
        bean.setSendPrice(Double.parseDouble(df.format(bean.getSendCount()*bean.getUnitPrice())));
        bean.setLeftCount(bean.getOrderCount()-bean.getSendCount());
        bean.setLeftPrice(bean.getPrepaidAmount()-bean.getSendPrice());
        bean.setCreatetime(bean.getCreatetime().substring(0,10));
        return  bean;
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
     *导出 地付煤明细 excel数据
     */
    @RequestMapping(value = "/export_detailExcel_data", method = RequestMethod.GET)
    public void exportDetailData(ContractBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        int count = bean.getIRecordsTotal() == 0 ? marketService.countContractData(bean) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<ContractBean> gridData = marketService.getTableDetailContractData(bean);
        if(null!=gridData && !gridData.isEmpty()){
            ContractBean newCb = new ContractBean();
            newCb.setSettlement("合计");
            double dunshu=0;
            double meikuan=0;
            double shuijin=0;
            double diaoche=0;
            double zhuangche=0;
            double heji=0;
            for (ContractBean cb : gridData) {
                dunshu += cb.getOrderCount();
                meikuan +=cb.getPrepaidAmount();
                shuijin += cb.getTaxation();
                diaoche += cb.getShunting();
                zhuangche += cb.getEntruck();
                heji += StringUtils.isBlank(cb.getAllMoney())?0:Double.parseDouble(cb.getAllMoney());
            }
            newCb.setOrderCount(dunshu);
            newCb.setPrepaidAmount(meikuan);
            newCb.setTaxation(shuijin+"");
            newCb.setShunting(diaoche+"");
            newCb.setEntruck(zhuangche+"");
            newCb.setAllMoney(heji+"");
            gridData.add(newCb);
        }
        columnnames = DataTableUtils.getExcelHTDeailColumnName();
        List<List<Object>> datas = DataTableUtils.getExcelHTDetailDataLists(gridData);
        String fileName = URLEncoder.encode("地付煤明细信息数据", "utf-8")+".xls";
        Map<String,String> map = new HashMap<>();
        map.put("title","地付煤明细信息数据");
        map.put("date",bean.getBeginDate().substring(0,10)+" ~ "+bean.getEndDate().substring(0,10));
        ExcelTitleUtils.exportExcel(columnnames,datas,fileName,response,map);
    }

    /**
     *导出 应收与发出汇总 excel数据
     * 要根据结算单位查出来他都有什么品种的煤
     */
    @RequestMapping(value = "/export_receiveExcel_data", method = RequestMethod.GET)
    public void exportReceiveData(ContractBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        int count = bean.getIRecordsTotal() == 0 ? marketService.countContractData(bean) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<ContractBean> gridData = marketService.getTableDetailContractData(bean);

        if(null!=gridData && !gridData.isEmpty()){
            ContractBean newCb = new ContractBean();
            newCb.setSettlement("合计");
            double dunshu=0;
            double meikuan=0;
            double shuijin=0;
            double diaoche=0;
            double zhuangche=0;
            double heji=0;
            for (ContractBean cb : gridData) {
                dunshu += cb.getOrderCount();
                meikuan +=cb.getPrepaidAmount();
                shuijin += cb.getTaxation();
                diaoche += cb.getShunting();
                zhuangche += cb.getEntruck();
                heji += StringUtils.isBlank(cb.getAllMoney())?0:Double.parseDouble(cb.getAllMoney());
            }
            newCb.setOrderCount(dunshu);
            newCb.setPrepaidAmount(meikuan);
            newCb.setTaxation(shuijin+"");
            newCb.setShunting(diaoche+"");
            newCb.setEntruck(zhuangche+"");
            newCb.setAllMoney(heji+"");
            gridData.add(newCb);
        }
        Map<String,Double> map = new HashMap<>();
        //品种
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        if(null != coals && coals.size()>0){
            for (DataBean dataBean : coals) {
                map.put(dataBean.getName(),0.0);
            }
        }
        columnnames = DataTableUtils.getExcelReceiveDeailColumnName(map);
        List<List<Object>> datas = DataTableUtils.getExcelReceiveDetailDataLists(gridData,map);
        String fileName = URLEncoder.encode("应收账款发出汇总信息数据", "utf-8")+".xls";
        Map<String,String> maptitle = new HashMap<>();
        maptitle.put("title","应收账款发出汇总信息数据");
        maptitle.put("date",bean.getBeginDate().substring(0,10)+" ~ "+bean.getEndDate().substring(0,10));
        ExcelTitleUtils.exportExcel(columnnames,datas,fileName,response,maptitle);
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
        if("month".equals(bean.getSearchType())){
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

    //地付实时数据（重车轻车情况运煤情况）
    @RequestMapping(value = "/realData", method = RequestMethod.GET)
    public ModelAndView chengzhong(ModelMap modelMap){
        log.info("=============重车轻车情况运煤情况============");
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> wells = commonDataService.getListData(Constant.WELLS);
        List<DataBean> receiveName = commonDataService.getListData(Constant.RECEIVE);
        List<KuangquBean> kuangqus = commonDataService.getKuangquInfo();
        List<DataBean> chepais = commonDataService.getChepaiInfo();
        modelMap.put("coals",coals);
        modelMap.put("wells",wells);//井别
        modelMap.put("chepais",chepais);//车牌
        modelMap.put("kuangqus",kuangqus);//矿区 -- 磅房
        modelMap.put("receives",receiveName);//收货单位 客户
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/market/chezhong");
    }
    @RequestMapping(value = "/get_chezhong_table", method = RequestMethod.POST)
    public void getChengzhongDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        ChengzhongBean bean = WebCommonDataUtils.getChezhongData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countChengzhongData(bean) : bean.getIRecordsTotal();
        List<ChengzhongBean> gridData = marketService.getTableChengzhongData(bean);
        printDataTables(response, count, gridData);
    }

    /**
     * excel数据
     */
    @RequestMapping(value = "/export_chezhong_excel_data", method = RequestMethod.GET)
    public void exportChezhongDetailData(ChengzhongBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        if(StringUtils.isNotBlank(bean.getReceiveName())){
            bean.setReceiveName(URLDecoder.decode(bean.getReceiveName(), "UTF-8"));
        }
        if(StringUtils.isNotBlank(bean.getName())){
            bean.setName(URLDecoder.decode(bean.getName(), "UTF-8"));
        }
        if(StringUtils.isNotBlank(bean.getKuangqu())){
            bean.setKuangqu(URLDecoder.decode(bean.getKuangqu(), "UTF-8"));
        }
        int count = bean.getIRecordsTotal() == 0 ? marketService.countChengzhongData(bean) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<ChengzhongBean> gridData = marketService.getTableChengzhongData(bean);
        columnnames = DataTableUtils.getExcelChezhongColumnName();
        List<List<Object>> datas = DataTableUtils.getExcelChezhongDataLists(gridData);
        String fileName = URLEncoder.encode("地付实时数据", "utf-8")+".xls";
        Map<String,String> map = new HashMap<>();
        map.put("title","地付实时数据（重车轻车情况运煤情况）");
        map.put("date",bean.getBeginDate().substring(0,10)+" ~ "+bean.getEndDate().substring(0,10));
        ExcelTitleUtils.exportExcel(columnnames,datas,fileName,response,map);
    }

    /**
     * 调运信息
     */
    @RequestMapping(value = "/get_diaoyun_table", method = RequestMethod.POST)
    public void getDiaoyunDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DiaoyunBean bean = WebCommonDataUtils.getDiaoyunBean(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? marketService.countDiaoyunData(bean) : bean.getIRecordsTotal();
        List<DiaoyunBean> gridData = marketService.getDiaoyunListData(bean);
        printDataTables(response, count, gridData);
    }

    /**
     * excel数据
     */
    @RequestMapping(value = "/export_diaoyun_excel_data", method = RequestMethod.GET)
    public void exportDiaoyunDetailData(DiaoyunBean bean,HttpServletResponse response) throws Exception{
        List<String> columnnames ;
        bean.setEndDate(bean.getEndDate()+" 23:59:59");
        if(StringUtils.isNotBlank(bean.getName())){
            bean.setName(URLDecoder.decode(bean.getName(), "UTF-8"));
        }
        if(StringUtils.isNotBlank(bean.getCoalName())){
            bean.setCoalName(URLDecoder.decode(bean.getCoalName(), "UTF-8"));
        }
        if(StringUtils.isNotBlank(bean.getWellsName())){
            bean.setWellsName(URLDecoder.decode(bean.getWellsName(), "UTF-8"));
        }
        int count = bean.getIRecordsTotal() == 0 ? marketService.countDiaoyunData(bean) : bean.getIRecordsTotal();
        bean.setIDisplayLength(count);
        List<DiaoyunBean> gridData = marketService.getDiaoyunListData(bean);
        columnnames = DataTableUtils.getExcelDiaoyunColumnName();
        List<List<Object>> datas = DataTableUtils.getExcelDiaoyunDataLists(gridData);
        String fileName = URLEncoder.encode("外运实时数据", "utf-8")+".xls";
        Map<String,String> map = new HashMap<>();
        map.put("title","外运实时数据（火车发货基本数据）");
        map.put("date",bean.getBeginDate().substring(0,10)+" ~ "+bean.getEndDate().substring(0,10));
        ExcelTitleUtils.exportExcel(columnnames,datas,fileName,response,map);
    }
}
