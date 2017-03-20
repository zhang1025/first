/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    $(".form_datetime").datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd',
        language: 'zh-CN',
        todayBtn: 'linked',//今日按钮
        todayHighlight:true
    });
    $(".select").select2();
    initButtonClick();
    initFormValid();
    queryData();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var numNo = $.trim($("#s_numNo").val());
    var settlements = $("#s_settlements").val();
    var coal = $("#s_coal").val();
    var status = $("#s_status").val();
    var type = $("#s_type").val();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate =  $.trim(dateRange[0]);
    var endDate =  $.trim(dateRange[1]);
    var params = [
        {name: 'numNo', value: numNo},
        {name: 'settlement', value: settlements},
        {name: 'name', value: coal},
        {name: 'status', value: status},
        {name: 'contractType', value: type},
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate}
    ];
    var url = path + 'get_monthPlan_table';
    commonDataTables("monthPlanDataTables", url, aoColumns, params, "monthPlanData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "选择", "mData": "id","mRender": function(data, type, rowObject){
            var id = rowObject['id'];
            return "<input type='checkbox' name='check' value='"+id+"'/>";
        }, "sWidth": "5%"},
        {"sTitle": "计划号", "mData": "rid", "sWidth": "5%"},
        {"sTitle": "收货单位", "mData": "name", "sWidth": "10%"},
        {"sTitle": "计划车数", "mData": "planCarNum", "sWidth": "5%"},
        {"sTitle": "累计实发车", "mData": "actualCarNum", "sWidth": "5%"},
        {"sTitle": "计划吨数", "mData": "planTonnoage", "sWidth": "5%"},
        {"sTitle": "累计实发吨", "mData": "actualSendedTonnage", "sWidth": "5%"},
        {"sTitle": "未发车数", "mData": "unsendedCarNum", "sWidth": "5%"},
        {"sTitle": "未发吨数", "mData": "unsendedTonnage", "sWidth": "5%"},
        {"sTitle": "单价", "mData": "actualUnitPrice", "sWidth": "6%"},
        {"sTitle": "煤种", "mData": "coalnName", "sWidth": "6%"},
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
    var name = rowObject['name'];
    var settlement = rowObject['settlement'];
    var planCarNum = rowObject['planCarNum'];
    var actualCarNum = rowObject['actualCarNum'];
    var planTonnoage = rowObject['planTonnoage'];
    var ast = rowObject['actualSendedTonnage'];

    var inputPerson = rowObject['inputPerson'];
    var usePerson = rowObject['usePerson'];

    var actualUnitPrice = rowObject['actualUnitPrice'];
    var wellsName = rowObject['wellsName'];
    var coalnName = rowObject['coalnName'];
    var siteName = rowObject['siteName'];
    var privateLine = rowObject['privateLine'];
    var method = rowObject['method'];
    var createtime = rowObject['createtime'];
    var payId = rowObject['payId'];
    return "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','"
        + name + "','"+ status + "','"+ settlement + "','"+ planCarNum + "','"
        + actualCarNum + "','"+ inputPerson + "','"+ usePerson + "','"
        + planTonnoage + "','"+ ast + "','"  + payId + "','"
        + actualUnitPrice + "','"+ wellsName + "','"
        + coalnName + "','"+ siteName + "','"  + privateLine + "','"+ method + "','"
        + createtime
        + "')\">编辑</button>";
}
//编辑
function editSettlement(id,name,status,st,planCarNum,actualCarNum,ip,up,pt,ast,
                        payId,aup,wellsName,coalnName,siteName,pl,method,time) {
    subType = 2;
    $("#numNo").val(numNo);
    $("#hideId").val(id);

    $("#settlement").val(st).select2();
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
function dealLock(id,type) {
    $("#deleteBut").on("click", function () {
        if(checkBtn() == ""){
            $('#modalDelete').trigger('click');
            showResultInfo("请至少选中一行！", false);
            return;
        }
        $.post(path + "lockInfo", {id: id, type: type}, function (data) {
            $('#modalDelete').trigger('click');
            if (data > 0) {
                showResultInfo("操作成功！", true);
            }else{
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
        var url = subType == 1 ? path + "addContractInfo" : path + "editContractInfo";
        var numNo = $.trim($("#numNo").val());
        $.post(url, {
                numNo: numNo, settlement: $.trim($("#settlement").val()), name: $("#name").val(),
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
                    showResultInfo("操作成功！", true);
                } else if (result == -1) {
                    showResultInfo("合同编号=" + numNo + "已经存在！", false);
                } else {
                    showResultInfo("操作失败！", false);
                }
            });
    });
    //导出excle事件
    $('.fa-download').parent().on("click",function () {
        var numNo = $("#s_numNo").val();
        var settlements = $("#s_settlements").val();
        var coal = $("#s_coal").val();
        var status = $("#s_status").val();
        var type = $("#s_type").val();
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate =  $.trim(dateRange[0]);
        var endDate =  $.trim(dateRange[1]);
        var param = 'numNo='+numNo+'&settlement='+settlements+'&beginDate='+beginDate+'&endDate='+endDate+'&coal='+coal+'&status='+status+'&contractType='+type;
        location.href=path + 'export_excel_data?'+param;
    });
    $("#lock").on("click",function () {
        dealLock(checkBtn(),1);
    });
    $("#unlock").on("click",function () {
        dealLock(checkBtn(),2);
    });
    $("#delete").on("click",function () {
        deleteSettlement(checkBtn());
    });
    //打印合同
    $("#print").on("click",function () {
        // deleteSettlement(checkBtn());
    });
}
//移除
function deleteSettlement(id) {
    $("#deleteBut").on("click", function () {
        if(checkBtn() == ""){
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
        if(0==i){
            checkTemp = $(this).val();
        }else{
            checkTemp += (","+$(this).val());
        }
    });
    return checkTemp;
}
//form表单提交 格式规则校验
function initFormValid() {
    //添加ip验证规则
    jQuery.validator.addMethod("dataNumber",function (value,element) {
        return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
    },"请输入数字");
    $("#validate").validate({
        errorPlacement: function( error, element ) {
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
        highlight: function( label ) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function( label ) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });
}
