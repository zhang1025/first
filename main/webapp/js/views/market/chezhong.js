/**
 * Created by admin on 2016/11/28 0028
 */
var path = "/market/";
var subType = 1;
$(document).ready(function () {
    $("body").ledo();
    //初始化时间
    initDateRangePicker();
    queryData();
    $('.select').select2();
    initClickFunction();
});
function queryData() {
    var aoColumns = dealTableTitle();
    var time = $("input[name='date-range']").val();
    var dateRange = time.split("to");
    var beginDate = $.trim(dateRange[0]);
    var endDate = $.trim(dateRange[1]);
    var receiveName = $("#s_receive").val();
    var coal = $("#s_coals").val();
    var kuangqu = $("#s_kq").val();
    var carNum = $("#s_plateNum").val();
    var carContract = $("#s_numNo").val();
    var params = [
        {name: 'beginDate', value: beginDate},
        {name: 'endDate', value: endDate},
        {name: 'receiveName', value: receiveName},
        {name: 'name', value: coal},
        {name: 'kuangqu', value: kuangqu},
        {name: 'carNum', value: carNum},
        {name: 'carContract', value: carContract}
    ];
    var url = path + 'get_chezhong_table';
    commonDataTables("czDataTables", url, aoColumns, params, "czData");
}
//处理table的公共title
function dealTableTitle() {
    var aoColumns = new Array();
    aoColumns.push(
        {"sTitle": "煤卡号", "mData": "coalCard", "sWidth": "7%"},
        {"sTitle": "车种", "mData": "carType", "sWidth": "6%"},
        {"sTitle": "车牌号", "mData": "carNum", "sWidth": "6%"},
        {"sTitle": "入矿时间", "mData": "intoTime", "sWidth": "7%"},
        {"sTitle": "入矿称重人", "mData": "intoCzr", "sWidth": "7%"},
        {"sTitle": "入矿重量", "mData": "intoZl", "sWidth": "6%"},
        {"sTitle": "出矿时间", "mData": "outTime", "sWidth": "8%"},
        {"sTitle": "出矿重量", "mData": "outZl", "sWidth": "8%"},
        {"sTitle": "出矿录入人", "mData": "outCzr", "sWidth": "8%"},
        {"sTitle": "净重", "mData": "jzl", "sWidth": "8%"},
        {"sTitle": "合同号", "mData": "carContract", "sWidth": "7%"},
        {"sTitle": "客户名称", "mData": "receiveName", "sWidth": "10%"},
        {"sTitle": "煤种", "mData": "name", "sWidth": "6%"},
        {"sTitle": "矿区", "mData": "kuangqu", "sWidth": "8%"}
    );
    return aoColumns;
}
function initClickFunction() {
    $("#searBtn").on("click", function () {
        queryData();
    });
    //导出excle事件
    $("#downDfInfo").on("click", function () {
        var time = $("input[name='date-range']").val();
        var dateRange = time.split("to");
        var beginDate = $.trim(dateRange[0]);
        var endDate = $.trim(dateRange[1]);
        var receiveName = encodeURI(encodeURI($("#s_receive").val()));
        var coal = encodeURI(encodeURI($("#s_coals").val()));
        var kuangqu = encodeURI($("#s_coals").val($("#s_kq").val()));
        var carNum = $("#s_plateNum").val();
        var carContract = $("#s_numNo").val();
        var param = 'beginDate=' + beginDate + '&endDate=' + endDate+'&carContract='+carContract
            + '&receiveName='+receiveName+'&kuangqu='+kuangqu+'&name='+coal+'&carNum='+carNum;
        location.href = path + 'export_chezhong_excel_data?' + param;
    });
}

