<%@ page language="java" contentType="text/html;charset=UTF-8"  pageEncoding="UTF-8"%>
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
                                <div id="type_select" class="col-sm-2 col-md-2 col-lg-2" style="z-index:0;padding: 5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">选择角色：</span>
                                        <select id="roleParam" class="fancy-select form-control" style="width: 120px">
                                            <option value="">请选择</option>
                                            <c:forEach var="role" items="${roles}" varStatus="s">
                                                <option value="${role.roleId}">${role.roleName}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top: 5px;padding-left: 50px">
                                    <div class="input-group">
                                        <span class="input-group-addon">用戶名</span>
                                        <input type="text" id="username" placeholder="请输入用戶名" class="form-control white-bg text-center" style="width: 120px"/>
                                    </div>
                                </div>
                                <!-- 查询按钮-->
                                <div class="col-md-1" style="padding-top: 5px;padding-left: 80px">
                                    <div class="input-group">
                                        <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">查询</button>
                                    </div>
                                </div>
                                <div class="col-md-1" style="padding: 5px;float: right">
                                    <div class="input-group">
                                        <button id="addBtn" class="btn btn-success mr5 mb10" data-toggle="modal" data-target="#myModal"  type="button">新增</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="userData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;用戶信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="userDataTables" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
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
<!--新增用戶信息-->
<input type="hidden" id="userId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">新增用戶</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="account" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">用戶名:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="account" class="form-control required" aria-required="true" placeholder="请输入用戶名">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="pw" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">密码:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="password" id="pw" class="form-control required" aria-required="true" placeholder="请输入密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="role" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">角色:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <select id="role" class="fancy-select form-control">
                                <c:forEach var="roleVar" items="${roles}" varStatus="s">
                                    <option value="${roleVar.roleId}">${roleVar.roleName}</option>
                                </c:forEach>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="department" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">所属部门:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="department" class="form-control"  placeholder="请输入所属部门">
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

<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/system/user.js"/> "></script>

<!-- / page-content -->