$(function(){

    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    //初始化平台、渠道、区服、国家
    initSearchCondition(true,{"plat":"none","channel":"none","server":"none","range":""});

    ////初始化日期
    //var now = new Date();
    //$("#begin-date").val($.format.date(now.getTime()-24*60*60*1000,"yyyy-MM-dd"));
    //$("#end-date").val($.format.date(now.getTime()-24*60*60*1000,"yyyy-MM-dd"));
    //初始化时间
    initDateRangePicker();


    $('.form_datetime').datepicker({
        format: 'yyyymmdd',
        weekStart: 1,
        endDate: '-1d',
        autoclose: true,
        startDate:"-6m",
        language: 'zh-CN',
        inline:true
    });

    //$("#begin-date").val($.format.date(now.getTime()-24*60*60*1000,"yyyyMMdd"));
    //$("#end-date").val($.format.date(now.getTime()-24*60*60*1000,"yyyyMMdd"));
    $("#hiveTable_select").select2();

    $("#TypeTableBox").css("display","none");
    $("#HiveTableBox").css("display","none");
    $("#check_error").css("display","none");
    var desc = $("#show_desc").text();
    var hiveSql="";
    var maxNum = $.trim($("#maxSize_select").val());
    $("#hiveTable_select").change(function(){
        var aoColumns = [
            { "sTitle": "字段名称", "mData": "field"},
            { "sTitle": "字段类型", "mData": "type"}
        ];
        var params = [
            {name: 'hiveSql', value: "DESCRIBE "+selected_option,maxsize: 0,begin:"0",end:"0"},
            {name: 'maxsize', value: 0},
            {name: 'begin', value: "0"},
            {name: 'end', value: "0"}];
        var url = 'searchDivHive';
        //var loading = new ol.loading({id:"typeTable"});
        var so = $(this).val();
        var selected_option = $.trim(so);
        var selected_text = $(this).find("option:selected").text();
        var maxSize = $.trim($("#maxSize_select").val());
        var aoColumns = [
            { "sTitle": "字段名称", "mData": "field"},
            { "sTitle": "字段类型", "mData": "type"}
        ];
        var params = [
            {name: 'hiveSql', value: "DESCRIBE "+selected_option},
            {name: 'maxsize', value: 0},
            {name: 'begin', value: "0"},
            {name: 'end', value: "0"}];
        var url = 'searchHive';
        if(selected_option != ""){
            $("#TypeTableBox").css("display","");
            $("#show_desc").text(selected_text+" "+desc);
            //loading.show();
            //$.post('search_hive', {hive: "DESCRIBE "+selected_option,maxsize: "0",begin:$("#begin-date").val(),end:$("#end-date").val()}, function (result) {
            //    $("#typeTable").html(result);
            //    //loading.hide();
            //});
            queryDataTables(params, aoColumns, url);
        }
    })

});
var maxNum ;
var monthRange = 6;
var hiveSql ;
$("#searchBtn").click(function () {
    //防止重复提交
    //var loading = new ol.loading({id:"hiveTable"});
    var hiveVal = $("#hiveText").val();
    hiveSql = $.trim(hiveVal);
    if(checkSql()==false)
        return;
    var maxSize = $.trim($("#maxSize_select").val());
    maxNum = maxSize;
    if (hiveVal!="" && hiveVal.length > 0) {
        //查询时关闭导出功能
        $("#hive_export_desc").css("display","none");
        $('#searchBtn').button('loading');
        //loading.show();
        $("#HiveTableBox").css("display","");
        var dateRange = $("input[name='date-range']").val().split("to");
        var begin = getDate($.trim(dateRange[0]));
        var end = getDate($.trim(dateRange[1]));
        $.post('search_hive', {hive: hiveVal,maxsize: maxSize,begin:begin,end:end}, function (result) {
            $("#hiveTable").html(result);
            $('#searchBtn').button('reset');
            //loading.hide();
            $("#check_error").css("display","none");
            //根据result的开头数据，判断是否为有效数据,选择是否打开"导出"功能
            if(result.indexOf("<table") == 0)
                $("#hive_export_desc").css("display","");
        });

    }
});
$("#showTableBtn").click(function () {
    //防止重复提交
    $('#showTableBtn').button('loading');
    var hiveVal = "show tables";
    $("#HiveTableBox").css("display","");
    $.post('search_hive', {hive: hiveVal}, function (result) {
        $("#hiveTable").html(result);
        $('#showTableBtn').button('reset');
    });
});

$("#clearBtn").click(function () {
    $("#hiveText").val("");
    $("#check_error").css("display","none");
});


$("#panel_1 .fa-download").parent().on("click",function(){
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = getDate($.trim(dateRange[0]));
    var end = getDate($.trim(dateRange[1]));
    hiveSql = hiveSql.replace("；",";").replaceAll("logout","LOGOUT");
    var param = "hiveSql="+hiveSql+"&"+"maxSize="+maxNum+"&begin="+begin+"&end="+end;
    location.href = 'export_hive_excel?'+param;
});

//$("#export_hive").click(function()
//{
//    alert("export_hive");
//    hiveSql = hiveSql.replace("；",";").replaceAll("logout","LOGOUT");
//    var param = "hiveSql="+hiveSql+"&"+"maxSize="+maxNum+"&begin="+$("#begin-date").val()+"&end="+$("#end-date").val();
//    location.href = 'export_hive_excel?'+param;
//});
$("#checkBtn").click(checkSql);

//hive语句检测
function checkSql()
{
    var c_sql = $("#hiveText").val().toLowerCase();
    if($.trim(c_sql).indexOf("select")==-1)
    {
        $("#check_error").css("display","");
        $("#check_error").text("(error:请以select开头)");
        return false;
    }
    if($.trim(c_sql).indexOf("from")<0)
    {
        $("#check_error").css("display","");
        $("#check_error").text("(error:缺少from)");
        return false;
    }
    $("#check_error").css("display","none");
}


function getDate(strDate){
    var st = strDate;
    var a = st.split(" ");
    var b = a[0].split("-");
    var c = b[0]+b[1]+b[2];
    return c;
}

function queryDataTables(list, aoColumns,url) {
    //最后一个参数是loading遮盖id
    commonDataTablesWithLength("dataTables", url, aoColumns, list,"dataTables");
}


/**
 * 用原型法添加字符串类型的replaceAll方法
 */
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2);
}
