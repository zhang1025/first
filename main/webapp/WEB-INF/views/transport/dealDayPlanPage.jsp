
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
                                        <input type="text" id="date-range" name='date-range' class="form-control white-bg text-center"
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
                            <h4 class="panel-title"><i class="fa fa-table">销售日计划信息</i>
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
        </div>
        <!-- / .page-content-inner -->
    </div>
    <!-- / page-content-wrapper -->
</div>
<input type="hidden" id="hideId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 570px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">安排发车信息</h4>
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
                                    <label for="wagonNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车皮号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="wagonNo" class="form-control required" aria-required="true"
                                               placeholder="车皮号">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="ast" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实发吨数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="ast" class="form-control required" aria-required="true"
                                               placeholder="实发吨数">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="actualUnitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="actualUnitPrice" class="form-control required" aria-required="true"
                                               name="dataNumber1" placeholder="单价">
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
<script src="<c:url value="/js/views/transport/dealDayPlanPage.js"/> "></script>

<!-- / page-content -->