/**
 * 福利账号配置
 * 
 * Created by machaozhe on 2016-11-29.
 * 
 */
$(function () {
    $("body").ledo();

    //初始化访问人数和访问量
    initVisitorsAndViews();

    //详情导出excel绑定函数
    // $("#pnl .fa-download").parent().on("click",function(){
    //     exportExcelData();
    // });

    //详情导出excel模板
    $("#dyn_2 .fa-download").parent().on("click",function(){
        exportExcelTemplate();
    });
    //增加tips
    $('#dyn_2 .fa-download').addClass("tip").attr("title","下载上传模板");
    $(".tip").tooltip ({placement: 'top', container: 'body'});

    //初始化开关
    $('[type="checkbox"]').each(function(){
        $(this).bootstrapSwitch();
        status  = $(this).attr("status");
        if(status==1){
            $(this).bootstrapSwitch('state',true);
        }else{
            $(this).bootstrapSwitch('state',false);
        }
    });

    //开关的switch change
    $('[type="checkbox"]').on('switchChange.bootstrapSwitch',function(e,data){
        status = $(this).bootstrapSwitch('state')==false?0:1;

        $(this).bootstrapSwitch('toggleState',true);
        var msg ="关闭";
        if(status==1){
            msg ="开启";
        }else{
            msg ="关闭";
        }
        updateStatus(msg,status);
    });

    //更新福利账号状态
    function updateStatus(msg,status){
        swal({
                title:msg+"福利号筛选开关?",
                type:"warning",
                showCancelButton:true,
                confirmButtonClass:"btn-danger",
                confirmButtonText:msg,
                cancelButtonText:"取消",
                closeOnConfirm:false
            },
            function (isConfirm) {
                if(isConfirm){
                    $.goAjax("post","update_bonus_status",{"status":status},
                        //请求成功后的处理方法
                        function (records) {
                            if(records==1){
                                swal("success",msg+"成功","success");
                                $("#bonus_switch").bootstrapSwitch('toggleState',true);
                                searchData();
                            }
                            else{
                                swal("fail",msg+"失败","error");
                            }
                        }
                    );
                }else{
                    swal("success","取消成功","success")
                }
            })
    };

    //文件上传
    $("#file_upload").fileinput({
        language:'zh',
        uploadUrl:"upload_bonus_excel",
        maxFileCount:1,
        autoReplace:true,
        allowedFileExtensions:["xls","xlsx"],
        maxFileSize:1024,  //文件大小为1M
        dropZoneEnabled:false,
        browseLabel:"选择Excel文件"
    }).on("fileuploaded",function (e,data) {
        var msg = "<br/><br/><strong style='color:green'>新增:"+data.response.resInfo.addNum+"</strong><br/><br/>"+
                  "<strong style='color:yellowgreen'>重复:"+data.response.resInfo.repeatNum+"</strong><br/><br/>"+
                  "<strong style='color:red'>错误(角色id格式错误(为空或者不是数字)):"+data.response.resInfo.errNum+"</strong><br/><br/>"+
                  "<strong style='color:green'>现有福利账号:"+data.response.resInfo.totalNum+"</strong><br/><br/>";
        showResultInfo(msg,true);

    });
    $("#file_upload").on("fileerror",function (event,data,msg) {
        var errorTip = "<strong style='color:red'>上传失败,请联系管理员!</strong><br/>";
        showResultInfo(errorTip,false);
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
 * 查询详细数据
 */
function queryDetailedData() {
    //table显示的列名
    var aoColumns = [
        { "sTitle": "角色id", "mData": "id"},
        { "sTitle": "角色名", "mData": "name"},
        { "sTitle":  "操作", "mData": "id", "mRender": function(data, type, row) {return operateButton(data, type, row);}}
    ];
    //参数
    var params = [
        {name: 'type',   value:$.trim($("#id_input").val())}];
    playLoading("bonusData");
    var url = 'print_bonus_table';
    commonDataTables("dataTables", url, aoColumns, params,"bonusData");
}

/**
 * 操作按钮（删除）
 * @param cellvalue
 * @param options
 * @param rowObject
 * @returns {string}
 */
function operateButton(cellvalue, options, rowObject) {
    var type = rowObject['id'];
    var deleteBtn = "<button type='button' class='btn btn-danger btn-small' data-toggle='modal' data-target='#deleteModal' onclick=\"deleteBonusRole('"
        + type
        + "')\">"+"删除"+"</button>";
    return deleteBtn;
}


/**
 * 删除福利账号操作
 * @param serverId
 * @param relationId
 */
function deleteBonusRole(type) {
    $("#deleteBtn").on("click",function () {
        $.goAjax("POST","delete_bonus_role",{"type":type},function(result){
            $('#deleteModal').trigger('click');
            if(result==1){
                showResultInfo("<strong style='color:green'>删除成功</strong>",true);
            }else if(result==-1){
                showResultInfo("<strong style='color:green'>福利账号已删除!</strong>",true);
            }
            else{
                showResultInfo("<strong style='color:red'>删除失败!</strong>",false);
            }
        });
    });
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
 * 导出福利账号Excel数据
 */
function exportExcelData() {

}


/**
 * 导出福利账号Excel模板
 */
function exportExcelTemplate() {
    var url = 'download_bonus_template';
    location.href=url;
}