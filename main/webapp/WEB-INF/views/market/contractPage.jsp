<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="../include/taglib.jsp" %>
<link href="<c:url value="/css/bootstrap.css"/>" rel="stylesheet" />
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
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同编号</span>
                                        <input type="text" id="s_numNo" class="form-control white-bg"
                                               style="width: 100px"/>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left:5px">
                                    <div class="input-group">
                                        <span class="input-group-addon">客户名称</span>
                                        <select id="s_receives" class="select fancy-select form-control"
                                                style="width: 150px">
                                            <option value="">请选择</option>
                                            <c:forEach var="st" items="${receives}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 55px">
                                    <div class="input-group">
                                        <span class="input-group-addon">煤种</span>
                                        <select id="s_coal" class="select fancy-select form-control"
                                                style="width: 120px">
                                            <option value="">请选择</option>
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.kind}">${coal.kind}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 48px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同状态</span>
                                        <select id="s_status" class="fancy-select form-control" style="width: 100px">
                                            <option value="">请选择</option>
                                            <option value="3">正在发运</option>
                                            <option value="2">锁定</option>
                                            <option value="1">解锁</option>
                                            <option value="4">已结算</option>
                                            <option value="5">审核通过</option>
                                            <option value="0">未审核</option>
                                            <option value="-1">未通过</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding-left: 50px">
                                    <div class="input-group">
                                        <span class="input-group-addon">合同类型</span>
                                        <select id="s_type" class="fancy-select form-control"
                                                style="width: 100px">
                                            <option value="">请选择</option>
                                            <option value="1">公用煤</option>
                                            <option value="2">零销煤</option>
                                            <option value="4">职工煤</option>
                                            <option value="3">其他</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 col-md-2 col-lg-2" style="padding: 5px;width: 300px">
                                    <div class="input-group">
                                        <span class="input-group-addon">时间</span>
                                        <input type="text" id="date-range" name='date-range'
                                               class="form-control white-bg text-center"
                                               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
                                    </div>
                                </div>
                                <div style="padding: 15px;float: right">
                                    <div class="input-group">
                                        <button id="addBtn" class="btn btn-success mr5 mb10" data-toggle="modal"
                                                data-target="#myModal" type="button">新增
                                        </button>
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
            <div class="row" id="contractData">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default downLoad toggle ">
                        <!-- Start .panel -->
                        <div class="panel-heading">
                            <h4 class="panel-title"><i class="fa fa-table">&nbsp;合同信息</i>
                            </h4>
                        </div>
                        <div class="panel-body">
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="adjustPrice" class="btn btn-primary mr5 mb10" type="button">调整价格
                                    </button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="balance" class="btn btn-primary mr5 mb10" type="button">合同结账</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="addContract" class="btn btn-primary mr5 mb10" type="button">增补合同
                                    </button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="unlock" class="btn btn-primary mr5 mb10" type="button">解锁</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="lock" class="btn btn-primary mr5 mb10" type="button">锁定</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="print" class="btn btn-warning mr5 mb10" type="button">打印</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: left">
                                <div class="input-group">
                                    <button id="delete" class="btn btn-danger mr5 mb10" type="button">删除</button>
                                </div>
                            </div>
                            <div style="padding: 5px;float: right">
                                <div class="input-group">
                                    <button id="downContractInfo" class="btn btn-primary mr5 mb10" type="button">导出合同信息</button>
                                </div>
                            </div>
                            <table id="contractDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 10px" cellspacing="0" width="100%">
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            <!-- 零销煤打印table -->
            <div id="printContractData">
            <div class="row" id="printContractData1" style="display: none">
                <div class="col-lg-12">
                    <!-- col-lg-12 start here -->
                    <div class="panel panel-default toggle ">
                        <div class="panel-body">
                            <table id="printContractDataTables" class="table table-striped table-bordered table-hover"
                                   style="font-size: 10px" cellspacing="0" width="100%" >
                                <tr>
                                    <td colspan="11" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">辽矿(集团)煤炭销售总公司</td>
                                </tr>
                                <tr>
                                    <td colspan="11" style="text-align: center;font-size: 20px;border: 1px solid #000000;border-bottom:1px solid #ffffff;">零 销 煤 销 售 结 算 单</td>
                                </tr>
                                <tr>
                                    <td colspan="9" style="border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">时间：<span id="time">2017-05-16</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">单位：吨\元</td>
                                </tr>
                                <tr>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">购煤单位</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;" colspan="8"><span id="stName">购煤单位111111</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">合同号</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;"><span id="htNo">20170610</span></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">购煤数量</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">付煤地点</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">品种</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">单价</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">煤款合计</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">铲车费</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">煤卡费</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"><span id="gmNum">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"><span id="dd">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"><span id="pz">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"><span id="dj">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;" colspan="2"><span id="all">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;" colspan="2"><span id="chanche">779.21</span></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;" colspan="2"><span id="mk">779.21</span></td>
                                </tr>
                                <tr>
                                    <td colspan="9" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"></td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">备注</td>
                                </tr>
                                <tr>
                                    <td colspan="9" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"></td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">发票半年以内开具，逾期不予开据</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">领导审批</td>
                                    <td colspan="3" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">财务科</td>
                                    <td colspan="4" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">销售科</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;">经办人</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">负责人</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">审核</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">出纳</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">销售部长</td>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;border-right:1px solid #ffffff;">签名</td>
                                    <td style="text-align: center;border: 1px solid #000000;border-bottom:1px solid #ffffff;"></td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;"></td>
                                    <td  colspan="2" style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;">
                                        开票人
                                    </td><td colspan="2" style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;"></td>
                                    <td style="text-align: center;border: 1px solid #000000;border-right:1px solid #ffffff;">电话</td>
                                    <td style="text-align: center;border: 1px solid #000000;"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <!-- End .panel -->
                </div>
                <!-- col-lg-12 end here -->
            </div>
            </div>
        </div>
        <!-- / .page-content-inner -->
    </div>
    <!-- / page-content-wrapper -->
