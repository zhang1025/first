$(document).ready(function () {
    var locale = {
        "format": 'YYYY-MM-DD',
        "separator": " ~ ",
        "applyLabel": "确定",
        "cancelLabel": "取消",
        "fromLabel": "起始时间",
        "toLabel": "结束时间'",
        "customRangeLabel": "自定义",
        "weekLabel": "W",
        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
        "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "firstDay": 1
    };

    var ranges = {
        '昨天': [moment(serverDate).subtract(1, 'days'), moment(serverDate).subtract(1, 'days')],
        '前7天': [moment(serverDate).subtract(7, 'days'), moment(serverDate).subtract(1, 'days')],
        '前30天': [moment(serverDate).subtract(30, 'days'), moment(serverDate).subtract(1, 'days')],
        '上上周': [moment(serverDate).subtract(2, 'week').startOf('isoWeek'), moment(serverDate).subtract(2, 'week').endOf('isoWeek')],
        '上周': [moment(serverDate).subtract(1, 'week').startOf('isoWeek'), moment(serverDate).subtract(1, 'week').endOf('isoWeek')],
        '上个月': [moment(serverDate).subtract(1, 'month').startOf('month'), moment(serverDate).subtract(1, 'month').endOf('month')],
        '本月': [moment(serverDate).startOf('month'), moment(serverDate).endOf('month')]
    }



    //初始化界面
    $("body").ledo();

    //初始化访问人数和访问量
    initVisitorsAndViews();

    //初始化时间下拉框
    initSearchCondition(false,{"begin":"none","end":"none","range":"","plat":"none","channel":"none","server":"none","country":"none"})

    $("input[name='date-range']").daterangepicker({
        locale:locale,
        inline:true,
        maxDate:moment(serverDate).subtract(1, 'days'),
        startDate:moment(serverDate).subtract(7, 'days'),
        endDate:moment(serverDate).subtract(1, 'days'),
        ranges:ranges,
        showWeekNumbers:true,
        alwaysShowCalendars:true,
        linkedCalendars:false
    });


    $("input[name='time-range']").daterangepicker({
        locale:locale,
        inline:true,
        maxDate:moment(serverDate).subtract(8, 'days'),
        startDate:moment(serverDate).subtract(14, 'days'),
        endDate:moment(serverDate).subtract(8, 'days'),
        ranges:ranges,
        showWeekNumbers:true,
        alwaysShowCalendars:true,
        linkedCalendars:false
    });


    //查询渠道数据报表
    queryChannelDataReport();


    $(".fa-download").addClass("tip").attr("title","导出到excel");

    $(".tip").tooltip ({placement: 'top', container: 'body'});
    //查询按钮点击操作
    $("#searBtn").click(function(){
        //查询渠道数据报表
        queryChannelDataReport();
    });


    //查询按钮点击操作
    $("#queryBtn").click(function(){
        //查询渠道数据曲线
       queryChannelDataChart();
    });

    //查询渠道数据曲线
    queryChannelDataChart();

    //导出实时数据报表
    $('#channelReport').find('.fa-download').on("click",function(){
        exportToExcel();
    });

})


/**
 * 2级联动 平台--渠道
 * @param queryCode 下拉选中的值
 */
function casecadeSelectDate(queryCode) {
    if($("#channel_selectData").css("display")=="none"){
        return;
    }
    dealChannelForData("get_channel_condition", {"plat": queryCode}, "all_channelData", "选择渠道", "全部渠道",true);
}



function dealChannelForData(url, data, id,initSearch, showName,excludes){
    var optionStr='';
    if(initSearch!='' && initSearch!=null){
        optionStr = "<option value=''>"+initSearch+"</option>";
    }
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        async: false,
        success: function (result) {
            if(data["plat"]=="" || result.resInfo.length==0 ){
                optionStr += "<option value='-1'>"+showName+"</option>";
            }else{
                $.each(result.resInfo, function (i, bean) {
                    var option = "<option value='" + bean.code + "' >" + bean.name + "</option>";
                    optionStr = optionStr + option;
                });
            }
            $('#'+id).html(optionStr);
        }
    });
}

