/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/system/";
var type=1;
$(document).ready(function() {
    $("body").ledo();
    queryUserData();
    initButtonClick();
    //initFormValid();
});
function queryUserData() {
    var aoColumns = dealTableTitle();
    var username = $("#username").val();
    var roleId = $("#roleParam").val();
    var params = [
        {name: 'account', value: username},
        {name: 'roleId', value: roleId}
    ];
    var url = path+ 'get_users_table';
    playLoading("userData");
    commonDataTables("userDataTables", url, aoColumns, params,"userData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "用户名", "mData": "account"},
        {"sTitle": "密码", "mData": "pw"},
        {"sTitle": "所属角色", "mData": "roleName"},
        {"sTitle": "所属部门", "mData": "department"},
        {"sTitle": "操作", "mData": "id", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['id'];
    var account = rowObject['account'];
    var pw = rowObject['pw'];
    var roleId = rowObject['roleId'];
    var department = rowObject['department'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editUser('"
        + account + "','"
        + id + "','"
        + pw + "','"
        + roleId + "','"
        + department
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteUser("+id+")'>移除</button>";
}
//编辑
function editUser(account,id,pw,roleId,department) {
    type=2;
    $("#account").val(account);
    $("#pw").val(pw);
    $("#role option[value='"+roleId+"']").attr("selected","selected");
    $("#department").val(department);
    $("#userId").val(id);

}
function initButtonClick() {
    $("#searBtn").on("click",function () {
        queryUserData();
    });
    $("#addBtn").on("click",function () {
        type = 1;
    });
    //新增user
    $("#submitBut").on("click",function () {
        var $form = $('#validate');
        if(!$form.valid()){
            return false;
        }
        var url = type==1?path+"addUser":path+"editUser";
        $.post(url,{account:$.trim($("#account").val()),pw:$.trim($("#pw").val())
                ,roleId:$.trim($("#role").val()),department:$("#department").val(),id:type==1?0:$("#userId").val()},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo("操作成功！",true);
                }else if (result == -1){
                    showResultInfo("该用户已经存在！",false);
                }else{
                    showResultInfo("操作失败！",false);
                }
            });
    });
}
//移除
function deleteUser(id) {
    $("#deleteBut").on("click",function () {
        $.post(path+"deleteUser",{id:id},function (data) {
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
    $("#wordsMessage").html(isFlush?'<i class="fa fa-check">&nbsp;<strong>'+message+'</strong></i>':
    '<i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i>');
    $('#resultBut').trigger('click');
    $("#myResult").on('click',function () {
        if(isFlush){
            queryUserData();
        }
    });
}
//form表单提交 格式规则校验
function initFormValid() {
    $("form[role='form']").validate({
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
        rules: {
            word: "required",
            file: "required"
        },
        messages: {
            word: "This field is required."
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