</div>
<!--新增信息-->
<input type="hidden" id="hideId">
<input type="hidden" id="statusId">
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel2">添加合同信息</h4>
            </div>
            <div class="modal-body">
                <form id="validate" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="numNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同编号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="numNo" class="form-control required" aria-required="true"
                                               placeholder="合同编号">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="orderTime" class="col-lg-4 control-label"
                                           style="padding-right: 1px">订单日期:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderTime" class="form-control form_datetime"
                                               aria-required="true"
                                               style="cursor: pointer;" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="receiveName" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">客户名称:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <select id="receiveName" class="select fancy-select form-control required">
                                            <c:forEach var="st" items="${receives}" varStatus="s">
                                                <option value="${st.name}">${st.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding-right: 1px">种类:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="name" class=" select fancy-select form-control required">
                                            <c:forEach var="coal" items="${coals}" varStatus="s">
                                                <option value="${coal.kind}">${coal.kind}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="name" class="col-lg-4 control-label"
                                           style="padding-right: 1px">井区:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="wells" class=" select fancy-select form-control required">
                                            <c:forEach var="w" items="${wells}" varStatus="s">
                                                <option value="${w.name}">${w.name}</option>
                                            </c:forEach>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="orderCount" class="col-lg-4 control-label"
                                           style="padding-right: 1px">订单总量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderCount" class="form-control required"
                                               aria-required="true"
                                               name="number" placeholder="订单总量">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice" class="form-control required"
                                               aria-required="true"
                                               name="dataNumber" placeholder="合同单价">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="contractType" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同类型:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="contractType" class="fancy-select form-control"
                                                style="width: 130px">
                                            <option value="">请选择</option>
                                            <option value="1">公用煤</option>
                                            <option value="2">零销煤</option>
                                            <option value="4">职工煤</option>
                                            <option value="3">其他</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="inputPerson" class="col-lg-4 control-label"
                                           style="padding-right: 1px">录入人:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="inputPerson" class="form-control"
                                               placeholder="${account}" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="usePerson" class="col-lg-4 control-label"
                                           style="padding-right: 1px">经办人:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="usePerson" class="form-control required"
                                               aria-required="true"
                                               placeholder="经办人">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="forkliftFee" class="col-lg-4 control-label"
                                           style="padding-right: 1px">铲车费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <select id="forkliftFee" class="fancy-select form-control"
                                                style="width: 300px">
                                            <option value="">请选择</option>
                                            <option value="1">包括铲车费</option>
                                            <option value="0">不包括</option>
                                        </select>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                <span style="color: blueviolet">以下是开发票所需要的信息:</span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="billName" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">公司名称:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="billName" class="form-control required"
                                               aria-required="true"
                                               placeholder="公司名称">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="address" class="col-lg-4 control-label"
                                           style="padding: 1px;width: 17%">公司地址:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="address" class="form-control required"
                                               aria-required="true"
                                               placeholder="公司地址">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="billNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">税号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="billNo" class="form-control required"
                                               aria-required="true"
                                               placeholder="税号">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="tel" class="col-lg-4 control-label"
                                           style="padding-right: 1px">电话:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="tel" class="form-control required" aria-required="true"
                                               placeholder="电话">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="bankName" class="col-lg-4 control-label"
                                           style="padding-right: 1px">开户银行:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="bankName" class="form-control required"
                                               aria-required="true"
                                               placeholder="开户银行">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="bankNo" class="col-lg-4 control-label"
                                           style="padding-right: 1px">账号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="bankNo" class="form-control required"
                                               aria-required="true"
                                               placeholder="账号">
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitBut" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<!---->
<input type="hidden" id="balanceHideId">
<div class="modal fade" id="myModalBalance" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel3">合同结账</h4>
            </div>
            <div class="modal-body">
                <form id="validate1" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="numNo1" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同编号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="numNo1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="name1" class="col-lg-4 control-label"
                                           style="padding: 1px;">煤炭品种:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="name1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="receiveName1" class="col-lg-4 control-label"
                                           style="padding: 1px;">客户名称:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="receiveName1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="orderCount1" class="col-lg-4 control-label"
                                           style="padding: 1px;">订单总量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderCount1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="sendCount1" class="col-lg-4 control-label"
                                           style="padding: 1px;">发运量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="sendCount1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="left1" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="left1" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="total" class="col-lg-4 control-label"
                                           style="padding: 1px;">预交金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="total" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="sendPrice" class="col-lg-4 control-label"
                                           style="padding: 1px;">发运金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="sendPrice" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="leftPrice" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="leftPrice" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                结账余款信息
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="backPrice" class="col-lg-4 control-label"
                                           style="padding: 1px;">退款金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="backPrice" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="remarks1" class="col-lg-4 control-label"
                                           style="padding: 1px;">备注:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="remarks1" class="form-control">
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitButBalance" class="btn btn-primary">提交</button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="adjustHideId">
<div class="modal fade" id="myModalAdjustPrice" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">调整价格</h4>
            </div>
            <div class="modal-body">
                <form id="validate2" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="numNo2" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同编号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="numNo2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="name2" class="col-lg-4 control-label"
                                           style="padding: 1px;">煤炭品种:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="name2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="receiveName2" class="col-lg-4 control-label"
                                           style="padding: 1px;">客户名称:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="receiveName2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="orderCount2" class="col-lg-4 control-label"
                                           style="padding: 1px;">订单总量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderCount2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice2" class="col-lg-4 control-label"
                                           style="padding: 1px;">合同单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="total2" class="col-lg-4 control-label"
                                           style="padding: 1px;">预交金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="total2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="arrears2" class="col-lg-4 control-label"
                                           style="padding: 1px;">预交欠费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="arrears2" value="0" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="leftPrice2" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="leftPrice2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="left2" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="left2" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                调价后信息
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                            <div class="form-group">
                                <label for="currentPrize" class="col-lg-4 control-label"
                                       style="padding: 1px;">煤炭当前价格:</label>
                                <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                    <input type="text" id="currentPrize" class="form-control">
                                </div>
                            </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="remarks2" class="col-lg-4 control-label"
                                           style="padding: 1px;">备注:</label>
                                    <div class="col-lg-10" style="width: 330px;padding-left: 5px">
                                        <input type="text" id="remarks2" class="form-control">
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button"  subType="2" class="btn btn-primary">差额结算</button>
                <button type="button"  subType="1" class="btn btn-primary">补交差额</button>
            </div>
        </div>
    </div>
</div>

<input type="hidden" id="AddConHideId">
<div class="modal fade" id="myModalAddCon" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 550px">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span><span class="sr-only">关闭</span>
                </button>
                <h4 class="modal-title" id="myModalLabel5">增补合同</h4>
            </div>
            <div class="modal-body">
                <form id="validate3" class="form-horizontal group-border stripped" role="form">
                    <table style="width: 100%">
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="numNo3" class="col-lg-4 control-label"
                                           style="padding-right: 1px">合同编号:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="numNo3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="name3" class="col-lg-4 control-label"
                                           style="padding: 1px;">煤炭品种:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="name3"  class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="receiveName3" class="col-lg-4 control-label"
                                           style="padding: 1px;">客户名称:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="receiveName3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="orderCount3" class="col-lg-4 control-label"
                                           style="padding: 1px;">订单总量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="orderCount3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="unitPrice3" class="col-lg-4 control-label"
                                           style="padding: 1px;">合同单价:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="unitPrice3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="total3" class="col-lg-4 control-label"
                                           style="padding: 1px;">预交金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="total3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="arrears3" class="col-lg-4 control-label"
                                           style="padding: 1px;">预交欠费:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="arrears3" value="0" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="leftPrice3" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="leftPrice3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="left3" class="col-lg-4 control-label"
                                           style="padding: 1px;">剩余量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="left3" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="text-align: center">
                                追加信息
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div class="form-group">
                                    <label for="addTonnage" class="col-lg-4 control-label"
                                           style="padding: 1px;">追加数量:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="addTonnage" onkeyup="inputPrice()">
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="form-group">
                                    <label for="addMoney" class="col-lg-4 control-label"
                                           style="padding: 1px;">追加金额:</label>
                                    <div class="col-lg-10" style="width: 150px;padding-left: 5px">
                                        <input type="text" id="addMoney" class="form-control" readonly="readonly">
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div class="form-group">
                                    <label for="remarks3" class="col-lg-4 control-label"
                                           style="padding: 1px;">备注:</label>
                                    <div class="col-lg-10" style="width: 300px;padding-left: 5px">
                                        <input type="text" id="remarks3" class="form-control">
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </table>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button type="button" id="submitButAddCon" class="btn btn-primary">追加金额</button>
            </div>
        </div>
    </div>
</div>

<!--零销煤打印table-->
<
<script src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>
<script src="<c:url value="/plugins/forms/validation/jquery.form.js"/> "></script>
<script src="<c:url value="/js/views/common/messages_cn.js"/> "></script>
<script src="<c:url value="/js/views/market/contractPage.js"/> "></script>

<!-- / page-content -->