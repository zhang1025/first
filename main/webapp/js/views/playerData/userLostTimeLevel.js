/**
 * Created by lixiaozhu on 2015/4/5.
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
    var local = {
    	    "showWeekNumbers":true,
    	    "inline":true,
    	    "format": 'YYYY-MM-DD',
    	    "separator": " & ",
    	    "applyLabel": "确定",
    	    "cancelLabel": "取消",
    	    "fromLabel": "起始时间",
    	    "toLabel": "结束时间'",
    	    "customRangeLabel": "自定义",
    	    "weekLabel": "周",
    	    "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
    	    "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
    	    "firstDay": 1
    	};
    //初始化时间
    initDateRangePicker({locale:local});
    //总留存tab切换绑定函数
    $("#lostLevelTabs a[data-toggle='tab']").parent().on("click",function(){
    	$(this).addClass('active').siblings().removeClass('active');
		var id = $(this).find("a").attr("href");
		$(id).addClass('active in').siblings().removeClass('active in');
    	var num= $(this).find("a").attr("num");
    	queryData("player_lost_level_search","line_chart_"+$(this).find("a").attr("href").substring(1),$(this).find("a").html(),num);
    	$("#detail").hide();
    });
     
    //留存详情导出excel绑定函数
    $("#panel_1 .fa-download").parent().on("click",function(){
    	exportLevelExcelData();
    });
    
    //平台 渠道留存详情导出excel绑定函数
    $("#panel_2 .fa-download").parent().on("click",function(){
    	exportTimeExcelData();
    });
    
    searchData();
    $("#searchBtn").click(searchData);
});
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
	$("#detail").hide();
	
	//等级流失chart line
    $("#lostLevelTabs .active").trigger("click");
    
    //时长流失chart column
    queryLostTimeData('player_lost_time_search','column-chart-time','01');
     
}
     
function queryData(path, chart_id, line,num) {
	var dateRange = $("input[name='date-range']").val().split("&");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoading(chart_id);
    var url=path;
    $.goAjax("post",url,{
        	dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\",\"num\":\""+num+"\"}"
        },function (records) {
            if(records.maxLevel==0){
                noData(chart_id,null);
            }else{
                var plotOptions = {
                        cursor:'pointer',
                        events:{
                            click:function(event){
                                showDetail(event.point.category,this.name);
                            }
                        }
                };
                var x_labels = getBeginToEndLabelsByNum(records.maxLevel);
                initHighChartsLineClick(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}%<br>","",[{
                    name:begin,
                    data:records.firstData
                },{
                    name:end,
                    data:records.secondData
                }],plotOptions);
            }
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

function getBeginToEndLabelsByNum(maxLevel) {
    var x_labels = new Array();
    for (var i = 0; i < maxLevel; i++) {
        x_labels[i] = i+1;
    }
    return x_labels;
};

function showDetail(level,date){
	var num = $("#lostLevelTabs .active").find("a").attr("num");
	if(num!="01"){
		$("#detail").show();
		playLoadingWithoutTime("detail_chart");
		$.goAjax("post","getDetailLostLevel",{
				dt_json: "{\"date\":\""+date+"\",\"level\":\""+level+"\",\"num\":\""+parseInt(num)+"\"}"
			},function (records) {
	        	var result = new Array();
	            var x_labels = new Array();
	            var mymap = new Object();
	            var sum=0;
	            $.each(records,function(index,obj) {
	                sum+=parseInt(obj.num);
	                result[index]=obj.num;
	                x_labels[index] = obj.str;
	                mymap[obj.str] = obj.num;
	            });
	            for (var j = 0; j < result.length; j++) {
	                result[j] = (result[j]*100)/sum;
	            }
	            initHighChartsColumn("detail_chart","", "",x_labels,"",[{
	                name:"到达"+level+"级",
	                data:result
	            }],mymap);
	            //关闭遮罩层
	            hideLoading("detail_chart") ;
	        } 
	    );
	}
}

function queryLostTimeData(path,chart_id,num) {
	//打开遮罩层
	playLoading(chart_id);
	var dateRange = $("input[name='date-range']").val().split("&");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.goAjax("post", url,
        {
    		dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
        		+$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()+"\",\"num\":\""+num+"\"}"
        },
        function (records) {
        	var x_labels = getBeginToEndLabelsTimes();      
            var series = [{
                name:begin,
                data:records.firstData
            },{
            	name:end,
                data:records.secondData,
                color:'#FFBB77'
            }];
            $('#'+chart_id).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: x_labels
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: ''
                    },
                    labels:{
                        format: '{value} %'
                    }
                },
                tooltip: {
                    formatter:function(){
                        return this.x+'<br><span style="color:'+this.series.color+'">'+this.series.name+'<br><b>占比</b>：'+this.y.toFixed(2)+'%';
                    }
                },
                plotOptions: {
                    column: {
                    	dataLabels:{
                    		enabled:true,
                    		style:{
                    			color:'#949449'
                    		},
                    		formatter:function(){
                    			return  this.y.toFixed(2)+'%'
                    		}
                    	},
                        pointPadding: 0.02,
                        borderWidth: 0
                    }
                },
                series: series,
                credits:{
                    enabled:false,
                    text:''
                }
            });
            //关闭遮罩层
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
          }
    );       
}
   
function getBeginToEndLabelsTimes() {
    var x_labels = new Array();
    x_labels[0] = "(0-5)min";
    x_labels[1] = "[5-30)min";
    x_labels[2] = "[30-60)min";
    x_labels[3] = "[60-120)min";
    x_labels[4] = "[120-180)min";
    x_labels[5] = "[180-∞)min";
    return x_labels;
};

/**
 * 导出excel数据
 */
function exportLevelExcelData() {
	var dateRange = $("input[name='date-range']").val().split("&");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();
    if(search_end_date != ''){
        search_end_date = Utils.DateUtils.plusDayNum(search_end_date, 1);
    }
  
    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_lost_level_data?'+param;
    location.href=url;

}

/**
 * 导出excel数据
 */
function exportTimeExcelData() {
	var dateRange = $("input[name='date-range']").val().split("&");
	var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);


    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    var param = 'server='+server+'&begin='+begin+'&end='+end+'&channel='+channel+'&plat='+plat+'&country='+country;
    var url = 'export_lost_time_data?'+param;
    location.href=url;
}