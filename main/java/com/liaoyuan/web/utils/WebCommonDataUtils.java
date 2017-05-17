package com.liaoyuan.web.utils;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.*;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.codec.binary.StringUtils;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by zj on 2017/3/19 0019.
 */
public class WebCommonDataUtils{

    /**
     * 将DataTables中的参数json串转为Map输出
     */
    private static Map<String, Object> jsonToMap(String dtjson) {

        JSONArray jsonArray = JSONArray.fromObject(dtjson);
        Map<String, Object> map = new LinkedHashMap<>();
        for (Object object : jsonArray) {
            JSONObject jsonObject = JSONObject.fromObject(object);
            map.put(jsonObject.getString("name"), jsonObject.getString("value"));
        }
        return map;
    }
    /**
     * PlanBean
     */
    public static PlanBean getPlanData(String jsonString) {
        PlanBean bean = new PlanBean();
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
            if(org.apache.commons.lang3.StringUtils.isNotBlank(bean.getEndDate())){
                bean.setEndDate(bean.getEndDate()+" 23:59:59");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }
    /**
     * ContractBean
     */
    public static ContractBean getContractData(String jsonString) {
        ContractBean bean = new ContractBean();
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
            if(org.apache.commons.lang3.StringUtils.isNotBlank(bean.getEndDate())){
                bean.setEndDate(bean.getEndDate()+" 23:59:59");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }

    /**
     * ContractBean
     */
    public static DepositBean getDepositBean(String jsonString) {
        DepositBean bean = new DepositBean();
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
            if(org.apache.commons.lang3.StringUtils.isNotBlank(bean.getEndDate())){
                bean.setEndDate(bean.getEndDate()+" 23:59:59");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }
    /**
     * DiaoyunBean
     */
    public static DiaoyunBean getDiaoyunBean(String jsonString) {
        DiaoyunBean bean = new DiaoyunBean();
        try {
            // 把参数 转换为Map
            Map<String, Object> params = jsonToMap(jsonString);
            int iDisplayLength = Integer.parseInt(params.get("iDisplayLength") + "");
            int iDisplayStart = Integer.parseInt(params.get("iDisplayStart") + "");
            int iRecordsTotal = Integer.parseInt(params.get("iRecordsTotal") + "");
            String dayId = params.get("dayId") + "";
            BeanUtils.populate(bean, params);
            bean.setIDisplayLength(iDisplayLength);
            bean.setIDisplayStart(iDisplayStart);
            bean.setIRecordsTotal(iRecordsTotal);
            bean.setDayId(dayId);
            if(org.apache.commons.lang3.StringUtils.isNotBlank(bean.getEndDate())){
                bean.setEndDate(bean.getEndDate()+" 23:59:59");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }

    /**
     * PlanBean
     */
    public static CustomerPayment getCustomerPaymentData(String jsonString) {
        CustomerPayment bean = new CustomerPayment();
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
            if(org.apache.commons.lang3.StringUtils.isNotBlank(bean.getEndDate())){
                bean.setEndDate(bean.getEndDate()+" 23:59:59");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return bean;
    }
}
