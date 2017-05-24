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
    initFormValid();
    queryData();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var numNo = $.trim($("#s_numNo").val());
    var receiveName = $("#s_receives").val();
    var coal = $("#s_coal").val();
    var status = $("#s_status").val();
    var type = $("#s_type").val();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var params = [
        {name: 'numNo', value: numNo},
        {name: 'receiveName', value: receiveName},
        {name: 'name', value: coal},
        {name: 'status', value: status},
        {name: 'contractType', value: type},
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate}
    ];
    var url = '/market/get_contract_table';
    commonDataTables("contractDataTables", url, aoColumns, params, "contractData");
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
        {"sTitle": "井区", "mData": "wells", "sWidth": "5%"},
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
            "sTitle": "合同状态", "mData": "status", "sWidth": "5%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (status == 1) {
                return "解锁";
            }
            if (status == 3) {
                return "正在发运";
            }
            if (status == 2) {
                return "锁定";
            }
            if (status == 5) {
                return "审核通过";
            }
            if (status == 0) {
                return "未审核";
            }
            if (status == -1) {
                return "未通过";
            }
            if (status == 4) {
                return "已结算";
            }
            return "未知";
        }
        },
        // {"sTitle": "经手人", "mData": "usePerson", "sWidth": "5%"},
        {"sTitle": "录入人", "mData": "inputPerson", "sWidth": "5%"},
        // {"sTitle": "录入时间", "mData": "createtime", "sWidth": "8%"},
        {
            "sTitle": "合同类型", "mData": "contractType", "sWidth": "8%", "mRender": function (data, type, row) {
            var type = row['contractType'];
            if (type == "1") {
                return "公用煤";
            } else if (type == "2") {
                return "零销煤";
            } else if (type == "4") {
                return "职工煤";
            } else if (type == "3") {
                return "其他";
            } else {
                return "其他";
            }

        }
        },
        // {"sTitle": "预交欠费", "mData": "unitPrice", "sWidth": "5%"},
        {
            "sTitle": "铲车费", "mData": "forkliftFee", "sWidth": "5%", "mRender": function (data, type, row) {
            return operateType(data, type, row);
        }
        },
        {"sTitle": "发票公司名", "mData": "billName", "sWidth": "8%"},
        {"sTitle": "公司地址", "mData": "address", "sWidth": "8%"},
        {"sTitle": "税号", "mData": "billNo", "sWidth": "7%"},
        {"sTitle": "电话", "mData": "tel", "sWidth": "7%"},
        {"sTitle": "开户银行", "mData": "bankName", "sWidth": "7%"},
        {"sTitle": "账号", "mData": "bankNo", "sWidth": "7%"},

        {"sTitle": "结算单位", "mData": "settlement", "sWidth": "8%"},
        {"sTitle": "资金方式", "mData": "fund", "sWidth": "8%"},
        {"sTitle": "税金", "mData": "taxation", "sWidth": "7%"},
        {
            "sTitle": "操作", "mData": "id", "sWidth": "5%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        });
    return aoColumns;
}

function operateType(cellvalue, options, rowObject) {
    var type = rowObject['forkliftFee'];
    if (type == 1) {
        return "包含铲车费";
    }
    if (type == 0) {
        return "不包含";
    }
}

function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var settlement = rowObject['settlement'];
    var fund = rowObject['fund'];
    var taxation = rowObject['taxation'];
    var orderCount = rowObject['orderCount'];
    var unitPrice = rowObject['unitPrice'];

    return "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','"
        + settlement + "','" + fund + "','"+ orderCount + "','"+ unitPrice + "','"
        + taxation
        + "')\">编辑</button>";
}
//编辑
function editSettlement(id, settlement, fund,orderCount,unitPrice, taxation) {
    subType = 2;
    $("#hideId").val(id);
    // $("#taxation").val(taxation);
    $("#settlement").val(settlement).select2();
    $("#fund").val(fund).select2();
    $("#totalId").val(orderCount*unitPrice);
}
function gotTaxation() {
    var st = $("#settlement").val();
    var total = $("#totalId").val();
    $.post("/common/getSettlementRate",{name:st},function (data) {
        if(data==""){
            swal("警告","该结算单位暂未配置税率！","warning");
            return false;
        }
        $("#taxation").val((parseInt(total)*data).toFixed(2));
    });
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
        var url = path+"editContractInfo";
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
    //审核
    $("#submitBut1").on("click", function () {
        $.post(path+"updateStatus", {
                id: $("#hideId").val(),status:$("#status").val()
            },
            function (result) {
                $('#myModalVerify').modal("hide");
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryData();
                }  else {
                    swal("失败","操作失败","error");
                }
            });
    });
    $("#verify").on("click", function () {
        verifyStatus(checkBtn());
    });

    //导出excle事件
    $('.fa-download').parent().on("click", function () {
        var numNo = $("#s_numNo").val();
        var receives = $("#s_receives").val();
        var coal = $("#s_coal").val();
        var status = $("#s_status").val();
        var type = $("#s_type").val();
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var param = 'numNo=' + numNo + '&receiveName=' + receives + '&beginDate=' + beginDate + '&endDate=' + endDate + '&name=' + coal + '&status=' + status + '&contractType=' + type;
        location.href = '/market/export_excel_data?' + param;
    });
    //导出地付煤excel信息
    $("#detailExcel").on("click",function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate ;
        location.href = '/market/export_detailExcel_data?' + param;
    });
    //导出应收与发出汇总excel信息
    $("#receiveExcel").on("click",function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate ;
        location.href = '/market/export_receiveExcel_data?' + param;
    });

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
