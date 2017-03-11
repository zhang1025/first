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
    $('#new-player-tabs a').click(function (e) {
        $(this).parent().addClass('active').siblings().removeClass('active');
		var id = $(this).attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    });
    $("[chart='line-chart-new-player']").click(function() {
        if(chartOrTable()=="chart"){
            showChart();
        }else{
           showTable();
        }
    });
    $("[chart='line-chart-pay-player']").click(function() {
        if(chartOrTable()=="chart"){
            showChart();
        }else{
            showTable();
        }
    });
    
    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
    	exportExcelData();
    });

    queryNewPlayer("new_player_search","line-chart-new-player",[t_newUser,t_newRole]);
    $("#searchBtn").click(searchData);

    //初始化table信息
    queryData();
    initSwitchButtonClick();
});
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    var chart_id = $("#player_div .active").attr("chart");
    var path=$("#player_div .active").attr("path");
    if(path=="new_player_search"){
        queryNewPlayer(path, chart_id, [t_newUser,t_newRole]);
    }
    if(path=="pay_player_search"){
        queryNewPlayer(path,chart_id,[t_payUser,t_newPayUser])
    }
    queryData();
}
function queryNewPlayer(path,chart_id,line) {
	playLoading(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\"}"
    },function (records) {
            var x_labels = getBeginToEndLabels(begin, end);
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>","",[{
                name:line[0],
                data:records.new_player
            },{
                name:line[1],
                data:records.new_role
            }]);
            hideLoading(chart_id) ; 
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
}

function queryData(){
	var newPlayerAoColumns = [
		{"sTitle": "日期", "mData": "createTime"},
		{"sTitle": "新增玩家", "mData": "newUser"},
		{"sTitle": "新增角色", "mData": "newRole"}
    ];
    var payPlayerAoColumns = [
        {"sTitle": "日期", "mData": "createTime"},
        {"sTitle": "付费玩家", "mData": "payUser"},
        {"sTitle": "新增付费玩家", "mData": "newPayUser"}
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

    var url = 'get_newuser_data_table';
    queryDataNewTables(params, newPlayerAoColumns, url);
    queryDataPayTables(params, payPlayerAoColumns, url);
}

function queryDataNewTables(list, aoColumns,url) {
    commonDataTables("newPlayer_dataTables", url, aoColumns, list,"newPlayer_dataTables");
}
function queryDataPayTables(list, aoColumns,url) {
    commonDataTables("payPlayer_dataTables", url, aoColumns, list,"payPlayer_dataTables");
}
//初始化曲线 table切换button
function initSwitchButtonClick() {
    $("#chartBut").on("click",function () {
        showChart();
    });
    $("#tableBut").on("click",function () {
        showTable();
    });
}
//展示曲线
function showChart() {
    var ul = $("#new-player-tabs").find(".active");
    var type = ul.find("a").attr("href").split("#")[1];
    //曲线重新加载数据，以便左右格式reflow自适应
    if(ul.attr("path")=="new_player_search"){
        queryNewPlayer("new_player_search",ul.attr("chart"),[t_newUser,t_newRole]);
    }
    if(ul.attr("path")=="pay_player_search"){
        queryNewPlayer("pay_player_search",ul.attr("chart"),[t_payUser,t_newPayUser]);
    }
    $('#'+type).find(".tab-content").show();
    $('#'+type).find(".panel-body").hide();
}
//展示table
function showTable() {
    var ul = $("#new-player-tabs").find(".active");
    var type = ul.find("a").attr("href").split("#")[1];
    $('#'+type).find(".tab-content").hide();
    $('#'+type).find(".panel-body").show();
}
/**
 * 判断当前显示的是曲线还是table
 */
function chartOrTable() {
    var type_tabs = $("#type-tabs").find(".active").attr("type");
    if(type_tabs=="chart"){
        return "chart";
    }else if(type_tabs=="table"){
        return "table";
    }else{
        return "chart";
    }
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
    

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_newuser_data_table?'+param;
    location.href=url;
}

