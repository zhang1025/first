/**
 * Created by lixiaozhu on 2015/4/5.
 */
$(function () {
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"country": "","range":""})
    }else{
        initSearchCondition(true,{"range":""})
    }
    //初始化时间
    initDateRangePicker();


    //$(".btn-group .btn").click(function() {
    //    $(".btn-group .active").attr("class", "btn");
    //    $(this).attr("class","btn active");
    //    //$("#new-player-tabs .active").trigger("click");click
    //});

    $('#line-tabs a').click(function (e) {
        $(this).parent().addClass('active').siblings().removeClass('active');
        var id = $(this).attr("href");
        $(id).addClass('active in').siblings().removeClass('active in');
    });

    $("[chart='line-chart-login-users']").click(function() {
        queryDataUser($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    $("[chart='line-chart-new-users']").click(function() {
        queryDataNew($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    $("[chart='line-chart-avg-online-time']").click(function() {
        queryAvgData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    $("[chart='line-chart-avg-online-times']").click(function() {
        queryAvgDataNew($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
        exportExcelData();
    });


    $("#searchBtn").click(searchData);
    searchData();
    queryRetainedData();

});
function searchData(){
    $('#searchBtn').button('loading');
    $("#line-tabs .active").trigger("click");
    queryRetainedData();
    $('#searchBtn').button('reset');
}

function queryDataNew(path, chart_id, line) {
    playLoadingWithoutTime(chart_id);
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    var bili = new Array();
    var i = 0;
    var tmp;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            + $("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\"}"
        },
        "success": function (records) {
            $.each(records.dataAll,function(i,item){
                tmp = (records.dataEffective[i]/records.dataAll[i]);
                tmp = parseInt(tmp*10000);
                var  obj = new Object();
                obj.y = records.dataEffective[i];
                obj.zb = (tmp/100).toFixed(2)+"%";
                bili[i] = obj;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLineForExtra(chart_id,"", "",x_labels,"","占  比：","",[{
                name:"全部新增",
                data:records.dataAll
            },{
                name:"有效新增",
                data:bili
            }]);
            //重置查询按钮
            hideLoading(chart_id) ;
            $('#searchBtn').button('reset');
        }
    });
};


function queryDataUser(path, chart_id, line) {
    //创建遮罩层对象，参数id传入想要遮罩住的dom id
    playLoadingWithoutTime(chart_id);
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var url=path;
    var bili = new Array();
    var i = 0;
    var tmp;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            + $("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\"}"
        },
        "success": function (records) {
            $.each(records.dataAll,function(i,item){
                tmp = (records.dataEffective[i]/records.dataAll[i]);
                tmp = parseInt(tmp*10000);
                var  obj = new Object();
                obj.y = records.dataEffective[i];
                obj.zb = (tmp/100).toFixed(2)+"%";
                bili[i] = obj;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLineForExtra(chart_id,"", "",x_labels,"","占  比：","",[{
                name:"全部玩家",
                data:records.dataAll
            },{
                name:"有效玩家",
                data:bili
            }]);
            //重置查询按钮
            hideLoading(chart_id) ;
            $('#searchBtn').button('reset');
        }
    });

};



function queryAvgData(path, chart_id, line) {
    playLoadingWithoutTime(chart_id);
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    var bili = new Array();
    var i = 0;
    var tmp;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            + $("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\"}"
        },
        "success": function (records) {
            $.each(records.dataAll,function(i,item){
                tmp = (records.dataEffective[i]/records.dataAll[i]);
                tmp = parseInt(tmp*10000);
                var  obj = new Object();
                obj.y = records.dataEffective[i];
                obj.zb = (tmp/100).toFixed(2)+"%";
                bili[i] = obj;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLineForExtra(chart_id,"", "",x_labels,"","占  比：","",[{
                name:"全部玩家平均在线时长",
                data:records.dataAll
            },{
                name:"有效玩家平均在线时长",
                data:bili
            }]);
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    });
};


function queryAvgDataNew(path, chart_id, line) {
    playLoadingWithoutTime(chart_id);
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    var bili = new Array();
    var i = 0;
    var tmp;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            + $("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\"}"
        },
        "success": function (records) {
            $.each(records.dataAll,function(i,item){
                tmp = (records.dataEffective[i]/records.dataAll[i]);
                tmp = parseInt(tmp*10000);
                var  obj = new Object();
                obj.y = records.dataEffective[i];
                obj.zb = (tmp/100).toFixed(2)+"%";
                bili[i] = obj;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLineForExtra(chart_id,"", "",x_labels,"","占  比：","",[{
                name:"全部玩家平均游戏次数",
                data:records.dataAll
            },{
                name:"有效玩家平均游戏次数",
                data:bili
            }]);
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    });
};




function queryRetainedData() {
    var aoColumns = [
        {"sTitle": "日期", "mData": "createTime"},
        {"sTitle": "有效dau", "mData": "user"},
        {"sTitle": "dau", "mData": "userAll"},
        {"sTitle": "有效新增玩家", "mData": "newUser"},
        {"sTitle": "新增玩家", "mData": "newUserAll"},
        {"sTitle": "有效玩家平均在线时长", "mData": "time"},
        {"sTitle": "玩家平均在线时长", "mData": "timeAll"},
        {"sTitle": "有效玩家平均游戏次数", "mData": "times"},
        {"sTitle": "玩家平均游戏次数", "mData": "timesAll"}
    ];


    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);


    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    if (!compareDate(search_begin_date, search_end_date)) {
        alert(lang_dateErrorTip);
        return;
    }

    var params = [
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'begin', value: search_begin_date},
        {name: 'end', value: search_end_date},
        {name: 'plat', value: plat}];

    var url = 'get_effective_data_table';
    queryDataTables(params, aoColumns, url);
    $(".tip").tooltip ({placement: 'top', container: 'body'});
}


/*进入时加载数据*/
function queryDataTables(list, aoColumns,url) {
    commonDataTables("dataTables", url, aoColumns, list);
}


/**
 * 日期比较，开始时间小于结束时间
 * @param search_begin_date
 * @param search_end_date
 */
function compareDate(search_begin_date, search_end_date) {
    var search_begin_date1=Date.parse(search_begin_date+" 00:00:00".replace(/-/g,"/"));
    var search_end_date1=Date.parse(search_end_date+" 00:00:00".replace(/-/g,"/"));
    if(search_begin_date1>search_end_date1){
        return false;
    }
    return true;
}
/**
 * 导出excel数据
 */
function exportExcelData() {
    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#plat_select").val();
    var server = $("#server_select").val();
    var channel = $("#channel_select").val();
    var country = $("#all_country").val();

    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert("开始时间不能大于结束时间");
        return;
    }

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_effective_data_table?'+param;
    location.href=url;

}

