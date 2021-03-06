/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/common/";
var type=1;
var model="freight";
$(document).ready(function() {
    $("body").ledo();
    queryFreightData();
    initButtonClick();
    // $(".select").select2();
    initFormValid();
});
function queryFreightData() {
    var aoColumns = dealTableTitle();
    var name = $("#s_name").val();
    var tonnage = $("#s_tonnage").val();
    var params = [
        {name: 'model', value: model},
        {name: 'name', value: name},
        {name: 'tonnage', value: tonnage}
    ];
    var url = path+ 'get_common_table';
    commonDataTablesWW(model+"DataTables", url, aoColumns, params,model+"Data");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "序号", "mData": "id","sWidth":"10%"},
        {"sTitle": "站点名称", "mData": "name","sWidth":"30%"},
        {"sTitle": "站点简记符", "mData": "mnc","sWidth":"20%"},
        {"sTitle": "吨数", "mData": "tonnage","sWidth":"10%"},
        {"sTitle": "运费", "mData": "cost","sWidth":"10%"},
        {"sTitle": "操作", "mData": "id","sWidth":"10%", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var c_id = rowObject['id'];
    var c_name = rowObject['name'];
    var c_mnc = rowObject['mnc'];
    var tonnage = rowObject['tonnage'];
    var cost = rowObject['cost'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editFreight('"
        + c_id + "','"
        + c_name + "','"
        + c_mnc + "','"
        + tonnage + "','"
        + cost
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteFreight("+c_id+")'>移除</button>";
}
//编辑
function editFreight(c_id,c_name,c_mnc,tonnage,cost) {
    type=2;
     $("#name").val(c_mnc);
    $("#tonnage").val(tonnage);
    $("#cost").val(cost);
    $("#hideId").val(c_id);

}
function initButtonClick() {
    $("#searBtn").on("click",function () {
        queryFreightData();
    });
    $("#addBtn").on("click",function () {
        type = 1;
        $("#validate input[type='text']").val("");
    });
    //新增user
    $("#submitBut").on("click",function () {
        var $form = $('#validate');
        if(!$form.valid()){
            return false;
        }
        var tonnage = $("#tonnage").val();
        var cost  = $("#cost").val();
        var url = type==1?path+"addFreight":path+"editFreight";
        var text = $("#name option:selected").text();
        $.post(url,{name:text,mnc:$.trim($("#name").val()),tonnage:tonnage,cost:cost,model:model
                ,id:type==1?0:$("#hideId").val()},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo("操作成功！",true);
                }else if (result == -1){
                    showResultInfo("信息已经存在！",false);
                }else{
                    showResultInfo("操作失败！",false);
                }
            });
    });
}
//移除
function deleteFreight(id) {
    $("#deleteBut").on("click",function () {
        $.post(path+"deleteCommon",{id:id,model:model},function (data) {
            $('#modalDelete').trigger('click');
            if(data==1){
                showResultInfo("操作成功！",true);
            }else{
                showResultInfo("操作失败！",false);
            }
        });
    })
}
//操作结果
function showResultInfo(message,isFlush) {
    $("#wordsMessage").html(isFlush?'<span style="font-size:20px"><i class="fa fa-check">&nbsp;<strong>'+message+'</strong></i></span>':
    '<span style="font-size:25px"><i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i></span>');
    $('#resultBut').trigger('click');
    $("#myResult").on('click',function () {
        if(isFlush){
            queryFreightData();
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
