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
function commonDataTables(tableId, url, aoColumns, params,lodingId) {
    //初始化每页显示数量为10，可以指定，参数里面指定initLength即可
    var initLength = 10;
    for (var i = 0; i < params.length; i++) {
        if(params[i].name=="initLength"){
            initLength = params[i].value;
        }
    }
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": false,
            "bProcessing": false, //不用自带的loading,使用系统插件waitMe
            "bFilter": false,
            "bPaginate": true,//是否启用分页
            "bServerSide": true,
            "bLengthChange": false, //隐藏每页显示n条记录框
            "bAutoWidth": true,
            "iDisplayLength": initLength,
            "sAjaxSource": url,
            "bDeferRender":true,
            "bDestroy": true,
            "bScrollCollapse": true,
            "scrollX": true,
            "sServerMethod": "POST",
            "aoColumns": aoColumns,
            "fnServerParams": function (aoData) {
                for (var i = 0; i < params.length; i++) {
                    aoData.push(params[i]);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
                playLoadingWithoutTime(lodingId);
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": {
                        dt_json: $.toJSON(aoData)
                    },
                    "success": function (records) {
                        fnCallback(records);
                        hideLoading(lodingId);
                        $("#dayPlanDataTables>tbody>tr:last").hide();
                    },
                    "complete":function(XMLHttpRequest,status){
                        if(status=="parsererror"){
                            //超时重新登录
                            login_url = location.protocol+"//"+
                                location.host+"/"+
                                "general/login";
                            window.location.assign(login_url);
                        }
                    }
                });
            },
            "createdRow":function (row,data,index) { //行数据居中显示
                $("td",row).css("text-align","center");
            },
            "oLanguage": {
                "sLengthMenu": '每页显示<select class="form-control input-sm">'
                + '<option value="10">10</option>'
                + '<option value="20">20</option>'
                + '<option value="50">50</option>'
                + '<option value="100">100</option>'
                + '</select>条记录',
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "当前显示 0 到 0 条，共 0 条记录",
                "sInfoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "sProcessing": "正在加载中...",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 尾页 "
                }
            }
        });
    //列标题居中显示
    $('.sorting_disabled').css("text-align","center");
    return dt;
}

