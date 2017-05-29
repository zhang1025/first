package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.FinanceDao;
import com.liaoyuan.web.dao.IMarkerDao;
import com.liaoyuan.web.entity.ChengzhongBean;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.Constant;
import com.liaoyuan.web.utils.CreateWordT;
import com.liaoyuan.web.utils.DocPrint;
import com.liaoyuan.web.utils.ExcelUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.text.DecimalFormat;
import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Service
@Slf4j
public class MarketServiceImpl implements MarketService{

    @Autowired
    IMarkerDao iMarkerDao;

    @Autowired
    FinanceDao financeDao;

    @Override
    public int countContractData(ContractBean bean) {
        return iMarkerDao.countContractData(bean);
    }

    //合同信息
    @Override
    public List<ContractBean> getTableContractData(ContractBean bean) {
        return iMarkerDao.getTableContractData(bean);
    }

    //计算地付煤详细信息数据  最后一行合计
    @Override
    public List<ContractBean> getTableDetailContractData(ContractBean bean) {
        List<ContractBean> list = iMarkerDao.getTableContractData(bean);
        DataBean db = null;
        if(list!=null && !list.isEmpty()){
            for (ContractBean cb : list) {
                if(!"7".equals(cb.getStatus())){//状态7是调价前的合同信息
                    //煤款
//                    cb.setPrepaidAmount(Double.parseDouble(String.format("%.2f",cb.getPrepaidAmount())));
                    if(StringUtils.isNotBlank(bean.getSettlement())){
                        db = financeDao.getRateInfoFromSettName(bean.getSettlement());
                    }
                    if(db!=null){
                        cb.setTaxation(String.format("%.2f",cb.getPrepaidAmount()*Double.parseDouble(db.getRate())));
                        cb.setShunting(String.format("%.2f",cb.getPrepaidAmount()*Double.parseDouble(db.getShunting())));
                        cb.setEntruck(String.format("%.2f",cb.getPrepaidAmount()*Double.parseDouble(db.getEntruck())));
                    }
                    cb.setAllMoney(String.format("%.2f",cb.getPrepaidAmount()+cb.getTaxation()+cb.getShunting()+cb.getEntruck()));
                }
            }
        }
        return list;
    }

    @Override
    public int addContractInfo(ContractBean bean) {
        return iMarkerDao.addContractInfo(bean);
    }

    @Override
    public int editContractInfo(ContractBean bean) {
        return iMarkerDao.editContractInfo(bean);
    }


    @Override
    public int editContractInfoForFinance(ContractBean bean) {
        return iMarkerDao.editContractInfoForFinance(bean);
    }

    @Override
    public int updateStatus(int id,int status) {
        return iMarkerDao.updateStatus(id,status);
    }


    @Override
    public int deleteContractInfo(int id) {
        ContractBean bean = iMarkerDao.getContractInfoFromId(id);
        if(bean == null){
            return -1;
        }
        if(Integer.parseInt(bean.getStatus())!=0){
            return -2;//只有未审核的才能删除
        }
        return iMarkerDao.deleteContractInfo(id);
    }

    //结算合同
    @Override
    public int balanceContractInfo(int id) {
        ContractBean bean = iMarkerDao.getContractInfoFromId(id);
        if(bean == null){
            return -1;
        }
        int status = Integer.parseInt(bean.getStatus());
        if(status!=3 && status!=5 && status!=2){
            return -2;//3 正在发运  5审核通过 2解锁
        }
        return iMarkerDao.balanceContractInfo(id);
    }

