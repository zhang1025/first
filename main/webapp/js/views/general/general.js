
$(document).ready(function() {
	$("body").ledo();

	//初始化访问人数和访问量
	initVisitorsAndViews();

	//重写tab切换click事件，默认的加载太慢，影响highcharts格式
	$('a[data-toggle="tab"]').parent().on("click",function () {
		$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in')
	});



	//初始化实时TOP5数据
	queryTopData();
	//加载实时曲线数据
	showRealtimeData();
	//加载首页下半部分 充值 付费率 pcu 活跃 平均在线等数据 6表示显示最近7天数据
	queryInitData(6);
	//绑定nav-tabs  a标签click事件
	getInitCommonData();

	//实时TOP数据页签刷新圆圈执行刷新操作
	$("a[clickType]").click(function(){
		//执行TOP查询操作
		queryTopData();
	});

	//导出按钮操作
	$("button[method-param]").click(function(){
		var id = $(this).attr("method-param");
		var params = "id="+id;
		location.href="export_topData_toExcel?"+params;
	});

	$('.panel-heading[type="download"]').find('.fa-download').addClass("tip").attr("title","导出到excel");

	$(".tip").tooltip ({placement: 'top', container: 'body'});

	//实时数据报表
	queryRTDataReport()

	var textId = $("#numId").text();
	$("#numId").text(textId+"("+unit+")");


	var rechargeID = $("#rechargeID").text();
	$("#rechargeID").text(rechargeID+"("+unit+")");

});


