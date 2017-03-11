/**
 * Created by lixiaozhu on 2015/4/5.
 */


var flag="plat";
var cValue="recharge";
var id =
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"country": "","range":""})
    }else{
        initSearchCondition(true,{"range":""})
    }

    initDateRangePicker();

    $(".btn-group .btn").click(function() {
        cValue = $(this).attr("c-value");
        $("#PayAndUsers .active").trigger("click");
        $(this).addClass('btn-primary').siblings().removeClass('btn-primary');
        cValue="recharge";
    });



    //总留存tab切换绑定函数
    $("#retentionTabs a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    	var num= $(this).find("a").attr("num");
        if("recharge_rate"==num)
            queryDataRate("pay_count_rate","line_chart_"+$(this).find("a").attr("href").substring(1),$(this).find("a").html(),num);
        else
            queryData("pay_count_data","line_chart_"+$(this).find("a").attr("href").substring(1),$(this).find("a").html(),num);
    });
    //玩家付费详情导出excel绑定函数
    $("#panel_1 .fa-download").parent().on("click",function(){
    	exportExcelData();
    });

    //饼状图付费详情导出excel绑定函数
    $("#panel_2 .fa-download").parent().on("click",function(){
        exportPieExcelData();
    });

    //区域图付费详情导出excel绑定函数
    $("#panel_3 .fa-download").parent().on("click",function(){
        exportLineExcelData();
    });


    $("#PayAndUsers a[data-toggle='tab']").parent().on("click",function(){
        var num= $(this).find("a").attr("num");
        flag = num;
        queryLine("pay_in_platform",num,cValue,  $(this).attr("line-chart"),$(this).children("a").html(), initChartsAreaspLine);
        queryPie("pay_in_platform", num,cValue, $(this).attr("pie-chart"),$(this).children("a").html(), initChartsPie);
        queryNewTableDatas($(this).attr("type"),num);
    });

    searchData();
    $("#searchBtn").click(searchData);
    $(".tip").tooltip ({placement: 'top', container: 'body'});
});


function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    $("#retentionTabs .active").trigger("click");
    $("#PayAndUsers .active").trigger("click");
    queryRetainedData();
    //加载各平台付费金额和付费玩家的表格数据
}

function queryRetainedData() {
    var aoColumns = [
        {"sTitle": "日期", "mData": "create_time"},
        {"sTitle": "付费金额", "mData": "payCounts"},
        {"sTitle": "付费人数", "mData": "payUsers"},
        {"sTitle": "付费率", "mData": "payRate"},
        {"sTitle": "新增付费玩家", "mData": "newPayUsers"}
    ];

    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();

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

    var url = 'get_pay_data_table';
    queryDataTables(params, aoColumns, url);
}

function queryData(path, chart_id, line,num) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoading(chart_id);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"num\":\""+num+"\"}"
        },function (records) {
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>","",[{
                name:line,
                data:records.data
            }]);
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};



function queryDataRate(path, chart_id, line,num) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoading(chart_id);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"num\":\""+num+"\"}"
        },function (records) {
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}%<br>","",[{
                name:line,
                data:records.data
            }]);
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};


/*进入时加载数据*/
function queryDataTables(list, aoColumns,url) {
    commonDataTables("dataTables", url, aoColumns, list);
}
function queryPieTables(list, aoColumns,url) {
    commonDataTables("payPieDataTables", url, aoColumns, list);
}
function queryLineTables(list, aoColumns,url) {
    commonDataTables("payLineDataTables", url, aoColumns, list);
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


function queryLine(path,num,cValue,chart_id,line,pief){
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoadingWithoutTime(chart_id);
    var url=path;
    $.ajax({
        "dataType": 'json',
            "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+$.format.date(begin,"yyyy-MM-dd")+"\",\"end\":\""+$.format.date(end,"yyyy-MM-dd")+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"c\":\""+cValue+"\",\"num\":\""+num+"\"}"
        },
        "success": function (records) {
            var show_data = new Array();
            var i=0;
            $.each(records.line_data, function (key, value) {
                show_data[i] = {name: "'" + value.key + "'", data: value.value, color: top10color[i]};
                i++;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin, "yyyy-MM-dd"), $.format.date(end, "yyyy-MM-dd"));
            pief(chart_id, "", "", x_labels, "", "<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>", "", show_data);

            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');

        }

    }


    );

};


function queryPie(path,num,cValue, chart_id,line,pief) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoadingWithoutTime(chart_id);
    var url=path;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+$.format.date(begin,"yyyy-MM-dd")+"\",\"end\":\""+$.format.date(end,"yyyy-MM-dd")+"\",\"plat\":\""
            +$("#plat_select").val()+"\",\"channel\":\""+$("#channel_select").val()+"\",\"server\":\""+$("#server_select").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\",\"c\":\""+cValue+"\",\"num\":\""+num+"\"}"
        },
        "success": function (records) {
            var show_data = new Array();
            var i=0;
            $.each(records.pie_data,function(key,value) {
                show_data[i]=
                {
                    name:'<p style="font-size: 14px;">'+value.key+'</p>',
                    y:value.value,
                    color:top10color[i]
                };
                i++;
            });
            pief(chart_id,"", "","%",[{
                type:'pie',
                name:line,
                data:show_data
            }]
            );

            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    }
    );
};

function queryNewTableDatas(type,flag) {
    var valueColumns = new Array();
    var userColumns = new Array();

    if (cValue.indexOf("_") != -1) {
        valueColumns = [
            {"sTitle": type, "mData": "type"},
            {"sTitle": "付费人数", "mData": "payNums"},
            {"sTitle": "百分比", "mData": "rate"}
        ];

        userColumns = [
            {"sTitle": "日期", "mData": "create_time"},
            {"sTitle": type, "mData": "type"},
            {"sTitle": "付费人数", "mData": "payNums"}
        ];
    } else {
        valueColumns = [
            {"sTitle": type, "mData": "type"},
            {"sTitle": "付费金额", "mData": "payNums"},
            {"sTitle": "百分比", "mData": "rate"}
        ];

        userColumns = [
            {"sTitle": "日期", "mData": "create_time"},
            {"sTitle": type, "mData": "type"},
            {"sTitle": "付费金额", "mData": "payNums"}
        ];
    }

    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var typeVal = flag;

    var params = [
        {name: 'type', value: typeVal},
        {name: 'num', value: typeVal},
        {name: 'c', value: cValue},
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'begin', value: begin},
        {name: 'end', value: end},
        {name: 'plat', value: plat}];

    var urlValue = 'get_pay_value_data_table';
    var urlUser = 'get_pay_line_data_table';

    queryPieTables(params, valueColumns, urlValue);
    queryLineTables(params, userColumns, urlUser);
}


function exportExcelData() {
    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();

    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert(lang_dateErrorTip);
        return;
    }

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat;
    var url = 'export_payRecharge_data_table?'+param;
    location.href=url;
};



/**
 * 导出excel数据
 */
function exportPieExcelData() {
    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);


    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();

    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert(lang_dateErrorTip);
        return;
    }

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat;
    var cValue = $(".btn-group .active").attr("c-value");
    var type = 1;
    var url = 'export_pay_data_table?type='+type+'&flag='+flag+"&cValue="+cValue;
    location.href=url;

};



/**
 * 导出excel数据
 */
function exportLineExcelData() {
    var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);


    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();

    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert(lang_dateErrorTip);
        return;
    }

    var cValue = $(".btn-group .active").attr("c-value");
    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat;
    var type = 2;
    var url = 'export_pay_data_table?type='+type+'&flag='+flag+"&cValue="+cValue;
    location.href=url;
};

