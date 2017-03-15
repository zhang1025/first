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
});
function queryFreightData() {
    var aoColumns = dealTableTitle();
    var params = [
        {name: 'model', value: model}
    ];
    var url = path+ 'get_common_table';
    commonDataTables(model+"DataTables", url, aoColumns, params,model+"Data");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "煤炭名称", "mData": "name"},
        {"sTitle": "煤炭简记符", "mData": "mnc"},
        {"sTitle": "煤炭种类", "mData": "type"},
        {"sTitle": "操作", "mData": "id", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var c_id = rowObject['id'];
    var c_name = rowObject['name'];
    var c_mnc = rowObject['mnc'];
    var c_type = rowObject['type'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editFreight('"
        + c_id + "','"
        + c_name + "','"
        + c_mnc + "','"
        + c_type 
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteFreight("+c_id+")'>移除</button>";
}
//编辑
function editFreight(c_id,c_name,c_mnc,c_type) {
    type=2;
    $("#name").val(c_name);
     $("#mnc").val(c_mnc);
      $("#type").val(c_type);
    $("#hideId").val(c_id);

}
function initButtonClick() {
    $("#searBtn").on("click",function () {
        queryFreightData();
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
        var url = type==1?path+"addCoal":path+"editCoal";
        var name = $.trim($("#name").val());
        $.post(url,{name:name,mnc:$.trim($("#mnc").val()),type:$.trim($("#type").val()),model:model
                ,id:type==1?0:$("#hideId").val()},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo("操作成功！",true);
                }else if (result == -1){
                    showResultInfo("name="+name+" 已经存在！",false);
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
