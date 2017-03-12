<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>

<!-- .page-content -->
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">

            <div class="row">
                <!-- Start .row -->
                <div class="col-md-12">
                    <div class="panel panel-default toggle">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-search"></i>查询</h4>
                        </div>

                        <div class="panel-body">
                            <div class="row">
                                <!-- 查询条件 -->
                                <%@ include file="../common/searchConditions.jsp" %>

                                <!-- 其他自定义的查询添加在下面添加 -->
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">用户名称</span>
                                        <input type="text" id="account" class="form-control white-bg text-center">
                                    </div>
                                </div>
                                <!--button按钮-->
                                <div class="input-group" style="padding-top: 7px">
                                    <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button">
                                        查询
                                    </button>&nbsp;&nbsp;
                                    <button id="addUser" class="btn btn-success mr5 mb10" type="button"  data-toggle="modal" data-target="#myModal">
                                        添加角色
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default"  id="panel_1">
                <div class="row" id="serverData">
                    <div class="col-lg-12">
                        <!-- col-lg-12 start here -->
                        <div class="panel panel-default toggle ">
                            <!-- Start .panel -->
                            <div class="panel-heading">
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;用户列表</i></h4>
                            </div>
                            <div class="panel-body">
                                <table id="userDataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 1px" width="100%">
                                </table>
                            </div>
                        </div>
                        <!-- End .panel -->
                    </div>
                    <!-- col-lg-12 end here -->
                </div>
            </div>
        </div>
    </div>
</div>
<input id="serverId_old" type="hidden" value=""/><input id="relationId" type="hidden" value=""/>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加用户信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="channel_id" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">角色名称:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="channel_id" class="form-control required" aria-required="true" placeholder="请输入角色名称">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="channel_name"  class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">角色标示:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px">
                            <input type="text" class="form-control required" id="channel_name"  aria-required="true" placeholder="请输入角色标示">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="plat" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">角色信息:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px" >
                            <form:select id="plat" path="platInfos" cssClass="form-control required"  aria-required="true"  name="serverInfo" onchange="findChannel('')">
                                <form:option value="" label="请选择平台类型"></form:option>
                                <form:options items="${platInfos}" itemValue="code" itemLabel="name" />
                            </form:select>
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
<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="mySmallModalLabel">是否确认执行该操作？</h4>
            </div>
            <div class="modal-body">
                <i class="glyphicon glyphicon-warning-sign"></i>&nbsp;&nbsp;问题
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="deleteBut" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>
<!--操作结果展示-->
<div class="modal fade" id="modelResult" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">结果</h4>
            </div>
            <div class="modal-body" id="resultMessage">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="myResult" data-dismiss="modal">确认</button>
            </div>
        </div>
    </div>
</div>
<button type='button' id="resultBut" class="btn btn-success mr5 mb10" data-toggle='modal' data-target='#modelResult'></button>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/serverManager/serverData.js"/> "></script>
