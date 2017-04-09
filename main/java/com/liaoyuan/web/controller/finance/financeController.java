package com.liaoyuan.web.controller.finance;

import com.liaoyuan.web.controller.base.BaseController;
import com.liaoyuan.web.entity.ContractBean;
import com.liaoyuan.web.entity.DataBean;
import com.liaoyuan.web.entity.SessionUser;
import com.liaoyuan.web.service.CommonDataService;
import com.liaoyuan.web.service.MarketService;
import com.liaoyuan.web.utils.Constant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by zj on 2017/4/9 0009
 * 财务管理
 */
@RestController
@RequestMapping(value = "/finance")
@Slf4j
public class financeController extends BaseController {
    @Autowired
    CommonDataService commonDataService;

    @Autowired
    HttpSession httpSession;
    @Autowired
    MarketService marketService;

    /**
     * 地付信息管理
     */
    @RequestMapping(value = "/df", method = RequestMethod.GET)
    public ModelAndView contract(ModelMap modelMap){
        log.info("=========财务====合同管理============");
        List<DataBean> coals = commonDataService.getListData(Constant.COAL);
        List<DataBean> settlements = commonDataService.getListData(Constant.SETTLEMENT);
        List<DataBean> funds = commonDataService.getListData(Constant.FUND);
        modelMap.put("coals",coals);
        modelMap.put("settlements",settlements);
        modelMap.put("funds",funds);
        modelMap.put("account",String.valueOf(httpSession.getAttribute(SessionUser.SESSION_USER)));
        return new ModelAndView("/finance/contractPage");
    }

    //编辑添加财务信息
    @RequestMapping(value = "/editContractInfo", method = RequestMethod.POST)
    public Integer editContractInfo(ContractBean bean) {
        bean.setFinancePerson((String)httpSession.getAttribute(SessionUser.SESSION_USER));
        return marketService.editContractInfoForFinance(bean);
    }

    //更新审核状态
    @RequestMapping(value = "/updateStatus", method = RequestMethod.POST)
    public Integer updateStatus(int id, int status) {
        return marketService.updateStatus(id,status);
    }
}
