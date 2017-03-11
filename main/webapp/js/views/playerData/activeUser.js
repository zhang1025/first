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
    //初始化时间
    initDateRangePicker();
    //tab切换显示css控制
    $("#active-player-tabs a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    });
    
    $("[chart='line-pcu-acu']").click(function() {
    	$("#plat_select").hide();
    	$("#channel_select").hide();
    	queryPcuAcuLine($(this).attr("path"), $(this).attr("chart"));
    });
    $("[chart='line-chart-login-users']").click(function() {
    	$("#plat_select").show();
    	$("#channel_select").show();
    	queryLines($(this).attr("path"), $(this).attr("chart"));
    });
    $("[chart='line-chart-avg-online-time']").click(function() {
    	$("#plat_select").show();
    	$("#channel_select").show();
    	queryLines($(this).attr("path"), $(this).attr("chart"),":%.2f");
    });
    $("[chart='line-chart-avg-online-times']").click(function() {
    	$("#plat_select").show();
    	$("#channel_select").show();
    	queryLines($(this).attr("path"), $(this).attr("chart"),":%.2f");
    });
    
    var show_data = $("[chart='line-chart-login-users']");
    queryLines(show_data.attr("path"), show_data.attr("chart"));

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
    	exportExcelData();
    });
    
    $("#searchBtn").click(searchData);
    queryData();
});
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    var chart_id = $("#player_div .active").attr("chart");
    var path=$("#player_div .active").attr("path");
    if(chart_id=="line-pcu-acu"){
    	queryPcuAcuLine(path, chart_id);
    }else if(chart_id=="line-chart-login-users"){
    	queryLines(path, chart_id);
    }else{
    	queryLines(path, chart_id,":%.2f");
    }
    queryData();
}
function queryLines(path,chart_id,format) {
	playLoadingWithoutTime(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    var line = $(".active").children("a").html();
    if(!format) format='';
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\"}"
    },function (records) {
            var x_labels = getBeginToEndLabels(begin,end);
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y"+format+"}<br>","",[{
                name: line,
                data:records.data
            }]);
            hideLoading(chart_id) ; 
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

function queryPcuAcuLine(path,chart_id) {
	playLoadingWithoutTime(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\"}"
    },function (records) {
            var x_labels = getBeginToEndLabels(begin,end);
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>","",[{
            	name:"pcu",
                data:records.pcu
            },{
                name:"acu",
                data:records.acu
            }]);
            hideLoading(chart_id) ; 
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

function queryData(){
	var aoColumns = [
		{"sTitle": "日期", "mData": "createTime"},
		{"sTitle": "pcu", "mData": "pcu"},
		{"sTitle": "acu", "mData": "acu"},
		{"sTitle": "活跃玩家", "mData": "activeUser"},
		{"sTitle": "平均在线时长", "mData": "avgTime"},
		{"sTitle": "平均游戏次数", "mData": "avgNum"}
    ];

	var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date =$.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    
    var params = [
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'begin', value: search_begin_date},
        {name: 'end', value: search_end_date},
        {name: 'plat', value: plat},
        {name: 'country', value: country}];

    var url = 'get_activeuser_data_table';
    queryDataTables(params, aoColumns, url);
}

function queryDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
}

function exportExcelData() {
	var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date = $.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#plat_select").val();
    var server = $("#server_select").val();
    var channel = $("#channel_select").val();
    var country = $("#all_country").val();
    

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_activeuser_data_table?'+param;
    location.href=url;
}


