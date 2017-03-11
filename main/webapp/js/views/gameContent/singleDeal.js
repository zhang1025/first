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
    queryTableData();
}

function queryTableData(){
	var aoColumns = [
		{"sTitle": t_create_time, "mData": "createTime"},
		{"sTitle": t_platform, "mData": "plat"},
		{"sTitle": t_server, "mData": "server"},
		{"sTitle": t_goods_name, "mData": "goodsName"},
		{"sTitle": t_num, "mData": "num"},
		{"sTitle": t_maxPrice, "mData": "maxPrice"},
		{"sTitle": t_minPrice, "mData": "minPrice"},
		{"sTitle": t_avgPrice, "mData": "avgPrice"},
		{"sTitle": t_trend, "mData": "trend"}
    ];
	if(isClient==2){
		aoColumns = [
	 	{"sTitle": t_create_time, "mData": "createTime"},
		{"sTitle": t_platform, "mData": "plat"},
		{"sTitle": t_server, "mData": "server"},
		{"sTitle": t_country, "mData": "country"},
		{"sTitle": t_goods_name, "mData": "goodsName"},
		{"sTitle": t_num, "mData": "num"},
		{"sTitle": t_maxPrice, "mData": "maxPrice"},
		{"sTitle": t_minPrice, "mData": "minPrice"},
		{"sTitle": t_avgPrice, "mData": "avgPrice"},
		{"sTitle": t_trend, "mData": "trend"}
	  ];
	}
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    var goodsId = $("#goods").val();
    
    var params = [
        {name: 'server', value: server},
        {name: 'channel', value: channel},
        {name: 'begin', value: begin},
        {name: 'end', value: end},
        {name: 'plat', value: plat},
        {name: 'country', value: country},
        {name: 'qryFlag', value: goodsId}];

    var url = 'get_deal_data_table';
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
    var goodsId = $("#goods").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country+'&qryFlag='+goodsId+'&isClient='+isClient;
    var url = 'export_deal_data?'+param;
    location.href=url;
}
