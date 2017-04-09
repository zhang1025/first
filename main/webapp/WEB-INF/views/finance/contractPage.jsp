
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
                            <div style="padding-top: 7px;float: left">
                                <%--<div class="input-group">--%>
                                    <%--<button id="addFinanceInfo"  class="btn btn-success mr5 mb10" type="button">添加财务信息</button>--%>
                                <%--</div>--%>
                                <div class="input-group">
                                    <button id="verify"  class="btn btn-warning mr5 mb10" type="button">审核</button>
                                </div>
                            </div>
                            <table id="contractDataTables" class="table table-striped table-bordered table-hover"
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
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加财务信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="settlement" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">结算单位:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <select id="settlement" class="select fancy-select form-control required">
                                <c:forEach var="st" items="${settlements}" varStatus="s">
                                    <option value="${st.name}">${st.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="fund" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">资金方式:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <select id="fund" class="select fancy-select form-control required">
                                <c:forEach var="st" items="${funds}" varStatus="s">
                                    <option value="${st.name}">${st.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="taxation" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">税金:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="taxation" class="form-control required" aria-required="true"
                                   name="number" placeholder="请输入税金">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="financePerson" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">财务经办人:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <input type="text" id="financePerson"
                                   placeholder="${account}" readonly="readonly">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitBut" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="myModalVerify" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel3">审核信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate1" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="status" class="col-lg-4 control-label"
                               style="padding: 1px;width: 17%">是否通过:</label>
                        <div class="col-lg-10" style="width: 75%;padding-left: 5px">
                            <select id="status" class="select fancy-select form-control required">
                                <option value="-1">未通过</option>
                                <option value="3">通过</option>
                            </select>
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
<script src="<c:url value="/js/views/finance/contractPage.js"/> "></script>

<!-- / page-content -->