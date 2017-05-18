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
    var settlement = $("#s_st").val();
    var params = [
        {name: 'settlement', value: settlement},
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
        {"sTitle": "结算单位", "mData": "settlement", "sWidth": "7%"},
        {"sTitle": "经办人", "mData": "usePerson", "sWidth": "5%"},
        {"sTitle": "前期余额", "mData": "priorbalance", "sWidth": "7%"},
        {"sTitle": "本期存款", "mData": "currentDeposit", "sWidth": "7%"},
        {"sTitle": "车数", "mData": "planCar", "sWidth": "5%"},
        {"sTitle": "吨数", "mData": "planTonnage", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "unitPrice", "sWidth": "5%"},
        {"sTitle": "煤款", "mData": "coalMoney", "sWidth": "5%"},
        {"sTitle": "税金", "mData": "taxation", "sWidth": "5%"},
        {"sTitle": "装调费", "mData": "entruck", "sWidth": "5%"},
        {"sTitle": "运费", "mData": "freight", "sWidth": "5%"},
        {"sTitle": "金额合计", "mData": "totalAmount", "sWidth": "7%"},
        {"sTitle": "余额", "mData": "balance", "sWidth": "5%"},
        {"sTitle": "资金方式", "mData": "fund", "sWidth": "7%"},
        {"sTitle": "到站", "mData": "freightName", "sWidth": "5%"},
        {"sTitle": "会计审核", "mData": "auditPeople", "sWidth": "7%"},
        {"sTitle": "出纳员", "mData": "cashier", "sWidth": "5%"},
        {"sTitle": "录入员", "mData": "addPeople", "sWidth": "6%"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "7%"}
        );
    return aoColumns;
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
        var url = path + "addPaymentInfo";
        $.post(url, {
                numNo: $("#numNo").val(),settlement: $("#name option:selected").text(),
                usePerson: $("#usePerson").val(),freightName: $("#fn").val(),
                currentDeposit: $("#currentDeposit").val(),planCar: $("#planCar").val(),
                planTonnage: $("#planTonnage").val(),
                unitPrice: $("#unitPrice").val(),cashier: $("#cashier").val(),
                fund: $("#fund").val(),auditPeople: $("#auditPeople").val(),
                addPeople: $("#addPeople").val(),
                //结算单位的id
                id: $("#name").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryPaymentData();
                }  else if(result==-1) {
                    swal("警告","没有相应的运费信息，请到数据维护中添加","warning");
                }else{
                    swal("失败","操作失败","error");
                }
            });
    });
    //追加交款
    $("#addPayBtn").on("click",function () {
        var id = checkBtn();
        if (id == "") {
            swal("", "请选中一行！", "warning");
            return;
        }
        if (id.indexOf(",") > -1) {
            swal("","只能选中一行进行打印！","warning");
            return;
        }
        $("#myModalVerify").modal("show");
        $("#addPayHideId").val(id);
    });
    $("#submitBut1").on("click",function () {
        $.post(path + "appendPayInfo", {id:$("#addPayHideId").val(),appendPay: $("#appendPay").val()},
            function (data) {
                if(data == 1){
                    $("#myModalVerify").modal("hide");
                    swal("成功","操作成功！","success");
                    queryPaymentData();
                }else{
                    swal("失败","操作失败！","error");
                }
            });
    })
}
//通过结算单位找税率
function searchTaxation() {
    var id = $("#name").val();
    $.post(path+"checkRate",{id:id},function (data) {
        if(data == -1){
            swal("警告","该结算单位暂未设置税率信息！","warning");
        }
    })
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
