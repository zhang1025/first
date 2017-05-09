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
    queryPaymentData();
});
function queryPaymentData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate}
    ];
    var url = path+'/get_payment_table';
    commonDataTables("paymentDataTables", url, aoColumns, params, "paymentData");
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
        {"sTitle": "编号", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "结算单位", "mData": "receiveName", "sWidth": "7%"},
        {"sTitle": "经办人", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "前期余额", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "本期存款", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "车数", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "吨数", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "煤款", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "税金", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "装调费", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "运费", "mData": "receiveName", "sWidth": "5%"},
        {"sTitle": "金额合计", "mData": "receiveName", "sWidth": "7%"},
        {"sTitle": "余额", "mData": "name", "sWidth": "5%"},
        {"sTitle": "资金方式", "mData": "orderCount", "sWidth": "5%"},
        {"sTitle": "会计审核", "mData": "unitPrice", "sWidth": "5%"},
        {"sTitle": "出纳员", "mData": "prepaidAmount", "sWidth": "5%"},
        {"sTitle": "录入员", "mData": "orderTime", "sWidth": "6%"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "5%"},
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
        queryPaymentData();
    });
    //新增
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + (subType == 1?"addPaymentInfo":"editPaymentInfo");
        $.post(url, {
                settlement: $.trim($("#settlement").val()), fund: $("#fund").val(),
                taxation: $("#taxation").val(),
                id: $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryPaymentData();
                }  else {
                    swal("失败","操作失败","error");
                }
            });
    });
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
