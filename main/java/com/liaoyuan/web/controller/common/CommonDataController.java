package com.liaoyuan.web.controller.common;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.service.CommonDataService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.beanutils.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    private DataBean getCommonData(String jsonString){
        DataBean bean = new DataBean();
        try {
            // 把参数 转换为Map
            Map<String, Object> params = jsonToMap(jsonString);
            int iDisplayLength = Integer.parseInt(params.get("iDisplayLength")+"");
            int iDisplayStart = Integer.parseInt(params.get("iDisplayStart")+"");
            int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal")+"");
            BeanUtils.populate(bean, params);
            bean.setIDisplayLength(iDisplayLength);
            bean.setIDisplayStart(iDisplayStart);
            bean.setIRecordsTotal(iRecordsTotal);
        }catch (Exception e){
            e.printStackTrace();
        }
        return bean;
    }
    @RequestMapping(value = "/cityPage", method = RequestMethod.GET)
    public ModelAndView cityData(){
        log.info("================cityData page==================");
        return new ModelAndView("/dataPage/cityData");
    }
    @RequestMapping(value = "/get_city_table", method = RequestMethod.POST)
    public void getUserDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DataBean bean = getCommonData(jsonString);
        int count = bean.getIRecordsTotal()== 0 ?commonDataService.countCity(bean): bean.getIRecordsTotal();
        List<DataBean> gridData = commonDataService.getTableCity(bean);
        printDataTables(response, count, gridData);
    }
    @RequestMapping(value = "/addCity", method = RequestMethod.POST)
    public Integer addCity(DataBean bean){
        return commonDataService.addCity(bean);
    }

    @RequestMapping(value = "/editCity", method = RequestMethod.POST)
    public Integer editCity(DataBean bean){
        return commonDataService.editCity(bean);
    }

    @RequestMapping(value = "/deleteCity", method = RequestMethod.POST)
    public Integer deleteCity(int id){
        return commonDataService.deleteCity(id);
    }

    /**
     * 井区
     */
    @RequestMapping(value = "/wellsPage", method = RequestMethod.GET)
    public ModelAndView wellsPage(){
        log.info("================cityData page==================");
        return new ModelAndView("/dataPage/wellsData");
    }
    @RequestMapping(value = "/get_wells_table", method = RequestMethod.POST)
    public void getwellsDataTable(HttpServletResponse response, @RequestParam("dt_json") String jsonString) throws Exception {
        DataBean bean = getCommonData(jsonString);
        int count = bean.getIRecordsTotal()== 0 ?commonDataService.countWells(bean): bean.getIRecordsTotal();
        List<DataBean> gridData = commonDataService.getTableWells(bean);
        printDataTables(response, count, gridData);
    }
}
