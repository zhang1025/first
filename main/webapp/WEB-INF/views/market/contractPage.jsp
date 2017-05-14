
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
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 55px">
                                    <div class="input-group">
                                        <span class="input-group-addon">煤种</span>
                                        <select id="s_coal" class="select fancy-select form-control"
                                                style="width: 120px">
                                            <option value="">请选择</option>
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.kind}">${coal.kind}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 48px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同状态</span>
                                        <select id="s_status" class="fancy-select form-control" style="width: 100px">
                                            <option value="">请选择</option>
                                            <option value="3">正在发运</option>
                                            <option value="2">锁定</option>
                                            <option value="1">解锁</option>
                                            <option value="4">已结算</option>
                                            <option value="5">审核通过</option>
                                            <option value="0">未审核</option>
                                            <option value="-1">未通过</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 50px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同类型</span>
                                        <select id="s_type" class="fancy-select form-control"
                                                style="width: 100px">
                                            <option value="">请选择</option>
                                            <option value="1">公用煤</option>
                                            <option value="2">零销煤</option>
                                            <option value="4">职工煤</option>
                                            <option value="3">其他</option>
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
                                <div style="padding: 15px;float: right">
                                    <div class="input-group">
                                        <button id="addBtn" class="btn btn-success mr5 mb10" data-toggle="modal"
                                                data-target="#myModal" type="button">新增
                                        </button>
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
            <div class="row" id="contractData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;合同信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">

                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="balance"  class="btn btn-primary mr5 mb10" type="button">结算</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="unlock"  class="btn btn-primary mr5 mb10" type="button">解锁</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="lock"  class="btn btn-primary mr5 mb10" type="button">锁定</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="print" class="btn btn-warning mr5 mb10" type="button">打印</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="delete"  class="btn btn-danger mr5 mb10" type="button">删除</button>
                                </div>
                            </div>
                            <table id="contractDataTables" class="table table-striped table-bordered table-hover"
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
<!--新增信息-->
<input type="hidden" id="hideId">
<input type="hidden" id="statusId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加合同信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="numNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同编号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="numNo" class="form-control required" aria-required="true"
                                               placeholder="合同编号">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="orderTime" class="col-lg-4 control-label"
                                           style="padding-right: 1px">订单日期:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderTime" class="form-control form_datetime" aria-required="true"
                                               style="cursor: pointer;"  readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="receiveName" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">客户名称:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <select id="receiveName" class="select fancy-select form-control required">
                                            <c:forEach var="st" items="${receives}" varStatus="s">
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
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding-right: 1px">种类:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="name" class=" select fancy-select form-control required">
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.kind}">${coal.kind}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="orderCount" class="col-lg-4 control-label"
                                           style="padding-right: 1px">订单总量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderCount" class="form-control required" aria-required="true"
                                               name="number" placeholder="订单总量">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice" class="form-control required" aria-required="true"
                                               name="dataNumber" placeholder="合同单价">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="inputPerson" class="col-lg-4 control-label"
                                           style="padding-right: 1px">录入人:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="inputPerson" class="form-control"
                                               placeholder="${account}" readonly="readonly">
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
                                    <label for="contractType" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同类型:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="contractType" class="fancy-select form-control"
                                                style="width: 130px">
                                            <option value="">请选择</option>
                                            <option value="1">公用煤</option>
                                            <option value="2">零销煤</option>
                                            <option value="4">职工煤</option>
                                            <option value="3">其他</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="forkliftFee" class="col-lg-4 control-label"
                                           style="padding-right: 1px">铲车费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="forkliftFee" class="fancy-select form-control"
                                                style="width: 300px">
                                            <option value="">请选择</option>
                                            <option value="1">包括铲车费</option>
                                            <option value="0">不包括</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                <span style="color: blueviolet">以下是开发票所需要的信息:</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="billName" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">公司名称:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <input type="text" id="billName" class="form-control required" aria-required="true"
                                               placeholder="公司名称">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="address" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">公司地址:</label>
                                    <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                                        <input type="text" id="address" class="form-control required" aria-required="true"
                                               placeholder="公司地址">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="billNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">税号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="billNo" class="form-control required" aria-required="true"
                                               placeholder="税号">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="tel" class="col-lg-4 control-label"
                                           style="padding-right: 1px">电话:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="tel" class="form-control required" aria-required="true"
                                               placeholder="电话">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="bankName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">开户银行:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="bankName" class="form-control required" aria-required="true"
                                               placeholder="开户银行">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="bankNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">账号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="bankNo" class="form-control required" aria-required="true"
                                               placeholder="账号">
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
<script src="<c:url value="/js/views/market/contractPage.js"/> "></script>

<!-- / page-content -->