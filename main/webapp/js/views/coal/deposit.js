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
    initFormValid();
    queryData();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate}
    ];
    var url = path+'/get_deposit_table';
    commonDataTables("depositDataTables", url, aoColumns, params, "depositData");
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
        {"sTitle": "合同编号", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "客户名称", "mData": "receiveName", "sWidth": "10%"},
        {"sTitle": "品种", "mData": "name", "sWidth": "5%"},
        {"sTitle": "订单总量", "mData": "orderCount", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "unitPrice", "sWidth": "5%"},
        {"sTitle": "预交金额", "mData": "prepaidAmount", "sWidth": "5%"},
        {"sTitle": "订单日期", "mData": "orderTime", "sWidth": "6%"},
        {"sTitle": "已发送量", "mData": "sendCount", "sWidth": "5%"},
        {"sTitle": "剩余量", "mData": "leftCount", "sWidth": "6%"},
        {"sTitle": "发运金额", "mData": "sendPrice", "sWidth": "6%"},
        {"sTitle": "剩余金额", "mData": "leftPrice", "sWidth": "5%"},
        {
            "sTitle": "操作", "mData": "id", "sWidth": "5%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        });
    return aoColumns;
}

function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var settlement = rowObject['settlement'];
    var fund = rowObject['fund'];
    var taxation = rowObject['taxation'];

    return "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','"
        + settlement + "','" + fund + "','"
        + taxation
        + "')\">编辑</button>";
}
//编辑
function editSettlement(id, settlement, fund, taxation) {
    subType = 2;
}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    //新增
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + (subType == 1?"addDepositInfo":"editDepositInfo");
        $.post(url, {
                settlement: $.trim($("#settlement").val()), fund: $("#fund").val(),
                taxation: $("#taxation").val(),
                id: $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryData();
                }  else {
                    swal("失败","操作失败","error");
                }
            });
    });

    // $("#addFinanceInfo").on("click", function () {
    //     addFinanceInfo(checkBtn());
    // });

}
function verifyStatus(id) {
    if (id == "") {
        swal("", "请选中一行！", "warning");
        return;
    }
    if (id.indexOf(",") > -1) {
        swal("","请选中一行进行操作！","warning");
        return;
    }
    $("#hideId").val(id);
    $('#myModalVerify').modal("show");
}
//添加财务信息
// function addFinanceInfo(id) {
//     if (id == "" || id.indexOf(",") > -1) {
//         swal("", "请选中一行！", "warning");
//         return;
//     }
//     $.post(path + "balanceContractInfo", {id: id}, function (data) {
//         if (data == 1) {
//             swal("成功", "操作成功！", "success");
//             queryData();
//         } else if (data == -1) {
//             swal("失败", "操作失败", "error");
//         }else if (data == -2) {
//             swal("失败", "未审核或是锁定状态的合同不能进行结算", "warning");
//         }else{
//             swal("失败", "网络异常", "error");
//         }
//     });
// }
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
//form表单提交 格式规则校验
function initFormValid() {
    $("#validate").validate({
        errorPlacement: function (error, element) {
            var place = element.closest('.input-group');
            if (!place.get(0)) {
                place = element;
            }
            if (place.get(0).type === 'checkbox') {
                place = element.parent();
            }
            if (error.text() !== '') {
                place.after(error);
            }
        },
        errorClass: 'help-block',
        rules: {
            dataNumber: {
                required: true,
                dataNumber: true
            },
            number: {
                required: true,
                number: true
            }
        },
        highlight: function (label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function (label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });
}
