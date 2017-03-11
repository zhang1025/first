/**
 * Created by pengyang@ledo.com on 2016/7/14.
 */
$(document).ready(function() {
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    //初始化时间
    // initDate(null,{"day":0,"format":"yyyy-MM-dd"});
    //初始化平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"country": "","begin":""},{"plat":true,"channel":true})
    }else{
        initSearchCondition(true,{"begin":""},{"plat":true,"channel":true})
    }
    //修改标签名字
    $("#begin_select .input-group-addon").eq(0).html("时间");

    //初始化时间(新单日期插件)
    initSingleDate({startDate:0,endDate:0,maxDate:0});

    // 加载实时在线人数曲线图
    queryTrendChart("online");

    //实时曲线图页签点击操作
    $("#trendTab a[trendChart]").click(function(){
        var type = $(this).attr("trendChart");
        //执行实时曲线查询操作
        queryTrendChart(type);
        initSearchCondition(false,null,{"plat":true,"channel":true});
        if(type!='online'){
            initSearchCondition(false,null,{"plat":false,"channel":false});
        }

    });
    //查询按钮点击操作
    $("#searBtn").click(function(){
        //获取曲线图类型
        var type = $("#trendTab li.active a").attr("trendChart");
        //执行曲线图查询操作
        queryTrendChart(type);
    });


});


// 实时曲线图
function queryTrendChart(type){

    //点击online页签时对平台和渠道进行重置
    if(type!=null&&type=='online'){
        $("#all_plat").val("");
        $("#all_channel").val("");
      //  $("#all_server").select2().val("").trigger("change");

    }

    //折线图所在div id
    var divId = 'trendChart';
    //加载遮罩层
    playLoading('trendContent');
    //日期，平台，渠道，区服
    var begin = $("#begin-date").val();
    var channel = $("#all_channel").val();
    var server = $("#all_server").val();
    //图例名称
    var text;
    //数据库表
    var table;
    //数据列
    var column = 'num';
    //设置不同页签查询的表名、曲线title以及列字段
    if(type!=null&&type=='online'){
        text = '在线';
        column = 'count'
        table = 'real_time_online';
    }else if(type!=null&&type=='register'){
        text = '新增';
        table = 'real_time_register_au';
    }else if(type!=null&&type=='recharge'){
        text = '付费';
        table = 'real_time_recharge';
    }else if(type!=null&&type=='cost'){
        text = '消耗';
        table = 'real_time_cost';
    }else if(type!=null&&type=='role'){
        text = '角色';
        table = 'real_time_register';
        column = 'roleId';
    }

    //参数json串
    var data = {jsonStr:"{\"begin\":\""+begin+"\",\"channel\":\""+channel+"\",\"server\":\""+server+"\",\"table\":\""+table+"\",\"column\":\""+column+"\",\"type\":\""+type+"\",\"divId\":\"myChart\"}"}
    var url = "real_time_trend_chart";
    var myChart = echarts.init(document.getElementById(divId));
    //ajax请求折线图数据
    $.goAjax("POST",url,data,function (results) {
        var xLabel = results.xLabel;
        var titleText = "";
        //拼接图例和数据
        var legend = ['今日'+text,'昨日'+text,'上周'+text];
        var seriesData = [{
            name:legend[0],
            type: 'line',
            data:results.todayArray
        },{
            name:legend[1],
            type: 'line',
            data:results.yesterdayArray
        },{
            name:legend[2],
            type: 'line',
            data:results.lastWeekArray
        }]
        //渲染折线图
        showEchartsLine(divId,titleText,legend,xLabel,seriesData);
        //隐藏遮罩层
        hideLoading('trendContent');
    });

}


