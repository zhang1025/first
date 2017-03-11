/**
 * 充值档位分布的js
 *
 * Created by machaozhe on 2016-10-13.
 */
//充值档位分布柱状图显示top25
var top25 = 25;

$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    //初始化时间下拉框，平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"begin":"none","end":"none","range":"","country": ""})
    }else{
        initSearchCondition(true,{"begin":"none","end":"none","range":""})
    }
    var date = moment(serverDate).subtract(1,"days");
    //初始化时间
    initDateRangePicker({'maxDate':date,'startDate':date,'endDate':date});

    $("[chart='line-chart-recharge-type']").click(function() {
        queryData($(this).attr("path"), $(this).attr("chart"), $(this).children("a").html());
    });

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
        exportExcelData();
    });
    //增加tips
    $('#pnl .fa-download').addClass("tip").attr("title","导出Excel");
    $(".tip").tooltip ({placement: 'top', container: 'body'});

    //查询
    searchData();
    //绑定查询按钮
    $("#searchBtn").click(searchData);
    

});

/**
 * 查询所有数据
 */
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');

    var chart_id = $("#recharge-type-div .active").attr("chart");
    var path=$("#recharge-type-div .active").attr("path");
    queryHistogram(path, chart_id,rechargeType);
    queryDetailedData();
}
/**
 * 查询柱状图
 * @param path
 * @param chart_id
 * @param line
 */
function queryHistogram(path,chart_id,line) {
	//屏蔽罩开启
    playLoading(chart_id);

    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var url = path;
    //ajax的post请求
    $.goAjax("post",url,{
            dt_json: "{" +
            "\"begin\":\""+begin+"\"," +
            "\"end\":\""+end+"\"," +
            "\"plat\":\"" +$("#all_plat").val()+"\"," +
            "\"channel\":\""+$("#all_channel").val()+"\"," +
            "\"server\":\""+$("#all_server").val()+"\"," +
            "\"country\":\""+$("#all_country").val()+"\"}"
        },
        //请求成功后的处理方法
        function (records) {
            var result = new Array();
            var topResult = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            var i = 0;
            var sum = 0;
            $.each(records.data,function(key,value) {
                sum += value.value;
                result[i] = value.value;
                if(i<top25 && i<records.data.length){
                    x_labels[i] = value.key;
                    mymap[value.key] = value.value;
                }
                i++;
            });
            for (var j = 0; j < result.length && j<top25; j++) {
                topResult[j] = (result[j]*100)/sum;

            }
            //柱状图
            initHighChartsColumn(chart_id,"", "",x_labels,"",[{
                name:line,
                data:topResult
            }],mymap);

            //屏蔽罩关闭
            hideLoading(chart_id) ;
            //重置查询按钮
            $('#searchBtn').button('reset');
        }
    );
};

/**
 * 充值档位分布表格(Table)
 */
function queryDetailedData(){
    //table显示的列名
    var aoColumns = [
        { "sTitle": date, "mData": "dateRange"},
        { "sTitle": type, "mData": "rechargeType"},
        { "sTitle": rate, "mData": "rate"}
    ];
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    //参数
    var params = [
        {name: 'begin',   value: begin},
        {name: 'end',     value: end},
        {name: 'plat',    value: $("#all_plat").val()},
        {name: 'channel', value: $("#all_channel").val()},
        {name: 'server',  value: $("#all_server").val()},
        {name: 'country', value: $("#all_country").val()}
        ];

    var url = 'print_rechargeStall_table';
    queryDataTables(params, aoColumns, url);
}

/***
 * 查询表格的公共方法
 * @param list
 * @param aoColumns
 * @param url
 */
function queryDataTables(list, aoColumns,url) {
    commonDataTables("dataTables", url, aoColumns, list,"dataTables");
}

/**
 * 导出充值档位Excel数据
 */
function exportExcelData() {
    //查询条件
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var server = $("#all_server").val();
    var channel = $("#all_channel").val();
    var country = $("#all_country").val();

    //参数
    var param = '&begin='+begin+'&end='+end+'&plat='+plat+'&channel='+channel+'&server='+server+'&country='+country;
    var url = 'export_RechargeStall_excel?'+param;
    location.href=url;
}

