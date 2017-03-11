$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"channel": "none","country": "","range":""})
    }else{
        initSearchCondition(true,{"channel": "none","range":""})
    }
    //初始化时间
    initDateRangePicker();
    //tab切换显示css控制
    $("#mall-tabs a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
		queryData($(this).attr("path"), $(this).attr("chart"),$(this).find("a").html(),$(this).find("a").attr("href"));
    });
    
   //商城详情导出excel绑定函数
    $("#dyn_2 .fa-download").parent().on("click",function(){
    	exportExcelData();
    });
    $("#searchBtn").click(searchData);
    searchData();
});


function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    var chart_id = $("#mall_div .active").attr("chart");
    var path= $("#mall_div .active").attr("path");
    queryData(path,chart_id,$("#mall_div .active").find("a").html(),$("#mall_div .active").find("a").attr("href"));
    queryTableData();
}


function queryData(path,chart_id,line,div) {
	playLoadingWithoutTime(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\"}"
    },function (records) {
            var x_labels = new Array();
            var result = new Array();
            var mymap = new Object();
            var sum=0;
            //$(div + " .total_num").html(records.total);
            //$(div + " .top10percent").html(records.percent+"%");
            var i=0;
            $.each(records.data,function(key,value) {
                sum+=value.value;
                x_labels[i] = value.key;
                result[i] = value.value;
                mymap[value.key] = value.value;
                i++;
            });
            for (var j = 0; j < result.length; j++) {
                result[j] = (result[j]*100)/sum;

            }
            initHighChartsBarNew(chart_id, "", "", x_labels, "", [{
                name:line,
                data:result
            }],mymap);
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

 

function queryTableData(){
    var aoColumns = [
        { "sTitle": "日期", "mData": "create_time"},
        { "sTitle": "战力区间", "mData": "fightBranch"},
        { "sTitle": "对应角色数", "mData": "count"},
        { "sTitle": "占比", "mData": "percent"}
    ];

    if(isClient==2){
		aoColumns = [
            { "sTitle": "日期", "mData": "create_time"},
            { "sTitle": "战力区间", "mData": "fightBranch"},
            { "sTitle": "对应角色数", "mData": "count"},
            { "sTitle": "占比", "mData": "percent"}
	     ];
	}
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    var mall = $("#mall").val();
    
    var params = [
        {name: 'server', value: server},
        {name: 'begin', value: begin},
        {name: 'end', value: end},
        {name: 'plat', value: plat}];

    var url = 'getFightDataTable';
    queryDataTables(params, aoColumns, url);
}

function queryDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
}

function exportExcelData(){
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country+'&isClient='+isClient;
    //var url = 'export_mall_data?'+param;
    var url = 'exportFightDataTable?'+param;
    location.href=url;
}
