$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"level":"","country": "","range":""})
    }else{
        initSearchCondition(true,{"level":"","range":""})
    }
    //初始化时间
    initDateRangePicker();
    initVipLevelSelect();
    //留存详情导出excel绑定函数
    $("#dyn_2 .fa-download").parent().on("click",function(){
    	exportExcelData();
    });
    $("#searchBtn").click(searchData);
    queryData();
});

//初始化vip等级下拉框
function initVipLevelSelect() {
    //vipLevelSelect
    var optionStr = "<option value=''>不限</option>";
    for(var i=0;i<=150;i++){
        optionStr += "<option value='"+i+"'>"+i+"级</option>";
    }
    $("#vip_level").html(optionStr);
}

function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    queryData();
}
function queryData() {
	 var aoColumns = [
 		{"sTitle": "日期", "mData": "createTime"},
 		{"sTitle": "平台", "mData": "plat"},
 		{"sTitle": "渠道", "mData": "channel"},
 		{"sTitle": "区服", "mData": "serviceArea"},
 		{"sTitle": "vip等级", "mData": "vipLevel"},
 		{"sTitle": "充值人数", "mData": "payNum"},
 		{"sTitle": "充值金额", "mData": "amount"}
     ];

	 var dateRange = $("input[name='date-range']").val().split("to");
	 var begin = $.trim(dateRange[0]);
	 var end = $.trim(dateRange[1]);

     var plat = $("#all_plat").val();
     var server = $("#all_server").val();
     var channel = $("#all_channel").val();
     var country = $("#all_country").val();
     var vipLevel = $("#vip_level").val();
     
     var params = [
         {name: 'server', value: server},
         {name: 'channel', value: channel},
         {name: 'begin', value: begin},
         {name: 'end', value: end},
         {name: 'plat', value: plat},
         {name: 'country', value: country},
         {name: 'vipLevel', value: vipLevel},
         {name: 'initLength', value: 20}];

     var url = 'get_vip_pay';
     queryDataTables(params, aoColumns, url);
};

function queryDataTables(list, aoColumns,url) {
	//最后一个参数是loading遮盖id
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
    $('#searchBtn').button('reset');
}

function exportExcelData(){
	var dateRange = $("input[name='date-range']").val().split("to");
	var begin = $.trim(dateRange[0]);
	var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    var vipLevel = $("#vip_level").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country+'&vipLevel='+vipLevel;
    var url = 'export_vip_pay_data?'+param;
    location.href=url;
}

