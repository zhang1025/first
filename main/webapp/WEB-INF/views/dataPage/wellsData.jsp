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

                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top: 5px;padding-left: 10px">
                                    <div class="input-group">
                                        <span class="input-group-addon">井区名</span>
                                        <input type="text" id="s_name" placeholder="请输入井区名" class="form-control white-bg text-center" style="width: 120px"/>
                                    </div>
                                </div>

                                <%--<!-- 查询按钮-->--%>
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
            <div class="row" id="wellsData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;井区信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="wellsDataTables" class="table table-striped table-bordered table-hover" cellspacing="0" style="font-size: 15px" width="100%">
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
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" style="padding-top: 100px" aria-labelledby="myModalLabel" aria-hidden="true" >
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加井区</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <div class="form-group">
                        <label for="name" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">井区名:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="name" class="form-control required"  aria-required="true" placeholder="请输入井区名">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="mnc" class="col-lg-4 control-label" style="width:30%;padding-left: 20px;padding-right: 1px">井区简记符:</label>
                        <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                            <input type="text" id="mnc" class="form-control required" aria-required="true" placeholder="井区简记符">
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
<div class="modal fade" id="modalDelete" tabindex="-1" style="padding-top: 100px" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
<div class="modal fade" id="modelResult" tabindex="-1" style="padding-top: 100px" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
<button type='button' id="resultBut" class="btn btn-success mr5 mb10" data-toggle='modal' data-target='#modelResult'></button>
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/dataPage/wellsData.js"/> "></script>

<!-- / page-content -->