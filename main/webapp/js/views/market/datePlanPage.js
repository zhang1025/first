/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    // $("body").ledo();
    //初始化时间
    initDateRangePicker();
    queryData();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'searchType', value: "day"}//查询日计划
    ];
    var url = path + 'get_plans_table';
    commonDataTables("dayPlanDataTables", url, aoColumns, params, "dayPlanData");
    window.setTimeout(function () {
         $("#dayPlanDataTables>tbody>tr:last").hide();
    },1000)
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(   
        {"sTitle": "计划号", "mData": "rid", "sWidth": "8%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "20%"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "10%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "9%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "10%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "9%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "10%"},
        {"sTitle": "专用线", "mData": "privateLine", "sWidth": "10%"});
    return aoColumns;
}

