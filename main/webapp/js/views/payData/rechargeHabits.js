/**
 * Created by Liruiqi on 2016/10/12.
 */
$(function () {
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化时间
    var range = {
        '上周': [moment(serverDate).subtract(1, 'week').startOf('isoWeek'), moment(serverDate).subtract(1, 'week').endOf('isoWeek')],
        '上上周': [moment(serverDate).subtract(2, 'week').startOf('isoWeek'), moment(serverDate).subtract(2, 'week').endOf('isoWeek')]
    }


    //初始化平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"country": "","begin":"none","range":""})
    }else {
        initSearchCondition(true,{"begin":"none","range":""});
    }
    //初始化时间
    initDateRangePicker({ranges:range,startDate:moment(serverDate).subtract(1, 'week').startOf('isoWeek'), endDate:moment(serverDate).subtract(1, 'week').endOf('isoWeek')});

    $('#new-player-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
    });

    $(".btn-group .btn").click(function() {
        $(".btn-group .active").attr("class", "btn");
        $(this).attr("class","btn active");
        $("#new-player-tabs .active").trigger("click");
    });
    $("[chart='column-chart-single-recharge']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"line_div");
    });
    $("[chart='column-chart-first-recharge']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"line_div");
    });
    $("[chart='column-chart-first-recharge-level']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"line_div");
    });
    $("[chart='column-chart-first-recharge-lifecycle']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"line_div");
    });
    $("[chart='column-chart-month-recharge']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"pie_div");
    });
    $("[chart='column-chart-month-recharge-frequency']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html(),"pie_div");
    });

    //单周付费金额
    $("[chart='line-chart-week-player-pay']").click(function() {
        queryWeekData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });
    searchData();
    $("#searchBtn").click(searchData);
});
function searchData(){
    $('#searchBtn').button('loading');
    $("#line-tabs .active").trigger("click");
    $("#new-player-tabs .active").trigger("click");
    $('#searchBtn').button('reset');
}

function queryData(path,chart_id,line,div_id) {
    //var end = $("#end-date").val();
    //date = new Date(Date.parse(end.replace(/-/g,"/")));
    //beginDate = new Date(date.getTime()-7* 24 * 60 * 60 * 1000);
    //var begin = beginDate.Format("yyyy-MM-dd");
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;
    //打开遮罩层
    playLoadingWithoutTime(chart_id);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "data": {
            dt_json: "{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\""+
            "}"
        },
        "success": function (records) {
            var result = new Array();
            var x_labels = new Array();
            var i = 0;
            var sum=0;
            var mymap = new Object();
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
            $('#searchBtn').button('reset');
            hideLoading(chart_id) ;
        }
    });
};




//单周付费金额
function queryWeekData(path,chart_id,line) {
    //var end = $("#end-date").val();
    //date = new Date(Date.parse(end.replace(/-/g,"/")));
    //beginDate = new Date(date.getTime()-7* 24 * 60 * 60 * 1000);
    //var begin = beginDate.Format("yyyy-MM-dd");
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
