<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<script type="text/javascript">
    var plat= "<spring:message code='plat' />";
    var channel= "<spring:message code='channel' />";
    var server= "<spring:message code='server' />";
    var serverName= "<spring:message code='server.searchName' />";
    var serverIP= "<spring:message code='server.serverIp' />";
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
                    <h3 id="title"> <spring:message code='server.title' /></h3>
                    <span class="txt" id="tips"><spring:message code='server.tips' /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <div class="row">
                <!-- Start .row -->
                <div class="col-md-12">
                    <div class="panel panel-default toggle">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-search"></i><spring:message code='queryTerms' /></h4>
                        </div>

                        <div class="panel-body">
                            <div class="row">
                                <!-- 查询条件 -->
                                <%@ include file="../common/searchConditions.jsp" %>

                                <!-- 其他自定义的查询添加在下面添加 -->
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px">
                                    <div class="input-group">
                                        <span class="input-group-addon"><spring:message code='server.searchName' /></span>
                                        <input type="text" id="server_name" class="form-control white-bg text-center"/>
                                    </div>
                                </div>
                                <!--button按钮-->
                                <div class="input-group" style="padding-top: 7px">
                                    <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button">
                                        <spring:message code='query' />
                                    </button>&nbsp;
                                    <button id="addServer" class="btn btn-success mr5 mb10" type="button"  data-toggle="modal" data-target="#myModal">
                                        <spring:message code='server.addButton' />
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
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='server.title' /></i></h4>
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
                <h4 class="modal-title" id="myModalLabel2"><spring:message code='server.modelTips' /></h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="serverName" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.searchName' />:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="serverName" class="form-control required" aria-required="true" placeholder="<spring:message code='server.searchNameTips' />">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serverId"  class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px">
                            <input type="text" class="form-control required" id="serverId"  aria-required="true" name="number" placeholder="<spring:message code='server.serverIdTips' />">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="serverIp" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.serverIp' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px">
                            <input type="text" id="serverIp" class="form-control required" aria-required="true"  name="isIP" placeholder="<spring:message code='server.serverIpTips' />">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="plat" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.platformType' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px" >
                            <form:select id="plat" path="platInfos" cssClass="form-control required"  aria-required="true"  name="serverInfo" onchange="findChannel('')">
                                <form:option value="" label="请选择平台类型"></form:option>
                                <form:options items="${platInfos}" itemValue="code" itemLabel="name" />
                            </form:select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="channel" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.channelType' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px" >
                            <select class="form-control select2 js-example-basic-multiple required"  aria-required="true" name="select2" id="channel" multiple="multiple" onchange="validValues()">
                                <c:forEach items="${channelInfos}" var="channelList">
                                    <optgroup label="${channelList.key}">
                                        <c:forEach items="${channelList.value}" var="channel">
                                            <option value="${channel.channelId}">${channel.channelName}</option>
                                        </c:forEach>
                                    </optgroup>
                                </c:forEach>
                            </select>
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
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="myResult" data-dismiss="modal"><spring:message code='confirm' /></button>
            </div>
        </div>
    </div>
</div>
<button type='button' id="resultBut" class="btn btn-success mr5 mb10" data-toggle='modal' data-target='#modelResult'></button>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/serverManager/serverData.js"/> "></script>
