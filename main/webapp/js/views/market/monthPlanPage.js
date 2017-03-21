/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    // $(".form_datetime").datepicker({
    //     autoclose: true,
    //     format: 'yyyy-mm-dd',
    //     language: 'zh-CN',
    //     todayBtn: 'linked',//今日按钮
    //     todayHighlight:true
    // });
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
        {name: 'endDate', value: endDate},
        {name: 'searchType', value: "month"}//查询月计划
    ];
    var url = path + 'get_plans_table';
    commonDataTables("monthPlanDataTables", url, aoColumns, params, "monthPlanData");
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
        {"sTitle": "计划号", "mData": "rid", "sWidth": "5%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "10%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "5%"},
        {"sTitle": "累计实发车", "mData": "actualCarNum", "sWidth": "5%"},
        {"sTitle": "计划吨数", "mData": "planTonnage", "sWidth": "5%"},
        {"sTitle": "累计实发吨", "mData": "actualSendedTonnage", "sWidth": "5%"},
        {"sTitle": "未发车数", "mData": "unsendedCarNum", "sWidth": "5%"},
        {"sTitle": "未发吨数", "mData": "unsendedTonnage", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "6%"},
        {"sTitle": "煤种", "mData": "coalName", "sWidth": "6%"},
        {"sTitle": "井别", "mData": "wellsName", "sWidth": "5%"},
        {"sTitle": "到站", "mData": "siteName", "sWidth": "5%"},
        {"sTitle": "专用线", "mData": "privateLine", "sWidth": "5%"},
        {"sTitle": "结算单位", "mData": "settlement", "sWidth": "5%"},
        {"sTitle": "资金方式", "mData": "method", "sWidth": "8%"},
        {"sTitle": "经办人", "mData": "usePerson", "sWidth": "8%"},
        {"sTitle": "录入人", "mData": "inputPerson", "sWidth": "5%"},
        {"sTitle": "日期", "mData": "createtime", "sWidth": "10%"},
        {"sTitle": "交易单号", "mData": "payId", "sWidth": "10%"},
        {
            "sTitle": "状态", "mData": "status", "sWidth": "10%", "mRender": function (data, type, row) {
            var status = row['status'];
            if (row['status'] == 1) {
                return "正常";
            }
            if (row['status'] == -1) {
                return "计划终止";
            }
        }
        },
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
    var rid = rowObject['rid'];
    var name = rowObject['name'];
    var settlement = rowObject['settlement'];
    var planCarNum = rowObject['planCarNum'];
    var actualCarNum = rowObject['actualCarNum'];
    var planTonnage = rowObject['planTonnage'];
    var ast = rowObject['actualSendedTonnage'];

    var inputPerson = rowObject['inputPerson'];
    var usePerson = rowObject['usePerson'];

    var actualUnitPrice = rowObject['actualUnitPrice'];
    var wellsName = rowObject['wellsName'];
    var coalName = rowObject['coalName'];
    var siteName = rowObject['siteName'];
    var privateLine = rowObject['privateLine'];
    var method = rowObject['method'];
    var createtime = rowObject['createtime'];
    var payId = rowObject['payId'];
    return "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','" + rid + "','"
        + name + "','" + status + "','" + settlement + "','" + planCarNum + "','"
        + actualCarNum + "','" + inputPerson + "','" + usePerson + "','"
        + planTonnage + "','" + ast + "','" + payId + "','"
        + actualUnitPrice + "','" + wellsName + "','"
        + coalName + "','" + siteName + "','" + privateLine + "','" + method + "','"
        + createtime
        + "')\">编辑</button>";
}
//编辑
function editSettlement(id, rid, name, status, st, planCarNum, actualCarNum, ip, up, pt, ast,
                        payId, aup, wellsName, coalName, siteName, pline, method, time) {
    subType = 2;
    $("#planCarNum").val(planCarNum);
    $("#hideId").val(id);

    $("#settlement").val(st).select2();
    $("#name").val(rid).select2();
    $("#createtime").val(time);
    $("#planCarNum").val(planCarNum);
    $("#ast").val(ast);
    $("#actualCarNum").val(actualCarNum);
    $("#planTonnage").val(pt);
    $("#inputPerson").val(ip);
    $("#usePerson").val(up);
    $("#actualUnitPrice").val(aup);
    $("#wellsName").val(wellsName).select2();
    $("#coalName").val(coalName).select2();
    $("#siteName").val(siteName).select2();
    $("#privateLine").val(pline);
    $("#method").val(method).select2();
    $("#payId").val(payId);
}
function dealLock(id, type) {
    $("#deleteBut").on("click", function () {
        if (checkBtn() == "") {
            $('#modalDelete').trigger('click');
            showResultInfo("请至少选中一行！", false);
            return;
        }
        $.post(path + "lockInfo", {id: id, type: type}, function (data) {
            $('#modalDelete').trigger('click');
            if (data > 0) {
                showResultInfo("操作成功！", true);
            } else {
                showResultInfo("操作失败！", false);
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
        $("#validate input[type='text']").val("");
    });
    //新增user
    $("#submitBut").on("click", function () {
        var $form = $('#validate');
        if (!$form.valid()) {
            return false;
        }
        var url = path + (subType == 1 ? "addMonthPlan" : "editMonthPlan");
        $.post(url, {
                planCarNum: $("#planCarNum").val(), settlement: $("#settlement").val(),
                rid: $("#name").val(), name: $("#name option:selected").text(),
                actualSendedTonnage: $("#ast").val(), actualCarNum: $("#actualCarNum").val(),
                planTonnage: $("#planTonnoage").val(),
                usePerson: $("#usePerson").val(), actualUnitPrice: $("#actualUnitPrice").val(),
                wellsName: $("#wellsName").val(),
                coalName: $("#coalName").val(),
                siteName: $("#siteName").val(),
                inputPerson: $("#inputPerson").val(),
                privateLine: $("#privateLine").val(),
                method: $("#method").val(),
                payId: $("#payId").val(), id: subType == 1 ? 0 : $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo("操作成功！", true);
                } else {
                    showResultInfo("操作失败！", false);
                }
            });
    });
    //导出excle事件
    $('.fa-download').parent().on("click", function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate + '&searchType=month' ;
        location.href = path + 'export_plan_excel_data?' + param;
    });
    $("#stopMonthPlan").on("click", function () {
        stopMonthPlan(checkBtn());
    });
    $("#delete").on("click", function () {
        deletePlan(checkBtn());
    });
}
function stopMonthPlan(id) {
    $("#deleteBut").on("click", function () {
        if (id == "") {
            $('#modalDelete').trigger('click');
            showResultInfo("请至少选中一行！", false);
            return;
        }
        $.post(path + 'stopMonthPlan', {id: id}, function (data) {
            if (data == 1) {
                showResultInfo("操作成功！", true);
            } else {
                showResultInfo("操作失败！", false);
            }
        })
    })
}
//移除
function deletePlan(id) {
    $("#deleteBut").on("click", function () {
        if (id == "") {
            $('#modalDelete').trigger('click');
            showResultInfo("请至少选中一行！", false);
            return;
        }
        $.post(path + "deleteContractInfo", {id: id}, function (data) {
            $('#modalDelete').trigger('click');
            if (data == 1) {
                showResultInfo("操作成功！", true);
            } else {
                showResultInfo("操作失败！", false);
            }
        });
    })
}
//操作结果
function showResultInfo(message, isFlush) {
    $("#wordsMessage").html(isFlush ? '<span style="font-size:20px"><i class="fa fa-check">&nbsp;<strong>' + message + '</strong></i></span>' :
    '<span style="font-size:20px"><i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>' + message + '</strong></i></span>');
    $('#resultBut').trigger('click');
    $("#myResult").on('click', function () {
        if (isFlush) {
            queryData();
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
