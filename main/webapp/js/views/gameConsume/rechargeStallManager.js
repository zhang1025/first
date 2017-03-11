/**
 * 充值档位配置的js
 * 
 * Created by machaozhe on 2016-10-31.
 * 
 */
var oldType;
var operType = "insert";

$(function () {
    $("body").ledo();

    //初始化访问人数和访问量
    initVisitorsAndViews();

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
        exportExcelData();
    });

    //增加tips
    $('#pnl .fa-download').addClass("tip").attr("title","导出Excel");
    $(".tip").tooltip ({placement: 'top', container: 'body'});

    $(".select2").select2({
        width:"100%",
        dropdownAutoWidth:true
    });
    //金额验证
    $.validator.addMethod("check_money",function(value,element){
        return this.optional(element) || /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(value);
    },"金额格式错误!");

    //档位标识验证
    $.validator.addMethod("check_id",function(value,element){
        return /^\d+$/.test(value);
    },"档位唯一标识必须为数字!");

    //表单验证
    $("#recharge_validate").validate({
        rules: {
            recharge_name:{
                required: true,
                rangelength: [1, 20],
            },
            recharge_money:{
                required: true,
                rangelength: [1, 10],
                check_money:""

            },
             recharge_type:{
             required: true
             // rangelength: [1, 10],
             // check_id:""
             }
        },
        ignore: null,
        ignore: 'input[type="hidden"]',
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
        highlight: function( label ) {
        $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function( label ) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });
    searchData();
    //绑定查询按钮
    $("#searchBtn").click(searchData);
    
});

/**
 * 查询数据
 */
function searchData(){
    queryDetailedData();
}

/**
 * 充值档位配置表格(Table)
 */
function queryDetailedData(){
    //table显示的列名
    var aoColumns = [
        { "sTitle": "档位名称", "mData": "name"},
        { "sTitle": "金额", "mData": "money"},
        { "sTitle": "档位唯一标识", "mData": "type"},
        { "sTitle":  "操作", "mData": "type", "mRender": function(data, type, row) {return operateButton(data, type, row);}}
    ];
    //参数
    var params = [
        {name: 'type',   value: $("#name_select").val()},
        {name: 'money',     value: $("#money_input").val()}
    ];
    playLoading("rechargeStallData");
    var url = 'print_rechargeStallManager_table';
    commonDataTables("dataTables", url, aoColumns, params,"rechargeStallData");
}

/**
 * 操作按钮（编辑,删除）
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {string}
 */
