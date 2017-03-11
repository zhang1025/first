$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"channel": "none","country": "","mall": "","range":""})
    }else{
        initSearchCondition(true,{"channel": "none","mall": "","range":""})
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
function queryData(path,chart_id,line_name,divId) {
	playLoadingWithoutTime(chart_id);
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\",\"mall\":\""+$("#mall").val()+"\"}"
    },function (records) {
	    	var x_labels = new Array();
	        var result = new Array();
	        $(divId + " .num").html(records.total);
	        $(divId + " .percent").html(records.percent+"%");
	        $.each(records.data,function(index,obj) {
	            x_labels[index] = obj.name;
	            result[index] = parseInt(obj.num);
	        });  
	        initHighChartsBar(chart_id, "", "", x_labels, "", [{
	            name:line_name,
	            data:result
	        }]);
	        hideLoading(chart_id) ;
            //重置查询按钮
	        $('#searchBtn').button('reset');
        }
    );
};

 

function queryTableData(){
	var aoColumns = [
		{"sTitle": "日期", "mData": "createTime"},
		{"sTitle": "平台", "mData": "plat"},
		{"sTitle": "区服", "mData": "server"},
		{"sTitle": "商城类型", "mData": "mallType"},
		{"sTitle": "物品类型", "mData": "goodsType"},
		{"sTitle": "物品名称", "mData": "name"},
		{"sTitle": "数量", "mData": "counts"},
		{"sTitle": "金额", "mData": "costs"}
    ];
	if(isClient==2){
		aoColumns = [
	 		{"sTitle": "日期", "mData": "createTime"},
	 		{"sTitle": "平台", "mData": "plat"},
	 		{"sTitle": "区服", "mData": "server"},
	 		{"sTitle": "国家", "mData": "country"},
	 		{"sTitle": "商城类型", "mData": "mallType"},
	 		{"sTitle": "物品类型", "mData": "goodsType"},
	 		{"sTitle": "物品名称", "mData": "name"},
	 		{"sTitle": "数量", "mData": "counts"},
	 		{"sTitle": "金额", "mData": "costs"}
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
        {name: 'channel', value: channel},
        {name: 'begin', value: begin},
        {name: 'end', value: end},
        {name: 'plat', value: plat},
        {name: 'country', value: country},
        {name: 'mall', value: mall}];

    var url = 'get_mall_data_table';
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
    var mall = $("#mall").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country+'&mall='+mall+'&isClient='+isClient;
    var url = 'export_mall_data?'+param;
    location.href=url;
}
