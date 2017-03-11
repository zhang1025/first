<%--
  description: 缓存清理
  User: machaozhe
  Date: 2016-12-14
  Time: 10:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<div class="page-content sidebar-page right-sidebar-page clearfix">
    <!-- .page-content-wrapper -->
    <div class="page-content-wrapper">
        <div class="page-content-inner">

            <!-- 描述与访问 -->
            <div id="page-header" class="clearfix">
                <div class="page-header">
                    <h2>清理缓存</h2>
                    <span class="txt">根据缓存名称清理指定缓存</span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <!-- 缓存表格 -->
            <div class="panel panel-default" id="dyn_2">
                <!-- 缓存表格start -->
                <div class="row">
                    <div class="col-lg-12">
                        <!-- col-lg-12 start here -->
                        <div class="panel panel-default toggle" id="pnl">
                            <!-- Start .panel -->
                            <div class="panel-heading">
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;缓存信息</i></h4>
                            </div>
                            <div class="panel-body">
                                <table id="clearCacheTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 缓存表格end -->
            </div>
            <!-- 缓存表格 -->
        </div>

    </div>
</div>

<!-- js -->
<script src="<c:url value="/js/views/common/jquery.data.js"/>"></script>
<script src="<c:url value="/js/views/operationservice/clearCache.js"/>"></script>
