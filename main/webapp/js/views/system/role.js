/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/system/";
var roleType =1;
$(document).ready(function() {
    $("body").ledo();
    queryRoleData();
    initButtonClick();
    //initFormValid();
    //绑定权限操作
    $("#bindPermission_imgId").click(function() {
        bindPermissionUpdate($("#unbindPermission_selectId").val());
    });

    $("#unbindPermission_imgId").click(function() {
        unbindPermissionUpdate($("#bindPermission_selectId").val());
    });
});
function queryRoleData() {
    var aoColumns = dealTableTitle();
    var roleId = $("#roleParam").val();
    var params = [
        {name: 'roleId', value: roleId}
    ];
    var url = path+'get_roles_table';
    playLoading("roleData");
    commonDataTablesWW("roleDataTables", url, aoColumns, params,"roleData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "角色名称", "mData": "roleName", "sWidth": "20%"},
        {"sTitle": "角色描述", "mData": "described", "sWidth": "30%"},
        {"sTitle": "操作", "mData": "id", "sWidth": "40%", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var id = rowObject['roleId'];
    var desc = rowObject['described'];
    var roleName = rowObject['roleName'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModalRole' onclick=\"editRole('"
        + desc + "','"
        + roleName
        + "')\">编辑</button>";
    var delBtn = "<button type='button' class='btn btn-danger btn-small'  onclick='deleteRole("+id+")'>移除</button>";
    var bindBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModalBind'  onclick=\"bindRole('"
        + roleName + "','"
        + id
        + "')\">绑定权限</button>";
    return editBtn + "&ensp;"+delBtn+"&ensp;"+bindBtn;
}

//编辑
function editRole(desc,roleName) {
    roleType=2;
    $("#roleName").val(roleName);
    $("#desc").val(desc);
}
//绑定
function bindRole(roleName,id) {
    $("#bindRoleId").val(id);
    $("#bindRoleName").html(roleName);
    $("#bindPermission_selectId").empty();


    $.post(path+"getBindPermission",{roleId:id},function(data){
        $.each(data,function (i,item) {
            $("#bindPermission_selectId").append("<option value='"+item.permissionId+"'>"+item.resourceName+"</option>");
        })
    });

    $("#unbindPermission_selectId").empty();
    $.post(path+"getUnbindPermission",{roleId:id},function(data){
        $.each(data,function (i,item) {
            $("#unbindPermission_selectId").append("<option value='"+item.permissionId+"'>"+item.resourceName+"</option>");
        })
    });
}

function initButtonClick() {
    $("#searBtn").on("click",function () {
        queryRoleData();
    });
    $("#addBtn").on("click",function () {
        roleType = 1;
    });
    //新增role
    $("#submitBut").on("click",function () {
        var $form = $('#validate');
        if(!$form.valid()){
            return false;
        }
        var url = roleType==1?path+"addRole":path+"editRole";
        $.post(url,{roleName:$.trim($("#roleName").val())
                ,described:$.trim($("#desc").val())},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    swal("成功","操作成功！","success");
                    queryRoleData();
                }else if (result == -1){
                    swal("失败","该角色已经存在","error");
                }else{
                    swal("失败","删除失败","error");
                }
            });
    });
}
//移除
function deleteRole(id) {
    swal({title:"提示",
        text:"是否删除？",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"取消",
        confirmButtonClass:"btn-info",
        confirmButtonText:"确定",
        closeOnConfirm:false//不设置这个，直接关闭提示框，没法显示后面成功的提示
    },function(){
        $.post(path+"deleteRole",{id:id},function (data) {
            if(data==1){
                swal("成功","删除成功！","success");
                queryRoleData();
            }else{
                swal("失败","删除失败","error");
            }
        });
    });
}


function bindPermissionUpdate(_permissionIds) {
    if (_permissionIds == null || _permissionIds.length == 0) {
        swal("失败","请选择权限","error");
        return;
    }

    $.ajax({
        url : path+"bind_permissions",
        data : {
            'roleId' : $("#bindRoleId").val(),
            'permissionIds' : _permissionIds.toString()
        },
        dataType : 'html',
        type : 'POST',
        async : true,
        success : function(response) {
            if (response > 0) {
                $("#myModalBind").trigger("click");
                swal("成功","操作成功","success");
            } else {
                swal("失败","操作失败","error");
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            swal("失败","操作失败,请稍后重试","error");
            return false;
        }
    });
}

function unbindPermissionUpdate(_permissionIds) {
    if (_permissionIds == null || _permissionIds.length == 0) {
        swal("失败","请选择权限","error");
        return;
    }

    $.ajax({
        url : path+"unbind_permissions",
        data : {
            'roleId' : $("#bindRoleId").val(),
            'permissionIds' : _permissionIds.toString()
        },
        dataType : 'html',
        type : 'POST',
        async : true,
        success : function(response) {
            if (response > 0) {
                $("#myModalBind").trigger("click");
                swal("成功","操作成功","success");
            } else {
                swal("失败","操作失败","error");
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
            swal("失败","操作失败,请稍后重试","error");
            return false;
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
