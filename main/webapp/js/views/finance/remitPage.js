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
    initButtonClick();
    queryRemitData();
});
function queryRemitData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate}
    ];
    var url = path+'/get_remit_table';
    commonDataTablesHideFirstId("remitDataTables", url, aoColumns, params, "remitData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "序号", "mData": "id"},
        {"sTitle": "日期", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "结算单位", "mData": "numNo", "sWidth": "8%"},
        {"sTitle": "井别", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "品种", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "实发吨数", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "车数", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "实发单价", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "实发合计", "mData": "numNo", "sWidth": "7%"},
        {"sTitle": "实发煤款", "mData": "numNo", "sWidth": "7%"},
        {"sTitle": "实发税金", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "实发运费", "mData": "numNo", "sWidth": "7%"},
        {"sTitle": "实发调车费", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "实发装车费", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "回款吨数", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "回款合计", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "已回款", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "回款税金", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "回款调车费", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "回款装车费", "mData": "numNo", "sWidth": "7%"},
        {
            "sTitle": "操作", "mData": "id", "sWidth": "5%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        });
    return aoColumns;
}

function operateButton(cellvalue, options, rowObject) {

}
//编辑
function editSettlement(id, settlement, fund, taxation) {
    subType = 2;
}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryRemitData();
    });
    //新增
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + (subType == 1?"addBalanceInfo":"editBalanceInfo");
        $.post(url, {
                settlement: $.trim($("#settlement").val()), fund: $("#fund").val(),
                taxation: $("#taxation").val(),
                id: $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryRemitData();
                }  else {
                    swal("失败","操作失败","error");
                }
            });
    });

    //定义行点击事件
    $("#remitDataTables tbody").on("click","tr",function () {
        $(this).siblings().css("background-color","").removeClass("selected");
        $(this).css("background-color","#00B0E8").addClass("selected");
        var id = $(this).find("td").eq(0).html();
        queryRemitDataList(id);
    })

}
//根据id查询结算详细信息
function queryRemitDataList(id) {
    $("#searchDayId").val(id); //记录查看对应日计划的id
    $("#remitListData").show();
    var aoColumns = dealDayTableTitle();
    var params = [
        {name: 'dayId', value: id}
    ];
    var url = path + 'get_remitList_table';
    commonDataTablesNoPage("remitListTables", url, aoColumns, params, "remitListData");
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
