//------------- dataReport.js -------------//
$(document).ready(function() {
	$("body").ledo();
	//初始化访问人数和访问量
	initVisitorsAndViews();
	//初始化平台、渠道、区服 国内海外都不要国家筛选
	initSearchConditionForData(true);
	//初始化时间
	initDateRangePicker();
	//初始化查询
	queryDailyData("D","");
	//按钮事件
	searchData();
});
function queryDailyData(qryFlag,searchType){
	var time = $("input[name='date-range']").val();
	if(time=="" || time==null || time==undefined){
		return;
	}
	var dateRange = time.split("to");
	var begin = $.trim(dateRange[0]);
	var end = $.trim(dateRange[1]);
	if(searchType=="" || searchType==null){ //初始只加载平台数据
		queryPlatFormData(qryFlag,begin, end);
		$('#platData').show();
		$('#channelData').hide();
		$('#serverData').hide();
	}else if(searchType=="plat"){
		queryPlatFormData(qryFlag,begin, end);
	}else if(searchType=="channel"){
		queryChannelData(qryFlag,begin,end);
	}else if(searchType=="server"){
		queryServerData(qryFlag,begin,end);
	}
}
function queryPlatFormData(qryFlag,search_begin_date,search_end_date) {
	var title = [];
	var aoColumns = dealTableTitle(qryFlag,title,"plat");
	var plat = $("#all_platData").val();
	var channel = $("#all_channelData").val();
	if(channel==""){
		channel = $("#channel_selectData option:gt(0)").map(function(){
			return $(this).val();
		}).get().join(",");
	}
	if(qryFlag == undefined){
		qryFlag='';
	}
	var params = [
		{name: 'channel', value: channel},
		{name: 'begin', value: search_begin_date},
		{name: 'end', value: search_end_date},
		{name: 'qryFlag', value: qryFlag},
		{name: 'plat', value: plat}
	];
	var url = 'get_data_table';
	commonDataTables("dataTables", url, aoColumns, params,"platData");
	showTitleTips();
}
function queryChannelData(qryFlag,search_begin_date,search_end_date) {
	var title = [{"sTitle": t_channel, "mData": "channel"}];
	var aoColumns = dealTableTitle(qryFlag,title,"channel");
	var plat = $("#all_platData").val();
	var channel = getSelectChannel();
	if(qryFlag == undefined){
		qryFlag='';
	}
	var params =[
		{name: 'channel',  value: channel},
		{name: 'begin',  value: search_begin_date},
		{name: 'end',  value: search_end_date},
		{name: 'qryFlag',  value: qryFlag},
		{name: 'plat',  value: plat}];

	var url = 'get_channel_data_table';
	commonDataTables("dataTablesForChannel", url, aoColumns, params,"channelData");
	showTitleTips();
}
function queryServerData(qryFlag,search_begin_date,search_end_date) {
	var title = [{"sTitle": t_channel, "mData": "channel"},{"sTitle": t_server, "mData": "server"}];
	var aoColumns = dealTableTitle(qryFlag,title,"server");
	var plat = $("#all_platData").val();
	var channel = getSelectChannel();
	var server = getSelectServer();

	if(qryFlag == undefined){
		qryFlag='';
	}
	var params =[
		{name: 'channel',  value: channel},
		{name: 'server',  value: server},
		{name: 'begin',  value: search_begin_date},
		{name: 'end',  value: search_end_date},
		{name: 'qryFlag',  value: qryFlag},
		{name: 'plat',  value: plat}];

	var url = 'get_server_data_table';
	commonDataTables("dataTablesForServer", url, aoColumns, params,"serverData");
	showTitleTips();
}