function showRealtimeData(){
	playLoadingWithoutTime("recharge");
	//付费金额
	$.goAjax("post",'real_time_get_recharge',{r:Math.random(),divId:"real-time-recharge-line-chart"},function(result){
		var mymap1 ={};
		var mymap2 ={};
		dealMap(mymap1,mymap2,result);
		var series=[{
			name:lanager_recharge,
			data:result.data,
			type: 'area'
		}];
		$("#recharge").find("span.stats-number").attr("data-to",result.rechargeTotal);
		numberCountToType("recharge");
		initHighChartsLineForRealTime("real-time-recharge-line-chart","","",result.xData,"","","",series,mymap1,mymap2);
		hideLoading("recharge") ;
	});
	playLoadingWithoutTime("online");
	//在线玩家
	$.goAjax("post",'real_time_get_online',{r:Math.random(),divId:"real-time-online-line-chart"},function(result){
		var mymap1 ={};
		var mymap2 ={};
		dealMap(mymap1,mymap2,result);
		var series=[{
			name:lanager_online,
			data:result.data,
			type: 'area'
		}];
		$("#online").find("span.stats-number").attr("data-to",result.onlineTotal);
		numberCountToType("online");
		initHighChartsLineForRealTime("real-time-online-line-chart","","",result.xData,"","","",series,mymap1,mymap2);
		hideLoading("online") ;
	});
	playLoadingWithoutTime("register");
	//新增玩家
	$.goAjax("post",'real_time_get_register',{r:Math.random(),divId:"real-time-online-line-chart"},function(result){
		var mymap1 ={};
		var mymap2 ={};
		dealMap(mymap1,mymap2,result);
		var series=[{
			name:lanager_newUsers,
			data:result.data,
			type: 'area'
		}];
		$("#register").find("span.stats-number").attr("data-to",result.registerTotal);
		numberCountToType("register");
		initHighChartsLineForRealTime("real-time-register-line-chart","","",result.xData,"","","",series,mymap1,mymap2);
		hideLoading("register") ;
	});
}
//处理实时曲线日环比 周同比显示
function dealMap(mymap1,mymap2,result) {
	if(result.xData==null || result.xData.length<=1){
		mymap1["00:00"] = "-0.00";
		mymap2["00:00"] = "-0.00";
	}else{
		$.each(result.xData,function(key,value) {
			mymap1[value] = result.data_yesterday[key]==0?"-0.00":(((result.data[key] - result.data_yesterday[key]) / result.data_yesterday[key])*100).toFixed(2);
			mymap2[value] = result.data_lastweek[key]==0?"-0.00":(((result.data[key] - result.data_lastweek[key]) / result.data_lastweek[key])*100).toFixed(2);
		});
	}
}
function refreshRealTime(type) {
	var url = "";
	var seriesName = "";
	if(type=="recharge"){
		url = "real_time_get_recharge";
		seriesName=lanager_recharge;
	}else if(type=="online"){
		url = "real_time_get_online";
		seriesName=lanager_online;
	}else if(type=="register"){
		url ="real_time_get_register";
		seriesName=lanager_newUsers;
	}
	var totalParam = type+"Total";//拼出result结果key值
	playLoadingWithoutTime(type);
	$.goAjax("post",url,{r:Math.random()},function(result){
		var mymap1 ={};
		var mymap2 ={};
		dealMap(mymap1,mymap2,result);
		var series=[{
			name:seriesName,
			data:result.data,
			type: 'area'
		}];
		$("#"+type).find("span.stats-number").attr("data-to",result.totalParam);
		numberCountToType(type);
		initHighChartsLineForRealTime("real-time-"+type+"-line-chart","","",result.xData,"","","",series,mymap1,mymap2);
		hideLoading(type) ;
	});
}
//加载首页充值 付费率 pcu 活跃玩家 平均在线时长数据
function  queryInitData(num) {
	$.goAjaxSync("post",'get_init_data',{num:num},function(records) {
		var x_labels=getDailyLabels(num);
		initHighChartsLine("line_chart_recharge","","",x_labels,"",shwoToolTip(),unit,[{
			name:lanager_recharge,
			data:records.data
		}]);
		initHighChartsLine("line_chart_account","","",x_labels,"",shwoToolTip(),"",[{
			name:lanager_newUsers,
			data:records.newUsers
		}]);
		initHighChartsLine("line_chart_login_user","","",x_labels,"",shwoToolTip(),"",[{
			name:lanager_activeUsers,
			data:records.loginUser
		}]);
		initHighChartsLine("line_chart_retention01","","",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: {point.y:.2f}%<br>","",[{
			name:lanager_retention,
			data:records.retentionInfo
		}]);
		commonHtmlPage("line_chart_recharge",records.data[num],lanager_recharge+"("+unit+")",records.data_daily_flag,records.data_daily_rate,records.data_week_flag,records.data_week_rate,"rechargeRevenue");
		commonHtmlPage("line_chart_account",records.newUsers[num],lanager_newUsers,records.newUsers_daily_flag,records.newUsers_daily_rate,records.newUsers_week_flag,records.newUsers_week_rate,"newUsers");
		commonHtmlPage("line_chart_login_user",records.loginUser[num],lanager_activeUsers,records.loginUser_daily_flag,records.loginUser_daily_rate,records.loginUser_week_flag,records.loginUser_week_rate,"activeUsers");
		commonHtmlPage("line_chart_retention01",records.retentionInfo[num-1],lanager_retention,records.retentionInfo_daily_flag,records.retentionInfo_daily_rate,records.retentionInfo_week_flag,records.retentionInfo_week_rate,"userRetention");
	})
}
//公共html 拼接首页曲线右侧区域
function commonHtmlPage(chartId,total,chartName,daily_up,dailyData,week_up,weekData,detail) {
	if(chartId.indexOf("scale")>=0 || chartId.indexOf("retention")>=0){ //付费率 加百分号
		total = total.toFixed(2)+"%";
	}else if(chartId.indexOf("cost_yuanbao")>=0){
		total = number_format(total/10000,2);
	}else{
		total = number_format(total);
	}
	var html = '<div id="showCountToChart" class="panel panel-default tile btlr0 bblr0" data-mh="payments" style="height:311px;"><div class="panel-body"><div class="spark clearfix">'+
		'<div class="spark-info mb10 s14" style="text-align: center;margin-top: 38px !important;">&nbsp;&nbsp;'+getPreDays(chartId.indexOf("retention")>=0?2:1)+'</div><div class="spark-info mb0" style="text-align: center">' +
		'<span  class="number stats-number number-sty" style="font-size: 29px !important;">&nbsp;&nbsp;'+total+'</span>'+((chartId!="line_chart_cost_yuanbao")?"":'万')+'</div>'+
		'<div class="spark-info mb25" style="text-align: center">&nbsp;&nbsp;'+chartName+'</div><div class="spark-info mb10 s14">' +
		rihuanbi+'<span class="'+(daily_up==true?'glyphicon glyphicon-arrow-up':'glyphicon glyphicon-arrow-down')+'" style="color: '+(daily_up==true?'red':'green')+'"></span>'+number_format(isNaN(dailyData)?0:dailyData*100,2)+'%</div>' +
		'<div class="spark-info mb20 s14">' +
		zhoutongbi+'<span class="'+(week_up==true?'glyphicon glyphicon-arrow-up':'glyphicon glyphicon-arrow-down')+'" style="color: '+(week_up==true?'red':'green')+'"></span>'+number_format(isNaN(weekData)?0:weekData*100,2)+'%</div>' +
		'<button  detail="'+detail+'" class="btn btn-primary ml20 mb10 indexDetail" type="button">'+viewDetail+'</button>'+
		'</div></div></div>';
	$('#'+chartId).parent().parent().parent().next("div").append(html);
	//绑定查看详情事件
	bindClickDetailPage();
}
function getInitCommonData() {
	$('a[commonClick="ledo"]').each(function () {
		var type = $(this).attr("href").substring(6);
		var chartName = $(this).html();
		var detail = $(this).attr("detail");
		$(this).parent("li").click({num:6,url:'real_time_'+type+'',f:initHighChartsLine,chart_id:'line_chart_'+type+'',chart_title:"",
			chart_subtitle: "",chart_yTitle:"",chart_yAppend:type=="recharge"?unit:"",chart_valueSuffix:shwoToolTip(),chart_dataName:""+chartName+"",detail:""+detail+""},query_single);
	});
}
function query_single(e){
	var num= e.data.num;
	var path= e.data.url;
	var initChart= e.data.f;
	var chart_id = e.data.chart_id;
	var chart_title = e.data.chart_title;
	var chart_subtitle = e.data.chart_subtitle;
	var chart_yTitle = e.data.chart_yTitle;
	var chart_yAppend = e.data.chart_yAppend;
	var chart_valueSuffix = e.data.chart_valueSuffix;
	var chart_dataName = e.data.chart_dataName;
	var detail = e.data.detail;
	var text = $('#'+chart_id).parent().parent().parent().next("div").html();
	var param="";
	if(path.indexOf("retention")!=-1){
		param = {num:num,type:path.substring(path.length-2),divId:chart_id};
		path = path.substring(0,path.length-2);
		chart_valueSuffix="<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:.2f}%<br>";
	}else{
		param = {num:num,divId:chart_id};
	}
	$.goAjax("post",path,param,function(records) {
		var x_labels=getDailyLabels(num);
		initChart(chart_id,chart_title,chart_subtitle,x_labels,chart_yTitle,chart_valueSuffix,chart_yAppend,[{
			name:chart_dataName,
			data:records.data
		}]);
		if(text.trim()==""){
			commonHtmlPage(chart_id,records.data[path.indexOf("retention")!=-1?(num-1):num],chart_dataName,records.data_daily_flag,records.data_daily_rate,records.data_week_flag,records.data_week_rate,detail);
		}
	});
}
//绑定查看详情 按钮事件
function bindClickDetailPage() {
	var $detail = $(".indexDetail");
	$detail.unbind("click");
	$detail.on("click",function () {
		var detail = $(this).attr("detail");
		if(detail && detail!=""){
			var indexPath = "/" + gameShort + "/general";
			var path = "/" + gameShort + "/"+detail;
			var $menu = $('a[path="'+path+'"]');
			$menu.parent().parent().prev().trigger("click");
			$menu.addClass('active');
			$menu.css("background","#1c202a");
			$menu.css("color","#fff");
			$('a[path="'+indexPath+'"]').removeClass("active");
			$.ajax({
				type: "post",
				url: '/authc/checkSession',
				data: {url:path,r:Math.random()},
				dataType: "json",
				success: function(result){
					if(result.status==-1){
						window.location.href = path;
					}else{
						$("#innerPage").load(path,function () {//页面加载完成后定位到顶部
							$("html body").animate({scrollTop:$("#header").offset().top},0);
						});
					}
				},
				error: function(){
					window.location.href = path;
				}
			});
		}
	});
}

