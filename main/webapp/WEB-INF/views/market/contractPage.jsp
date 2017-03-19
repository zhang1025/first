
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
                                        <select id="s_settlements" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
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
                                <div class="col-md-1" style="padding: 5px;float: right">
                                    <div class="input-group">
                                        <button id="addBtn" class="btn btn-success mr5 mb10" data-toggle="modal"
                                                data-target="#myModal" type="button">新增
                                        </button>
                                    </div>
                                </div>
                                <%--<!-- 查询按钮-->--%>
                                <div class="col-md-1" style="padding-top: 5px;float: right">
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
                    <div class="form-group">
                        <label for="numNo" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">合同编号:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="numNo" class="form-control required" aria-required="true"
                                   placeholder="合同编号">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="orderTime" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">订单日期:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="orderTime" class="form-control form_datetime" aria-required="true"
                                    style="cursor: pointer;"  readonly="readonly">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="settlement" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">客户名称:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <select id="settlement" class="select fancy-select form-control required">
                                <c:forEach var="st" items="${settlements}" varStatus="s">
                                    <option value="${st.name}">${st.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="name" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">种类:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <select id="name" class=" select fancy-select form-control required">
                                <c:forEach var="coal" items="${coals}" varStatus="s">
                                    <option value="${coal.kind}">${coal.kind}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="orderCount" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">订单总量:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="orderCount" class="form-control required" aria-required="true"
                                   name="number" placeholder="订单总量">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="unitPrice" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">合同单价:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="unitPrice" class="form-control required" aria-required="true"
                                   name="dataNumber" placeholder="合同单价">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputPerson" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">录入人:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="inputPerson" class="form-control required" aria-required="true"
                                   placeholder="录入人">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="usePerson" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">经办人:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="usePerson" class="form-control required" aria-required="true"
                                    placeholder="经办人">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="contractType" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">合同类型:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <select id="contractType" class="fancy-select form-control"
                                    style="width: 300px">
                                <option value="">请选择</option>
                                <option value="1">公用煤</option>
                                <option value="2">零销煤</option>
                                <option value="4">职工煤</option>
                                <option value="3">其他</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="forkliftFee" class="col-lg-4 control-label"
                               style="width:30%;padding-left: 20px;padding-right: 1px">铲车费:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <select id="forkliftFee" class="fancy-select form-control"
                                    style="width: 300px">
                                <option value="">请选择</option>
                                <option value="1">包括铲车费</option>
                                <option value="0">不包括</option>
                            </select>
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

<!--删除提示modal-style6-->
<div class="modal fade" id="modalDelete" tabindex="-1" style="padding-top: 100px" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="mySmallModalLabel">提示</h4>
            </div>
            <div class="modal-body" style="font-size: 20px">
                <i class="glyphicon glyphicon-warning-sign"></i>&nbsp;&nbsp;您确认要进行此操作吗？
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="deleteBut" class="btn btn-primary">确认</button>
            </div>
        </div>
    </div>
</div>
<!--操作结果展示-->
<div class="modal fade" id="modelResult" style="padding-top: 100px" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">操作结果</h4>
            </div>
            <div class="modal-body" id="wordsMessage">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="myResult" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>
<button type='button' id="resultBut" class="btn btn-success mr5 mb10" data-toggle='modal'
        data-target='#modelResult'></button>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/market/contractPage.js"/> "></script>

<!-- / page-content -->