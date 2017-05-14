package com.liaoyuan.web.utils;

import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;

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
        columnnames.add("铲车费");
        columnnames.add("发票合同名");
        columnnames.add("公司地址");
        columnnames.add("税号");
        columnnames.add("电话");
        columnnames.add("开户银行");
        columnnames.add("账号");
        columnnames.add("结算单位");
        columnnames.add("资金方式");
        columnnames.add("税金");

        return columnnames;
    }

    public static List<List<Object>> getExcelHTDataLists(List<ContractBean> gridData) {
        List<List<Object>> datas=new ArrayList<>();

        for(ContractBean reportData:gridData) {
            List<Object> row = new ArrayList<>();
            row.add(reportData.getNumNo());
            row.add(reportData.getReceiveName());
            row.add(reportData.getName());
            row.add(reportData.getOrderCount());
            row.add(reportData.getUnitPrice());
            row.add(reportData.getPrepaidAmount());
            row.add(reportData.getOrderTime());
            row.add(reportData.getSendCount());
            row.add(reportData.getLeftCount());
            row.add(reportData.getSendPrice());
            row.add(reportData.getLeftPrice());
            switch (reportData.getStatus()){
                case "0": row.add("未审核");
                    break;
                case "1": row.add("解锁");
                    break;
                case "2": row.add("锁定");
                    break;
                case "3": row.add("正在发运");
                    break;
                case "4": row.add("已结算");
                    break;
                case "-1": row.add("未通过");
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
                case "3": row.add("其他");
                    break;
                case "4": row.add("职工煤");
                    break;
                default:row.add("");
            }
            switch (reportData.getForkliftFee()){
                case "1": row.add("包含铲车费");
                    break;
                case "0": row.add("不包含");
                    break;
                default:row.add("");
            }
            row.add(reportData.getBillName());
            row.add(reportData.getAddress());
            row.add(reportData.getBillNo());
            row.add(reportData.getTel());
            row.add(reportData.getBankName());
            row.add(reportData.getBankNo());
            row.add(reportData.getSettlement());
            row.add(reportData.getFund());
            row.add(reportData.getTaxation());
            datas.add(row);
        }
        return datas;
    }

    //外运计划
    public static List<String> getExcelPlanColumnName() {
        List<String> columnnames = new ArrayList<>();
        columnnames.add("计划号");
        columnnames.add("收货单位");
        columnnames.add("计划车数");
        columnnames.add("累计实发车数");
        columnnames.add("计划吨数");
        columnnames.add("累计实发吨");
        columnnames.add("未发车数");
        columnnames.add("未发吨数");
        columnnames.add("单价");
        columnnames.add("煤种");
        columnnames.add("井别");
        columnnames.add("到站");
        columnnames.add("专用线");
        columnnames.add("结算单位");
        columnnames.add("资金方式");
        columnnames.add("经办人");
        columnnames.add("录入人");
        columnnames.add("日期");
        columnnames.add("交易单号");
        columnnames.add("状态");
        return columnnames;
    }
    public static List<List<Object>> getExcelPlanDataLists(List<PlanBean> gridData) {
        List<List<Object>> datas=new ArrayList<>();

        for(PlanBean pb:gridData) {
            List<Object> row = new ArrayList<>();
            row.add(pb.getRid());
            row.add(pb.getName());
            row.add(pb.getPlanCarNum());
            row.add(pb.getActualCarNum());
            row.add(pb.getPlanTonnage());
            row.add(pb.getActualSendedTonnage());
            row.add(pb.getPlanCarNum()-pb.getActualCarNum());
            row.add(pb.getPlanTonnage()-pb.getActualSendedTonnage());
            row.add(pb.getActualUnitPrice());
            row.add(pb.getCoalName());
            row.add(pb.getWellsName());
            row.add(pb.getSiteName());
            row.add(pb.getPrivateLine());
            row.add(pb.getSettlement());
            row.add(pb.getMethod());
            row.add(pb.getUsePerson());
            row.add(pb.getInputPerson());
            row.add(pb.getCreatetime());
            row.add(pb.getPayId());
            switch (pb.getStatus()){
                case 1: row.add("正常");
                    break;
                case -1: row.add("终止计划");
                    break;
                default:row.add("未知");
            }
            datas.add(row);
        }
        return datas;
    }

    //外运计划 实际与发出对比
    public static List<String> getExcelPlanDBColumnName() {
        List<String> columnnames = new ArrayList<>();
        columnnames.add("计划号");
        columnnames.add("收货单位");
        columnnames.add("到站");
        columnnames.add("井别");
        columnnames.add("煤种");
        columnnames.add("计划车数");
        columnnames.add("计划吨数");
        columnnames.add("单价");
        columnnames.add("实发车数");
        columnnames.add("实发吨");
        columnnames.add("计划比实发(车)");
        columnnames.add("计划比实发(吨)");
        return columnnames;
    }
    public static List<List<Object>> getExcelPlanDBDataLists(List<PlanBean> gridData) {
        List<List<Object>> datas=new ArrayList<>();

        for(PlanBean pb:gridData) {
            List<Object> row = new ArrayList<>();
            row.add(pb.getRid());
            row.add(pb.getName());
            row.add(pb.getSiteName());
            row.add(pb.getWellsName());
            row.add(pb.getCoalName());
            row.add(pb.getPlanCarNum());
            row.add(pb.getPlanTonnage());
            row.add(pb.getActualUnitPrice());
            row.add(pb.getActualCarNum());
            row.add(pb.getActualSendedTonnage());
            row.add(pb.getPlanCarNum()-pb.getActualCarNum());
            row.add(pb.getPlanTonnage()-pb.getActualSendedTonnage());
            datas.add(row);
        }
        return datas;
    }
}
