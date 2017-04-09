/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
var model = "contract";
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $(".form_datetime").datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: 'linked',//今日按钮
        todayHighlight: true
    });
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
    var url = path + 'get_contract_table';
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
        {"sTitle": "品种", "mData": "name", "sWidth": "5%"},
        {"sTitle": "订单总量", "mData": "orderCount", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "unitPrice", "sWidth": "5%"},
        {"sTitle": "预交金额", "mData": "prepaidAmount", "sWidth": "5%"},
        {"sTitle": "订单日期", "mData": "orderTime", "sWidth": "5%"},
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
        {"sTitle": "经手人", "mData": "usePerson", "sWidth": "5%"},
        {"sTitle": "录入人", "mData": "inputPerson", "sWidth": "5%"},
        {"sTitle": "录入时间", "mData": "createtime", "sWidth": "8%"},
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
            "sTitle": "铲车费", "mData": "forkliftFee", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateType(data, type, row);
        }
        },
        {"sTitle": "发票公司名", "mData": "billName", "sWidth": "10%"},
        {"sTitle": "公司地址", "mData": "address", "sWidth": "10%"},
        {"sTitle": "税号", "mData": "billNo", "sWidth": "7%"},
        {"sTitle": "电话", "mData": "tel", "sWidth": "7%"},
        {"sTitle": "开户银行", "mData": "bankName", "sWidth": "7%"},
        {"sTitle": "账号", "mData": "bankNo", "sWidth": "7%"},
        {
            "sTitle": "操作", "mData": "id", "sWidth": "10%", "mRender": function (data, type, row) {
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
    var status = rowObject['status'];
    var numNo = rowObject['numNo'];
    var receiveName = rowObject['receiveName'];
    var name = rowObject['name'];
    var orderCount = rowObject['orderCount'];
    var unitPrice = rowObject['unitPrice'];
    var inputPerson = rowObject['inputPerson'];
    var usePerson = rowObject['usePerson'];
    var contractType = rowObject['contractType'];
    var forkliftFee = rowObject['forkliftFee'];
    var orderTime = rowObject['orderTime'];
    var billName = rowObject['billName'];
    var address = rowObject['address'];
    var billNo = rowObject['billNo'];
    var tel = rowObject['tel'];
    var bankName = rowObject['bankName'];
    var bankNo = rowObject['bankNo'];
    return "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','"
        + name + "','" + numNo + "','" + receiveName + "','" + orderCount + "','"
        + unitPrice + "','" + inputPerson + "','" + usePerson + "','"
        + contractType + "','" + orderTime + "','"
        + billName + "','" + address + "','"
        + billNo + "','" + tel + "','" + bankName + "','" + bankNo + "','"+ status + "','"
        + forkliftFee
        + "')\">编辑</button>";
}
//编辑
function editSettlement(id, name, numNo, receiveName, orderCount, unitPrice, ip, up, ct, orderTime,
                        billName, address, billNo, tel, bankName, bankNo,status, ff) {
    subType = 2;
    $("#myModalLabel2").html("编辑合同信息");
    $("#numNo").val(numNo);
    $("#hideId").val(id);
    $("#statusId").val(status);

    $("#receiveName").val(receiveName).select2();
    $("#name").val(name).select2();
    $("#orderTime").val(orderTime);
    $("#orderCount").val(orderCount);
    $("#unitPrice").val(unitPrice);
    $("#inputPerson").val(ip);
    $("#usePerson").val(up);
    $("#contractType").val(ct);
    $("#forkliftFee").val(ff);
    $("#billName").val(billName);
    $("#address").val(address);
    $("#billNo").val(billNo);
    $("#tel").val(tel);
    $("#bankName").val(bankName);
    $("#bankNo").val(bankNo);
}
function dealLock(id, type) {
    if (id == "") {
        swal("", "请至少选中一行！", "warning");
        return;
    }
    swal({
        title: "提示",
        text: "是否执行操作？",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonClass: "btn-info",
        confirmButtonText: "确定",
        closeOnConfirm: false//不设置这个，直接关闭提示框，没法显示后面成功的提示
    }, function () {
        $.post(path + "lockInfo", {id: id, type: type}, function (data) {
            if (data > 0) {
                swal("成功", "操作成功！", "success");
                queryData();
            } else {
                swal("失败", "操作失败", "error");
            }
        });
    });

}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    $("#addBtn").on("click", function () {
        subType = 1;
        $("#myModalLabel2").html("新增合同信息");
        $("#validate input[type='text']").val("");
    });
    //新增user
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = subType == 1 ? path + "addContractInfo" : path + "editContractInfo";
        if(subType == 2 && (parseInt($("#statusId").val())==2 || parseInt($("#statusId").val())==4)){
            swal("警告","已锁定或是结算过的合同不能修改","warning");
            return false;
        }
        var numNo = $.trim($("#numNo").val());
        $.post(url, {
                numNo: numNo, receiveName: $.trim($("#receiveName").val()), name: $("#name").val(),
                orderCount: $("#orderCount").val(),
                unitPrice: $("#unitPrice").val(),
                orderTime: $("#orderTime").val(),
                inputPerson: $("#inputPerson").val(),
                usePerson: $("#usePerson").val(),
                contractType: $("#contractType").val(),
                forkliftFee: $("#forkliftFee").val(),
                billName: $("#billName").val(),
                address: $("#address").val(),
                billNo: $("#billNo").val(),
                tel: $("#tel").val(),
                bankName: $("#bankName").val(),
                bankNo: $("#bankNo").val(),
                type: $("#type").val()
                , id: subType == 1 ? 0 : $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryData();
                } else if (result == -1) {
                    swal("失败","合同编号=" + numNo + "已经存在！","error");
                } else {
                    swal("失败","操作失败","error");
                }
            });
    });
    //导出excle事件
    $('.fa-download').parent().on("click", function () {
        var numNo = $("#s_numNo").val();
        var settlements = $("#s_settlements").val();
        var coal = $("#s_coal").val();
        var status = $("#s_status").val();
        var type = $("#s_type").val();
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var param = 'numNo=' + numNo + '&settlement=' + settlements + '&beginDate=' + beginDate + '&endDate=' + endDate + '&name=' + coal + '&status=' + status + '&contractType=' + type;
        location.href = path + 'export_excel_data?' + param;
    });
    $("#lock").on("click", function () {
        dealLock(checkBtn(), 1);
    });
    $("#unlock").on("click", function () {
        dealLock(checkBtn(), 2);
    });
    $("#delete").on("click", function () {
        deleteSettlement(checkBtn());
    });
    //结算
    $("#balance").on("click", function () {
        balanceSettlement(checkBtn());
    });
    //打印合同
    $("#print").on("click", function () {
         printInfo(checkBtn());
    });
}
//打印合同信息
function printInfo(id) {
    if (id == "") {
        swal("", "请选中一行！", "warning");
        return;
    }
    if (id.indexOf(",") > -1) {
        swal("","只能选中一行进行打印！","warning");
        return;
    }
    $.post(path + "printInfo", {id: id}, function (data) {
    });
}
//结算
function balanceSettlement(id) {
    if (id == "" || id.indexOf(",") > -1) {
        swal("", "请选中一行！", "warning");
        return;
    }
    $.post(path + "balanceContractInfo", {id: id}, function (data) {
        if (data == 1) {
            swal("成功", "操作成功！", "success");
            queryData();
        } else if (data == -1) {
            swal("失败", "操作失败", "error");
        }else if (data == -2) {
            swal("失败", "未审核或是锁定状态的合同不能进行结算", "warning");
        }else{
            swal("失败", "网络异常", "error");
        }
    });
}
//移除
function deleteSettlement(id) {
    if (id == "" || id.indexOf(",") > -1) {
        swal("", "请选中一行！", "warning");
        return;
    }
    $.post(path + "deleteContractInfo", {id: id}, function (data) {
        if (data == 1) {
            swal("成功", "删除成功！", "success");
            queryData();
        } else if (data == -1) {
            swal("失败", "删除失败", "error");
        }else if (data == -2) {
            swal("失败", "只有未审核合同的才能删除", "warning");
        }else{
            swal("失败", "网络异常", "error");
        }
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
//form表单提交 格式规则校验
function initFormValid() {
    //添加ip验证规则
    jQuery.validator.addMethod("dataNumber", function (value, element) {
        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    }, "请输入数字");
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
