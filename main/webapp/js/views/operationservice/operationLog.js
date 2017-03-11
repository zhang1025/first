/**
 * 操作日志的js
 *
 * Created by machaozhe on 2016-10-25.
 */
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    //详情导出excel绑定函数
    $("#pnl .fa-download").parent().on("click",function(){
        exportExcelData();
    });

    //增加tips
    $('#pnl .fa-download').addClass("tip").attr("title","导出Excel");
    $(".tip").tooltip ({placement: 'top', container: 'body'});
    
    var ranges = {
        '今天': [moment(serverDate), moment(serverDate)],
        '昨天': [moment(serverDate).subtract(1, 'days'), moment(serverDate).subtract(1, 'days')],
        '前7天': [moment(serverDate).subtract(6, 'days'), moment(serverDate)],
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
 * 操作日志表格(Table)
 */
function queryDetailedData(){
    //table显示的列名
    var aoColumns = [
        { "sTitle": "账号", "mData": "account"},
        { "sTitle": "日期", "mData": "dateStr"},
        { "sTitle": "环境", "mData": "gameOrEnv"},
        { "sTitle": "操作时间", "mData": "operationTime"},
        { "sTitle": "操作URL", "mData": "operationUrl"},
        { "sTitle": "操作类型", "mData": "operationDesc"},
        { "sTitle": "ip", "mData": "ip"}
    ];
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    //参数
    var params = [
        {name: 'begin',   value: begin},
        {name: 'end',     value: end},
        {name: 'account',    value: $.trim($("#account_input").val())},
        {name: 'status', value: $.trim($("#operation_select").val())}
        ];

    var url = 'print_operationLog_table';
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
 * 导出操作日志Excel数据
 */
function exportExcelData() {
    //查询条件
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var account = $.trim($("#account_input").val());
    var status = $.trim($("#operation_select").val());

    //参数
    var param = '&begin='+begin+'&end='+end+'&account='+account+'&status='+status;
    var url = 'export_operationLog_excel?'+param;
    location.href=url;
}

