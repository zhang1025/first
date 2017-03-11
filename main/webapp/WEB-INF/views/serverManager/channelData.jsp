<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<script type="text/javascript">
    var channelId= "<spring:message code='channel.channelId' />";
    var channelName= "<spring:message code='channel.channelName' />";
    var plat= "<spring:message code='channel.plat' />";
    var platName= "<spring:message code='channel.platName' />";
    var operator= "<spring:message code='server.operator' />";
    var editor= "<spring:message code='editor' />";
    var deleteTis= "<spring:message code='deleteBtn' />";
    var operatorSuccess= "<spring:message code='server.commitSuccess' />";
    var operatorFail= "<spring:message code='server.commitFail' />";
    var channelAlready= "<spring:message code='channel.channelAlready' />";
</script>
<!-- .page-content -->
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <!-- .page-content-inner -->
            <div id="page-header" class="clearfix" style="background-color: #ffffff">
                <div class="page-header">
                    <h3 id="title"> <spring:message code='channel.title' /></h3>
                    <span class="txt" id="tips"><spring:message code='channel.tips' /></span>
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
                                        <span class="input-group-addon"><spring:message code='channel.channelId' /></span>
                                        <input type="text" id="channelId" class="form-control white-bg text-center"/>
                                    </div>
                                </div>
                                <!--button按钮-->
                                <div class="input-group" style="padding-top: 7px">
                                    <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button">
                                        <spring:message code='query' />
                                    </button>&nbsp;&nbsp;
                                    <button id="addChannel" class="btn btn-success mr5 mb10" type="button"  data-toggle="modal" data-target="#myModal">
                                        <spring:message code='server.addButton' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default"  id="panel_1">
                <div class="row" id="channelData">
                    <div class="col-lg-12">
                        <!-- col-lg-12 start here -->
                        <div class="panel panel-default toggle ">
                            <!-- Start .panel -->
                            <div class="panel-heading">
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code='channel.title' /></i>
                                </h4>
                            </div>
                            <div class="panel-body">
                                <table id="channelDataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 12px" width="100%">
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
<!--提交表单-->
<input type="hidden" id="channelOldId"><input type="hidden" id="platOldId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only"><spring:message code='server.close' /></span>
                </button>
                <h4 class="modal-title" id="myModalLabel2"><spring:message code='channel.modelTips' /></h4>
            </div>
            <div class="modal-body">
                <form id="validateChannel" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="channel_id" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='channel.channelId' />:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="channel_id" class="form-control required" aria-required="true" placeholder="<spring:message code='channel.channelIdTips' />">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="channel_name"  class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='channel.channelName' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px">
                            <input type="text" class="form-control required" id="channel_name"  aria-required="true" placeholder="<spring:message code='channel.nameTips' />">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="plat" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px"><spring:message code='server.platformType' />:</label>
                        <div class="col-lg-10" style="width: 300px; padding-left: 5px" >
                            <form:select id="plat" path="platInfos" cssClass="form-control required"  aria-required="true"  name="serverInfo">
                                <form:option value="" label="请选择平台类型"></form:option>
                                <form:options items="${platInfos}" itemValue="code" itemLabel="name" />
                            </form:select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><spring:message code='cancel' /></button>
                <button type="button" id="submitChannelBut" class="btn btn-primary"><spring:message code='commit' /></button>
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
                <button type="button" id="deleteChannelBut" class="btn btn-primary"><spring:message code='commit' /></button>
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
<button type='button' id="resultChannelBut" class="btn btn-success mr5 mb10" data-toggle='modal' data-target='#modelResult'></button>
<script src="<c:url value="/js/views/serverManager/channelData.js"/> "></script>