function getSelectChannel() {
	var selectVal = $("#all_channelData option:selected").val();
	if(selectVal != '' && selectVal != '0' && selectVal != undefined){//如果不是全部渠道，直接返回选中的具体渠道id
		return selectVal;
	}else{
		return '';
	}
}
function getSelectServer() {
	var selectVal = $("#all_serverData option:selected").val();
	if(selectVal != '' && selectVal != '0' && selectVal != undefined){
		return selectVal;
	}else{
		return '';
	}
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
	aoColumns.push({"sTitle": dealTitle(t_date), "mData": "create_time"});
	aoColumns.push({"sTitle": dealTitle(t_palt), "mData": "plat"});
	if(arrayParam!=null && arrayParam.length!=0 && arrayParam!=undefined){
		for (var i = 0; i < arrayParam.length; i++) {
			aoColumns.push(arrayParam[i]);
		}
	}
	if(qryFlag=="D"){
		aoColumns .push(
			{"sTitle": dealTitle(t_newUsers), "mData": "newUserNum"},
			{"sTitle": dealTitle(t_newUserRechargeAmount), "mData": "newUserRechargeAmount"},
			{"sTitle": dealTitle(t_newUserRechargeNumber), "mData": "newUserRechargeNum"},
			{"sTitle": dealTitle(t_newUserRechargeRate), "mData": "newUserRechargeRate"},
			{"sTitle": dealTitle(t_newUserRechargeARPU), "mData": "newUserRechargeARPU"},
			{"sTitle": dealTitle("DAU"), "mData": "DAU"});
		if(type!="channel"){
			aoColumns .push(
				{"sTitle": dealTitle("ACU"), "mData": "ACU"},
				{"sTitle": dealTitle("PCU"), "mData": "PCU"}
			);
		}
		aoColumns .push(
			{"sTitle": dealTitle(t_payAmount), "mData": "amount"},
			{"sTitle": dealTitle(t_payNumber), "mData": "payNum"},
			{"sTitle": dealTitle(t_newPayNumber), "mData": "newPayNum"},
			{"sTitle": dealTitle(t_payARPU), "mData": "ARPU"},
			{"sTitle": dealTitle(t_dayPayRate), "mData": "disDailyPayRate"},
			{"sTitle": dealTitle("DARPU"), "mData": "DARPU"},
			{"sTitle": dealTitle(t_nextDayRetention), "mData": "nextDayRetentionRate"},
			{"sTitle": dealTitle(t_threeDaysRetention), "mData": "threeDayRetentionRate"},
			{"sTitle": dealTitle(t_sevenDaysRetention), "mData": "sevenDayRetentionRate"},
			{"sTitle": dealTitle(t_fourteenDaysRetention), "mData": "fourteenDayRetentionRate"},
			{"sTitle": dealTitle(t_oneMonthRetention), "mData": "oneMonthRetentionRate"});
	}
	if(qryFlag == 'W'){
		aoColumns .push(
			{"sTitle": dealTitle(t_newUsers), "mData": "newUserNum"},
			{"sTitle": dealTitle(t_newUserRechargeAmount), "mData": "newUserRechargeAmount"},
			{"sTitle": dealTitle(t_newUserRechargeNumber), "mData": "newUserRechargeNum"},
			{"sTitle": dealTitle(t_newUserRechargeRate), "mData": "newUserRechargeRate"},
			{"sTitle": dealTitle(t_newUserRechargeARPU), "mData": "newUserRechargeARPU"},
			{"sTitle": dealTitle("WAU"), "mData": "DAU"});
		if(type!="channel"){
			aoColumns .push(
				{"sTitle": dealTitle("ACU"), "mData": "ACU"},
				{"sTitle": dealTitle("PCU"), "mData": "PCU"}
			);
		}
		aoColumns .push(
			{"sTitle": dealTitle(t_payAmount), "mData": "amount"},
			{"sTitle": dealTitle(t_payNumber), "mData": "payNum"},
			{"sTitle": dealTitle(t_newPayNumber), "mData": "newPayNum"},
			{"sTitle": dealTitle(t_payARPU), "mData": "ARPU"},
			{"sTitle": dealTitle(t_dayPayRate), "mData": "disDailyPayRate"},
			{"sTitle": dealTitle("WARPU"), "mData": "DARPU"},
			{"sTitle": dealTitle(t_weekBackNum), "mData": "backWeek"},
			{"sTitle": dealTitle(t_weekNewRate), "mData": "retentionWeek"},
			{"sTitle": dealTitle(t_weekNodActiveRate), "mData": "oldRetentionWeek"},
			{"sTitle": dealTitle(t_weekActiveRate), "mData": "activeRetentionWeek"},
			{"sTitle": dealTitle(t_weekRechargeRate), "mData": "payRetentionWeek"});
	}
	if(qryFlag == 'M'){
		aoColumns .push(
			{"sTitle": dealTitle(t_newUsers), "mData": "newUserNum"},
			{"sTitle": dealTitle(t_newUserRechargeAmount), "mData": "newUserRechargeAmount"},
			{"sTitle": dealTitle(t_newUserRechargeNumber), "mData": "newUserRechargeNum"},
			{"sTitle": dealTitle(t_newUserRechargeRate), "mData": "newUserRechargeRate"},
			{"sTitle": dealTitle(t_newUserRechargeARPU), "mData": "newUserRechargeARPU"},
			{"sTitle": dealTitle("MAU"), "mData": "DAU"});
		if(type!="channel"){
			aoColumns .push(
				{"sTitle": dealTitle("ACU"), "mData": "ACU"},
				{"sTitle": dealTitle("PCU"), "mData": "PCU"}
			);
		}
		aoColumns .push(
			{"sTitle": dealTitle(t_payAmount), "mData": "amount"},
			{"sTitle": dealTitle(t_payNumber), "mData": "payNum"},
			{"sTitle": dealTitle(t_newPayNumber), "mData": "newPayNum"},
			{"sTitle": dealTitle(t_payARPU), "mData": "ARPU"},
			{"sTitle": dealTitle(t_dayPayRate), "mData": "disDailyPayRate"},
			{"sTitle": dealTitle("MARPU"), "mData": "DARPU"},
			{"sTitle": dealTitle(t_monthBachNum), "mData": "backWeek"},
			{"sTitle": dealTitle(t_monthNewRate), "mData": "retentionWeek"},
			{"sTitle": dealTitle(t_monthNodActiveRate), "mData": "oldRetentionWeek"},
			{"sTitle": dealTitle(t_monthActiveRate), "mData": "activeRetentionWeek"},
			{"sTitle": dealTitle(t_monthRechargeRate), "mData": "payRetentionWeek"});
	}
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
	var plat = $("#all_platData").val();
	var channel = $("#all_channelData").val();
	var server = $("#all_serverData").val();
	if(server!='' && server!=null){
		$('#platData').hide();
		$('#channelData').hide();
		$("#serverData").show();
		queryDailyData(qryFlag,"server");
	}else if(channel!=''){
		$('#platData').hide();
		$('#channelData').show();
		$('#serverData').hide();
		queryDailyData(qryFlag,"channel");
	}else if(plat!=''){
		$('#platData').show();
		$('#channelData').hide();
		$('#serverData').hide();
		queryDailyData(qryFlag,"plat");
	}else{
		$('#platData').show();
		$('#channelData').show();
		$('#serverData').show();
		queryDailyData(qryFlag,"");
	}
}