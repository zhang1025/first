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
                            <h4 class="panel-title"><i class="fa fa-search"></i>查询</h4>
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 300px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range'
                                               class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                    </div>
                                </div>

                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-top: 5px;padding-left:20px">
                                    <div class="input-group">
                                        <span class="input-group-addon">结算单位</span>
                                        <select id="s_re" class="select fancy-select form-control"
                                                style="width: 230px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${settlements}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <%--<div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 55px">--%>
                                    <%--<div class="input-group">--%>
                                        <%--<span class="input-group-addon">煤种</span>--%>
                                        <%--<select id="s_coal" class="select fancy-select form-control"--%>
                                                <%--style="width: 120px">--%>
                                            <%--<option value="">请选择</option>--%>
                                            <%--<c:forEach var="coal" items="${coals}" varStatus="s">--%>
                                                <%--<option value="${coal.kind}">${coal.kind}</option>--%>
                                            <%--</c:forEach>--%>
                                        <%--</select>--%>
                                    <%--</div>--%>
                                <%--</div>--%>

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
            <div class="row" id="balanceData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;回款单信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="balanceDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            <div class="row" id="balanceListData" style="display: none;">
                <div class="col-lg-6">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;回款列表</i>
                                <%--<button id="cancelBalance" class="btn btn-warning mr5 mb10" type="button">取消回款</button>--%>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="balanceListTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 12px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <div class="col-lg-6">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title">
                                <i class="fa fa-table">&nbsp;未回款列表</i>
                                <button id="paymentBut" class="btn btn-warning mr5 mb10" type="button">回款</button>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <table id="noBalanceListTables" class="table table-striped table-bordered table-hover"
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

<input type="hidden" id="hideIds">
<input type="hidden" id="hideDayId">
<input type="hidden" id="hideStName">

<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/finance/remitPage.js"/> "></script>

<!-- / page-content -->