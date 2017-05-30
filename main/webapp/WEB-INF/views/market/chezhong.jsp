
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
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
                            <h4 class="panel-title"><i class="fa fa-search"></i>地付信息查询</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 250px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range' class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 13px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:15px">
                                    <div class="input-group">
                                        <span class="input-group-addon">客户名称</span>
                                        <select id="s_receive" class="select fancy-select form-control"
                                                style="width: 200px">
                                            <option value="">请选择</option>
                                            <c:forEach var="re" items="${receives}" varStatus="s">
                                                <option value="${re.name}">${re.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:120px">
                                    <div class="input-group">
                                        <span class="input-group-addon">煤种</span>
                                        <select id="s_coals" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.name}">${coal.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>


                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:160px">
                                    <div class="input-group">
                                        <span class="input-group-addon">车牌号</span>
                                        <select id="s_plateNum" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="pl" items="${chepais}" varStatus="s">
                                                <option value="${pl.name}">${pl.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding:5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">磅房</span>
                                        <select id="s_kq" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="kq" items="${kuangqus}" varStatus="s">
                                                <option value="${kq.kqName}">${kq.kqName}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:40px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同编号</span>
                                        <input type="text" id="s_numNo" class="form-control white-bg"
                                               style="width: 100px"/>
                                    </div>
                                </div>
                                <%--<!-- 查询按钮-->--%>
                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="searBtn" class="btn btn-primary mr5 mb10" type="button">查询</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="czData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;地付实时数据</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div style="padding: 5px;float: right">
                                <div class="input-group">
                                    <button id="downDfInfo" class="btn btn-primary mr5 mb10" type="button">导出地付数据</button>
                                </div>
                            </div>
                            <table id="czDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
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
    <div class="page-content-wrapper">
        -----------------------------------------------------------------------
        -----------------------------------------------------------------------
        -----------------------------------------
    </div>
    <div class="page-content-wrapper">
        <div class="page-content-inner">
            <div class="row">
                <div class="col-md-12">
                    <div class="panel panel-default toggle">
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-search"></i>外运信息查询</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 250px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range1" name='date-range' class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 13px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:15px">
                                    <div class="input-group">
                                        <span class="input-group-addon">客户名称</span>
                                        <select id="s_receive1" class="select fancy-select form-control"
                                                style="width: 200px">
                                            <option value="">请选择</option>
                                            <c:forEach var="re" items="${receives}" varStatus="s">
                                                <option value="${re.name}">${re.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:120px">
                                    <div class="input-group">
                                        <span class="input-group-addon">煤种</span>
                                        <select id="s_coals1" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.name}">${coal.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top:5px;padding-left:160px">
                                    <div class="input-group">
                                        <span class="input-group-addon">井别</span>
                                        <select id="s_well" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="w" items="${wells}" varStatus="s">
                                                <option value="${w.name}">${w.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>

                                <div style="padding-top: 15px;float: right">
                                    <div class="input-group">
                                        <button id="searBtnDY" class="btn btn-primary mr5 mb10" type="button">查询</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" id="dyData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;外运实时数据</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div style="padding: 5px;float: right">
                                <div class="input-group">
                                    <button id="downWyInfo" class="btn btn-primary mr5 mb10" type="button">导出外运数据</button>
                                </div>
                            </div>
                            <table id="dyDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
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

<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/js/views/market/chezhong.js"/> "></script>
<!-- / page-content -->