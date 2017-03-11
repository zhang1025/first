/**
 * 交易总量的js
 * @author machaozhe
 * @date 2017-01-06
 */
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

    $('#total-exchange-tabs a').click(function (e) {
        $(this).parent().addClass('active').siblings().removeClass('active');
		var id = $(this).attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    });

    //绑定click事件
    $("#total-exchange-tabs li").each(function () {
        $(this).click(function () {
            var text=$(this).find("a").html();
            var table = $(this).attr("text");
            queryCurve($(this).attr("path"),$(this).attr("chart"),text);
            queryData(table,text)
        })
    })

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
    	exportExcelData();
    });
    
    $("#searchBtn").click(searchData);
    searchData();
});

/**
 * 查询
 */
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    var chart_id = $("#exchange_div .active").attr("chart");
    var path=$("#exchange_div .active").attr("path");
    var text=$("#exchange_div .active").find("a").html();
    queryCurve(path,chart_id,text);

    var table = $("#exchange_div .active").attr("text");
    queryData(table,text);
}

/**
 * 成交相关
 * @param path 查询的url
 * @param chart_id loading的id
 * @param lineName 曲线名称
 */
function queryCurve(path,chart_id,lineName) {
	playLoading(chart_id);
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
                name:lineName,
                data:records.result
            }]);
            hideLoading(chart_id) ; 
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

/**
 * 查询table
 */
function queryData(table,text){
	var aoColumns = [
		{"sTitle": date, "mData": "createTime"},
		{"sTitle": text, "mData": "num"}
    ];

	var dateRange = $("input[name='date-range']").val().split("to");
    var search_begin_date =$.trim(dateRange[0]);
    var search_end_date = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    var params = [
        {name: 'table', value: table},
        {name: 'begin', value: search_begin_date},
        {name: 'end', value: search_end_date},
        {name: 'plat', value: plat},
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'country', value: country}];

    var url = 'print_total_exchange_table';
    commonDataTables("dataTables", url, aoColumns, params,"dataTables");
}

/**
 * 导出excel数据
 */
function exportExcelData() {
	var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#plat_select").val();
    var server = $("#server_select").val();
    var channel = $("#channel_select").val();
    var country = $("#all_country").val();
    var table = $("#exchange_div .active").attr("text");

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country+'&table='+table;
    var url = 'export_total_exchange_excel?'+param;
    location.href=url;
}