//定时刷新top数据 2分钟刷新一次
// window.setInterval(queryTopData,1000*60*2);

//查询实时TOP5 数据
function queryTopData() {
	/*获取div id*/
	var id = $("a[clickType]").attr("clickType");
	/*显示遮罩层*/
	playLoading("topContent") ;
	var url = "real_time_top_data";
	var data=null;
	$.goAjax("POST",url,data,function(result){
		var dataArr = result;
		//加载渠道付费top5数据
		showTopTable(dataArr.cRecharge,"cRecharge");
		//加载渠道新增账号top5数据
		showTopTable(dataArr.cRegister,"cRegister");
		//加载渠道消耗top5数据
		showTopTable(dataArr.cCost,"cCost");
		//加载区服在线top5数据
		showTopTable(dataArr.sOnline,"sOnline");
		//加载区服付费top5数据
		showTopTable(dataArr.sRecharge,"sRecharge");
		//加载区服新增账号top5数据
		showTopTable(dataArr.sRegister,"sRegister");
		hideLoading("topContent");
		numberCountToType("realTop");
	});


}



//根据不同top查询结果展示不同的table表格数据
function showTopTable(dataArray,id){
	$("#"+id+" tbody>tr").remove();
	var htmlStr="";
	var t=0;
	if(dataArray!=null&&dataArray.length>0) {
		for(var i=0;i<dataArray.length;i++){
			htmlStr+="<tr>"
			var name = dataArray[i].name;
			var result = dataArray[i].result;
			var type = dataArray[i].type;
			htmlStr+="<td>"+(i+1)+"</td>";
			htmlStr+="<td>"+name+"</td>";
			htmlStr+='<td><strong><span  style="color: #1e8ba6;" class="number stats-number number-sty" data-from="0" data-to="'+result+'"></span></strong></td>';
			if(type=='0'){ //type为0 代表上升趋势 红色上升箭头
				htmlStr+="<td><span style='color:red;' class='glyphicon glyphicon-arrow-up'></span></td>";
			}else if(type=='1'){//type为1 代表持平趋势 灰色水平箭头
				htmlStr+="<td><span  class='glyphicon glyphicon-minus'></span></td>";
			}else if(type=='2'){//type为2 代表下降趋势 绿色下降箭头
				htmlStr+="<td><span  style='color:green;' class='glyphicon glyphicon-arrow-down'></span></td>";
			}
			htmlStr+="</tr>";
			t=i;
		}
	}else{
		t = -1;
	}

	//将TOP数不足5个的时候进行补全到5个
	if(t<4){
		var k = 4-t;
		t=t+2;
		for(var j=0;j<k;j++){
			htmlStr+="<tr><td>"+(t++)+"</td><td>--</td><td>--</td><td>--</td></tr>"
		}
	}
	$("#"+id+" tbody").append(htmlStr);
}

