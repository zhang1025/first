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
    var url = path+'/get_card_table';
    commonDataTables("cardDataTables", url, aoColumns, params, "cardData");
    $("#coalCard").focus();
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
        {"sTitle": "卡号", "mData": "coalCard", "sWidth": "5%"},
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
            if (status == 7) {
                return "调价后失效";
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
            var tt = row['forkliftFee'];
            if (tt == 1) {
                return "包含铲车费";
            }
            if (tt == 0) {
                return "不包含";
            }
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
        {"sTitle": "税金", "mData": "taxation", "sWidth": "7%"});
    return aoColumns;
}

function initButtonClick() {
    $("#searBtn").on("click", function () {
        queryData();
        $("#coalCard").focus();
    });
    
    $("#bundling").on("click",function () {
        if(checkSelect()==true){
            var coalNo = $('input:checkbox[name="check"]:checked').parent().next().next().html();
            //合同号
            var numNo = $('input:checkbox[name="check"]:checked').parent().next().html();
            if(!coalNo){
                $("#myModalBind").modal("show");
                setTimeout(function () {
                    $("#coalCard").focus();
                },600);
                $("#hideNumNo").val(numNo);
                // binding();
            }else{
                swal("警告","已绑定过的合同不能再次绑定","warning");
                return false;
            }

        }
    });
    $("#submitBut").on("click",function () {
        var coalCard =  $.trim($("#coalCard").val());
        if(coalCard=="" || coalCard==null){
            swal("警告","绑定煤卡不能为空","warning");
            return false;
        }
        $.post(path + "bindingCard",
            {id: checkBtn(),coalCard:coalCard,
                money:$("#money").val(),numNo:$("#hideNumNo").val()},
            function (data) {
            if(data > 0){
                $("#myModalBind").modal("hide");
                swal("ok","绑定成功！","success");
                queryData();
            }else{
                swal("failed","绑定失败","error");
            }
        });
    });
    $("#unBundling").on("click",function () {
        if(checkSelect()){
            swal({
                    title:"是否注销绑定?",
                    type:"warning",
                    showCancelButton:true,
                    confirmButtonClass:"btn-danger",
                    confirmButtonText:"确认",
                    cancelButtonText:"取消",
                    closeOnConfirm:false
                },
                function (isConfirm) {
                    if(isConfirm){
                        $.post(path + "unBindingCard", {id: checkBtn()}, function (data) {
                            if(data > 0){
                                swal("ok","注销绑定成功！","success");
                                queryData();
                                cardInputSelect("coalCard");
                            }else{
                                swal("failed","注销失败","error");
                            }
                        });
                    }
                }
            )
        }
    });
}
function binding() {
    swal({
            title:"是否执行绑定操作?",
            type:"warning",
            showCancelButton:true,
            confirmButtonClass:"btn-danger",
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            closeOnConfirm:false
        },
        function (isConfirm) {
            if(isConfirm){
                $.post(path + "bindingCard", {id: checkBtn(),coalCard:$.trim($("#coalCard").val())}, function (data) {
                    if(data > 0){
                        swal("ok","绑定成功！","success");
                        queryData();
                        cardInputSelect("coalCard");
                    }else{
                        swal("failed","绑定失败","error");
                    }
                });
            }
        }
    )
}
function cardInputSelect(id) {
    $("#"+id).attr("autofocus","autofocus");
    $("#"+id).focus();
}
function checkSelect() {
    var id = checkBtn();
    if (id == "") {
        swal("", "请选中一行！", "warning");
        return false;
    }else if (id.indexOf(",") > -1) {
        swal("","只能选中一行进行操作！","warning");
        return false;
    }else{
        return true;
    }
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
