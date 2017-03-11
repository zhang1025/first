<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<link href="<c:url value="/css/dataReport/dataReport.css"/>" rel="stylesheet" />
<script src="<c:url value="/js/views/common/searchCondition.js"/> "></script>
<script type="text/javascript">
</script>
<!-- .page-content -->
<div class="page-content sidebar-page clearfix">
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
                                <!-- 查询按钮-->
                                <div class="col-md-1" style="padding: 5px">
                                    <div class="input-group">
                                        <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">
                                            查询
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul id="myTab" class="nav nav-tabs">
                <li class="active" id="D">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="true">类型1</a>
                </li>
                <li class  id="W">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false">类型2</a>
                </li>
                <li class id="M">
                    <a href="javascript:void(0)" data-toggle="tab" aria-expanded="false">类型3</a>
                </li>
            </ul>
            <div class="row" id="platData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;数据信息</i>
                            <a href="javascript:void(0)" title="展示数据" class="tip"><i class="glyphicon glyphicon-info-sign"></i></a>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="dataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 5px;" width="100%">
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
<script src="<c:url value="/plugins/charts/sparklines/jquery.sparkline.js"/> "></script>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/tables/datatables/dataTables.bootstrap.js"/> "></script>
<script src="<c:url value="/js/views/general/dataReport.js"/> "></script>
