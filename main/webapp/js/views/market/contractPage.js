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
    var url = path + 'get_contract_table';
    commonDataTables("contractDataTables", url, aoColumns, params, "contractData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "合同编号", "mData": "numNo", "sWidth": "5%"},
        {"sTitle": "客户名称", "mData": "settlement", "sWidth": "10%"},
        {"sTitle": "品种", "mData": "name", "sWidth": "8%"},
        {"sTitle": "订单总量", "mData": "orderCount", "sWidth": "8%"},
        {"sTitle": "单价", "mData": "unitPrice", "sWidth": "5%"},
        {"sTitle": "预交金额", "mData": "prepaidAmount", "sWidth": "8%"},
        {"sTitle": "订单日期", "mData": "orderTime", "sWidth": "5%"},
        {"sTitle": "已发送量", "mData": "sendCount", "sWidth": "5%"},
        {"sTitle": "剩余量", "mData": "leftCount", "sWidth": "6%"},
        {"sTitle": "发运金额", "mData": "sendPrice", "sWidth": "6%"},
        {"sTitle": "剩余金额", "mData": "leftPrice", "sWidth": "5%"},
        {"sTitle": "合同状态", "mData": "status", "sWidth": "8%","mRender": function (data, type, row) {
            var status = row['status'];
            if(status==1){
                return "解锁";
            }
            if(status==3){
                return "正在发运";
            }
            if(status==2){
                return "锁定";
            }
            if(status==0){
                return "未审核";
            }
            if(status==-1){
                return "未通过";
            }
            return "未知";
        }},
        {"sTitle": "经手人", "mData": "inputPerson", "sWidth": "7%"},
        {"sTitle": "录入人", "mData": "usePerson", "sWidth": "7%"},
        {"sTitle": "录入时间", "mData": "createtime", "sWidth": "10%"},
        {"sTitle": "合同类型", "mData": "contractType", "sWidth": "10%","mRender": function (data, type, row) {
            var type = row['contractType'];
            if(type == "1"){
                return "公用煤";
            }
            if(type == "2"){
                return "零销煤";
            }
            if(type == "4"){
                return "职工煤";
            }
            if(type == "3"){
                return "其他";
            }
        }},
        // {"sTitle": "预交欠费", "mData": "unitPrice", "sWidth": "5%"},
        {
            "sTitle": "铲车费", "mData": "forkliftFee", "sWidth": "10%", "mRender": function (data, type, row) {
            return operateType(data, type, row);
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
    var numNo = rowObject['numNo'];
    var settlement = rowObject['settlement'];
    var name = rowObject['name'];
    var orderCount = rowObject['orderCount'];
    var unitPrice = rowObject['unitPrice'];
    var inputPerson = rowObject['inputPerson'];
    var usePerson = rowObject['usePerson'];
    var contractType = rowObject['contractType'];
    var forkliftFee = rowObject['forkliftFee'];
    var orderTime = rowObject['orderTime'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + id + "','"
        + name + "','"+ numNo + "','"+ settlement + "','"+ orderCount + "','"
        + unitPrice + "','"+ inputPerson + "','"+ usePerson + "','"
        + contractType + "','"+ orderTime + "','"
        + forkliftFee
        + "')\">编辑</button>";
    var lockBtn1 = "&ensp;<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#modalDelete' "+(status == 2?"disabled='true'":"")+" onclick='dealLock(" + id + "," + status + ",1)'>锁定</button>";
    var lockBtn2 = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#modalDelete' "+(status == 1?"disabled='true'":"")+"  onclick='dealLock(" + id + "," + status + ",2)'>解锁</button>";
    return editBtn + lockBtn1+lockBtn2+"&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteSettlement(" + id + ")'>移除</button>";
}
//编辑
function editSettlement(id,name,numNo,st,orderCount,unitPrice,ip,up,ct,orderTime,ff) {
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
}
function dealLock(id,status,type) {
    $("#deleteBut").on("click", function () {
        $.post(path + "lockInfo", {id: id,status:status, type: type}, function (data) {
            $('#modalDelete').trigger('click');
            if (data == 1) {
                showResultInfo("操作成功！", true);
            } else if(data==-1) {
                showResultInfo("暂无解锁对象！", false);
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
}
//移除
function deleteSettlement(id) {
    $("#deleteBut").on("click", function () {
        $.post(path + "deleteContractInfo", {id: id, model: model}, function (data) {
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
