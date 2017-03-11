/**
 * 每日产出与消耗
 * Created by machaozhe on 2016-07-15.
 */
$(document).ready(function () {
    //初始化界面
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"begin":"none","end":"none","range":"","country": "","diamond":""})
    }else{
        initSearchCondition(true,{"begin":"none","end":"none","range":"","diamond":""})
    }

    //初始化时间
    initDateRangePicker();

    $("#all_diamond").change(searchData);
    /*
    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
        exportExcelData();
    });*/

    //查询
    searchData();
    //绑定查询按钮
    $("#searBtn").click(searchData);

});


/**
 * 查询
 */
function searchData(){
    //防止重复提交
    $('#searBtn').button('loading');
    var chart_id = $("#consum_output_div .active").attr("chart");
    var path=$("#consum_output_div .active").attr("path");
    queryLines(path, chart_id);
}

/**
 * 曲线
 * @param path
 * @param chart_id
 * @param format
 */
function queryLines(path,chart_id) {
    var value = $("#all_diamond").val();
    if(value=="coin"){
        $("#consum_output_div .active").find("a").html(t_coin);
    }else if(value=="diamond"){
        $("#consum_output_div .active").find("a").html(t_dimond);
    }else{
        $("#consum_output_div .active").find("a").html(t_yuanbao);
    }

    playLoadingWithoutTime(chart_id);

    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var url=path;

    $.goAjax("post",url,{
            dt_json: "{\"begin\":\""+begin+"\"," +
            "\"end\":\""+end+"\",\"plat\":\""
            +$("#all_plat").val()+"\",\"channel\":\""+$("#all_channel").val()+"\",\"server\":\""+$("#all_server").val()+"\",\"country\":\""+$("#all_country").val()
            +"\",\"column\":\""+$("#all_diamond").val()+"\",\"table\":\""+$("#all_diamond").val()+"\"}"
        },function (records) {
            var x_labels = getBeginToEndLabels(begin,end);
            initHighChartsLine(chart_id,"", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b>{point.y}<br>","",[{
                name: t_consum,
                data:records.consum
            },{
                name:t_output,
                data:records.output
            }
            ]);
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searBtn').button('reset');
        }
    );
};