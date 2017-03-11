<%--
  Created by machaozhe.
  Date: 2016-10-13
  Time: 15:17
  Description: 充值档位分布的JSP
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
                    <h2><spring:message code="show_recharge_type.title" /></h2>
                    <span class="txt"><spring:message code="show_recharge_type.txt" /></span>
                </div>
                <%@include file="../common/visitorsAndViews.jsp"%>
            </div>

            <!-- 查询条件 -->
            <div class="panel panel-default" id="dyn_1">
                <!-- Start .panel -->
                <div class="panel-heading">
                    <h4 class="panel-title"><i class="glyphicon glyphicon-search"><spring:message code="queryTerms" /></i></h4>
                </div>
                <div class="panel-body pt15 pb0">
                    <%@include file="../common/searchConditions.jsp" %>
                    <!-- 查询按钮-->
                    <div class="col-md-1" style="padding: 5px">
                        <div class="input-group">
                            <button id="searchBtn" class="btn btn-primary mr5 mb10" type="button">
                                <spring:message code="search" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 柱状图详细数据 -->
            <div class="panel panel-default" id="dyn_2">
                <!-- Start .panel -->
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <i class="fa fa-area-chart">&nbsp;<spring:message code="keyIndex" /></i>
                        <a href="javascript:void(0)" title="可通过充值档位配置,展示各充值档位的购买情况" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                    </h4>
                </div>
                <!-- 充值档位分布柱状图start -->
                <div class="panel-body p0">
                    <div class="tabs inside-panel" id="recharge-type-div">
                        <ul id="recharge-type-tabs" class="nav nav-tabs">
                            <li path="get_rechargeStall_histogram" chart="line-chart-recharge-type" class="active"><a href="#tabs-recharge-type" data-toggle="tab"><spring:message code='show_recharge_type.recharge_type' /></a></li>
                        </ul>
                        <div class="tab-content" id="recharge-type-loading">
                            <div id="tabs-recharge-type" class="tab-pane in active">
                                <div id="line-chart-recharge-type" style="height:400px" class="tab-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 充值档位分布柱状图end -->

                <!-- 详细数据start -->
                <div class="row">
                    <div class="col-lg-12">
                        <!-- col-lg-12 start here -->
                        <div class="panel panel-default downLoad toggle" id="pnl">
                            <!-- Start .panel -->
                            <div class="panel-heading">
                                <h4 class="panel-title"><i class="fa fa-table">&nbsp;<spring:message code="show_recharge_type.detailData"/></i></h4>
                            </div>
                            <div class="panel-body">
                                <table id="dataTables" class="table table-striped table-bordered" cellspacing="0" width="100%">
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 详细数据end -->
            </div>
            <!-- 柱状图详细数据 -->
        </div>

    </div>
</div>

<!-- js -->
<script src="<c:url value="/js/views/common/jquery.data.js"/>"></script>
<script type="text/javascript">
    var date ="<spring:message code='show_recharge_type.date' />";
    var type ="<spring:message code='show_recharge_type.type' />";
    var rate ="<spring:message code='show_recharge_type.rate' />";
    var rechargeType ="<spring:message code='show_recharge_type.recharge_type' />";
</script>
<script src="<c:url value="/js/views/payData/rechargeStall.js"/>"></script>

