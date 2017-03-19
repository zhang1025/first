<%--
  Created by IntelliJ IDEA.
  User: machaozhe
  Date: 2016-07-26
  Time: 10:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- begin date -->
<div id="begin_select" class="col-lg-2" style="z-index:0;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">开始</span>
        <input type="text" id="beginDate"
               class="input-small form_datetime" style="cursor: pointer;"
               readonly="readonly" />
    </div>
</div>

<!-- end date -->
<div id="end_select" class="col-lg-2" style="z-index:0;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">结束</span>
        <input type="text" id="endDate"
               class="input-small form_datetime" style="cursor: pointer;"
               readonly="readonly" />
    </div>
</div>

<!-- date range picker -->
<div id="range_select" class="col-lg-3" style="z-index:0;display: none;padding: 5px;">
    <div class="input-group">
        <span class="input-group-addon">时间</span>
        <input id="date-range" name='date-range' class="form-control white-bg text-center"
               style="cursor: pointer;font-size: 12px" readonly="readonly"/>
        <%--<span class="input-group-addon"><i class="fa fa-calendar"></i></span>--%>
    </div>
</div>

<%--</div>--%>
<%--<br/>--%>
<%--<div class="row">--%>
<!-- plat select -->
<div id="plat_select" class="col-lg-2" style="z-index:0;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">平台</span>
        <select style="font-size: 12px" id="all_plat" class="fancy-select form-control" onchange="casecadeSelect(this.value,'plat_select')">
        </select>
    </div>
</div>

<!-- channel select -->
<div id="channel_select" class="col-lg-2" style="z-index:0;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">渠道</span>
        <select style="font-size: 12px" id="all_channel" class="fancy-select form-control">
            <option value=''>全部渠道</option>
        </select>
    </div>
</div>

<!-- server select -->
<div id="server_select" class="col-lg-2" style="z-index:0;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">区服</span>
        <select style="font-size: 12px" id="all_server" class="select2 form-control">
            <option  value="">全部区服</option>
        </select>
    </div>
</div>

<!-- country select -->
<div id="country_select" class="col-lg-2" style="z-index:0;display: none;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">国家</span>
        <select style="font-size: 12px" id="all_country" class="select2 form-control">
            <option  value="">全部国家</option>
        </select>
    </div>
</div>

<!-- level select -->
<div id="level_select" class="col-lg-2" style="z-index:0;display: none;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">等级</span>
        <select style="font-size: 12px" id="vip_level" class="fancy-select form-control">
        </select>
    </div>
</div>

<!-- mall select -->
<div id="mall_select" class="col-lg-2" style="z-index:0;display: none;padding: 5px">
    <div class="input-group">
        <span class="input-group-addon">商城</span>
        <select style="font-size: 12px" id="mall" class="fancy-select form-control">
            <option value="1">商城</option>
            <option value="2">商会交易</option>
        </select>
    </div>
</div>