//渠道数据报表
function queryChannelDataReport(){
    var url = "channel_data_report";
    playLoading("dataReport");
    var dateRange = $("input[name='date-range']").val().split("~");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var aoColumns = dealTableTitle(columns);
    var params =[
        {name: 'begin',  value: begin},
        {name: 'end',  value: end},
        {name: 'bLengthChange',value:false}
    ];
    commonCustomDataTables("channelTable", url, aoColumns, params,"channelReport");
    hideLoading("dataReport");
}



//处理table的公共title
function dealTableTitle(columns) {
    var aoColumns = new Array();

    var colVals = eval(columns);
    for(var i=0;i<colVals.length;i++){
        var column = {"sTitle": dealTitle(colVals[i].column_cn), "mData": colVals[i].column_code};
        aoColumns.push(column);
    }
    console.log(aoColumns);
    return	aoColumns;
}
function dealTitle(title) {
    if(title!="" && title!=null){
        if(title.length>4){
            return "<span title='"+title+"' class='tip'>"+title.substring(0,7)+"..</span>";
        }else{
            return "<span title='"+title+"' class='tip'>"+title+"</span>";
        }
    }
}

//加载渠道数据曲线
function queryChannelDataChart(){
    var url="channel_data_chart"
    var begin = $("input[name='time-range']").val();

    var beginArray = begin.split("~");
    var end = $("input[name='date-range']").val();
    var endArray = end.split("~");

    var plat = $("#all_platData").find("option:selected").val();
    var channel = $("#all_channelData").find("option:selected").val();
    var channelName = $("#all_channelData").find("option:selected").text();
    var type = $("#all_item").find("option:selected").val();
    var compareText =  $("#all_item").find("option:selected").text();

    //参数json串
    var data = {jsonStr:"{\"begin\":\""+begin+"\",\"end\":\""+end+"\",\"channel\":\""+channel+"\",\"plat\":\""+plat+"\"}"};



    //ajax请求折线图数据
    $.goAjax("POST",url,data,function (results) {
        var currChartList = results.currChartList;
        var lastChartList = results.lastChartList;
         var currArray = new Array();
         var lastArray = new Array();
        for(var i=0;i<currChartList.length;i++){
            currArray[i] = currChartList[i][type];
        }

        for(var i=0;i<lastChartList.length;i++){
            lastArray[i] = lastChartList[i][type];
        }
        var x_labels = new Array();


        var time1 = (Math.abs(Date.parse(beginArray[1])-Date.parse(beginArray[0])))/1000/60/60/24;
        var time2 = (Math.abs(Date.parse(endArray[1])-Date.parse(endArray[0])))/1000/60/60/24;
        //折线图图例名称
        var labelName1 = channelName+"-"+compareText+"-"+end;
        var labelName2 = channelName+"-"+compareText+"-"+begin;

        if(time2>=time1){
            for(var i=0;i<time2+1;i++){
                x_labels[i] = i+1;
            }
        }else{
            for(var i=0;i<time1+1;i++){
                x_labels[i] = i+1;
            }
        }

        initHighChartsLine("channelChart","", "",x_labels,"","<span style=\"color:{series.color}\">\u25CF</span><span>{series.name}</span>: <b></b> {point.y}<br>","",[{
                    name:labelName1,
                    data:currArray
                },
                {
                    name:labelName2,
                    data:lastArray
                }
            ]);

    });
}
//导出到excel
function exportToExcel(){
    var dateRange = $("input[name='date-range']").val().split("~");
    var begin = $.trim(dateRange[0]);
    var end = $.trim(dateRange[1]);
    var param ='begin='+begin+"&end="+end;
    location.href='export_channel_data?'+param;
}



