
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
                                <!-- 查询条件 -->
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同编号</span>
                                        <input type="text" id="s_numNo" class="form-control white-bg"
                                               style="width: 100px"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left:5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">客户名称</span>
                                        <select id="s_receives" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${receives}" varStatus="s">
                                                <option value="${st.id}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 55px">
                                    <div class="input-group">
                                        <span class="input-group-addon">押金状态</span>
                                        <select id="s_status" class="fancy-select form-control" style="width: 100px">
                                            <option value="">请选择</option>
                                            <option value="0">正常押金</option>
                                            <option value="-1">已经退款</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 300px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range' class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="paymentBtn"  class="btn btn-success mr5 mb10" type="button">缴款</button>
                                    </div>
                                </div>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="surplusBtn" class="btn btn-primary mr5 mb10" type="button">剩余</button>
                                    </div>
                                </div>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="totalBtn" class="btn btn-primary mr5 mb10" type="button">总缴纳</button>
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
            <div class="row" id="depositData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;煤卡押金信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <%--<div style="padding: 5px;float: left">--%>
                            <%--</div>--%>
                            <table id="depositDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 10px" cellspacing="0" width="100%">
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

<div class="modal fade" id="myModalDeposit" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel3">缴费信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate1" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="coalCard" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">请刷卡:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="coalCard" class="form-control required"
                                   aria-required="true" autofocus="autofocus">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="numNo" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">合同号:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="numNo" class="form-control required" aria-required="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">缴款单位:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <select id="name" class="select fancy-select form-control">
                                <c:forEach var="st" items="${receives}" varStatus="s">
                                    <option value="${st.id}">${st.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="payPeople" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">缴款人员:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="payPeople" class="form-control required" aria-required="true">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="amountMoney" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">缴款金额:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="amountMoney" class="form-control required" aria-required="true" >
                        </div>
                    </div>
                    <%--<div class="form-group">--%>
                        <%--<label for="refundPeople" class="col-lg-4 control-label"--%>
                               <%--style="padding: 1px;width: 17%">退款给:</label>--%>
                        <%--<div class="col-lg-10" style="width: 75%;padding-left: 5px">--%>
                            <%--<input type="text" id="refundPeople" class="form-control">--%>
                        <%--</div>--%>
                    <%--</div>--%>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitBut" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="myModalBack" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">退款信息</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="hideId" value="0">
                    <div class="form-group">
                        <label for="refundPeople" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">退款给:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="refundPeople" class="form-control">
                        </div>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitButBack" class="btn btn-primary">退款</button>
            </div>
        </div>
    </div>
</div>
<!--新增信息-->
<input type="hidden" id="coalCardHide">
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/coal/deposit.js"/> "></script>

<!-- / page-content -->