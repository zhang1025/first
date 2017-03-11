//------------- dataReport.js -------------//
$(document).ready(function() {
	$("body").ledo();

	//初始化时间下拉框
	initSearchCondition(true,{"server":"none","country":"none","range":""});
	initDateRangePicker();
	//初始化查询
	queryDailyData("D");
	//按钮事件
	searchData();
});
function queryDailyData(qryFlag){
	var time = $("input[name='date-range']").val();
	if(time=="" || time==null || time==undefined){
		return;
	}
	var dateRange = time.split("to");
	var begin = $.trim(dateRange[0]);
	var end = $.trim(dateRange[1]);
	queryPlatFormData(qryFlag,begin, end);
}
function queryPlatFormData(qryFlag,search_begin_date,search_end_date) {
	var title = [];
	var aoColumns = dealTableTitle(qryFlag,title,"plat");
	var plat = $("#all_platData").val();

	var params = [
		{name: 'begin', value: search_begin_date},
		{name: 'end', value: search_end_date},
		{name: 'qryFlag', value: qryFlag},
		{name: 'plat', value: plat}
	];
	var url = 'get_data_table';
	commonDataTables("dataTables", url, aoColumns, params,"platData");
	showTitleTips();
}


//查询按钮绑定事件
function searchData() {
	$('#searBtn').on("click",function () {
		$('#searBtn').button('loading');
		var qryFlag =$("#myTab>li[class='active']").attr('id');
		changeDataType(qryFlag);
	});
	//日报周报月报查询按钮事件
	$("#myTab>li").on("click",function () {
		var qryFlag =$(this).attr('id');
		if(qryFlag=="W" || qryFlag=="M"){
			 $("#all_serverData").select2({
				 width:"100%",
				 dropdownAutoWidth:true
			 }).val("").trigger("change");
		}
		changeDataType(qryFlag)
	});
	//导出excle事件
	$('.fa-download').parent().on("click",function () {
		var type = $(this).parents('.row').attr("id");
		var dateRange = $("input[name='date-range']").val().split("to");
		var begin = $.trim(dateRange[0]);
		var end = $.trim(dateRange[1]);
		var plat = $("#all_platData").val();
		var channel = $("#all_channelData").val();
		var server = $("#all_serverData").val();
		//查询标签类型
		var qryFlag =$("#myTab>li[class='active']").attr('id');
		var param = 'server='+server+'&channel='+channel+'&begin='+begin+'&end='+end+'&plat='+plat+'&excelType='+type+'&qryFlag='+qryFlag;
		location.href='export_excel_data_table?'+param;
	});
}
//处理table的公共title
function dealTableTitle(qryFlag,arrayParam,type) {
	var aoColumns = new Array();
	aoColumns.push({"sTitle": dealTitle("日期"), "mData": "create_time"});
	aoColumns.push({"sTitle": dealTitle("数据1"), "mData": "plat"});
	aoColumns .push(
		{"sTitle": dealTitle("数据2"), "mData": "amount"},
		{"sTitle": dealTitle("数据3"), "mData": "payNum"},
		{"sTitle": dealTitle("数据4"), "mData": "newPayNum"},
		{"sTitle": dealTitle("数据5"), "mData": "ARPU"},
		{"sTitle": dealTitle("数据6"), "mData": "disDailyPayRate"},
		{"sTitle": dealTitle("数据7"), "mData": "DARPU"},
		{"sTitle": dealTitle(""), "mData": "backWeek"});
	return	aoColumns;
}
function dealTitle(title) {
	// if(title!="" && title!=null){
	// 	if(title.length>4){
	// 		return "<span title='"+title+"' class='tip'>"+title.substring(0,4)+"..</span>";
	// 	}else{
	// 		return "<span title='"+title+"' class='tip'>"+title+"</span>";
	// 	}
	// }
	return "<span title='"+title+"' class='tip'>"+title+"</span>";
}
function showTitleTips() {
	//table列标题tip提示
	$(".tip").tooltip ({placement: 'top', container: 'body'});
	//重置查询按钮
	$('#searBtn').button('reset');
}
// 根据筛选条件，显示相应的类型数据
function changeDataType(qryFlag) {
	queryDailyData(qryFlag);
}