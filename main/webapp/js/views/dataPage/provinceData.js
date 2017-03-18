/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/common/";
var type=1;
var model="province";
$(document).ready(function() {
    $("body").ledo();
    queryCityData();
    initButtonClick();
});
function queryCityData() {
    var aoColumns = dealTableTitle();
    var name = $("#s_name").val();
    var params = [
        {name: 'model', value: model},
        {name: 'name', value: name}
    ];
    var url = path+ 'get_common_table';
    commonDataTables(model+"DataTables", url, aoColumns, params,model+"Data");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "序号", "mData": "id","sWidth":"10%"},
        {"sTitle": "省份名称", "mData": "name","sWidth":"30%"},
        {"sTitle": "省份简记符", "mData": "mnc","sWidth":"20%"},
        {"sTitle": "操作", "mData": "id","sWidth":"20%", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var c_id = rowObject['id'];
    var c_name = rowObject['name'];
    var c_mnc = rowObject['mnc'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editProvince('"
        + c_id + "','"
        + c_name + "','"
        + c_mnc
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteProvince("+c_id+")'>移除</button>";
}
//编辑
function editProvince(c_id,c_name,c_mnc) {
    type=2;
    $("#name").val(c_name);
    $("#mnc").val(c_mnc);
    $("#hideId").val(c_id);

}
function initButtonClick() {
    $("#searBtn").on("click",function () {
        queryCityData();
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
        var url = type==1?path+"addModeOne":path+"editModeOne";
        var name = $.trim($("#name").val());
        $.post(url,{name:name,mnc:$.trim($("#mnc").val()),model:model
                ,id:type==1?0:$("#hideId").val()},
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
function deleteProvince(id) {
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
    '<span style="font-size:20px"><i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i></span>');
    $('#resultBut').trigger('click');
    $("#myResult").on('click',function () {
        if(isFlush){
            queryCityData();
        }
    });
}
