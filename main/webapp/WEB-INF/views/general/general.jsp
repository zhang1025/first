<%@ page language="java" contentType="text/html;charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ include file="../include/taglib.jsp" %>
<link rel="stylesheet" href="<c:url value="/css/general/general.css"/>" type="text/css">
<script type="text/javascript">
    var lanager_recharge = "<spring:message code='general.realTimeRecharge' />";
    var lanager_newUsers = "<spring:message code='general.realTimeNewUsers' />";
    var lanager_online = "<spring:message code='general.realTimeOnline' />";
    var lanager_activeUsers = "<spring:message code='general.activeUsers' />";
    var lanager_retention = "<spring:message code='general.retention01' />";
    var viewDetail = "<spring:message code='ViewDetail' />";

</script>
<!-- .page-content -->
<div class="page-content sidebar-page clearfix" style="top:0;">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <!-- .page-content-inner -->
            <div id="page-header" class="clearfix" style="background-color:#fff;top:0;">
                <div class="page-header">
                    <h3><spring:message code='general.title' /></h3>
                    <span class="txt"><spring:message code='general.tips' /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <div class="row">
                <!-- Start .row -->
                <div class="col-md-12">
                    <!-- col-lg-8 start here -->
                    <div class="row">
                        <!--实时充值曲线-->
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <!-- col-lg-6 start here -->
                            <div id="recharge">
                                <div class="panel panel-default plain toggle panelClose ">
                                    <div class="panel-heading">
                                        <h4 class="panel-title"><i class="l-banknote"></i> <span id="rechargeID"><spring:message code='general.realTimeRecharge' /></span>：&nbsp;<strong><span
                                                style="color: #1e8ba6;font-size:larger" class="number stats-number number-sty"
                                                data-from="0" data-to="0"></span></strong></h4>

                                        <div class="panel-controls panel-controls-right"><a
                                                href="javascript:void(0)" onclick="refreshRealTime('recharge')"><i
                                                class="fa fa-circle-o"></i></a></div>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div id="real-time-recharge-line-chart" style="height: 200px"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--实时在线曲线-->
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <!-- col-lg-6 start here -->
                            <div id="online">
                                <div class="panel panel-default plain toggle panelClose ">
                                    <div class="panel-heading">
                                        <h4 class="panel-title"><i class="l-basic-world"></i>
                                            <spring:message code="general.realTimeOnline" />：&nbsp;<strong><span style="color: #1e8ba6;font-size:larger"
                                                                     class="number stats-number number-sty " data-from="0"
                                                                     data-to="0"></span></strong></h4>

                                        <div class="panel-controls panel-controls-right"><a
                                                href="javascript:void(0)" onclick="refreshRealTime('online')"><i
                                                class="fa fa-circle-o"></i></a></div>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div id="real-time-online-line-chart" style="height: 200px"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--实时新增曲线-->
                        <div class="col-lg-4 col-md-6 col-sm-12">
                            <!-- col-lg-6 start here -->
                            <div id="register">
                                <div class="panel panel-default plain toggle panelClose ">
                                    <div class="panel-heading">
                                        <h4 class="panel-title"><i class="l-ecommerce-graph-increase"></i>
                                            <spring:message code="general.realTimeNewUsers" />：&nbsp;<strong><span
                                                style="color: #1e8ba6;font-size:larger" class="number stats-number number-sty"
                                                data-from="0" data-to="0"></span></strong></h4>

                                        <div class="panel-controls panel-controls-right"><a
                                                href="javascript:void(0)" onclick="refreshRealTime('register')"><i
                                                class="fa fa-circle-o"></i></a></div>
                                    </div>
                                    <div class="panel-body">
                                        <div class="row">
                                            <div id="real-time-register-line-chart" style="height: 200px"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End .row -->
                </div>
                <!-- col-lg-8 end here -->
            </div>

            <div class="tabs inside-panel" id="realTop">
                <ul id="channelTab" class="nav nav-tabs">
                    <li class="active">
                        <a href="#channel" data-toggle="tab"><i class="glyphicon glyphicon-road"></i><spring:message code="general.channelTopData" /></a>
                    </li>
                    <li class="">
                        <a href="#server" data-toggle="tab"><i class="glyphicon glyphicon-list"></i><spring:message code="general.serverTopData" /></a>
                    </li>
                </ul>
                <div id="topContent" class="tab-content">
                    <div class="tab-pane fade active in" id="channel">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <!-- col-lg-6 start here -->
                                <div id="top_c_recharge">
                                    <div class="panel panel-default plain toggle"
                                         style="margin-top: 3px;margin-bottom: 3px;">
                                        <h5 class="hStyle">
                                            <button type="button" class="btn btn-primary mr0 mt0 pt0 mb0 pb0"
                                                    method-param="cRecharge">
                                                <spring:message code="DerivedData" />
                                            </button>
                                        </h5>
                                        <div class="panel-body" style="padding: 2px">
                                            <table class="table table-hover" id="cRecharge">
                                                <caption style="color: #1e8ba6;"> <spring:message code="general.channelRechargeTop5" /></caption>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <!-- col-lg-6 start here -->
                                <div id="top_c_newuser">
                                    <div class="panel panel-default plain toggle"
                                         style="margin-top: 3px;margin-bottom: 3px;">
                                        <h5 class="hStyle">
                                            <button type="button" class="btn btn-primary mr0 mt0 pt0 mb0 pb0"
                                                    method-param="cRegister">
                                                <spring:message code="DerivedData" />
                                            </button>
                                        </h5>
                                        <div class="panel-body" style="padding: 2px">
                                            <table class="table table-hover" id="cRegister">
                                                <caption style="color: #1e8ba6;"><spring:message code="general.channelNewUserTop5" /></caption>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <div id="top_c_cost" class="panel panel-default plain toggle"
                                     style="margin-top: 3px;margin-bottom: 3px;">
                                    <h5 class="hStyle">
                                        <button type="button" class="btn btn-primary ss mr0 mt0 pt0 mb0 pb0"
                                                method-param="cCost">
                                            <spring:message code="DerivedData" />
                                        </button>
                                    </h5>
                                    <div class="panel-body" style="padding: 2px">
                                        <table class="table table-hover" id="cCost">
                                            <caption style="color: #1e8ba6;">  <spring:message code="general.channelCostTop5" /></caption>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="server">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <!-- col-lg-6 start here -->
                                <div id="recharge1">
                                    <div class="panel panel-default plain toggle"
                                         style="margin-top: 3px;margin-bottom: 3px;">
                                        <h5 class="hStyle">
                                            <button type="button" class="btn btn-primary  mr0 mt0 pt0 mb0 pb0"
                                                    method-param="sRecharge">
                                                <spring:message code="DerivedData" />
                                            </button>
                                        </h5>
                                        <div class="panel-body" style="padding: 2px">
                                            <table class="table table-hover" id="sRecharge">
                                                <caption style="color: #1e8ba6;"><spring:message code="general.serverRechargeTop5" /></caption>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <!-- col-lg-6 start here -->
                                <div id="online1">
                                    <div class="panel panel-default plain toggle"
                                         style="margin-top: 3px;margin-bottom: 3px;">
                                        <h5 class="hStyle">
                                            <button type="button" class="btn btn-primary mr0 mt0 pt0 mb0 pb0"
                                                    method-param="sRegister">
                                                <spring:message code="DerivedData" />
                                            </button>
                                        </h5>
                                        <div class="panel-body" style="padding: 2px">
                                            <table class="table table-hover" id="sRegister">
                                                <caption style="color: #1e8ba6;"><spring:message code="general.serverNewUserTop5" /></caption>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-md-6 col-sm-12">
                                <!-- col-lg-6 start here -->
                                <div id="online11">
                                    <div class="panel panel-default plain toggle"
                                         style="margin-top: 3px;margin-bottom: 3px;">
                                        <h5 class="hStyle">
                                            <button type="button" class="btn btn-primary mr0 mt0 pt0 mb0 pb0"
                                                    method-param="sOnline">
                                                <spring:message code="DerivedData" />
                                            </button>
                                        </h5>
                                        <div class="panel-body" style="padding: 2px">
                                            <table class="table table-hover" id="sOnline">
                                                <caption style="color: #1e8ba6;"><spring:message code="general.serverOnlineTop5" /></caption>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- End .tabs -->
                </div>
            </div>

            <!--实时数据报表-->
            <div class="row" id="dataReport">
                <div class="col-lg-12">
                    <div id="rtReport">
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading" type="download">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;<spring:message code="general.realTimeDataReport" /></i>
                                <a href="javascript:void(0)" title="<spring:message code='general.realTimeDataReportTips' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="table-object" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
                                <thead>
                                <tr>
                                    <th><spring:message code='general.channelName' /></th>
                                    <th id="numId"><spring:message code='general.result' /></th>
                                    <th><spring:message code='general.dau' /></th>
                                    <th><spring:message code='general.newPlayers' /></th>
                                    <th><spring:message code='general.payNums' /></th>
                                    <th><spring:message code='general.payRate' /></th>
                                    <th><spring:message code='general.activeARPU' /></th>
                                    <th><spring:message code='general.payARPU' /></th>
                                    <th><spring:message code='general.retentionRate' /></th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- col-lg-12 end here -->
            </div>

            <!-- / .page-content-inner -->

            <!-- End .row -->
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle panelClose mt20">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-dollar"></i><spring:message code="general.rechargeTitle" /></h4>
                        </div>
                        <div class="panel-body p0">
                            <div class="tabs inside-panel">
                                <ul id="myTab1" class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#tabs_recharge" data-toggle="tab" commonClick="ledo" detail="rechargeRevenue"
                                           aria-expanded="true"><spring:message code="general.recharge" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_cost_yuanbao" data-toggle="tab" commonClick="ledo" detail="consumAndOutput"><spring:message code="general.cost" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_recharge_users" data-toggle="tab" detail="rechargeRevenue"
                                           commonClick="ledo"><spring:message code="general.rechargeNum" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_recharge_scale" data-toggle="tab" commonClick="ledo" detail="rechargeRevenue"><spring:message code="general.rechargeScale" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_ARPU" data-toggle="tab" commonClick="ledo" detail="playerRecharge"><spring:message code="general.rechargeARPU" /></a>
                                    </li>
                                </ul>
                                <div id="myTabContent1" class="tab-content">
                                    <div class="tab-pane fade active in" id="tabs_recharge"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <!-- col-lg-9 start here -->
                                                <div class="col-lg-9 p0" style=" width: 85%;">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0"
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_recharge"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                    <!-- col-lg-9 start here -->
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_cost_yuanbao"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <!-- col-lg-9 start here -->
                                                <div class="col-lg-9 p0" style="width:85%;">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_cost_yuanbao"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <!-- col-lg-9 end here -->
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_recharge_users"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_recharge_users"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <!-- col-lg-9 end here -->
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_recharge_scale"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <!-- col-lg-9 start here -->
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_recharge_scale"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_ARPU"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_ARPU"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End .row -->
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle panelClose  mt20">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="glyphicon glyphicon-user"></i><spring:message code="general.newUsersTitle" /></h4>
                        </div>
                        <div class="panel-body p0">
                            <div class="tabs inside-panel">
                                <ul id="myTab3" class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#tabs_account" data-toggle="tab" commonClick="ledo" detail="newUsers"
                                           aria-expanded="true"><spring:message code="general.newUsers" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_new_role" data-toggle="tab" commonClick="ledo" detail="newUsers"><spring:message code="general.newRoles" /></a>
                                    </li>
                                </ul>
                                <div id="myTabContent3" class="tab-content">
                                    <div class="tab-pane fade active in" id="tabs_account"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_account"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height: 290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_new_role"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9  p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_new_role"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End .row -->
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle panelClose  mt20">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-yelp"></i><spring:message code="general.activeTitle" /></h4>
                        </div>
                        <div class="panel-body p0">
                            <div class="tabs inside-panel">
                                <ul id="myTab4" class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#tabs_login_user" data-toggle="tab" commonClick="ledo" detail="activeUsers"><spring:message code="general.activeUsers" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_avg_login_times" data-toggle="tab" detail="userOnlineTime"
                                           commonClick="ledo"><spring:message code="general.avgGames" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_avg_play_times" data-toggle="tab" detail="userOnlineTime"
                                           commonClick="ledo"><spring:message code="general.avgOnlineTimes" /></a>
                                    </li>
                                </ul>
                                <div id="myTabContent4" class="tab-content">
                                    <div class="tab-pane fade active in" id="tabs_login_user"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_login_user"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_avg_login_times"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_avg_login_times"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_avg_play_times"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_avg_play_times"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End .row -->
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle panelClose  mt20">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-area-chart"></i><spring:message code="general.retentionTitle" /></h4>
                        </div>
                        <div class="panel-body p0">
                            <div class="tabs inside-panel">
                                <ul id="myTab5" class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#tabs_retention01" data-toggle="tab"  num="01" commonClick="ledo" detail="userRetention">
                                            <spring:message code="general.retention01" /></a>
                                    </li>
                                    <li class="">
                                        <a href="#tabs_retention03" data-toggle="tab" num="03" commonClick="ledo" detail="userRetention">
                                            <spring:message code="general.retention03" /></a>
                                    </li>
                                </ul>
                                <div id="myTabContent5" class="tab-content">
                                    <div class="tab-pane fade active in" id="tabs_retention01"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_retention01"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="tabs_retention03"
                                         style="padding-top: 0;padding-bottom:0">
                                        <div class="row">
                                            <div class="col-md-12"
                                                 style="padding-left:0;padding-right: 0;border-bottom-width:0;padding-bottom:0">
                                                <div class="col-lg-9 p0" style="width: 85%">
                                                    <!-- col-lg-9 start here -->
                                                    <div class="panel panel-default plain btrr0 bbrr0 "
                                                         style="border-bottom:0;margin-bottom:0" data-mh="payments">
                                                        <!-- Start .panel -->
                                                        <div class="panel-body"
                                                             style="padding-bottom: 0;padding-top:0;height:310px">
                                                            <div id="line_chart_retention03"
                                                                 style="height: 285px;margin-top: 20px;"></div>
                                                        </div>
                                                        <!-- End .panel -->
                                                    </div>
                                                </div>
                                                <div class="col-lg-3 p0"
                                                     style="width: 15%;float: right;height:290px;">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End .row -->
            </div>
        </div>
        <!-- / .page-content-inner -->
    </div>
    <!-- / page-content-wrapper -->
</div>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/js/views/general/general.js"/> "></script>

<!-- / page-content -->