
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>

<!-- .page-content -->
<div class="page-content sidebar-page clearfix" style="top:0;">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-search"></i>查询</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 300px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range' class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 13px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div style="padding: 15px;float: right">
                                    <div class="input-group">
                                        <button id="addBtn" class="btn btn-success mr5 mb10" data-toggle="modal"
                                                data-target="#myModal" type="button">新增
                                        </button>
                                    </div>
                                </div>
                               <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="searchDayPlan"  class="btn btn-primary mr5 mb10" type="button">查看日计划</button>
                                    </div>
                                </div>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="stopMonthPlan"  class="btn btn-primary mr5 mb10" type="button">终止月计划</button>
                                    </div>
                                </div>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="delete" class="btn btn-danger mr5 mb10" type="button">删除</button>
                                    </div>
                                </div>
                                <%--<!-- 查询按钮-->--%>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">查询</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="monthPlanData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;外运月计划信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="monthPlanDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>

            <div class="row" name="playDayPlanDiv" id="playDayPlanDiv" style="display: none">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;日计划信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div class="input-group">
                                <button id="stopDayPlan"  class="btn btn-primary mr5 mb10" type="button">中止昨日计划</button>
                            </div>
                            <table id="playDayPlanTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <%--<!-- End .panel -->--%>
                </div>
            </div>
        </div>
        <!-- / .page-content-inner -->
    </div>
    <!-- / page-content-wrapper -->
</div>
<!-- 月计划对应的日计划展示 -->
<%--<div class="modal fade" id="playDayPlanModal" tabindex="-1" role="dialog" aria-labelledby="myDayPlanModal" aria-hidden="true">--%>
    <%--<div class="modal-dialog" style="width: 1200px;">--%>
        <%--<div class="modal-content">--%>
            <%--<div class="modal-header">--%>
            <%--<button type="button" class="close" data-dismiss="modal">--%>
                    <%--<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>--%>
                <%--</button>--%>
                <%--<h4 class="modal-title" id="myHistoryModalLabel3">日计划信息</h4>--%>
            <%--</div>--%>
            <%--<div class="modal-body">--%>
                <%--<div class="row" id="playDayPlanDiv">--%>
                    <%--<div class="col-lg-12">--%>
                        <%--<!-- col-lg-12 start here--%>
                        <%--<div class="panel panel-default toggle ">--%>
                            <%--<!-- Start .panel -->--%>
                            <%--<div class="panel-body">--%>
                                <%--<table id="playDayPlanTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 12px;" width="100%">--%>
                                <%--</table>--%>
                            <%--</div>--%>
                        <%--</div>--%>
                        <%--<!-- End .panel -->--%>
                    <%--</div>--%>
                    <%--<!-- col-lg-12 end here -->--%>
                <%--</div>--%>
            <%--</div>--%>
        <%--</div>--%>
    <%--</div>--%>
<!--新增信息-->
<input type="hidden" id="hideId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 570px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加外运计划信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">收货单位:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <select id="name" class="select fancy-select form-control">
                                            <c:forEach var="re" items="${receives}" varStatus="s">
                                                <option value="${re.id}">${re.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="planCarNum" class="col-lg-4 control-label"
                                           style="padding-right: 1px">计划车数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="planCarNum" class="form-control required" aria-required="true"
                                               name="number"
                                               placeholder="计划车数">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="actualCarNum" class="col-lg-4 control-label"
                                           style="padding-right: 1px">累计实发车:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="actualCarNum" class="form-control"
                                                name="number1"
                                               placeholder="累计实发车数" >
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="planTonnage" class="col-lg-4 control-label"
                                           style="padding-right: 1px">计划吨数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="planTonnage" class="form-control required" aria-required="true"
                                               name="number2"
                                               placeholder="计划吨数">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="actualSendedTonnage" class="col-lg-4 control-label"
                                           style="padding-right: 1px">累计实发吨:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="actualSendedTonnage" class="form-control" 
                                        name="dataNumber"
                                               placeholder="累计实发吨">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="actualUnitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="actualUnitPrice" class="form-control required" aria-required="true"
                                               name="dataNumber1" placeholder="实发单价">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="wellsName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">井别:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="wellsName" class="select fancy-select form-control">
                                            <c:forEach var="we" items="${wells}" varStatus="s">
                                                <option value="${we.name}">${we.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="coalName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">煤炭种类:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="coalName" class="select fancy-select form-control">
                                            <c:forEach var="ca" items="${coals}" varStatus="s">
                                                <option value="${ca.name}">${ca.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="siteName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">到站:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="siteName" class="select fancy-select form-control">
                                            <c:forEach var="st" items="${sites}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="privateLine" class="col-lg-4 control-label"
                                           style="padding-right: 1px">专用线:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="privateLine" class="form-control"
                                               required="true" placeholder="专用线">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="settlement" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">结算单位:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <select id="settlement" class="select fancy-select form-control">
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="method" class="col-lg-4 control-label"
                                           style="padding-right: 1px">结算方式:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="method" class="select fancy-select form-control">
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
                                                <option value="${st.method}">${st.method}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="inputPerson" class="col-lg-4 control-label"
                                           style="padding-right: 1px">录入人:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="inputPerson" class="form-control"
                                               placeholder="${account}" value="${account}" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="usePerson" class="col-lg-4 control-label"
                                           style="padding-right: 1px">经办人:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="usePerson" class="form-control required" aria-required="true"
                                               placeholder="经办人">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="payId" class="col-lg-4 control-label"
                                           style="padding-right: 1px">交款单号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="payId" class="form-control"
                                               placeholder="交款单号">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitBut" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<button type='button' id="showDayPlayTable" class="btn btn-success mr5 mb10" data-toggle='modal'
        data-target='#playDayPlanModal'></button>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/market/monthPlanPage.js"/> "></script>

<!-- / page-content -->