/**
 * Created by lixiaozhu on 2015/4/5.
 */
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"country": "","begin":"","end":""})
    }else{
        initSearchCondition(true,{"begin":"","end":""})
    }
    //初始化时间
    initSingleDate();
    //总留存tab切换绑定函数
    $("#retentionTabs a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    	var num= $(this).find("a").attr("num");
    	if(num == "in7")
    		queryDataIn7("player_retained_search_in7","line_chart_retentionin7",$(this).find("a").html());
    	else
    		queryData("player_retained_search","line_chart_"+$(this).find("a").attr("href").substring(1),$(this).find("a").html(),num);

    });

    //平台渠道留存切换绑定函数
    $("#platTabs  a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    	var path= $(this).find("a").attr("path");
    	queryPlatAndChannelData("player_retained_search_plat",$(this).find("a").attr("dataType"),$(this).find("a").attr("chart"),$(this).find("a").html());
    	queryPlatRetainedData($(this).find("a").attr("dataType"));
    });

    //平台 渠道 次日 7日 30日 切换绑定函数
    $(".btn-group .btn").click(function() {
        $(this).addClass('btn-primary').siblings().removeClass('btn-primary');
        //$("#platTabs .active").trigger("click");
        queryPlatAndChannelData("player_retained_search_plat",$("#platTabs .active").find("a").attr("dataType"),$("#platTabs .active").find("a").attr("chart"),$("#platTabs .active").find("a").html());
    });

    //留存详情导出excel绑定函数
    $("#panel_1 .fa-download").parent().on("click",function(){
    	exportExcelData();
    });

    //平台 渠道留存详情导出excel绑定函数
    $("#panel_2 .fa-download").parent().on("click",function(){
    	exportExcelMapData();
    });

    searchData();
    $("#searchBtn").click(searchData);
});
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    $("#retentionTabs .active").trigger("click");
    $("#platTabs .active").trigger("click");
    queryRetainedData();
   // queryPlatRetainedData($("#platTabs .active").find("a").attr("dataType"));
}
     
function queryData(path, chart_id, line,num) {
	$("#end_select").show();
    var begin = $("#begin-date").val();
    var end = $("#end-date").val();
    playLoading(chart_id);
    var url=path;
    $.goAjax("post",url,{
        	dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\",\"num\":\""+num+"\"}"
        },function (records) {
            var x_labels = getBeginToEndLabels(begin,end);
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

function queryDataIn7(path, chart_id, line) {
	playLoading(chart_id);
	$("#end_select").hide();
	var begin = $("#begin-date").val();
    var url=path;
    var x_labels = new Array (
        nextDayRetention,
        threeRetention,
        fourRetention,
        fiveRetention,
        sixRetention,
        servenRetention
    );
    $.goAjax("post",url,
        {
            dt_json: "{\"begin\":\""+begin+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"country\":\""+$("#all_country").val()+"\",\"server\":\""+$("#all_server").val()+"\"}"
        },
        function (records) {
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}%<br>","",[{
                name:line,
                data:records.data
            }]);
            hideLoading(chart_id) ;
        }
    );
};

function queryPlatAndChannelData(path, type,chart_id, line) {
	//打开遮罩层
	playLoading(chart_id);
    var begin = $("#begin-date").val();
    var end = $("#end-date").val();
    var url=path;
    $.goAjax("post", url,
        {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"num\":\""+$(".btn-group .btn-primary").attr("path-value")+"\",\"type\":\""+type+"\"}"
        },
        function (records) {
            var x_labels = new Array();
            var result = new Array();
            var mymap = new Object();
            var i = 0;
            $.each(records.data, function (key, value) {
                x_labels[i] = value.name;
                result[i] = value.result;
                mymap[value.name] = value.result;
                i++;
            });
            initHighChartsColumn(chart_id,"", "",x_labels,"%",[{
                name:line,
                data:result
            }],mymap);
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
          }
    );       
}
   

function queryRetainedData() {
    var aoColumns = [
        {"sTitle": date, "mData": "createTime"},
        {"sTitle": nextDayRetention, "mData": "data_1"},
        {"sTitle": threeRetention, "mData": "data_3"},
        {"sTitle": servenRetention, "mData": "data_7"},
        {"sTitle": fourteenRetention, "mData": "data_14"},
        {"sTitle": thirdRetention, "mData": "data_30"}
    ];

    var search_begin_date = $("#begin-date").val();
    var search_end_date = $("#end-date").val();

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
        {name: 'plat', value: plat},
        {name: 'country', value: country}];

    var url = 'get_retained_data_table';
    queryDataTables(params, aoColumns, url);
}

/*进入时加载数据*/
function queryDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
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
    var search_begin_date = $("#begin-date").val();
    var search_end_date = $("#end-date").val();

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert(lang_dateErrorTip);
        return;
    }

    var param = 'server='+server+'&begin='+search_begin_date+'&end='+search_end_date+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_retained_data_table?'+param;
    location.href=url;

}

function queryPlatRetainedData(status) {
    var aoColumns = [
        {"sTitle": status=="plat"?platform:channel, "mData": "name"},
        {"sTitle": nextDayRetention, "mData": "data_1"},
        {"sTitle": servenRetention, "mData": "data_7"},
        {"sTitle": thirdRetention, "mData": "data_30"}
    ];

    var search_begin_date = $("#begin-date").val();
    var search_end_date = $("#end-date").val();

    if (!compareDate(search_begin_date, search_end_date)) {
        alert(lang_dateErrorTip);
        return;
    }

    var params = [
        {name: 'begin', value: search_begin_date},
        {name: 'end', value: search_end_date},
        {name:'type',value:status}];

    var url = 'get_plat_retained_data_table';
    queryPlatDataTables(params, aoColumns, url);
}

/*进入时加载数据*/
function queryPlatDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("platTables", url, aoColumns, list,"platTables");
}

/**
 * 导出excel数据
 */
function exportExcelMapData() {

    var search_begin_date = $("#begin-date").val();
    var search_end_date = $("#end-date").val();
    var type =$("#platTabs .active").find("a").attr("dataType");

    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
    if(!compareDate(search_begin_date,search_end_date)){
        alert(lang_dateErrorTip);
        return;
    }

    var param = 'begin='+search_begin_date+'&end='+search_end_date+'&type='+type;
    var url = 'export_retained_plat_data_table?'+param;
    location.href=url;
}