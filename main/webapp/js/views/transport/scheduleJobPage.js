/**
 * Created by admin on 2016/11/28 0028
 * 发车调运
 */
var path = "/transport/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $('.select').select2();
    queryData();
    initButtonClick();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var well = $("#s_wells").val();
    var coal = $("#s_coals").val();
    var site = $("#s_sites").val();
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'wellsName', value: well},
        {name: 'coalName', value: coal},
        {name: 'siteName', value: site},
        {name: 'searchType', value: "day"}//查询日计划
    ];
    var url = path + 'get_plans_table';
    commonDataTablesHideFirstId("salesDataTables", url, aoColumns, params, "salesData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "序号", "mData": "id"},
        {"sTitle": "计划号", "mData": "rid", "sWidth": "7%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "9"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "6%"},
        {"sTitle": "专用线", "mData": "privateLine", "sWidth": "8%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "8%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "8%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "8%"},
        {"sTitle": "实发车", "mData": "actualCarNum", "sWidth": "9%"},
        {"sTitle": "未发车", "mData": "unsendedCarNum", "sWidth": "9%"},
        {"sTitle": "计划吨数", "mData": "planTonnage", "sWidth": "8%"},
        {"sTitle": "实发吨", "mData": "actualSendedTonnage", "sWidth": "9%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "8%"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "9%"},
        {
            "sTitle": "状态", "mData": "status", "sWidth": "8%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == -1) {
                return "计划中止";
            }
            return "正常";
        }
        }
        // {
        //     "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
        //     return operateButton(data, type, row);
        // }
        // }
    );
    return aoColumns;
}

function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var monthId = rowObject['monthId'];
    var planCarNum = rowObject['planCarNum'];
    var planTonnage = rowObject['planTonnage'];
    var status = rowObject['status'];
    var rid = rowObject['rid'];
    var name = rowObject['name'];
    var ast = rowObject['actualSendedTonnage'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    return "<button type='button' class='btn btn-success btn-small' data-toggle='modal' data-target='#myModal'  onclick=\"dealDayPlan('"
        + id + "','"
        + status + "','"  + monthId + "','"+ name + "','"+ planTonnage + "','"
        + ast + "','"+ rid + "','"
        + wellsName + "','"
        + coalName + "','" + siteName
        + "')\">安排发车</button>";
}

function initButtonClick() {
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
            + '&searchType=day' + '&wellsName=' + well + '&coalName=' + coal;
        location.href = path + 'export_plan_excel_data?' + param;
    });

    //定义行点击事件
    $("#salesDataTables tbody").on("click","tr",function () {
        $(this).siblings().css("background-color","").removeClass("selected");
        $(this).css("background-color","#00B0E8").addClass("selected");
    })
}




