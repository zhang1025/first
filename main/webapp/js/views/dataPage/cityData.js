/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/common/";
var type=1;
$(document).ready(function() {
    $("body").ledo();
    queryCityData();
    initButtonClick();
});
function queryCityData() {
    var aoColumns = dealTableTitle();
    var c_name = $("#c_name").val();
    var c_mnc = $("#c_mnc").val();
    var params = [
        {name: 'name', value: c_name},
        {name: 'mnc', value: c_mnc}
    ];
    var url = path+ 'get_city_table';
    playLoading("cityData");
    commonDataTables("cityDataTables", url, aoColumns, params,"cityData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns .push(
        {"sTitle": "城市名称", "mData": "name"},
        {"sTitle": "城市简记符", "mData": "mnc"},
        {"sTitle": "操作", "mData": "id", "mRender": function(data, type, row) {return operateButton(data, type, row);}});
    return	aoColumns;
}
function operateButton(cellvalue, options, rowObject) {
    var c_id = rowObject['id'];
    var c_name = rowObject['name'];
    var c_mnc = rowObject['mnc'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editCity('"
        + c_id + "','"
        + c_name + "','"
        + c_mnc
        + "')\">编辑</button>";
    return editBtn + "&ensp;<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete'  onclick='deleteCity("+c_id+")'>移除</button>";
}
//编辑
function editCity(c_id,c_name,c_mnc) {
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
    });
    //新增user
    $("#submitBut").on("click",function () {
        var $form = $('#validate');
        if(!$form.valid()){
            return false;
        }
        var url = type==1?path+"addCity":path+"editCity";
        $.post(url,{name:$.trim($("#name").val()),mnc:$.trim($("#mnc").val())
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
function deleteCity(id) {
    $("#deleteBut").on("click",function () {
        $.post(path+"deleteCity",{id:id},function (data) {
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
            queryCityData();
        }
    });
}
