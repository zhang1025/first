/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/finance/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $(".select").select2();
    queryBalanceData();
    initButtonClick();
});
function queryBalanceData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var receive = $("#s_re").val();

    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'settlement', value: receive},
        {name: 'searchType', value: "day"}//查询日计划
    ];
    var url = path+'get_balance_table';
    commonDataTablesHideFirstId("balanceDataTables", url, aoColumns, params, "balanceData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "序号", "mData": "id"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "5%"},
        {"sTitle": "计划号", "mData": "rid", "sWidth": "6%"},
        {"sTitle": "结算单位", "mData": "settlement", "sWidth": "7%"},
        {"sTitle": "吨数", "mData": "planTonnage", "sWidth": "5%"},
        {"sTitle": "车数", "mData": "planCarNum", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "5%"},
        {"sTitle": "实发合计", "mData": "actualSendedTotal", "sWidth": "7%"},
        {"sTitle": "实发煤款", "mData": "actualSendedTotal", "sWidth": "7%"},
        {"sTitle": "实发税金", "mData": "rate", "sWidth": "7%"},
        {"sTitle": "实发运费", "mData": "cost", "sWidth": "7%"},
        {"sTitle": "实发调车费", "mData": "shunting", "sWidth": "7%"},
        {"sTitle": "实发装车费", "mData": "entruck", "sWidth": "7%"},
        {"sTitle": "付款类型", "mData": "method", "sWidth": "7%"});
    return aoColumns;
}

function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryBalanceData();
    });
    //新增
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + "dealBalanceInfo";
        $.post(url, {
                id: $("#hideIds").val()
            },
            function (result) {
                $('#myModalBalance').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryBalanceDataList($("#hideDayId").val());
                }  else {
                    swal("失败","操作失败","error");
                }
            });
    });
    //定义行点击事件
    $("#balanceDataTables tbody").on("click","tr",function () {
        $(this).siblings().css("background-color","").removeClass("selected");
        $(this).css("background-color","#00B0E8").addClass("selected");
        // 记录点击行的计划吨数 第10列是吨数
        // $("#hidePlanTonnages").val($(this).find("td").eq(10).html());
        var id = $(this).find("td").eq(0).html();
        var st = $(this).find("td").eq(2).html();//结算单位
        $("#hideDayId").val(id);//记录日计划的id
        $("#hideStName").val(st);//记录结算单位
        queryBalanceDataList(id);
    });
    $("#paymentBut").on("click",function () {
        var id = checkBtn();
        if (id == "") {
            swal("", "请至少选中一行！", "warning");
            return;
        }//回款操作
        $.post(path+"paymentInfo",{ids:id},function (result) {
            if (result > 0) {
                swal("成功","操作成功！","success");
                queryBalanceDataList($("#hideDayId").val());
            }  else {
                swal("失败","操作失败","error");
            }
        });
    })

}
//根据id查询调运详细信息
function queryBalanceDataList(id) {
    $("#searchDayId").val(id); //记录查看对应日计划的id
    $("#balanceListData").show();
    var params = [
        {name: 'dayId', value: id},
        {name: 'type2', value: "0"}
    ];
    var noParams = [ //未回款
        {name: 'dayId', value: id},
        {name: 'type2', value: "1"}
    ];
    var urlBalance =  '/transport/get_diaoyunInfo_table';
    commonDataTablesNoPage("balanceListTables", urlBalance, dealBalanceTableTitle(1), params, "balanceListData");
    commonDataTablesNoPage("noBalanceListTables", urlBalance, dealBalanceTableTitle(0), noParams, "noBalanceListData");
}
function dealBalanceTableTitle(type) {
    var aoColumns = new Array();
    if(type==1){ //已经结算
        aoColumns.push(
            {
                "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
                var id = rowObject['id'];
                return "<input type='checkbox' name='check' value='" + id + "'/>";
            }, "sWidth": "5%"
            },
            {"sTitle": "车皮号", "mData": "wagonNo", "sWidth": "167px"},
            {"sTitle": "实发吨数", "mData": "tonnage", "sWidth": "110px"},
            {"sTitle": "品种", "mData": "coalName", "sWidth": "130px"},
            {"sTitle": "实发合计", "mData": "allMoney", "sWidth": "120px"},
            {"sTitle": "实发煤款", "mData": "coalMoney", "sWidth": "130px"}
        );
    }else{
        aoColumns.push(
            {
                "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
                var id = rowObject['id'];
                return "<input type='checkbox' name='check' value='" + id + "'/>";
            }, "sWidth": "5%"
            },
            {"sTitle": "车皮号", "mData": "wagonNo", "sWidth": "167px"},
            {"sTitle": "实发吨数", "mData": "tonnage", "sWidth": "110px"},
            {"sTitle": "品种", "mData": "coalName", "sWidth": "130px"},
            {"sTitle": "实发合计", "mData": "allMoney", "sWidth": "120px"},
            {"sTitle": "实发煤款", "mData": "coalMoney", "sWidth": "130px"}
        );
    }
    return aoColumns;
}
//获取选中的行数据
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

//结算单信息table  显示最后一行合并信息
function commonDataTablesNoPage(tableId, url, aoColumns, params, lodingId) {
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": false,
            "bProcessing": true,
            "bFilter": false,
            "bPaginate": false,//是否启用分页
            "bServerSide": true,//排序开启 此处必须设置为false
            "bLengthChange": false,
            "bAutoWidth": true,
            "sAjaxSource": url,
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
                        //操作最后一行合计显示
                        var $tableTr = $("#"+tableId+">tbody>tr:last");
                        $tableTr.find("td").eq(0).html("<b>合计</b>");
                        // $tableTr.find("td").eq(5).html("");
                        // $tableTr.find("td").eq(7).html("");
                    },
                    "complete": function (XMLHttpRequest, status) {
                        if (status == "parsererror") {
                            //超时重新登录
                            login_url = location.protocol + "//" +
                                location.host + "/" +
                                "general/login";
                            window.location.assign(login_url);
                        }
                    }
                });
            },
            "createdRow": function (row, data, index) { //行数据居中显示
                $("td", row).css("text-align", "center");
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
    $('.sorting_disabled').css("text-align", "center");
    return dt;
}
