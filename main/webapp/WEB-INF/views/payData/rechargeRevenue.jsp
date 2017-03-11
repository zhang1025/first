<%--玩家留存Jsp页面--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<%--<script src="<c:url value="/js/views/common/jquery.data.js"/> "></script>--%>
<%--<script src="<c:url value="/js/echarts/echarts.js"/>"></script>--%>
<script src="<c:url value="/js/views/payData/rechargeRevenue.js"/> "></script>
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <div id="page-header" class="clearfix white-bg">
                <div class="page-header">
                    <h2><spring:message code='rechargeRevenue.title' /></h2>
                    <span class="txt"><spring:message code='rechargeRevenue.text' /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>
            <div class="panel panel-default  " id="dyn_1">
                <!-- Start .panel -->
                <div class="panel-heading">
                    <h4 class="panel-title"><i class="glyphicon glyphicon-search"><spring:message code='rechargeRevenue.searchCondition' /></i></h4>
                </div>
                <div class="panel-body pt15 pb0">
                    <%@include file="../common/searchConditions.jsp" %>
                    <!-- 查询按钮-->
                    <div class="col-md-1" style="padding: 5px">
                        <div class="input-group">
                            <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button"><spring:message code='rechargeRevenue.search' /></button>
                        </div>
                    </div>
                </div>
            </div>



            <%--此处做标记--%>
            <div class="panel panel-default">
                <!-- Start .panel -->
                <div class="panel-heading">
                    <h4 class="panel-title"><i class="fa fa-area-chart">&nbsp;&nbsp;&nbsp;<spring:message code="keyIndicators" /></i></h4>
                </div>
                <div class="panel-body p0"  style="height:450px">
                    <%--<div class="tabs inside-panel" id="realTimeTrend">--%>
                        <ul id="retentionTabs" class="nav nav-tabs">
                            <li class="active">
                                <a href="#retention01" num="recharge" data-toggle="tab"><spring:message code='rechargeRevenue.payCount' /></a>
                            </li>
                            <li class="">
                                <a href="#retention03" num="recharge_number" data-toggle="tab"><spring:message code='rechargeRevenue.payNum' /></a>
                            </li>
                            <li class="">
                                <a href="#retention05" num="recharge_rate" data-toggle="tab"><spring:message code='rechargeRevenue.payRate' /></a>
                            </li>
                        </ul>
                        <div id="myTabContent1" class="tab-content">
                            <div class="tab-pane fade active in" id="retention01">
                                <div id="line_chart_retention01" class="tab-content">
                                </div>
                            </div>
                            <div class="tab-pane fade " id="retention03">
                                <div id="line_chart_retention03" class="tab-content">
                                </div>
                            </div>
                            <div class="tab-pane fade " id="retention05">
                                <div id="line_chart_retention05" class="tab-content">
                                </div>
                            </div>
                        </div>
                    <%--</div>--%>

                </div>


                <div class="row">
                    <div class="col-lg-12">
                        <!-- col-lg-12 start here -->
                        <div class="panel panel-default downLoad toggle "   id="panel_1">
                            <!-- Start .panel -->
                            <div class="panel-heading">
                                <h4 class="panel-title"><spring:message code='rechargeRevenue.detaies' /></h4>
                            </div>
                            <div class="panel-body">
                                <table id="dataTables" class="table table-striped table-bordered" cellspacing="0"
                                       width="100%">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                </div>



            <div class="panel panel-default"  id="panel_2">
                <div class="panel-heading">
                    <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='keyIndicators' /></i>
                        <a href="javascript:void(0)" title="<spring:message code='rechargeRevenue.payCountData' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                    </h4>
                </div>
                <div class="panel-body p0">
                    <div class="tabs inside-panel">

                    <ul id="PayAndUsers" class="nav nav-tabs">
                        <li path="pay_in_platform" line-chart="line-chart-platform" pie-chart="pie-chart-platform"
                            flag="0" type="平台" class="active"><a href="#tabs-platform" num="plat" data-toggle="tab"><spring:message code='rechargeRevenue.payPlat' /></a>
                        </li>
                        <li path="pay_in_platform" line-chart="line-chart-channel" pie-chart="pie-chart-channel"
                            flag="1" type="渠道"><a href="#tabs-channel" num="channel" data-toggle="tab"><spring:message code='rechargeRevenue.payChanel' /></a>
                        </li>
                        <li path="pay_in_platform" line-chart="line-chart-server" pie-chart="pie-chart-server"
                            flag="2" type="区服"><a href="#tabs-server" num="server" data-toggle="tab"><spring:message code='rechargeRevenue.payServer' /></a></li>
                        <li path="pay_in_platform" line-chart="line-chart-level" pie-chart="pie-chart-level"
                            flag="3" type="等级"><a href="#tabs-level" num="level" data-toggle="tab"><spring:message code='rechargeRevenue.payLevel' /></a></li>
                    </ul>
                        <div class="tab-content" id="myTabContent2">
                            </br>
                        <div class="btn-group" id = "recharge">
                            <button type="button" class="btn btn-default btn-primary"  c-value="recharge"><spring:message code='rechargeRevenue.payCounts' /></button>
                            <button type="button" class="btn btn-default"  c-value="recharge_number"><spring:message code='rechargeRevenue.payNums' /></button>
                        </div>


                        <div id="tabs-platform" class="tab-pane in active">
                            <div id="pie-chart-platform" class="chart-2-pie"
                                 style="width: 50%;height:450px;float: left;"></div>
                            <div id="line-chart-platform" class="chart-2-line"
                                 style="width: 50%;height:450px;float: right;"></div>
                        </div>
                        <div id="tabs-channel" class="tab-pane fade">
                            <div id="pie-chart-channel" class="chart-2-pie"
                                 style="display: inline;width: 50%;height:450px;float: left;"></div>
                            <div id="line-chart-channel" class="chart-2-line"
                                 style="display: inline;width: 50%;height:450px;float: right;"></div>
                        </div>
                        <div id="tabs-server" class="tab-pane fade">
                            <div id="pie-chart-server" class="chart-2-pie"
                                 style="display: inline;width: 50%;height:450px;float: left;"></div>
                            <div id="line-chart-server" class="chart-2-line"
                                 style="display: inline;width: 50%;height:450px;float: right;"></div>
                        </div>
                        <div id="tabs-level" class="tab-pane fade">
                            <div id="pie-chart-level" class="chart-2-pie"
                                 style="display: inline;width: 50%;height:450px;float: left;"></div>
                            <div id="line-chart-level" class="chart-2-line"
                                 style="display: inline;width: 50%;height:450px;float: right;"></div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="row" >
                <div class="col-lg-12"   id="pie"  style="display: inline;width: 50%;float: left;">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading" id = "liruiqi">
                            <h4 class="panel-title"><spring:message code='rechargeRevenue.pieDetaies' /></h4>
                        </div>
                        <div class="panel-body" >
                            <table id="payPieDataTables" class="table table-striped table-bordered" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                </div>




                <div class="col-lg-12"   id="line" style="display: inline;width: 50%;float: left;">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle "   id="panel_3">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><spring:message code='rechargeRevenue.lineDetaies' /></h4>
                        </div>
                        <div class="panel-body" >
                            <table id="payLineDataTables" class="table table-striped table-bordered" cellspacing="0" width="100%">
                            </table>
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