    //调整价格
    @Transactional(rollbackFor=Exception.class)
    public int updatePriceInfo(int id,double currentPrize ,int subType){
        ContractBean bean = iMarkerDao.getContractInfoFromId(id);
        if(bean == null){
            return -1;
        }
        int status = Integer.parseInt(bean.getStatus());
        if(status!=3 && status!=2 && status!=5){
            return -2;//3 正在发运  5审核通过 2解锁
        }
        //更新合同状态无效
        iMarkerDao.updateStatusForAdjust(id);

        bean.setUnitPrice(currentPrize);//当前价格
        DecimalFormat df  =new DecimalFormat("#.00");
        //新插入一个新合同信息
        if(subType ==1){//补交差额
            bean.setOrderCount(bean.getOrderCount()-bean.getSendCount());
            return iMarkerDao.addNewInfoForAdjust(bean);
        }
        if(subType ==2){//差额结算
            bean.setPrepaidAmount(Double.parseDouble(df.format(bean.getOrderCount()*bean.getUnitPrice())));
            bean.setSendPrice(Double.parseDouble(df.format(bean.getSendCount()*bean.getUnitPrice())));
            bean.setLeftPrice(bean.getPrepaidAmount()-bean.getSendPrice());

            double newOrderCount = Double.parseDouble(df.format((bean.getPrepaidAmount()-bean.getSendPrice())/currentPrize));
            bean.setOrderCount(newOrderCount);
            return iMarkerDao.addNewInfoForAdjust(bean);
        }
        return -3;
    }
    //增补合同  增加吨数
    public int addTonnageContractInfo(int id,String tonnage){
        return iMarkerDao.addTonnageInfo(id,Double.parseDouble(tonnage));
    }
    public ContractBean getContractInfoFromId(int id){
        ContractBean bean = iMarkerDao.getContractInfoFromId(id);
        if(bean == null){
            return null;
        }
        return bean;
    }
    //打印合同信息
    public int printContractInfo( int id){
        ContractBean bean =  iMarkerDao.getContractInfoFromId(id);
        //生成word信息
        URL fileURL = CreateWordT.class.getClassLoader().getResource(Constant.FILEPTH);
        if(fileURL == null){
            log.error("找不到合同信息模板 路径：/print/hetong");
            System.out.println("找不到合同信息模板 路径：/print/hetong");
            return -1;
        }
        String fileName = "hetong.doc";
        CreateWordT.printInfo(bean, fileURL.getPath(),fileName);
        try {
            Thread.sleep(1500);
            //打印
            DocPrint.printFile(fileURL.getPath()+fileName);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return 1;
    }

    @Override
    public int lockInfo(int id) {
        return iMarkerDao.lockInfo(id);
    }

    @Override
    public int unlockInfo(int id) {
        return iMarkerDao.unlockInfo(id);
    }

    //外运月计划
    @Override
    public int countMonthPlanData(PlanBean bean) {
        return iMarkerDao.countMonthPlanData(bean);
    }

    @Override
    public List<PlanBean> getTableMonthPlanData(PlanBean bean) {
        return iMarkerDao.getTableMonthPlanData(bean);
    }

    @Override
    public int addMonthPlan(PlanBean bean) {
        return iMarkerDao.addMonthPlan(bean);
    }

    @Override
    public int editMonthPlan(PlanBean bean) {
        return iMarkerDao.editMonthPlan(bean);
    }

    public int stopMonthPlan(int id){
        //中止对应的日计划
        iMarkerDao.stopDayPlanOfMonth(id);
        return iMarkerDao.stopMonthPlan(id);
    }
    @Override
    public int deleteMonthPlan(int id) {
        //删除对应月计划的日计划
        iMarkerDao.deleteDayPlanOfMonth(id);
        return iMarkerDao.deleteMonthPlan(id);
    }
    //外运日计划
    public int countDayPlanData(PlanBean bean){
        return iMarkerDao.countDayPlanData(bean);
    }
    public List<PlanBean> getTableDayPlanData(PlanBean bean){
        List<PlanBean> list = iMarkerDao.getTableDayPlanData(bean);
        //查询某一个月计划对应的日计划  不分页  最后一行显示合并
        if(("dayNoPage").equals(bean.getSearchType())){
            int dayPlanCar=0,dayActualCar=0,dayPlanTonnage=0,dayActualTonnage=0;
            if(null!=list && !list.isEmpty()){
                for (PlanBean pb : list) {
                    dayPlanCar += pb.getPlanCarNum();
                    dayActualCar += pb.getActualCarNum();
                    dayPlanTonnage += pb.getPlanTonnage();
                    dayActualTonnage += pb.getActualSendedTonnage();
                }
                PlanBean planBean = new PlanBean();
                //增加最后一行合计统计
//            planBean.setName("合计");
                planBean.setPlanCarNum(dayPlanCar);
                planBean.setActualCarNum(String.valueOf(dayActualCar));
                planBean.setPlanTonnage(String.valueOf(dayPlanTonnage));
                planBean.setActualSendedTonnage(String.valueOf(dayActualTonnage));
                planBean.setUnsendedCarNum(dayPlanCar-dayActualCar);
                planBean.setUnsendedTonnage(dayPlanTonnage - dayActualTonnage);
                list.add(planBean);
            }
        }
        return list;
    }
    public int addDayPlan(PlanBean bean){
        return iMarkerDao.addDayPlan(bean);
    }
    public int editDayPlan(PlanBean bean){
        return iMarkerDao.editDayPlan(bean);
    }
    public int deleteDayPlan(int id){
        return  iMarkerDao.deleteDayPlan(id);
    }
    public int stopDayPlan(int monthId){
        return  iMarkerDao.stopDayPlan(monthId);
    }


    @Transactional(rollbackFor=Exception.class)
    public int bindlingCard(int id,String cardNo,String money,String numNo){
        int rtn = iMarkerDao.bindingCard(id,cardNo);
        if(rtn > 0){
            iMarkerDao.insertCoalCardMoney(cardNo,money,numNo);
        }
        return rtn;
    }

    public int unBindingCard(int id){
        return iMarkerDao.unBindingCard(id);
    }

    @Override
    public int countChengzhongData(ChengzhongBean bean) {
        return iMarkerDao.countChengzhongData(bean);
    }

    @Override
    public List<ChengzhongBean> getTableChengzhongData(ChengzhongBean bean) {
        return iMarkerDao.getTableChengzhongData(bean);
    }
}