function operateButton(cellvalue, options, rowObject) {
    var name = rowObject['name'];
    var money = rowObject['money'];
    var type = rowObject['type'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#addModal' id='editorServer' onclick=\"editRechargeStallType('"
        + name + "','"
        + money + "','"
        + type
        + "')\">"+"编辑"+"</button>";
    var deleteBtn = "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#deleteModal' onclick=\"deleteRechargeStallType('"
        + type
        + "')\">"+"删除"+"</button>";
    return editBtn + "&ensp;" + deleteBtn;
}

/**
 * 编辑操作
 */
function editRechargeStallType(name,money,type){
    oldType = type;
    operType = "update";
    $("#recharge_name").val(name);
    $("#recharge_money").val(money);
    $("#recharge_type").val(type);
}


/**
 * 删除档位操作
 * @param serverId
 * @param relationId
 */
function deleteRechargeStallType(type) {
    $("#deleteBtn").on("click",function () {
        $.goAjax("POST","delete_rechargeStall_type",{"type":type},function(result){
            $('#deleteModal').trigger('click');
            if(result==1){
                deleteSelectType(type,"");
                showResultInfo("<strong style='color:green'>删除成功</strong>",true);
            }else if(result==-1){
                showResultInfo("<strong style='color:green'>档位已删除!</strong>",true);
            }
            else{
                showResultInfo("<strong style='color:red'>删除失败!</strong>",false);
            }
        });
    });
}

/**
 * insert和update的提交操作
 * @returns {boolean}
 */
function commit(){
    //表单验证
    var $form = $('#recharge_validate');
    if(!$form.valid())
        return false;

    var flag = false;
    var type = $.trim($("#recharge_type").val());
    var name = $.trim($("#recharge_name").val());

    //判断类型是否存在
    if(operType == "update"){
        if(oldType != type){
            flag = checkType(type,name,"check");
        }else{
            flag = true;
        }
    }else{
        flag = checkType(type,name,"check");
    }
    //档位已经存在
    if(!flag)
    {
        showResultInfo("档位唯一标识已存在!",false);
        return false;
    }
    var url = operType+"_rechargeStall_type";
    var data = "{"+"\"oldType\""+":"+"\""+oldType+"\""+","+
        "\"type\""+":"+"\""+type+"\""+","+
        "\"name\""+":"+"\""+name+"\""+","+
        "\"money\""+":"+"\""+$.trim($("#recharge_money").val())+"\""+
        "}";

    $.goAjax("POST",url,{'dt_json':data},
        function(result){
            $('#myModal').trigger('click');
            if (result > 0) {
                if(operType == "update") {
                    updateSelectType(type,name);
                }else{
                    insertSelectType(type,name);
                }
                showResultInfo("<strong style='color:green'>操作成功</strong>",true);
                closeModal();
            }else if(result == -1){
                showResultInfo("<strong style='color:yellowgreen'>档位唯一标识已存在!</strong>",true);
            } else {
                showResultInfo("<strong style='color:red'>操作失败!</strong>",false);
            }
        });
}

/**
 * 关闭add和insert菜单时触发
 */
function closeModal() {
    clearForm();
    $("#addModal").modal("hide");
}

/**
 * 清理表单
 */
function clearForm() {
    oldType = "";
    operType = "insert";
    $("#recharge_name").val("");
    $("#recharge_money").val("");
    $("#recharge_type").val("");
    $('#recharge_validate').validate().resetForm();
    $('#recharge_validate label').closest('.form-group').removeClass('has-error');
}

/**
 * 操作结果
 * @param message
 * @param isFlush
 */
function showResultInfo(message,isFlush) {
    $("#resultMessage").html(isFlush?'<i class="fa fa-check">&nbsp;<strong>'+message+'</strong></i>':
    '<i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i>');
    $('#modelResult').modal('show');
    $("#myResult").on('click',function () {
        if(isFlush){
            searchData();
        }
    });
}

/**
 * 新增后在select后插入option
 * @param type
 * @param name
 */
function insertSelectType(type,name){
    $("#name_select").append("<option value='"+type+"'>"+name+"</option>");
}

/**
 * 更新操作后,修改相应的option
 * @param type
 * @param name
 */
function updateSelectType(type,name){
    getDealOption(type,name,"update");
}

/**
 * 删除后，删除相应的option
 * @param type
 * @param name
 */
function deleteSelectType(type,name){
    getDealOption(type,name,"delete");
}

/**
 * 操作检测
 * @param type
 * @param name
 * @param operation
 * @returns {boolean}
 */
function checkType(type,name,operation){
    return getDealOption(type,name,"check");
}

/**
 * 通用处理逻辑
 * @param type
 * @param name
 * @param operation
 * @returns {boolean}
 */
function getDealOption(type,name,operation){
    var passed = true;
    if(operation=="update") {
        $("#name_select").children().each(function () {
            if ($(this).val() == oldType) {
                $(this).val(type);
                $(this).text(name);
                return false;
            }
        });
    }else{
        $("#name_select").children().each(function(){
            if($(this).val() == type){
                if(operation=="delete"){
                    $(this).remove();
                }else if(operation=="check"){
                    passed = false;
                }
                return false;
            }
        })
    }
    return passed;
}

/**
 * 导出充值档位配置Excel数据
 */
function exportExcelData() {
    //查询条件
    var type = $.trim($("#name_select").val());
    var money = $.trim($("#money_input").val());

    //参数
    var param = '&money='+money+'&type='+type;
    var url = 'export_rechargeStallManager_excel?'+param;
    location.href=url;
}