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
                                        <input type="text" id="date-range" name='date-range'
                                               class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                    </div>
                                </div>

                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top: 5px;padding-left:20px">
                                    <div class="input-group">
                                        <span class="input-group-addon">结算单位</span>
                                        <select id="s_re" class="select fancy-select form-control"
                                                style="width: 230px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <%--<div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 55px">--%>
                                    <%--<div class="input-group">--%>
                                        <%--<span class="input-group-addon">煤种</span>--%>
                                        <%--<select id="s_coal" class="select fancy-select form-control"--%>
                                                <%--style="width: 120px">--%>
                                            <%--<option value="">请选择</option>--%>
                                            <%--<c:forEach var="coal" items="${coals}" varStatus="s">--%>
                                                <%--<option value="${coal.kind}">${coal.kind}</option>--%>
                                            <%--</c:forEach>--%>
                                        <%--</select>--%>
                                    <%--</div>--%>
                                <%--</div>--%>

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
            <div class="row" id="balanceData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;回款单信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="balanceDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            <div class="row" id="balanceListData" style="display: none;">
                <div class="col-lg-6">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;回款列表</i>
                                <button id="cancelBalance" class="btn btn-warning mr5 mb10" type="button">取消回款</button>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="balanceListTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <div class="col-lg-6">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;未回款列表</i>
                                <button id="balance" class="btn btn-warning mr5 mb10" type="button">结算金额输入</button>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="noBalanceListTables" class="table table-striped table-bordered table-hover"
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

<input type="hidden" id="hideIds">
<input type="hidden" id="hideDayId">
<input type="hidden" id="hideStName">
<!--计算金额输入-->
<div class="modal fade" id="myModalBalance" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 570px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">结算金额输入信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td colspan="2" style="text-align: center;">
                                原发信息
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="tonnage" class="col-lg-4 control-label"
                                           style="padding-right: 1px">吨数:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="tonnage" class="form-control required"
                                               placeholder="吨数" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice" class="form-control"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="coalMoney" class="col-lg-4 control-label"
                                           style="padding-right: 1px">煤款:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="coalMoney" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="taxation" class="col-lg-4 control-label"
                                           style="padding-right: 1px">税金:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="taxation" class="form-control"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="shunting" class="col-lg-4 control-label"
                                           style="padding-right: 1px">调车费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="shunting" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="entruck" class="col-lg-4 control-label"
                                           style="padding-right: 1px">装车费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="entruck" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="freight" class="col-lg-4 control-label"
                                           style="padding-right: 1px">运费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="freight" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="other" class="col-lg-4 control-label"
                                           style="padding-right: 1px">其他:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="other" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="allMoney" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合计:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="allMoney" class="form-control required"
                                               readonly="readonly">
                                    </div>
                                </div>
                            </td>

                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                实结：
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="sjMoney" class="col-lg-4 control-label"
                                           style="padding-right: 1px">实结金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="sjMoney"  onkeyup="inputYK()"
                                               class="form-control required"
                                               aria-required="true">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                盈亏：
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="yingkui" class="col-lg-4 control-label"
                                           style="padding-right: 1px">盈亏:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="yingkui" class="form-control required"
                                               readonly="readonly">
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
<script src="<c:url value="/js/views/finance/remitPage.js"/> "></script>

<!-- / page-content -->