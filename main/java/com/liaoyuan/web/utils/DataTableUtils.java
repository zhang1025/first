package com.liaoyuan.web.utils;

import com.liaoyuan.web.entity.ContractBean;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by zj on 2017/3/18 0018
 * 数据报表导出
 */
public class DataTableUtils {

    //合同信息
    public static List<String> getExcelHTColumnName() {
        List<String> columnnames = new ArrayList<>();
        columnnames.add("合同编号");
        columnnames.add("客户名称");
        columnnames.add("品种");
        columnnames.add("订单总量");
        columnnames.add("单价");
        columnnames.add("预交金额");
        columnnames.add("订单日期");
        columnnames.add("已发送量");
        columnnames.add("剩余量");
        columnnames.add("发运金额");
        columnnames.add("剩余金额");
        columnnames.add("合同状态");
        columnnames.add("经手人");
        columnnames.add("录入人");
        columnnames.add("录入时间");
        columnnames.add("合同类型");
//        columnnames.add("预交欠费");
        columnnames.add("铲车费");
        return columnnames;
    }

    public static List<List<Object>> getExcelHTDataLists(List<ContractBean> gridData) {
        List<List<Object>> datas=new ArrayList<>();

        for(ContractBean reportData:gridData) {
            List<Object> row = new ArrayList<>();
            row.add(reportData.getNumNo());
            row.add(reportData.getSettlement());
            row.add(reportData.getName());
            row.add(reportData.getOrderCount());
            row.add(reportData.getUnitPrice());
            row.add(reportData.getPrepaidAmount());
            row.add(reportData.getOrderTime());
            row.add(reportData.getSendCount());
            row.add(reportData.getLeftCount());
            row.add(reportData.getSendPrice());
            row.add(reportData.getLeftPrice());
            row.add(reportData.getSettlement());
            switch (reportData.getStatus()){
                case 1: row.add("解锁");
                    break;
                case 2: row.add("锁定");
                    break;
                case 3: row.add("正在发运");
                    break;
                case 0: row.add("未审核");
                    break;
                case -1: row.add("未通过");
                    break;
            }
            row.add(reportData.getUsePerson());
            row.add(reportData.getInputPerson());
            row.add(reportData.getCreatetime());
            switch (reportData.getContractType()){
                case "1": row.add("公用煤");
                    break;
                case "2": row.add("零销煤");
                    break;
                case "4": row.add("职工煤");
                    break;
                default:row.add("其他");
            }
            row.add(reportData.getForkliftFee());
            datas.add(row);
        }
        return datas;
    }
}
