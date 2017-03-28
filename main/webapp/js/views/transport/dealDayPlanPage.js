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
    commonDataTables("dayPlanDataTables", url, aoColumns, params, "dayPlanData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {
            "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
            var id = rowObject['id'];
            return "<input type='checkbox' name='check' value='" + id + "'/>";
        }, "sWidth": "5%"
        },
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
            "sTitle": "计划状态", "mData": "status", "sWidth": "8%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == -1) {
                return "计划中止";
            }
            return "正常";
        }
        },
        {
            "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        }
    );
    return aoColumns;
}

function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var status = rowObject['status'];
    var rid = rowObject['rid'];
    var name = rowObject['name'];
    var planCarNum = rowObject['planCarNum'];
    var actualCarNum = rowObject['actualCarNum'];
    var planTonnage = rowObject['planTonnage'];
    var ast = rowObject['actualSendedTonnage'];

    var actualUnitPrice = rowObject['actualUnitPrice'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    var wagonNo = rowObject['wagonNo'];
    return "<button type='button' class='btn btn-warning btn-small' data-toggle='modal' data-target='#myModal'  onclick=\"dealDayPlan('"
        + id + "','" + rid + "','"
        + name + "','" + status + "','" + planCarNum + "','"
        + actualCarNum + "','"
        + planTonnage + "','" + ast + "','"
        + actualUnitPrice + "','" + wellsName + "','"
        + coalName + "','" + siteName+ "','"+wagonNo
        + "')\">安排发车</button>";
}

function dealDayPlan(id,rid,name,status,pc,acn,pt,ast,aup,wellsName,coalName,siteName,wagonNo) {
    $("#hideId").val(id);

    $("#name").val(rid).select2();
    $("#ast").val(ast);
    $("#actualCarNum").val(acn);
    $("#actualUnitPrice").val(aup);
    $("#wellsName").val(wellsName).select2();
    $("#coalName").val(coalName).select2();
    $("#siteName").val(siteName).select2();
    $("#status").val(status);
    $("#wagonNo").val(wagonNo);
}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + "dealDayPlan";
        $.post(url, {
                rid: $("#name").val(), name: $("#name option:selected").text(),
                actualSendedTonnage: $("#ast").val(),
                wellsName: $("#wellsName").val(),
                actualUnitPrice: $("#actualUnitPrice").val(),
                coalName: $("#coalName").val(), siteName: $("#siteName").val(),
                id: $("#hideId").val(),wagonNo:$("#wagonNo").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryData();
                } else {
                    swal("失败","删除失败","error");
                }
            });
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
}

//发车调运信息
function dealDayTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        // {
        //     "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
        //     var id = rowObject['id'];
        //     return "<input type='checkbox' name='check' value='" + id + "'/>";
        // }, "sWidth": "5%"
        // },
        {"sTitle": "车皮号", "mData": "rid", "sWidth": "7%"},
        {"sTitle": "实发吨", "mData": "actualSendedTonnage", "sWidth": "9%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "8%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "8%"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "6%"},
        {
            "sTitle": "状况", "mData": "status", "sWidth": "8%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == 1) {
                return "已传";
            }
            return "未传";
        }
        },
        {
            "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateDealDayButton(data, type, row);
        }
        }
    );
    return aoColumns;
}
function operateDealDayButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var status = rowObject['status'];
    var rid = rowObject['rid'];
    var name = rowObject['name'];
    var planCarNum = rowObject['planCarNum'];
    var actualCarNum = rowObject['actualCarNum'];
    var planTonnage = rowObject['planTonnage'];
    var ast = rowObject['actualSendedTonnage'];

    var actualUnitPrice = rowObject['actualUnitPrice'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    var wagonNo = rowObject['wagonNo'];
    return "<button type='button' class='btn btn-warning btn-small' data-toggle='modal' data-target='#myModal'  onclick=\"dealDayPlan('"
        + id + "','" + rid + "','"
        + name + "','" + status + "','" + planCarNum + "','"
        + actualCarNum + "','"
        + planTonnage + "','" + ast + "','"
        + actualUnitPrice + "','" + wellsName + "','"
        + coalName + "','" + siteName+ "','"+wagonNo
        + "')\">安排发车</button>";
}
function checkBtn() {
    var checkTemp = "";
    $('input:checkbox[name="check"]:checked').each(function (i) {
        if (0 == i) {
            checkTemp = $(this).val();
        } else {
            checkTemp += ("," + $(this).val());
        }
    });
    return checkTemp;
}


