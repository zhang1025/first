/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $('.select').select2();
    queryData();
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
            + '&searchType=day'+'&wellsName='+well+'&coalName='+coal;
        location.href = path + 'export_plan_excel_data?' + param;
    });
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
        {name: 'searchType', value: "day"}//查询日计划
    ];
    var url = path + 'get_plans_table';
    commonDataTables("dayPlanDataTables", url, aoColumns, params, "dayPlanData");
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
        {"sTitle": "专用线", "mData": "privateLine", "sWidth": "10%"},
        {"sTitle": "状态", "mData": "status", "sWidth": "10%","mRender": function (data, type, row) {
            var status = row['status'];
            if(status == -1){
                return "计划中止";
            }
            return "正常";
        }});
    return aoColumns;
}

