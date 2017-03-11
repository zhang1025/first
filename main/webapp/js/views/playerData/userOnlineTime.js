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

    var show_online = $("[chart='line-chart-online-times-day']");
    queryOnlineTimesData(show_online.attr("path"), show_online.attr("chart"));
    queryData();
    
    //导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
    	exportExcelData();
    });
    
    $("#searchBtn").click(searchData);
});
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
	var show_online = $("[chart='line-chart-online-times-day']");
    queryOnlineTimesData(show_online.attr("path"), show_online.attr("chart"));
    queryData();
}

 

/**
 * 导出excel数据
 */
function exportExcelData() {
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_useronline_data?'+param;
    location.href=url;
}

function queryOnlineTimesData(path,chart_id) {
	playLoadingWithoutTime(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post",url,{
    	dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\"}"
        },function (records) {
            var result = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            $.each(records.data,function(index,obj) {
                result[index]=obj.percent;
                x_labels[index] = obj.name;
                mymap[obj.name] = obj.result;
            });
            initHighChartsColumn(chart_id,"", "",x_labels,"",[{
                name:'玩家在线时长分布',
                data:result
            }],mymap);
            hideLoading(chart_id) ; 
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

function queryData(){
	var aoColumns = [
		{"sTitle": "在线时长", "mData": "name"},
		{"sTitle": "玩家数量", "mData": "result"},
		{"sTitle": "占比", "mData": "percent"}
    ];

	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    var params = [
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'begin', value: begin},
        {name: 'end', value: end},
        {name: 'plat', value: plat},
        {name: 'country', value: country}];

    var url = 'player_online_time_table';
    queryDataTables(params, aoColumns, url);
}

function queryDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
}

