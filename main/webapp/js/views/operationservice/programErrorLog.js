/**
 * 错误日志的js
 *
 * Created by machaozhe on 2016-10-28.
 */
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    //详情导出excel绑定函数
    // $("#pnl .fa-download").parent().on("click",function(){
    //     exportExcelData();
    // });
    var ranges = {
        '今天': [moment(serverDate), moment(serverDate)],
        '昨天': [moment(serverDate).subtract(1, 'days'), moment(serverDate).subtract(1, 'days')],
        '上周': [moment(serverDate).subtract(1, 'week').startOf('isoWeek'), moment(serverDate).subtract(1, 'week').endOf('isoWeek')],
        '本月': [moment(serverDate).startOf('month'), moment(serverDate).endOf('month')]
    }
    initDateRangePicker({'maxDate':moment(serverDate),'startDate':moment(serverDate),'endDate':moment(serverDate),ranges:ranges});
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
    queryDetailedData();
    $('#searchBtn').button('reset');
}

/**
 * 错误日志表格(Table)
 */
function queryDetailedData(){
    //table显示的列名
    var aoColumns = [
        { "sTitle": "时间", "mData": "dateStr"},
        { "sTitle": "游戏", "mData": "game"},
        { "sTitle": "类型", "mData": "errorType"},
        { "sTitle": "URL", "mData": "errorUrl"},
        { "sTitle": "次数", "mData": "num"},
        { "sTitle": "出错类名", "mData": "className"},
        { "sTitle": "出错方法", "mData": "methodName"},
        { "sTitle": "错误信息", "mData": "errorDesc"}
    ];
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    //参数
    var params = [
        {name: 'begin',   value: begin},
        {name: 'end',     value: end},
        {name: 'type',    value: $.trim($("#error_select").val())}
        ];

    var url = 'print_programErrorLog_table';
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
 * 导出错误日志Excel数据(没有导出需求)
 */
function exportExcelData() {
    //查询条件
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var type = $.trim($("#error_select").val());

    //参数
    var param = '&begin='+begin+'&end='+end+'&type='+type;
    var url = 'export_programErrorLog_excel?'+param;
    location.href=url;
}

