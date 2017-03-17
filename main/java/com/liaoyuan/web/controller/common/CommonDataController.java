package com.liaoyuan.web.controller.common;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.service.CommonDataService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

/**
 * Created by zj on 2017/3/14 0014
 * 公共维护数据
 */
@RestController
@RequestMapping(value = "/common")
@Slf4j
public class CommonDataController extends BaseController {

    @Autowired
    CommonDataService commonDataService;

    /**
     * 公共bean
     */
    private DataBean getCommonData(String jsonString) {
        DataBean bean = new DataBean();
        try {
            // 把参数 转换为Map
            Map<String, Object> params = jsonToMap(jsonString);
            int iDisplayLength = Integer.parseInt(params.get("iDisplayLength") + "");
            int iDisplayStart = Integer.parseInt(params.get("iDisplayStart") + "");
            int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal") + "");
            BeanUtils.populate(bean, params);
            bean.setIDisplayLength(iDisplayLength);
            bean.setIDisplayStart(iDisplayStart);
            bean.setIRecordsTotal(iRecordsTotal);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }

    @RequestMapping(value = "/cityPage", method = RequestMethod.GET)
    public ModelAndView cityData() {
        log.info("================cityData page==================");
        return new ModelAndView("/dataPage/cityData");
    }

    @RequestMapping(value = "/wellsPage", method = RequestMethod.GET)
    public ModelAndView wellsPage() {
        return new ModelAndView("/dataPage/wellsData");
    }

    @RequestMapping(value = "/provincePage", method = RequestMethod.GET)
    public ModelAndView provincePage() {
        return new ModelAndView("/dataPage/provinceData");
    }

    @RequestMapping(value = "/receivePage", method = RequestMethod.GET)
    public ModelAndView receivePage() {
        return new ModelAndView("/dataPage/receiveData");
    }

    @RequestMapping(value = "/sitePage", method = RequestMethod.GET)
    public ModelAndView sitePage() {
        return new ModelAndView("/dataPage/siteData");
    }

    @RequestMapping(value = "/fundPage", method = RequestMethod.GET)
    public ModelAndView fundPage() {
        return new ModelAndView("/dataPage/fundData");
    }

    @RequestMapping(value = "/industryPage", method = RequestMethod.GET)
    public ModelAndView industryPage() {
        return new ModelAndView("/dataPage/industryData");
    }

    @RequestMapping(value = "/coalPage", method = RequestMethod.GET)
    public ModelAndView coalPage() {
        return new ModelAndView("/dataPage/coalData");
    }

    @RequestMapping(value = "/platePage", method = RequestMethod.GET)
    public ModelAndView platePage() {
        return new ModelAndView("/dataPage/plateData");
    }


    @RequestMapping(value = "/freightPage", method = RequestMethod.GET)
    public ModelAndView freightPage(ModelMap modelMap) {
        List<DataBean> sites = commonDataService.getListData("site");
        modelMap.put("sites",sites);
        return new ModelAndView("/dataPage/freightData");
    }

    @RequestMapping(value = "/settlementPage", method = RequestMethod.GET)
    public ModelAndView settlementPage(ModelMap modelMap) {
        List<DataBean> funds = commonDataService.getListData("fund");
        List<DataBean> industrys = commonDataService.getListData("industry");
        List<DataBean> provinces = commonDataService.getListData("province");
        modelMap.put("funds",funds);
        modelMap.put("industrys",industrys);
        modelMap.put("provinces",provinces);
        return new ModelAndView("/dataPage/settlementData");
    }

    @RequestMapping(value = "/get_common_table", method = RequestMethod.POST)
    public void getUserDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DataBean bean = getCommonData(jsonString);
        int count = bean.getIRecordsTotal() == 0 ? commonDataService.countData(bean) : bean.getIRecordsTotal();
        List<DataBean> gridData = commonDataService.getTableData(bean);
        printDataTables(response, count, gridData);
    }


    @RequestMapping(value = "/addModeOne", method = RequestMethod.POST)
    public Integer addModeOne(DataBean bean) {
        return commonDataService.addModeOne(bean);
    }

    @RequestMapping(value = "/addModeTwo", method = RequestMethod.POST)
    public Integer addModeTwo(DataBean bean) {
        return commonDataService.addModelTwo(bean);
    }

    @RequestMapping(value = "/addCoal", method = RequestMethod.POST)
    public Integer addCoal(DataBean bean) {
        return commonDataService.addCoal(bean);
    }

    @RequestMapping(value = "/addFreight", method = RequestMethod.POST)
    public Integer addFreight(DataBean bean) {
        return commonDataService.addFreight(bean);
    }

    @RequestMapping(value = "/addSettlement", method = RequestMethod.POST)
    public Integer addSettlement(DataBean bean) {
        return commonDataService.addSettlement(bean);
    }


    @RequestMapping(value = "/editModeOne", method = RequestMethod.POST)
    public Integer editModeOne(DataBean bean) {
        return commonDataService.editModeOne(bean);
    }

    @RequestMapping(value = "/editModeTwo", method = RequestMethod.POST)
    public Integer editModeTwo(DataBean bean) {
        return commonDataService.editModelTwo(bean);
    }

    @RequestMapping(value = "/editCoal", method = RequestMethod.POST)
    public Integer editCoal(DataBean bean) {
        return commonDataService.editCoal(bean);
    }

    @RequestMapping(value = "/editFreight", method = RequestMethod.POST)
    public Integer editFreight(DataBean bean) {
        return commonDataService.editFreight(bean);
    }

    @RequestMapping(value = "/editSettlement", method = RequestMethod.POST)
    public Integer editSettlement(DataBean bean) {
        return commonDataService.editSettlement(bean);
    }

    @RequestMapping(value = "/deleteCommon", method = RequestMethod.POST)
    public Integer deleteCommon(int id, String model) {
        return commonDataService.deleteCommon(id, model);
    }

}
