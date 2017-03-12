/**
 * Created by zj on 2016/10/25
 */
var type =1;
$(function () {
    $("body").ledo();

    //初始化访问人数和访问量
    initVisitorsAndViews();

    //初始化时间下拉框，平台、渠道、区服、国家
    initSearchCondition(true,{"begin":"none","end":"none","server":"none","country": "none"});
    getMenuTables();
    $("#searchBtn").click(function () {
        getMenuTables();
    });
    initFormValid();
    butClickInit();
});

function getMenuTables() {
    var url = "get_server_table";
    var aoColumns = [
        {"sTitle": server, "mData": "serverId"},
        {"sTitle": serverName, "mData": "serverName"},
        {"sTitle": plat, "mData": "platName"},
        {"sTitle": channel, "mData": "channelName"},
        {"sTitle": serverIP, "mData": "serverIp"},
        {"sTitle": operator, "mData": "serverId", "mRender": function(data, type, row) {return operateButton(data, type, row);}}];
    var params =[{name: 'plat',  value: $.trim($("#all_plat").val())},
        {name: 'channel', value: $.trim($("#all_channel").val())},
        {name: 'server', value: $.trim($("#server_name").val())}];
    playLoading("serverData");
    commonDataTables("serverDataTables", url, aoColumns, params,"serverData");
    $("div[class='pace-done']").css("padding-right","0px");
}
function operateButton(cellvalue, options, rowObject) {
    var serverName = rowObject['serverName'];
    var serverId = rowObject['serverId'];
    var platId = rowObject['platId'];
    var channelId = rowObject['channelId'];
    var relationId = rowObject['relationId'];
    var serverIp = rowObject['serverIp'];
    var channelName = rowObject['channelName'];
    var editBtn = "<button type='button' class='btn btn-primary btn-small' data-toggle='modal' data-target='#myModal' id='editorServer' onclick=\"editMenu('"
        + serverId + "','"
        + serverIp + "','"
        + platId + "','"
        + channelId + "','"
        + serverName + "','"
        + relationId
        + "')\">"+editor+"</button>";
    var deleteBtn = "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#modalDelete' onclick=\"deleteMenu('"
        + serverId+ "','"
        + relationId+ "')"
        + "\">"+deleteTis+"</button>";
    return editBtn + deleteBtn;
}
//编辑区服信息时 平台渠道联动
function findChannel(channels){
    var platName = $("#plat option:selected").text();
    $('#channel optgroup').remove();
    $('#channel option').remove();
    var temp = "";
    $.goAjax("post",'getChannelFormPlat',{platName:platName}, function (result) {
        $.each(result,function(key,value){
            temp = temp+"<option value="+value.channelId+">"+value.channelName+"</option>";
        });
        $('#channel').append("<optgroup label='"+platName+"'>"+temp+"</optgroup>");
        if(channels!=null && channels!=""){ //用于编辑的时候
            $("#channel option").attr("selected",false);
            $.each(channels.split(","),function(key,v) {
                $("#channel option[value='"+v+"']").attr("selected","selected");
            });
            $("#channel").select2({
                width:"80%",
                dropdownAutoWidth:true
            });
        }
    });
}
function butClickInit() {
    $("#addServer").on("click",function () {
        type = 1;
    });
    $("#submitBut").on("click",function () {
        var $form = $('#validate');
        if(!$form.valid()){
            return false;
        }
        if($("#channel").val()==""){
            $("label[for='channel']").parent().attr("class","form-group has-error");
            $("#channel").after('<label id="channel-error" class="help-block" for="channel">Please select something.</label>');
            return false;
        }else{
            $("label[for='channel']").parent().attr("class","form-group");
            $("#channel-error").hide();
        }
        var url = type==1?"insert_server":"update_server";
        $.goAjax("POST",url,{server:$.trim($("#serverId").val()),serverName:$.trim($("#serverName").val()),plat:$.trim($("#plat").val()),
                channels:$.trim($("#channel").val()),serverIp:$.trim($("#serverIp").val()),serverOldId:$.trim($("#serverId_old").val())},
            function(result){
                $('#myModal').trigger('click');
                if (result > 0) {
                    showResultInfo(operatorSuccess,true);
                }else if (result == -1){
                    showResultInfo(serverAlready,false);
                }else{
                    showResultInfo(operatorFail,false);
                }
            });
    });
}
function editMenu(serverId,serverIp, platId,channelId,serverName,relationId) {
    type=2;
    $("#serverId").val(serverId);
    $("#serverIp").val(serverIp);
    $("#serverId_old").val(serverId);
    $("#serverName").val(serverName);
    $("#plat").val(platId);
    $("#relationId").val(relationId);
    findChannel(channelId);
}
function deleteMenu(serverId,relationId) {
    $("#deleteBut").on("click",function () {
        $.goAjax("POST","delete_server",{'server':serverId},function(result){
            $('#modalDelete').trigger('click');
            if(result==1){
                showResultInfo(operatorSuccess,true);
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
    $('#resultBut').trigger('click');
    $("#myResult").on('click',function () {
        if(isFlush){
            getMenuTables();
        }
    });
}
//form表单提交 格式规则校验
function initFormValid() {
    //添加ip验证规则
    jQuery.validator.addMethod("isIP",function (value,element) {
        return this.optional(element) || /^\d+\.\d+\.\d+\.\d+$/.test(value);
    },"Please enter a valid IP address.");
    $("#validate").validate({
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
            isIP: {
                required: true,
                isIP: true
            },
            number: {
                required: true,
                number: true
            },
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
//渠道选择校验 select2 格式自定义一下
function validValues() {
    var $selectChoice = $(".select2-search-choice");
    var $channelError = $("#channel-error");
    if($selectChoice && $selectChoice.html()!=""){
        $channelError.closest('.form-group').removeClass('has-error');
        $channelError.remove();
    }else {
        $channelError.closest('.form-group').removeClass('has-success').addClass('has-error');
    }
}