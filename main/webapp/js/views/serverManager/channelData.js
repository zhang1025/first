/**
 * Created by zj on 2016/10/25
 */
var channelType =1;
$(function () {
    $("body").lydata();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    //初始化时间下拉框，平台、渠道、区服、国家
    initSearchCondition(true,{"begin":"none","end":"none","channel":"none","server":"none","country": "none"});
    getChannelMenuTables();
    $("#searchBtn").click(function () {
        getChannelMenuTables();
    });
    $(".tip").tooltip ({placement: 'top', container: 'body'});
    initFormValid();
    butChannelClickInit();
});

function getChannelMenuTables() {
    var url = "get_channel_table";
    var aoColumns = [
        {"sTitle": channelId, "mData": "channelId"},
        {"sTitle": channelName, "mData": "channelName"},
        {"sTitle": plat, "mData": "platId"},
        {"sTitle": platName, "mData": "platName"},
        {"sTitle": operator, "mData": "serverId", "mRender": function(data, type, row) {return operateChannelButton(data, type, row);}}];
    var params =[{name: 'plat',  value: $.trim($("#all_plat").val())},
        {name: 'channel', value: $.trim($("#channelId").val())}];
    playLoading("channelData");
    commonDataTables("channelDataTables", url, aoColumns, params,"channelData");
}
function operateChannelButton(cellvalue, options, rowObject) {
    var channelId = rowObject['channelId'];
    var channelName = rowObject['channelName'];
    var platId = rowObject['platId'];
    var platName = rowObject['platName'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editChannelMenu('"
        + channelId + "','"
        + channelName + "','"
        + platId + "','"
        + platName
        + "')\">"+editor+"</button>";
    var deleteBtn = "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete' onclick=\"deleteChannelMenu('"
        + channelId+ "','"
        + platId+ "')"
        + "\">"+deleteTis+"</button>";
    return editBtn + "&ensp;" + deleteBtn;
}

function editChannelMenu(channelId,channelName, platId,platName) {
    channelType=2;
    $("#channel_id").val(channelId);
    $("#channelOldId").val(channelId);
    $("#channel_name").val(channelName);
    $("#plat option[value='"+platId+"']").attr("selected",true);
    $("#platOldId").val(platId);
}
//删除操作
function deleteChannelMenu(channelId,platId) {
    $("#deleteChannelBut").on("click",function () {
        $.goAjax("POST","delete_channel",{channelId:channelId,plat:platId},function(result){
            $('#modalDelete').trigger('click');
            if(result > 0){
                showResultInfo(operatorSuccess,true);
            }else{
                showResultInfo(operatorFail,false);
            }
        });
    });
}

function butChannelClickInit() {
    $("#addChannel").on("click",function () {
       channelType = 1;
    });
    $("#submitChannelBut").on("click",function () {
        var $form = $('#validateChannel');
        if(!$form.valid()){
            return false;
        }
        var url = channelType==1?"insert_channel":"update_channel";
        $.goAjax("POST",url,{channel:$.trim($("#channel_id").val()),channelName:$.trim($("#channel_name").val()),plat:$.trim($("#plat").val()),
                channelOldId:$.trim($("#channelOldId").val()),platOldId:$.trim($("#platOldId").val())},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo(operatorSuccess,true);
                }else if (result == -1){
                    showResultInfo(channelAlready,false);
                }else{
                    showResultInfo(operatorFail,false);
                }
            });
    });
}

//操作结果
function showResultInfo(message,isFlush) {
    $("#resultMessage").html(isFlush?'<i class="fa fa-check">&nbsp;<strong>'+message+'</strong></i>':
    '<i class="glyphicon glyphicon-warning-sign">&nbsp;<strong>'+message+'</strong></i>');
    $('#resultChannelBut').trigger('click');
    $("#myResult").on('click',function () {
        if(isFlush){
            getChannelMenuTables();
        }
    });
}
//form表单提交 格式规则校验
function initFormValid() {
    $("#validateChannel").validate({
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
            select2: "required",
            serverInfo: "required"
        },
        messages: {
            select2: "Please select something",
            serverInfo: "This field is required."
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
