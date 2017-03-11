/**
 * Created by admin on 2016/10/17.
 */
var $tabsActive ;
$(function () {
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    
    //初始化时间下拉框，平台、渠道、区服、国家
    initSearchCondition(true,{"server":"none","country":"none","range":""});
    initDateRangePicker();
    var type = $("#type").val();
    initShowTitle(type);
    //init初始化查询
    var firstType = $("#deviceInfoTabs li:first").find("a").html();
    queryData("getDeviceInfo","line_chart_model",firstType,"model",type);
    queryTableData(firstType,"model",type);
    //tab切换绑定函数
    $("#deviceInfoTabs a[data-toggle='tab']").parent().on("click",function(){
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).find("a").attr("href");
        $(id).addClass('active in').siblings().removeClass('active in');
        var column= $(this).find("a").attr("column");
        queryData("getDeviceInfo","line_chart_"+column,$(this).find("a").html(),column,type);
        queryTableData($(this).find("a").html(),column,type);
    });
    searchData();
    $(".tipB").tooltip ({placement: 'bottom', container: 'body'});
});

function queryData(path,chart_id,line,column,type) {
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    playLoadingWithoutTime(chart_id);
    $.goAjax("post",path,{begin:begin,end:end,plat:$("#all_plat").val(),channel:$("#all_channel").val(),column:column,type:type},
        function (records) {
            var result = new Array();
            var topResult = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            var i = 0;
            var sum=0;
            $.each(records.data,function(key,value) {
                sum+=value.value;
                result[i]=value.value;
                if(i<25 && i<records.data.length){//显示前25排名
                    x_labels[i] = value.key;
                }
                mymap[value.key] = value.value;
                i++;
            });
            for (var j = 0; j < result.length && j<25; j++) {
                topResult[j] = (result[j]*100)/sum;

            }
            initHighChartsColumn(chart_id,"", "",x_labels,"",[{
                name:line,
                data:topResult
            }],mymap);
            hideLoading(chart_id);
            //重置查询按钮
            $('#searchBtn').button('reset');
    });
}
function searchData() {
    var $tabsActive;
    $('#searchBtn').on("click",function () {
        $('#searchBtn').button('loading');
        $("#deviceInfoTabs .active").trigger("click");
    });
    //导出excle事件
    $('.fa-download').parent().on("click",function () {
        var dateRange = $("input[name='date-range']").val().split("to");
        var begin = $.trim(dateRange[0]);
        var end = $.trim(dateRange[1]);
        $tabsActive = $("#deviceInfoTabs .active");
        var type = $("#type").val();
        var plat = $("#all_plat").val();
        var channel = $("#all_channel").val();
        var column =$tabsActive.find("a").attr("column");
        var excelType = encodeURI(encodeURI($tabsActive.find("a").html()));
        var param = 'column='+column+'&type='+type+'&channel='+channel+'&begin='+begin+'&end='+end+'&plat='+plat+"&excelType="+excelType;
        location.href='export_excel_device_table?'+param;
    });
}
function queryTableData(title,column,type) {
    var aoColumns = [
        {"sTitle": title, "mData": "name"},
        {"sTitle": number, "mData": "result"}
    ];
    var dateRange = $("input[name='date-range']").val().split("to");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);

    var plat = $("#all_plat").val();
    var channel = $("#all_channel").val();

    var params =[
        {name: 'plat',  value: plat},
        {name: 'channel',  value: channel},
        {name: 'begin',  value: begin},
        {name: 'end',  value: end},
        {name: 'column',  value: column},
        {name: 'type',  value: type}];

    var url = 'get_device_table';
    playLoading("deviceDataTables");
    commonDataTables("deviceDataTables", url, aoColumns, params,"deviceDataTables");
}
function initShowTitle(type) {
    if(type==1){
        $("#title").html(newUsersDevice);
        $("#tips").html(newUsersDeviceTips);
    }else if(type==2){
        $("#title").html(payDevice);
        $("#tips").html(payDeviceTips);
    }else if(type==3){
        $("#title").html(lostDevice);
        $("#tips").html(lostDeviceTips);
    }else if(type==4){
        $("#title").html(activeDevice);
        $("#tips").html(activeDeviceTips);
    }else{
        $("#title").html(newUsersDevice);
        $("#tips").html(newUsersDeviceTips);
    }
}
