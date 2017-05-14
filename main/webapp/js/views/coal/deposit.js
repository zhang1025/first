/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/coal/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $(".select").select2();
    initButtonClick();
    queryDepositData();
});
function queryDepositData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var numNo = $("#s_numNo").val();
    var receives = $("#s_receives").val();
    var status = $("#s_status").val();
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'numNo', value: numNo},
        {name: 'rid', value: receives},
        {name: 'status', value: status}
    ];
    var url = path+'/get_deposit_table';
    commonDataTablesWW("depositDataTables", url, aoColumns, params, "depositData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        // {
        //     "sTitle": "选择", "mData": "id", "mRender": function (data, type, rowObject) {
        //     var id = rowObject['id'];
        //     return "<input type='checkbox' name='check' value='" + id + "'/>";
        // }, "sWidth": "5%"
        // },
        {"sTitle": "合同号", "mData": "numNo", "sWidth": "7%"},
        {"sTitle": "煤卡号", "mData": "coalCard", "sWidth": "7%"},
        {"sTitle": "客户名称", "mData": "name", "sWidth": "10%"},
        {"sTitle": "押金", "mData": "deposit", "sWidth": "5%"},
        {"sTitle": "缴款人", "mData": "payPeople", "sWidth": "5%"},
        {"sTitle": "录入人", "mData": "inputPerson", "sWidth": "5%"},
        {"sTitle": "缴款时间", "mData": "createtime", "sWidth": "8%"},
        {"sTitle": "状态", "mData": "orderTime", "sWidth": "6%","mRender":function(data, type, row){
            var status = row['status'];
            if (status == 0) {
                return "正常押金";
            }
            if (status == -1) {
                return "已经退款";
            }
            return "未知";
        }},
        {"sTitle": "退款时间", "mData": "refundtime", "sWidth": "5%"},
        {"sTitle": "退款人", "mData": "refundPeople", "sWidth": "6%"},
        {"sTitle": "操作员", "mData": "usePerson", "sWidth": "6%"},
        {
            "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        });
    return aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var status = rowObject['status'];
    if(status==0){
        return "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' onclick=\"refundDeal('"
            + id
            + "')\">退款</button>";
    }else{
        return "<button type='button' disabled='disabled' class='btn btn-danger btn-small' data-toggle='modal'>退款</button>";
    }
}
//退款操作
function refundDeal(id) {
    $("#hideId").val(id);
    $("#myModalBack").modal("show");
}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryDepositData();
    });

    $("#paymentBtn").on("click",function () {
        $("#myModalDeposit").modal("show");
        setTimeout($("#coalCard").focus(),1000);
    });
    $("#totalBtn").on("click",function () {
        $.post(path + "total",function (data) {
            swal("总缴费",(data==null)?0:data,"info");
        })
    });
    $("#surplusBtn").on("click",function () {
        $.post(path + "surplus",function (data) {
            swal("剩余",(data==null||data==0)?"暂无":data,"info");
        })
    });
    $("#submitBut").on("click",function () {
        var $form = $('#validate1');
        if (!$form.valid()) {
            return false;
        }
        $.post(path + "depositSubmit",
            {numNo: $("#numNo").val(),coalCard:$.trim($("#coalCard").val()),
                rid:$("#name").val(),name:$("#name option:selected").text(),
                payPeople:$("#payPeople").val(),deposit:$("#amountMoney").val()
            },
            function (data) {
            if(data > 0){
                swal("ok","操作成功！","success");
                $("#myModalDeposit").modal("hide");
                queryDepositData();
            }else{
                swal("failed","操作失败","error");
            }
        });
    });
    $("#submitButBack").on("click",function () {
        swal({
                title:"是否退款?",
                type:"warning",
                showCancelButton:true,
                confirmButtonClass:"btn-danger",
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                closeOnConfirm:false
            },
            function (isConfirm) {
                if(isConfirm){
                    $.post(path + "refund", {id: $("#hideId").val(),refundPeople:$.trim($("#refundPeople").val())},
                        function (data) {
                            if(data > 0){
                                swal("ok","操作成功！","success");
                                $("#myModalBack").modal("hide");
                                queryDepositData();
                            }else{
                                swal("failed","操作失败","error");
                            }
                        });
                }
            }
        )
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
