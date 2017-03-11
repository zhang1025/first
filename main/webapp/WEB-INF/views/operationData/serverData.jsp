<%--
  Created by IntelliJ IDEA.
  User: pengyang
  Date: 2016/11/25
  Time: 15:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<script>
    var columns = '${columns}';
</script>
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <!-- .page-content-inner -->
            <div id="page-header" class="clearfix white-bg">
                <div class="page-header">
                    <h2><spring:message code='serverData.serverTitle' /></h2>
                    <span class="txt"><spring:message code='serverData.serverTips' /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp" %>
            </div>
            <div class="col-md-12">
                <div class="panel panel-default toggle">
                    <!-- Start .panel -->
                    <div class="panel-heading">
                        <h4 class="panel-title"><i class="fa fa-search"></i><spring:message code='queryTerms' /></h4>
                    </div>

                    <div class="panel-body">
                        <!-- 查询条件 -->
                        <%@ include file="../common/searchConditions.jsp" %>
                        <!-- 查询按钮-->
                        <div class="col-md-1" style="padding: 5px">
                            <div class="input-group">
                                <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">
                                    <spring:message code='query' />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="col-lg-12" id="dataReport">
                <div id="serverReport">
                    <div class="panel panel-default downLoad toggle " >
                        <!-- Start .panel -->
                        <div class="panel-heading" type="download">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;<spring:message code="keyIndicators"/></i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="serverTable" class="table table-striped table-bordered" cellspacing="0" style="font-size: 5px;" width="100%">
                            </table>
                        </div>
                    </div>
                </div>
                <!-- col-lg-12 end here -->
            </div>

            <div class="col-lg-12" id="serverCompare">
                <div class="panel panel-default  toggle ">
                    <!-- Start .panel -->
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <i class="fa fa-table">&nbsp;<spring:message
                                    code="platData.dataComparison"/></i>
                        </h4>
                    </div>
                    <div class="panel-body">
                        <!-- 区服下拉 -->
                        <div id="server_selectData" class="col-lg-2"
                             style="z-index:0;padding: 5px">
                            <div class="input-group">
                                <span class="input-group-addon"><spring:message code="server"/></span>
                                <select style="font-size: 12px" id="all_serverData" class="fancy-select form-control">
                                    <option value="all">全部区服</option>
                                    <c:forEach items="${resultList}" var="data">
                                        <option value="${data.code}">${data.name}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <!-- 数据列下拉 -->
                        <div id="item_select" class="col-lg-3"
                             style="z-index:0;padding: 5px">
                            <div class="input-group">
                                            <span class="input-group-addon"><spring:message
                                                    code="platData.compareItem"/></span>
                                <select style="font-size: 12px" id="all_item" class="fancy-select form-control">
                                    <c:forEach items="${modelList}" var="itemModel" begin="1">
                                        <option value="${itemModel.column_code}">${itemModel.column_cn}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>

                        <!-- date range picker -->
                        <div id="range_date" class="col-lg-3"
                             style="z-index:0;padding: 5px">
                            <div class="input-group">
                                <span class="input-group-addon"><spring:message code='date' /></span>
                                <input type="text" id="time-range" name='time-range'
                                       class="form-control white-bg text-center"
                                       style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                <%--<span class="input-group-addon"><i class="fa fa-calendar"></i></span>--%>
                            </div>
                        </div>

                        <!-- 查询按钮-->
                        <div class="col-md-1" style="padding: 5px">
                            <div class="input-group">
                                <button id="queryBtn" class="btn btn-primary mr5 mb10" type="button">
                                    <spring:message code='query' />
                                </button>
                            </div>
                        </div>
                        <div id="chart_div">
                            <div id="serverChart" style="height:30%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- col-lg-12 end here -->
            <!-- / .page-content-inner -->
        </div>
        <!-- / page-content-wrapper -->
    </div>
    <!-- / page-content -->
</div>
<script src="<c:url value="/js/views/operationData/serverData.js"/> "></script>
<link rel="stylesheet" href="<c:url value="/css/operationData/serverData.css"/>" type="text/css">

