/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    queryData();
    $('.select').select2();
    initClickFunction();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var well = $("#s_wells").val();
    var coal = $("#s_coals").val();
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'wellsName', value: well},
        {name: 'coalName', value: coal},
        {name: 'searchType', value: "month"}//查询月计划
    ];
    var url = path + 'get_plans_table';
    commonDataTables("contrastDataTables", url, aoColumns, params, "contrastData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "计划号", "mData": "rid", "sWidth": "7%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "9%"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "7%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "7%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "7%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "10%"},
        {"sTitle": "计划吨数", "mData": "planTonnage", "sWidth": "8%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "8%"},
        {"sTitle": "实发车数", "mData": "actualCarNum", "sWidth": "8%"},
        {"sTitle": "实发吨数", "mData": "actualSendedTonnage", "sWidth": "8%"},
        {"sTitle": "计划比实发(车)", "mData": "unsendedCarNum", "sWidth": "10%"},
        {"sTitle": "计划比实发(吨)", "mData": "unsendedTonnage", "sWidth": "10%"});
    return aoColumns;
}
function initClickFunction() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    //导出excle事件
    $('.fa-download').parent().on("click", function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var well = $("#s_wells").val();
        var coal = $("#s_coals").val();
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate
            + '&searchType=month'+'&wellsName='+well+'&coalName='+coal+'&excelType=contrast';
        location.href = path + 'export_plan_excel_data?' + param;
    });
}

