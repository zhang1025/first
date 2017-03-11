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
    //初始化时间
    initDateRangePicker();

    $(".btn-group .btn").click(function() {
        $(".btn-group .active").attr("class", "btn");
        $(this).attr("class","btn active");
        //$("#new-player-tabs .active").trigger("click");click
    });


    $("#PayAndUsers a[data-toggle='tab']").parent().on("click",function(){
        queryPie($(this).attr("path"), $(this).attr("pie-chart"), $(this).children("a").html(), initChartsPie);
        queryLine($(this).attr("path"), $(this).attr("line-chart"), $(this).children("a").html(), initChartsAreaspLine);
    });

    $("[chart='line-chart-new-player-pay']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });

    //单周付费金额
    $("[chart='line-chart-week-player-pay']").click(function() {
        queryWeekData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    $("[chart='line-chart-arpu']").click(function() {
        queryARPU($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    $("[chart='line-chart-ltv']").click(function() {
        queryLTV($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });


    $("[chart='column-chart-first-recharge']").click(function() {
        queryEveryDay($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });

    searchData();
    $("#searchBtn").click(searchData);
    $(".tip").tooltip ({placement: 'top', container: 'body'});
});
function searchData(){
    $('#searchBtn').button('loading');
    $("#line-tabs .active").trigger("click");
    $("#line-week-tabs .active").trigger("click");
    $("#new-player-tabs2 .active").trigger("click");
    $("#PayAndUsers .active").trigger("click");
    $('#searchBtn').button('reset');
}

function queryLTV(path,chart_id,line) {

    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);

    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#plat_select").val()+"\",\"channel\":\""+$("#channel_select").val()+"\",\"server\":\""+$("#server_select").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}<br>","",[{
                name:sevenLTV,
                data:records.ltv_7
            },{
                name:fifteenLTV,
                data:records.ltv_15
            },{
                name:thirtyLTV,
                data:records.ltv_30
            }]);
            hideLoading(chart_id) ;
        }
    });
};
function queryARPU(path,chart_id) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#plat_select").val()+"\",\"channel\":\""+$("#channel_select").val()+"\",\"server\":\""+$("#server_select").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}<br>","",[{
                name:paidARPU,
                data:records.arpu
            },{
                name:activeARPU,
                data:records.darpu
            }]);
            hideLoading(chart_id) ;
        }
    });
}
function queryData(path,chart_id,line) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            records.data_1 = $.map(records.data_1,function(n){return n*100});
            records.data_7 = $.map(records.data_7,function(n){return n*100});
            records.data_30 = $.map(records.data_30,function(n){return n*100});
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y:%.2f}%<br>","",[{
                name:dailyNewPayRate,
                data:records.data_1
            },{
                name:sevenNewPayRate,
                data:records.data_7
            },{
                name:thirtyNewPayRate,
                data:records.data_30
            }]);
            hideLoading(chart_id) ;
        }
    });
};

//单周付费金额
function queryWeekData(path,chart_id,line) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json:"{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var result = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            var i = 0;
            var sum=0;
            $.each(records.data,function(key,value) {
                sum+=value.value;
                result[i]=value.value;
                x_labels[i] = value.key;
                mymap[value.key] = value.value;
                i++;
            });
            for (var j = 0; j < result.length; j++) {
                result[j] = (result[j]*100)/sum;
            }
            //alert(result + "##" + x_labels);
            initHighChartsColumn(chart_id,"", "",x_labels,"",[{
                name:line,
                data:result
            }],mymap);
            hideLoading(chart_id) ;
        }
    });
};
//每日付费金额
function queryEveryDay(path,chart_id,line) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json:"{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var result = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            var i = 0;
            var sum=0;
            $.each(records.data,function(key,value) {
                sum+=value.value;
                result[i]=value.value;
                x_labels[i] = value.key;
                mymap[value.key] = value.value;
                i++;
            });
            for (var j = 0; j < result.length; j++) {
                result[j] = (result[j]*100)/sum;

            }
            //alert(result + "##" + x_labels);
            initHighChartsColumn(chart_id,"", "",x_labels,"",[{
                name:line,
                data:result
            }], mymap);
            hideLoading(chart_id) ;
        }
    });
};
function queryLine(path,chart_id,line,pief){
    playLoadingWithoutTime(chart_id);
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json:  "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var show_data = new Array();
            var i=0;
            $.each(records.line_data,function(key,value) {
                show_data[i]={name:"'"+value.key+"'",data:value.value,color:top10color[i]};
                i++;
            });
            var x_labels = getBeginToEndLabels($.format.date(begin,"yyyy-MM-dd"), $.format.date(end,"yyyy-MM-dd"));
            pief(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>","",show_data);
            hideLoading(chart_id) ;
        }

    });

}
function queryPie(path,chart_id,line,pief) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"state\":\""+$(".btn-group .active").attr("path-value")+"\"}"
        },
        "success": function (records) {
            var show_data = new Array();
            var i=0;
            $.each(records.pie_data,function(key,value) {
                show_data[i]=
                {
                    name:'<p style="font-size: 14px;">'+value.key+'</p>',
                    y:value.value,
                    color:top10color[i]
                };
                i++;
            });
            pief(chart_id,"", "","%",[{
                type:'pie',
                name:line,
                data:show_data
            }]);
            hideLoading(chart_id) ;
        }
    });
};