<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<link href="<c:url value="/css/dataReport/dataReport.css"/>" rel="stylesheet" />
<script src="<c:url value="/js/views/general/searchConditionForData.js"/> "></script>
<script type="text/javascript">
    var t_dataError= "<spring:message code='dateErrorTip' />";
    var t_date= "<spring:message code='data_report.date' />";
    var t_palt= "<spring:message code='plat' />";
    var t_channel= "<spring:message code='channel' />";
    var t_server= "<spring:message code='server' />";
    var t_country= "<spring:message code='country' />";
    var t_newUsers= "<spring:message code='data_report.newUsersAmout' />";
    var t_newUserRechargeAmount="<spring:message code='data_report.newUserRechargeAmount' />";
    var t_newUserRechargeNumber="<spring:message code='data_report.newUserRechargeNumber' />";
    var t_newUserRechargeRate="<spring:message code='data_report.newUserRechargeRate' />";
    var t_newUserRechargeARPU="<spring:message code='data_report.newUserRechargeARPU' />";
    var t_payAmount="<spring:message code='data_report.payAmount' />";
    var t_payNumber="<spring:message code='data_report.payNumber' />";
    var t_newPayNumber="<spring:message code='data_report.newPayNumber' />";
    var t_payARPU="<spring:message code='data_report.payARPU' />";
    var t_dayPayRate="<spring:message code='data_report.dayPayRate' />";
    var t_nextDayRetention="<spring:message code='data_report.nextDayRetention' />";
    var t_threeDaysRetention="<spring:message code='data_report.threeDaysRetention' />";
    var t_sevenDaysRetention="<spring:message code='data_report.sevenDaysRetention' />";
    var t_fourteenDaysRetention ="<spring:message code='data_report.fourteenRetention' />";
    var t_oneMonthRetention="<spring:message code='data_report.oneMonthRetention' />";
    var t_weekBackNum="<spring:message code='data_report.weekBackNum' />";
    var t_weekNewRate="<spring:message code='data_report.weekNewRetentionRate' />";
    var t_weekNodActiveRate="<spring:message code='data_report.weekNonAddedRetentionRate' />";
    var t_weekActiveRate="<spring:message code='data_report.weekActiveRetetionRate' />";
    var t_weekRechargeRate="<spring:message code='data_report.weekRechargeRetetionRate' />";
    var t_monthBachNum="<spring:message code='data_report.monthBachNum' />";
    var t_monthNewRate="<spring:message code='data_report.monthNewRetentionRate' />";
    var t_monthNodActiveRate="<spring:message code='data_report.monthNonAddedRetentionRate' />";
    var t_monthActiveRate="<spring:message code='data_report.monthActiveRetetionRate' />";
    var t_monthRechargeRate="<spring:message code='data_report.monthRechargeRetetionRate' />";
</script>
<!-- .page-content -->
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <!-- .page-content-inner -->
            <div id="page-header" class="clearfix" style="background-color: #ffffff">
                <div class="page-header">
                    <h3><spring:message code='data_report.title' /></h3>
                    <span class="txt"><spring:message code='data_report.tips' /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <div class="row">
                <!-- Start .row -->
                <div class="col-md-12">
                    <div class="panel panel-default toggle">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-search"></i><spring:message code='queryTerms' /></h4>
                        </div>

                        <div class="panel-body">
                            <div class="row">
                                <!-- 查询条件 -->
                                <%@ include file="../common/searchConditionsForData.jsp" %>

                                <!-- 其他自定义的查询添加在下面添加 -->
                                <!-- 查询按钮-->
                                <div class="col-md-1" style="padding: 5px">
                                    <div class="input-group">
                                        <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">
                                            <spring:message code='query' />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="myTab" class="nav nav-tabs">
                <li class="active" id="D">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="true"><spring:message code='data_report.dailyReport' /></a>
                </li>
                <li class  id="W">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false"><spring:message code='data_report.weekReport' /></a>
                </li>
                <li class id="M">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false"><spring:message code='data_report.monthReport' /></a>
                </li>
            </ul>
            <div class="row" id="platData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='data_report.platformData' /></i>
                            <a href="javascript:void(0)" title="<spring:message code='data_report.platformDataTips' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 5px;" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            <div class="row" id="channelData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='data_report.channelInfo' /></i>
                                <a href="javascript:void(0)" title="<spring:message code='data_report.channelInfoTips' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dataTablesForChannel" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 5px;" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            <div class="row" id="serverData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='data_report.serverInfo' /></i>
                                <a href="javascript:void(0)" title="<spring:message code='data_report.serverInfoTips' />" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dataTablesForServer" class="table table-striped table-bordered display" cellspacing="0" style="font-size: 5px;" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
        </div>
        <!-- / .page-content-inner -->
    </div>
    <!-- / page-content-wrapper -->
</div>
<script src="<c:url value="/plugins/charts/sparklines/jquery.sparkline.js"/> "></script>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/tables/datatables/dataTables.bootstrap.js"/> "></script>
<script src="<c:url value="/js/views/general/dataReport.js"/> "></script>
