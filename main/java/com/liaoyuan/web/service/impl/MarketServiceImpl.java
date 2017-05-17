package com.liaoyuan.web.service.impl;

import com.liaoyuan.web.dao.IMarkerDao;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.PlanBean;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.Constant;
import com.liaoyuan.web.utils.CreateWordT;
import com.liaoyuan.web.utils.DocPrint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;

/**
 * Created by zj on 2017/3/19 0019.
 */
@Service
@Slf4j
public class MarketServiceImpl implements MarketService{

    @Autowired
    IMarkerDao iMarkerDao;

    @Override
    public int countContractData(ContractBean bean) {
        return iMarkerDao.countContractData(bean);
    }

    @Override
    public List<ContractBean> getTableContractData(ContractBean bean) {
        return iMarkerDao.getTableContractData(bean);
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
        if(status==0||status==2||status==-1){
            return -2;//0未审核  2锁定  -1未通过  不能结算合同
        }
        return iMarkerDao.balanceContractInfo(id);
    }

    public ContractBean getContractInfoFromId(int id){
        return iMarkerDao.getContractInfoFromId(id);
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


    public int bindlingCard(int id,String cardNo){
        return iMarkerDao.bindingCard(id,cardNo);
    }

    public int unBindingCard(int id){
        return iMarkerDao.unBindingCard(id);
    }
}
