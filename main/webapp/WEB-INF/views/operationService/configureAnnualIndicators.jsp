<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<script type="text/javascript">
    var plat= "<spring:message code='plat' />";
    var channel= "<spring:message code='channel' />";
    var server= "<spring:message code='server' />";
    var serverName= "<spring:message code='server.searchName' />";
    var operator= "<spring:message code='server.operator' />";
    var editor= "<spring:message code='editor' />";
    var deleteTis= "<spring:message code='deleteBtn' />";
    var operatorSuccess= "<spring:message code='server.commitSuccess' />";
    var operatorFail= "<spring:message code='server.commitFail' />";
    var serverAlready= "<spring:message code='server.serverAlready' />";
</script>
<!-- .page-content -->
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <!-- .page-content-inner -->
            <div id="page-header" class="clearfix" style="background-color: #ffffff">
                <div class="page-header">
                    <%--<h3 id="title"> <spring:message code='server.title' /></h3>--%>
                    <%--<span class="txt" id="tips"><spring:message code='server.tips' /></span>--%>
                        <h3 id="title"> 日报配置信息</h3>
                        <span class="txt" id="tips">日报年度配置信息月份表</span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <div class="row">
                <!-- Start .row -->
                <div class="col-md-12">


                    <div id="search_cond" class="panel panel-default">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="glyphicon glyphicon-search">年度查询</i></h4>
                        </div>
                        <div class="panel-body pt15 pb0">
                            <!-- 账号 -->
                            <div class="col-sm-3 col-md-3 col-lg-3" style="padding: 5px">
                                <div class="input-group">
                                    <span class="input-group-addon">年份</span>
                                    <input id="year_input" type="text" class="form-control white-bg text-center" placeholder="请输入查询年份"/>
                                </div>
                            </div>

                            <!-- 查询按钮-->
                            <div class="col-md-1" style="padding: 5px">
                                <div class="input-group">
                                    <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button">
                                        查询
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
                                <%--<h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='server.title' /></i></h4>--%>
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;配置信息</i></h4>
                            </div>
                            <div class="panel-body">
                                <table id="serverDataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 1px" width="100%">
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
                    <span aria-hidden="true">&times;</span><span class="sr-only"><spring:message code='server.close' /></span>
                </button>
                <%--<h4 class="modal-title" id="myModalLabel2"><spring:message code='server.modelTips' />  请输入新配置指标</h4>--%>
                <h4 class="modal-title" id="myModalLabel2">请输入新配置指标</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <%--<label for="serverName" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.searchName' />:</label>--%>
                        <label for="YEAR" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">年份:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="YEAR" class="form-control required" disabled aria-required="true" placeholder=YEAR>
                        </div>
                    </div>
                    <div class="form-group">
                        <%--<label for="serverName" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.searchName' />:</label>--%>
                        <label for="MONTH" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">月份:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="MONTH" class="form-control required"  disabled aria-required="true" placeholder="1">
                        </div>
                    </div>
                    <div class="form-group">
                        <%--<label for="serverName" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.searchName' />:</label>--%>
                        <label for="configuration" class="col-lg-4 control-label"   style="width:30%;padding-left: 20px;padding-right: 1px">指标:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="configuration" class="form-control required" aria-required="true" placeholder="1">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code='cancel' /></button>
                <button type="button" id="submitBut" class="btn btn-primary"><spring:message code='commit' /></button>
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
                <h4 class="modal-title" id="mySmallModalLabel"><spring:message code='server.commitConfirm' /></h4>
            </div>
            <div class="modal-body">
                <i class="glyphicon glyphicon-warning-sign"></i>&nbsp;&nbsp;<spring:message code='question' />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code='cancel' /></button>
                <button type="button" id="deleteBut" class="btn btn-primary"><spring:message code='commit' /></button>
            </div>
        </div>
    </div>
</div>
<!--操作结果展示-->
<div class="modal fade" id="modelResult" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><spring:message code='server.commitResult' /></h4>
            </div>
            <div class="modal-body" id="resultMessage">
            </div>
            <div class="modal-footer" >
                <button type="button" class="btn btn-primary" id="myResult" data-dismiss="modal"><spring:message code='confirm' /></button>
            </div>
        </div>
    </div>
</div>
<button type='button' id="resultBut" class="btn btn-success mr5 mb10" data-toggle='modal' data-target='#modelResult'></button>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/operationservice/configureAnnualIndicators.js"/> "></script>