//实时数据报表
function queryRTDataReport(){
	var url = "real_time_data_report";
	playLoading("dataReport")
	$.goAjax("POST",url,"",function(result){
		//加载实时
		showRTDataReport(result,"table-object");
		hideLoading("dataReport");
	});
}

//加载实时数据报表
function showRTDataReport(dataArray,id){
	$("#"+id+" tbody>tr").remove();
	var htmlStr="";
	if(dataArray!=null&&dataArray.length>0) {
		for (var i = 0; i < dataArray.length; i++) {
			htmlStr += "<tr>"
			htmlStr += "<td>" + dataArray[i].name + "</td>";
			htmlStr += "<td>" + dataArray[i].result+ "</td>";
			htmlStr += "<td>" + dataArray[i].dau + "</td>";
			htmlStr += "<td>" + dataArray[i].newUsers + "</td>";
			htmlStr += "<td>" + dataArray[i].payerNums + "</td>";
			htmlStr += "<td>" + dataArray[i].payRate +"%"+ "</td>";
			htmlStr += "<td>" + dataArray[i].activeARPU + "</td>";
			htmlStr += "<td>" + dataArray[i].payARPU + "</td>";
			htmlStr += "<td>" + dataArray[i].retentionRate+"%" + "</td>";
			htmlStr+="</tr>";
		}
	}
	$("#"+id+" tbody").append(htmlStr);
}
//导出实时数据报表
$('.panel-heading[type="download"]').find('.fa-download').on("click",function(){
	var param ='type=download';
	location.href='export_real_time_data_report?'+param;
});





