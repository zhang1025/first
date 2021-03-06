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
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 250px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range'
                                               class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 13px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:15px">
                                    <div class="input-group">
                                        <span class="input-group-addon">井别</span>
                                        <select id="s_wells" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="well" items="${wells}" varStatus="s">
                                                <option value="${well.name}">${well.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:40px">
                                    <div class="input-group">
                                        <span class="input-group-addon">煤种</span>
                                        <select id="s_coals" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.name}">${coal.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:60px">
                                    <div class="input-group">
                                        <span class="input-group-addon">到站</span>
                                        <select id="s_sites" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="site" items="${sites}" varStatus="s">
                                                <option value="${site.name}">${site.name}</option>
                                            </c:forEach>
                                        </select>
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
            <div class="row" id="dayPlanData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;调运日计划信息</i>
                                &nbsp;&nbsp;<span style="color: red;font-size: 8px">提示：日计划中止的不能再进行发车调运</span>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dayPlanDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>

            <div class="row" id="dealDayPlanData" style="display: none;">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;发车调运信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dealDayPlanTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
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
<!-- 日计划对应的发车调运展示 -->
<%--<div class="modal fade" style="padding-top: 150px;" id="dealDayPlanModal" tabindex="-1" role="dialog" aria-labelledby="myDayPlanModal"--%>
     <%--aria-hidden="true">--%>
    <%--<div class="modal-dialog" style="width: 1000px;">--%>
        <%--<div class="modal-content">--%>
            <%--<div class="modal-header">--%>
                <%--<button type="button" class="close" data-dismiss="modal">--%>
                    <%--<span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>--%>
                <%--</button>--%>
                <%--<h4 class="modal-title" id="myHistoryModalLabel3">调运信息</h4>--%>
            <%--</div>--%>
            <%--<div class="modal-body">--%>
                <%--<div class="row" id="dealDayPlanData">--%>
                    <%--<div class="col-lg-12">--%>
                        <%--<!-- col-lg-12 start here--%>
                        <%--<div class="panel panel-default toggle ">--%>
                        <%--<!-- Start .panel -->--%>
                        <%--<div class="panel-body">--%>
                            <%--<table id="dealDayPlanTables" class="table table-striped table-bordered table-hover"--%>
                                   <%--cellspacing="0" style="font-size: 12px;" width="100%">--%>
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
<%--<button type='button' id="dealDayModel" class='btn btn-primary btn-small' data-toggle='modal' data-target='#dealDayPlanModal'></button>--%>

<input type="hidden" id="hideId">
<input type="hidden" id="hideDealId">
<input type="hidden" id="hideMonId">

<input type="hidden" id="searchDayId">
<input type="hidden" id="hidePlanTonnages">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 570px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">发车信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="wagonNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号1:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo" class="form-control required"
                                               aria-required="true" placeholder="车皮号1">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数1:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast" class="form-control required" aria-required="true"
                                            name="number" placeholder="实发吨数1">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="tr_diaoyun">
                            <td>
                                <div class="form-group">
                                    <label for="wagonNo2" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号2:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo2" class="form-control"
                                               placeholder="车皮号2">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast2" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数2:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast2" class="form-control"
                                               name="number" placeholder="实发吨数2">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="tr_diaoyun">
                            <td>
                                <div class="form-group">
                                    <label for="wagonNo3" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号3:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo3" class="form-control"
                                               placeholder="车皮号3">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast3" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数3:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast3" class="form-control"
                                               placeholder="实发吨数3">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="tr_diaoyun">
                            <td>
                                <div class="form-group">
                                    <label for="wagonNo4" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号4:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo4" class="form-control"
                                               placeholder="车皮号4">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast4" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数4:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast4" class="form-control"
                                               placeholder="实发吨数4">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="tr_diaoyun">
                            <td>
                                <div class="form-group">
                                    <label for="wagonNo5" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号5:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo5" class="form-control"
                                               placeholder="车皮号5">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast5" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数5:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast5" class="form-control"
                                               placeholder="实发吨数5">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="wellsName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">井别:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wellsName" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="coalName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">煤炭种类:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="coalName" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="siteName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">到站:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="siteName" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group" id="freightTD">
                                    <label for="unitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <input type="hidden" id="rid" class="form-control" readonly="readonly">
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">收货单位:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <input type="text" id="name" class="form-control" readonly="readonly">
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

<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/transport/dealDayPlanPage.js"/> "></script>

<!-- / page-content -->