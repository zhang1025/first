
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
                                               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                    </div>
                                </div>

                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top: 5px;padding-left:20px">
                                    <div class="input-group">
                                        <span class="input-group-addon">结算单位</span>
                                        <select id="s_st" class="select fancy-select form-control"
                                                style="width: 230px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
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
                                <%--<div style="padding: 15px;float: right">--%>
                                    <%--<div class="input-group">--%>
                                        <%--<button id="delBtn" class="btn btn-danger mr5 mb10" type="button">删除--%>
                                        <%--</button>--%>
                                    <%--</div>--%>
                                <%--</div>--%>

                                <div style="padding: 15px;float: right">
                                    <div class="input-group">
                                        <button id="addNewBtn" class="btn btn-success mr5 mb10"
                                                data-toggle="modal" data-target="#myModal" type="button">添加
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="paymentData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;客户交款信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div style="padding: 15px;float: left">
                                <div class="input-group">
                                    <button id="addPayBtn" class="btn btn-warning mr5 mb10" type="button">追加</button>
                                </div>
                            </div>
                            <table id="paymentDataTables" class="table table-striped table-bordered table-hover"
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
                <h4 class="modal-title" id="myModalLabel2">添加客户交款信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="numNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px;width: 17%">客户编码:</label>
                                    <div class="col-lg-10" style="width: 250px;padding-left: 5px">
                                        <input type="text" id="numNo" class="form-control required" aria-required="true"
                                               placeholder="客户编码">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">结算单位:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <select id="name" onchange="searchTaxation()" class="select fancy-select form-control">
                                            <c:forEach var="re" items="${settlements}" varStatus="s">
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
                                    <label for="fn" class="col-lg-4 control-label"
                                           style="padding-right: 1px">到站站点:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="fn" class="select fancy-select form-control">
                                            <c:forEach var="re" items="${sites}" varStatus="s">
                                                <option value="${re.name}">${re.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="currentDeposit" class="col-lg-4 control-label"
                                           style="padding-right: 1px">本期存款:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="currentDeposit" class="form-control required" aria-required="true"
                                               placeholder="本期存款">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="planCar" class="col-lg-4 control-label"
                                           style="padding-right: 1px">车数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="planCar" class="form-control"
                                               placeholder="车数">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="planTonnage" class="col-lg-4 control-label"
                                           style="padding-right: 1px">吨数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="planTonnage" class="form-control required" aria-required="true"
                                               placeholder="吨数">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice" class="form-control required" aria-required="true"
                                               placeholder="单价">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="fund" class="col-lg-4 control-label"
                                           style="padding-right: 1px">资金方式:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="fund" class="select fancy-select form-control">
                                            <c:forEach var="ca" items="${funds}" varStatus="s">
                                                <option value="${ca.name}">${ca.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="auditPeople" class="col-lg-4 control-label"
                                           style="padding-right: 1px">会计审计:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="auditPeople" class="select fancy-select form-control">
                                            <c:forEach var="st" items="${users}" varStatus="s">
                                                <option value="${st.account}">${st.account}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="cashier" class="col-lg-4 control-label"
                                           style="padding-right: 1px">出纳:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="cashier" class="select fancy-select form-control">
                                            <c:forEach var="st" items="${users}" varStatus="s">
                                                <option value="${st.account}">${st.account}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="addPeople" class="col-lg-4 control-label"
                                           style="padding-right: 1px">录入:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="addPeople" class="form-control" readonly="readonly"
                                               placeholder="cashier" value="${account}">
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

<input type="hidden" id="addPayHideId">
<div class="modal fade" id="myModalVerify" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel3">追加交款信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate1" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="appendPay" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">追加存款:</label>
                        <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                            <input type="text" id="appendPay" class="form-control required" aria-required="true"
                                   placeholder="追加存款">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitBut1" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/finance/paymentPage.js"/> "></script>

<!-- / page-content -->