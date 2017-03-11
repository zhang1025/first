<%--玩家充值Jsp页面--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<script src="<c:url value="/js/views/payData/playerRecharge.js"/> "></script>
<script type="text/javascript">
    var sevenLTV = "<spring:message code='playerRecharge.sevenLTV' />";
    var fifteenLTV = "<spring:message code='playerRecharge.fifteenLTV' />";
    var thirtyLTV="<spring:message code='playerRecharge.thirtyLTV' />";
    var paidARPU ="<spring:message code='playerRecharge.paidARPU' />";
    var activeARPU ="<spring:message code='playerRecharge.activeARPU' />";
    var dailyNewPayRate="<spring:message code='playerRecharge.dailyNewPlayesPayRate' />";
    var sevenNewPayRate="<spring:message code='playerRecharge.sevenNewPlayesPayRate' />";
    var thirtyNewPayRate="<spring:message code='playerRecharge.thirtyNewPlayesPayRate' />";
</script>


<div class="page-content sidebar-page right-sidebar-page clearfix">
  <!-- .page-content-wrapper -->
  <div class="page-content-wrapper">
    <div class="page-content-inner">
      <div id="page-header" class="clearfix white-bg">
        <div class="page-header">
          <h2><spring:message code="playerRecharge.title" /></h2>
          <span class="txt"><spring:message code="playerRecharge.text" /></span>
            <span class="txt"></span>
        </div>
        <%@include file="../common/visitorsAndViews.jsp"%>
      </div>



      <div class="panel panel-default  " id="dyn_1">
        <!-- Start .panel -->
        <div class="panel-heading">
          <h4 class="panel-title"><i class="glyphicon glyphicon-search"><spring:message code="queryTerms" /></i></h4>
        </div>
        <div class="panel-body pt15 pb0">
          <%@include file="../common/searchConditions.jsp" %>
          <!-- 查询按钮-->
          <div class="col-md-1" style="padding: 5px">
            <div class="input-group">
              <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button"><spring:message code="query" /></button>
            </div>
          </div>
        </div>
      </div>



      <div class="panel panel-default"  id="pay1">
        <div class="panel-heading">
            <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='keyIndicators' /></i>
                <a href="javascript:void(0)" title="<spring:message code='playerRecharge.ARPU.keyIndicators' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
            </h4>
        </div>
        <div id="line_div" >
              <ul id="line-tabs" class="nav nav-tabs">
                <li path="player_pay_data" chart="line-chart-new-player-pay" class="active"><a href="#tabs-new-player-pay" data-toggle="tab"><spring:message code="playerRecharge.newPlayersPayRate" /></a></li>
                <li path="player_pay_arpu" chart="line-chart-arpu" ><a href="#tabs-arpu" data-toggle="tab">ARPU</a></li>
                <li path="player_pay_ltv" chart="line-chart-ltv"><a href="#tabs-ltv" data-toggle="tab">LTV</a></li>
              </ul>
              <div class="tab-content"   style="width:100%">
                    <div id="tabs-new-player-pay" class="tab-pane in active">
                      <div id="line-chart-new-player-pay" class="real_time_big_chart" ></div>
                    </div>
                    <div id="tabs-arpu" class="tab-pane in active">
                      <div id="line-chart-arpu" class="real_time_big_chart"></div>
                    </div>
                    <div id="tabs-ltv" class="tab-pane in active">
                      <div id="line-chart-ltv" class="real_time_big_chart" ></div>
                    </div>
              </div>
        </div>
      </div>


    <%--<div class="panel panel-default"  id="pay2">--%>
        <%--<div class="panel-heading">--%>
            <%--<h4 class="panel-title"><i class="fa fa-area-chart">&nbsp;&nbsp;&nbsp;<spring:message code="keyIndicators" /></i></h4>--%>
        <%--</div>--%>
        <%--<div id="line_week_div"  >--%>
            <%--<ul id="line-week-tabs" class="nav nav-tabs">--%>
                <%--<li path="player_week_pay_data" chart="line-chart-week-player-pay" class="active"><a href="#tabs-new—week-player-pay" data-toggle="tab"><spring:message code="playerRecharge.weeklyPaidAmount" /></a></li>--%>
            <%--</ul>--%>
            <%--<div class="tab-content">--%>
                <%--<div id="tabs-new-week-player-pay" class="tab-pane in active">--%>
                    <%--<div id="line-chart-week-player-pay" class="real_time_big_chart"  style="height:450px"></div>--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>



        <div class="panel panel-default"  id="panel_2">
            <div class="panel-heading">
                <h4 class="panel-title"><i class="fa fa-area-chart">&nbsp;&nbsp;&nbsp;<spring:message code="keyIndicators" /></i></h4>
            </div>
            <div class="panel-body p0">
                <div class="tabs inside-panel">
                        <ul id="PayAndUsers" class="nav nav-tabs">
                            <li path="player_pay_num" line-chart="line-chart-player-pay-num" pie-chart="pie-chart-player-pay-num"   class="active"><a href="#tabs-player-pay-num" data-toggle="tab"><spring:message code="playerRecharge.paidPlayers" /></a></li>
                            <li path="player_pay_money" line-chart="line-chart-player-pay-money" pie-chart="pie-chart-player-pay-money"><a href="#tabs-player-pay-money" data-toggle="tab"><spring:message code="playerRecharge.paymentAmount" /></a></li>
                        </ul>

                        <div class="tab-content"  id = "recharge">



                            <div id="tabs-player-pay-num" class="tab-pane in active">
                                <div id="pie-chart-player-pay-num" class="chart-2-pie"
                                     style="width: 50%;height:450px;float: left;"></div>
                                <div id="line-chart-player-pay-num" class="chart-2-line"
                                     style="width: 50%;height:450px;float: right;"></div>
                            </div>



                            <div id="tabs-player-pay-money" class="tab-pane fade">
                                <div id="pie-chart-player-pay-money" class="chart-2-pie"
                                     style="display: inline;width: 50%;height:450px;float: left;"></div>
                                <div id="line-chart-player-pay-money" class="chart-2-line"
                                     style="display: inline;width: 50%;height:450px;float: right;"></div>
                            </div>
                        </div>
            </div>
        </div>
        </div>






        <div class="panel panel-default"  id="paye4">
            <div class="panel-heading">
                <h4 class="panel-title"><i class="fa fa-area-chart">&nbsp;&nbsp;&nbsp;<spring:message code="keyIndicators" /></i></h4>
            </div>
            <div id="line_week_div4" >
                <ul id="new-player-tabs2" class="nav nav-tabs">
                    <li path="pay_everyday_recharge" chart="column-chart-first-recharge"    class="active"  ><a href="#tabs-first-recharge" data-toggle="tab"><spring:message code="playerRecharge.playersDailyPayFrequency" /></a></li>
                </ul>
                <div class="tab-content">
                    <div id="tabs-first-recharge" class="tab-pane in active">
                        <div id="column-chart-first-recharge" class="real_time_big_chart"  style="height:450px"></div>
                    </div>
                </div>
            </div>
        </div>

     </div>
  </div>
</div>