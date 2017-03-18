/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/common/";
var subType = 1;
var model = "settlement";
$(document).ready(function () {
    $("body").ledo();
    querySettlementData();
    initButtonClick();
    $(".select").select2();
});
function querySettlementData() {
    var aoColumns = dealTableTitle();
    var name = $("#s_name").val();
    // var method = $("#s_method option:selected").text();
    // var province = $("#s_province option:selected").text();
    var method = $("#s_method").val();
    var province = $("#s_province").val();
    var params = [
        {name: 'model', value: model},
        {name: 'name', value: name},
        {name: 'method', value: method},
        {name: 'province', value: province}
    ];
    var url = path + 'get_common_table';
    commonDataTables(model + "DataTables", url, aoColumns, params, model + "Data");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "编号", "mData": "id","sWidth":"10%"},
        {"sTitle": "结算单位名称", "mData": "name","sWidth":"20%"},
        {"sTitle": "结算简记符", "mData": "mnc","sWidth":"15%"},
        {"sTitle": "结算方式", "mData": "method","sWidth":"15%"},
        {"sTitle": "结算行业", "mData": "industry","sWidth":"20%"},
        {"sTitle": "结算省份", "mData": "province","sWidth":"15%"},
        {
            "sTitle": "类型", "mData": "type","sWidth":"10%", "mRender": function (data, type, row) {
            return operateType(data, type, row);
        }
        },
        {
            "sTitle": "操作", "mData": "id","sWidth":"10%", "mRender": function (data, type, row) {
            return operateButton(data, type, row);
        }
        });
    return aoColumns;
}

function operateType(cellvalue, options, rowObject) {
    var type = rowObject['type'];
    if (type == 1) {
        return "<span class='badge badge-success'>重点</span>";
    }
    if (type == 0) {
        return "<span class='badge badge-important'>非重点</span>";
    }
    return "未知";
}

function operateButton(cellvalue, options, rowObject) {
    var c_id = rowObject['id'];
    var c_name = rowObject['name'];
    var c_mnc = rowObject['mnc'];
    var method = rowObject['method'];
    var industry = rowObject['industry'];
    var province = rowObject['province'];
    var type = rowObject['type'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editSettlement('"
        + c_id + "','"
        + c_name + "','"
        + c_mnc + "','"
        + method + "','"
        + industry + "','"
        + province + "','"
        + type
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteSettlement(" + c_id + ")'>移除</button>";
}
//编辑
function editSettlement(c_id, c_name, c_mnc, method, industry, province, type) {
    subType = 2;
    $("#name").val(c_name);
    $("#mnc").val(c_mnc);
    $("#hideId").val(c_id);

    $("#province").val(province).select2();
    $("#method").val(method).select2();
    $("#industry").val(industry).select2();
    $("#type").val(type);

}
function initButtonClick() {
    $("#searBtn").on("click", function () {
        querySettlementData();
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
        var url = subType == 1 ? path + "addSettlement" : path + "editSettlement";
        var name = $.trim($("#name").val());
        $.post(url, {
                name: name, mnc: $.trim($("#mnc").val()), model: model,
                method: $("#method").val(),
                industry: $("#industry").val(),
                province: $("#province").val(),
                type: $("#type").val()
                , id: subType == 1 ? 0 : $("#hideId").val()
            },
            function (result) {
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo("操作成功！", true);
                } else if (result == -1) {
                    showResultInfo("name=" + name + "已经存在！", false);
                } else {
                    showResultInfo("操作失败！", false);
                }
            });
    });
}
//移除
function deleteSettlement(id) {
    $("#deleteBut").on("click", function () {
        $.post(path + "deleteCommon", {id: id, model: model}, function (data) {
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
            querySettlementData();
        }
    });
}
