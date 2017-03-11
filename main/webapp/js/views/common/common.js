/**
 * 工具模块
 */
var Utils = {};
Utils.Constants = {
    ONE_DAY: 86400000, // 1000*60*60*24
    DATE_REGEXP: /^20\d{2}-\d{2}-\d{2}/
};


var myChart;
/**
 * 时间工具
 */
Utils.DateUtils = {
    /**
     * 两个时间的间隔，单位为天，注意若start，比end还晚，那就是负值
     *
     * @param start
     *            日期字符串，形如“yyyy-mm-dd”
     * @param end
     *            日期字符串，形如“yyyy-mm-dd”
     * @returns {Number}
     */
    daysBetween: function (start, end) {
        if (!Utils.Constants.DATE_REGEXP.test(start)) {
            return null;
        }
        if (!Utils.Constants.DATE_REGEXP.test(end)) {
            return null;
        }
        var startArr = start.split("-"), endArr = end.split("-"), startDate = new Date(
            startArr[0], startArr[1] - 1, startArr[2]), endDate = new Date(
            endArr[0], endArr[1] - 1, endArr[2]), milliseconds = endDate
            .getTime()
            - startDate.getTime(), days = milliseconds
            / Utils.Constants.ONE_DAY;

        return days;
    },
    /**
     * 在指定日期（字符串形式：“yyyy-mm-dd”）上加上指定天数后，返回新的的时间字符串
     *
     * @param dateStr
     * @param dayNum
     * @returns {String}
     */
    plusDayNum: function (datestr, dayNum) {
        if (!Utils.Constants.DATE_REGEXP.test(datestr)) {
            return null;
        }
        var array = datestr.split("-");

        var date = new Date(array[0], array[1] - 1, array[2]), milliseconds = dayNum
            * Utils.Constants.ONE_DAY;
        newDateMilliseconds = milliseconds + date.getTime(),
            newDate = new Date(serverDate), newDate.setTime(newDateMilliseconds),
            month = newDate.getMonth() + 1, day = newDate.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return newDate.getFullYear() + "-" + month + "-" + day;
    },
    /**
     * 将日期转换为统一的String格式
     *
     * @param date
     * @returns {String}
     */
    dateToString: function (date) {
        if (date) {
            var year = date.getFullYear(), month = date.getMonth() + 1, day = date
                .getDate();
            if (month < 10) {
                month = "0" + month;
            }
            if (day < 10) {
                day = "0" + day;
            }
            return year + "-" + month + "-" + day;
        }
        return null;
    },
    /**
     * 将日期字符串转换为日期对象，要求日期字符串为yyyy-mm-dd格式
     *
     * @param date
     * @returns {String}
     */
    stringToDate: function (str) {
        if (!Utils.Constants.DATE_REGEXP.test(str)) {
            return null;
        }
        return new Date(str.replace(/-/g, "/"));
    },
    /**
     * 获取指定日期所在星期的周一，返回字符串
     *
     * @param theDate
     * @returns {String}
     */
    firstDateOfWeek: function (theDate) {
        var firstDateOfWeek, dayOfWeek = theDate.getDay();
        // 如果是星期天
        if (dayOfWeek == 0) {
            firstDateOfWeek = this.plusDayNum(this.dateToString(theDate), -6);
        } else {
            firstDateOfWeek = this.plusDayNum(this.dateToString(theDate),
                -(dayOfWeek - 1));
        }
        return firstDateOfWeek;
    },
    /**
     * 获取指定日期所在星期的周日，返回字符串
     *
     * @param theDate
     * @returns {String}
     */
    lastDateOfWeek: function (theDate) {
        // 先得到周一，再加6
        return this.plusDayNum(this.firstDateOfWeek(theDate), 6);
    },
    /**
     * 获取指定日期所在月的第一天
     * @param theDate
     * @returns {String}
     */
    firstDateOfMonth: function (theDate) {
        theDate.setDate(1); //第一天
        var endDate = new Date(theDate);
        var month_first = new XDate(theDate).toString('yyyy-MM-dd');
        return month_first;
    },
    /**
     * 获取指定日期所在月的最后一天
     * @param theDate
     * @returns {String}
     */
    endDateOfMonth: function (theDate) {
        theDate.setDate(1); //第一天
        var endDate = new Date(theDate);
        endDate.setMonth(theDate.getMonth()+1);
        endDate.setDate(0);
        var month_end = new XDate(endDate).toString('yyyy-MM-dd');
        return month_end;
    },
    /**
     * 获取指定日期偏移指定月数后的日期
     * @param theDate
     * @returns {String}
     */
    plumMonthOfTheDate: function (theDate,monthNum) {
        var endDate = new Date(theDate);
        endDate.setMonth(theDate.getMonth()+monthNum);
        //endDate.setDate(0);
        var result_date = new XDate(endDate).toString('yyyy-MM-dd');
        return result_date;
    }
};

$(function () {
    initBox();
    // initDatePicker(); //公共初始化日期
});

function initDatePicker() {
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        endDate: '+1',
        language: 'zh-CN',
        inline:true
    });
    $(".datepicker").datepicker("setEndDate", $.format.date(new Date(serverDate).getTime()-24*60*60*1000,"yyyy-MM-dd"));
}
function initRealTimeDatePicker() {
    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        weekStart: 1,
        autoclose: true,
        todayBtn: 'linked',
        endDate: '+1',
        language: 'zh-CN',
        inline:true
    });
}
function initMonthPicker(){
    $('.datepicker').datepicker({
        format: 'yyyy-mm',
        weekStart: 1,
        autoclose: true,
        endDate: '+1',
        language: 'zh-CN',
        inline:true,
        startView:1,
        minView:1
    });
    var now = new Date(serverDate);
    $(".datepicker").datepicker("setEndDate",$.format.date(now.setMonth(now.getMonth() - 1, 1), "yyyy-MM"));
}
function initBox() {
    $('.btn-close').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().parent().fadeOut();
    });
    $('.btn-minimize').click(
        function (e) {
            e.preventDefault();
            var $target = $(this).parent().parent().next('.box-content');
            if ($target.is(':visible'))
                $('em', $(this)).removeClass('icon-chevron-up').addClass(
                    'icon-chevron-down');
            else
                $('em', $(this)).removeClass('icon-chevron-down').addClass(
                    'icon-chevron-up');
            $target.slideToggle();
        });
}

function showValidateTip(_info) {
    $("#validate_content").html(_info);
    $("#validate_tip").show();
}
function showSuccessTip(_info) {
    $("#success_content").html(_info);
    $("#success_tip").show();
}

function stringToDate(str) {
    return new Date(str.replace(/-/g, "/"));
}

function dateFormat(date) {
    return $.format.date(date, "yyyy-MM-dd");
}

function timestampFormat(date) {
    return $.format.date(date, "yyyy-MM-dd hh:mm:ss");
}
function timestampFormat2(date) {
    return $.format.date(date, "yyyy-MM-dd HH:mm:ss");
}

/**
 * 时间和差
 */
function daysTime(_date, day) {
    var time = _date.split("-");

    var now = new Date(time[0], time[1] - 1, time[2]); //
    var milliseconds = day * 1000 * 60 * 60 * 24;
    var testdate = milliseconds + now.getTime();
    var testDate = new Date(serverDate);
    testDate.setTime(testdate);
    var month = testDate.getMonth() + 1;
    var day = testDate.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return testDate.getFullYear() + "-" + month + "-" + day;
}


function m_daysTime(_date, n) {

    var nowtime1 = new Date(_date).getTime();
    nowtime1 = nowtime1 + n * 1000 * 60 * 60 * 24;
    nowtime1 = new Date(nowtime1);
    var month = nowtime1.getMonth() + 1;
    var day = nowtime1.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    return nowtime1.getFullYear() + "-" + month + "-" + day;

}

function initSelect2(selId, optn, placeholder) {
    $("#" + selId).html(optn);
    $("#" + selId).select2({
        placeholder: placeholder,
        allowClear: true,
        maximumSelectionSize: 5
    });
    $("#" + selId + "_clear").click(function () {
        $("#" + selId).select2("val", "");
    });
}

/**
 * 新增customRenderFunc为前端自定义处理row渲染函数，加入createRow函数中
 * 可以传函数本身，也可以传函数名，为此自定义函数传3个参数row,data,index 
 * row 当前tr对象  data行数据对象 index 行下标
 * @param tableId table的id
 * @param url 加载数据的url
 * @param aoColumns 数据列定义
 * @param params 访问url传参
 * @param lodingId 遮罩层的id
 * @param customRenderFunc 自定义处理渲染函数
 * @returns
 */
function commonDataTables(tableId, url, aoColumns, params,lodingId,customRenderFunc) {
	//初始化每页显示数量为10，可以指定，参数里面指定initLength即可
	var initLength = 10;
	for (var i = 0; i < params.length; i++) {
        if(params[i].name=="initLength"){
        	initLength = params[i].value;
        }
    }
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": false,
            "bProcessing": false, //不用自带的loading,使用系统插件waitMe
            "bFilter": false,
            "bPaginate": true,//是否启用分页
            "bServerSide": true,
            "bLengthChange": false, //隐藏每页显示n条记录框
            "bAutoWidth": true,
            "iDisplayLength": initLength,
            "sAjaxSource": url,
            "bDeferRender":true,
            "bDestroy": true,
            "bScrollCollapse": true,
            "sServerMethod": "POST",
            "aoColumns": aoColumns,
            "fnServerParams": function (aoData) {
                for (var i = 0; i < params.length; i++) {
                    aoData.push(params[i]);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
            	playLoadingWithoutTime(lodingId);
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": {
                        dt_json: $.toJSON(aoData)
                    },
                    "success": function (records) {
                        fnCallback(records);
                        hideLoading(lodingId);
                    },
                    "complete":function(XMLHttpRequest,status){
                    	if(status=="parsererror"){
                    		//超时重新登录
                    		login_url = location.protocol+"//"+
                    					location.host+"/"+
                    					location.pathname.split("/")[1]+
                    					"/login";
                    		window.location.assign(login_url);
                    	}
                    }
                });
            },
            "createdRow":function (row,data,index) { //行数据居中显示
                $("td",row).css("text-align","center");
                if(customRenderFunc){
            		if($.isFunction(customRenderFunc)) 
            			customRenderFunc(row,data,index);
            		else
            			window[customRenderFunc].apply(null,[row,data,index]);
            	}
            },
            "oLanguage": {
                "sLengthMenu": '每页显示<select class="form-control input-sm">'
                    + '<option value="10">10</option>'
                    + '<option value="20">20</option>'
                    + '<option value="50">50</option>'
                    + '<option value="100">100</option>'
                    + '</select>条记录',
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "当前显示 0 到 0 条，共 0 条记录",
                "sInfoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "sProcessing": "正在加载中...",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 尾页 "
                }
            }
        });
    var table = $('#' + tableId).DataTable();
    var columnLength = $('#' + tableId).find("thead tr th").length;
    $('#' + tableId+" tbody").on('mouseenter','td',function () {
       var colIdx = table.cell(this).index().column;
        if(columnLength > 3 )
        {
            $(table.cells().nodes()).removeClass('highlight');
            $(table.column(colIdx).nodes()).addClass('highlight');
        }
        $(table.row(table.cell(this).index().row).nodes()).siblings().removeClass('highlight');
        $(table.row(table.cell(this).index().row).nodes()).addClass('highlight');
    });
    //列标题居中显示
    $('.sorting_disabled').css("text-align","center");
    return dt;
}

/**
 * 新增customRenderFunc为前端自定义处理row渲染函数，加入createRow函数中
 * 可以传函数本身，也可以传函数名，为此自定义函数传3个参数row,data,index
 * row 当前tr对象  data行数据对象 index 行下标
 * @param tableId table的id
 * @param url 加载数据的url
 * @param aoColumns 数据列定义
 * @param params 访问url传参
 * @param lodingId 遮罩层的id
 * @param customRenderFunc 自定义处理渲染函数
 * @returns
 */
function commonDataTablesWithLength(tableId, url, aoColumns, params,lodingId,customRenderFunc) {
    //初始化每页显示数量为10，可以指定，参数里面指定initLength即可
    var initLength = 10;
    for (var i = 0; i < params.length; i++) {
        if(params[i].name=="initLength"){
            initLength = params[i].value;
        }
    }
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": false,
            "bProcessing": false, //不用自带的loading,使用系统插件waitMe
            "bFilter": false,
            "bPaginate": false,//是否启用分页
            "bServerSide": true,
            "bLengthChange": false,//隐藏每页显示n条记录框
            "bAutoWidth": true,
            "iDisplayLength": initLength,
            "sAjaxSource": url,
            "bDeferRender":true,
            "bDestroy": true,
            "bScrollCollapse": true,
            "sServerMethod": "POST",
            "aoColumns": aoColumns,
            "fnServerParams": function (aoData) {
                for (var i = 0; i < params.length; i++) {
                    aoData.push(params[i]);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
                playLoadingWithoutTime(lodingId);
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": {
                        dt_json: $.toJSON(aoData)
                    },
                    "success": function (records) {
                        fnCallback(records);
                        hideLoading(lodingId);
                    },
                    "complete":function(XMLHttpRequest,status){
                        if(status=="parsererror"){
                            //超时重新登录
                            login_url = location.protocol+"//"+
                                location.host+"/"+
                                location.pathname.split("/")[1]+
                                "/login";
                            window.location.assign(login_url);
                        }
                    }
                });
            },
            "createdRow":function (row,data,index) { //行数据居中显示
                $("td",row).css("text-align","center");
                if(customRenderFunc){
                    if($.isFunction(customRenderFunc))
                        customRenderFunc(row,data,index);
                    else
                        window[customRenderFunc].apply(null,[row,data,index]);
                }
            },
            "oLanguage": {
                "sLengthMenu": '',
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "共 _TOTAL_ 条记录",
                "sInfoEmpty": "当前显示 0 到 0 条，共 0 条记录",
                "sInfoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "sProcessing": "正在加载中...",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 尾页 "
                }
            }
        });
    var table = $('#' + tableId).DataTable();
    $('#' + tableId+" tbody").on('mouseenter','td',function () {
        var colIdx = table.cell(this).index().column;
        //$(table.cells().nodes()).removeClass('highlight');
        //$(table.column(colIdx).nodes()).addClass('highlight');
        //$(table.row(table.cell(this).index().row).nodes()).siblings().removeClass('highlight');
        //$(table.row(table.cell(this).index().row).nodes()).addClass('highlight');
    });
    //列标题居中显示
    $('.sorting_disabled').css("text-align","center");
    return dt;
}






/**
 * 自定义table 满足不分页及排序等需求
 * @param tableId
 * @param url
 * @param aoColumns
 * @param params
 * @param lodingId
 * @param customRenderFunc
 * @returns
 */
function commonCustomDataTables(tableId, url, aoColumns, params,lodingId,customRenderFunc) {
	//初始化参数
	var option = { 
	  initLength:10,
	  bSort:false,
	  bProcessing:false, 
	  bFilter:false,
	  bPaginate:true, 
	  bServerSide:true,
	  bLengthChange:false,//隐藏每页显示n条记录框
	  bAutoWidth:true,
	  bDeferRender:true,
	  bDestroy:true,
	  bScrollCollapse:true};
	//自定义参数覆盖默认值
	for (var i = 0; i < params.length; i++) {
        option[params[i].name] = params[i].value;
    }
    var dt = $('#' + tableId).dataTable(
        {
            "bSort": option.bSort,//是否排序
            "bProcessing": option.bProcessing,
            "bFilter": option.bFilter,
            "bPaginate": option.bPaginate,//是否启用分页
            "bServerSide": option.bServerSide,//排序开启 此处必须设置为false
            "bLengthChange": option.bLengthChange,
            "bAutoWidth": option.bAutoWidth,
            "iDisplayLength": option.initLength,
            "sAjaxSource": url,
            "bDeferRender":option.bDeferRender,
            "bDestroy": option.bDestroy,
            "bScrollCollapse": option.bScrollCollapse,
            "sServerMethod": "POST",
            "aoColumns": aoColumns,
            "fnServerParams": function (aoData) {
                for (var i = 0; i < params.length; i++) {
                    aoData.push(params[i]);
                }
            },
            "fnServerData": function (sSource, aoData, fnCallback) {
            	playLoadingWithoutTime(lodingId);
                $.ajax({
                    "dataType": 'json',
                    "type": "POST",
                    "url": sSource,
                    "data": {
                        dt_json: $.toJSON(aoData)
                    },
                    "success": function (records) {
                        fnCallback(records);
                        hideLoading(lodingId);
                    },
                    "complete":function(XMLHttpRequest,status){
                    	if(status=="parsererror"){
                    		//超时重新登录
                    		login_url = location.protocol+"//"+
                    					location.host+"/"+
                    					location.pathname.split("/")[1]+
                    					"/login";
                    		window.location.assign(login_url);
                    	}
                    }
                });
            },
            "createdRow":function (row,data,index) { //行数据居中显示
                $("td",row).css("text-align","center");
                if(customRenderFunc){
            		if($.isFunction(customRenderFunc)) 
            			customRenderFunc(row,data,index);
            		else
            			window[customRenderFunc].apply(null,[row,data,index]);
            	}
            },
            "oLanguage": {
                "sLengthMenu": '每页显示<select class="form-control input-sm">'
                    + '<option value="10">10</option>'
                    + '<option value="20">20</option>'
                    + '<option value="50">50</option>'
                    + '<option value="100">100</option>'
                    + '</select>条记录',
                "sZeroRecords": "对不起，查询不到任何相关数据",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "sInfoEmpty": "当前显示 0 到 0 条，共 0 条记录",
                "sInfoFiltered": "(数据表中共为 _MAX_ 条记录)",
                "sProcessing": "正在加载中...",
                "sSearch": "搜索：",
                "sUrl": "",
                "oPaginate": {
                    "sFirst": " 首页 ",
                    "sPrevious": " 上一页 ",
                    "sNext": " 下一页 ",
                    "sLast": " 尾页 "
                }
            }
        });
    var table = $('#' + tableId).DataTable();
    var columnLength = $('#' + tableId).find("thead tr th").length;
    $('#' + tableId+" tbody").on('mouseenter','td',function () {
       var colIdx = table.cell(this).index().column;
        if(columnLength > 3 )
        {
            $(table.cells().nodes()).removeClass('highlight');
            $(table.column(colIdx).nodes()).addClass('highlight');
        }
        $(table.row(table.cell(this).index().row).nodes()).siblings().removeClass('highlight');
        $(table.row(table.cell(this).index().row).nodes()).addClass('highlight');
    });
    //列标题居中显示
    $('.sorting_disabled').css("text-align","center");
    return dt;
}

function initHighChartsColumn(chartId,titile,subtitile,categories,yTitle,series,mymap,closeNoData) {
    //closeNoData为true时关闭noData的屏蔽罩
    if(!closeNoData && !noData(chartId,series)){
        return;
    }
    $('#'+chartId).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: titile
        },
        subtitle: {
            text: subtitile
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            //max:100,
            title: {
                text: yTitle
            },
            labels:{
                format: '{value} %'
            }
        },
        tooltip: {
            formatter:function(){
                return '<span style="color:lightskyblue">'+this.series.name+'</span><br>'+this.x+'<br/><b>数值</b>：'+mymap[this.x] +' <br><b>占比</b>：'+this.y.toFixed(2)+'%';
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series,
        credits:{
            enabled:false,
            text:''
        }
    });
}


function initHighChartsLineForExtra(chartsId, title, subTitle, categories, yTitle ,extraFormat, tooltipValueSuffix, series) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'line',
            backgroundColor: '#FCFCFC' // transparent
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            /*            labels:{
             format:'{value}'+yAppend
             },*/
            title: {
                text: yTitle
            },
            type:'linear',
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        tooltip: {
            valueSuffix: tooltipValueSuffix,
            formatter: function () {
                var s = this.x;
                $.each(this.points, function (i) {
                    if(i==1){ //第二条线 加额外extraFormat属性
                        s += '<br/>' + this.series.name + ': <b>' + this.y +"</b> <br>"+extraFormat+"<b>"+this.point.zb+"</b>";
                    }else{
                        s += '<br/>' + this.series.name + ': <b>' + this.y+"</b>" ;
                    }
                });
                return s;
            },
            shared:true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}









function initHighChartsLine(chartsId, title, subTitle, categories, yTitle ,pointFormat, tooltipValueSuffix, series) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'line',
            backgroundColor: '#ffffff' // transparent
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                //rotation: -45,
                //align: 'right'
            }
        },
        yAxis: {
/*            labels:{
                format:'{value}'+yAppend
            },*/
            title: {
                text: yTitle
            },
            type:'linear',
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        tooltip: {
            valueSuffix: tooltipValueSuffix,
            pointFormat: pointFormat,
            shared:true
        },
        legend: {
            // layout: 'vertical',
            // align: 'right',
            // verticalAlign: 'top',
            // x: -10,
            // y: 100,
            // borderWidth: 0
            enabled:false
        },
        series: series,
        credits:{
            enabled:false
        }
    });
    //刷新highchart布局
    $("#"+chartsId).highcharts().reflow();
}

/**
 * 可点击的折线图
 * @param plotOptions 数据点相关属性设置，比如事件event触发 
 * for example ：单击事件触发自定义函数showDetail 
 * 	       plotOptions = {
        		cursor:'pointer',
        		events:{
	            	click:function(event){
	            		showDetail(event.point.category,this.name);
	            	}
	            }
            };
 */
function initHighChartsLineClick(chartsId, title, subTitle, categories, yTitle ,pointFormat, tooltipValueSuffix, series,plotOptions) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'line',
            backgroundColor: '#FCFCFC'  
        },
        title: {
            text: title,
            x: -20
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            title: {
                text: yTitle
            },
            type:'linear',
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        plotOptions:{
        	series : plotOptions
        },
        tooltip: {
            valueSuffix: tooltipValueSuffix,
            pointFormat: pointFormat,
            shared:false
        },
        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'top',
//            x: -10,
//            y: 100,
//            borderWidth: 0
        	enabled:false
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}

function initHighChartsLineForRealTime(chartsId, title, subTitle, categories, yTitle ,pointFormat, tooltipValueSuffix, series,mymap1,mymap2) {
    $('#' + chartsId).highcharts({
        chart: {
            zoomType: 'x',
            spacingRight: 20
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                //rotation: -45,
                //align: 'right'
            }
        },
        yAxis: {
            title: {
                text: yTitle
            },
            type:'linear',
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        plotOptions:{
            area: {
                fillColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                lineWidth: 1,
                marker: {
                    enabled: false
                },
                shadow: false,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        // tooltip: {
        //     valueSuffix: tooltipValueSuffix,
        //     pointFormat: pointFormat,
        //     shared:true
        // },
        tooltip: {
            formatter:function(){
                return this.x+'<br><b>'+this.series.name+'</b>：'+Highcharts.numberFormat(this.y,'','',',')+'<br><b>'+rihuanbi+'</b>：<span style="color: '+(mymap1[this.x].indexOf("-")<0?'red':'mediumseagreen')+'">'+mymap1[this.x]+'%</span><br><b>'+zhoutongbi+'</b>：<span style="color: '+(mymap2[this.x].indexOf("-")<0?'red':'mediumseagreen')+'">'+mymap2[this.x]+'%</span>';
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 100
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}
var initChartsLine=function(chartsId, title, subTitle, categories, yTitle ,pointFormat, tooltipValueSuffix, series) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'line',
            backgroundColor: '#FCFCFC' // transparent
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
/*            labels:{
                format:'{value}'+yAppend
            },*/
            title: {
                text: yTitle
            },
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ],
            type:'linear'
        },
        tooltip: {
            valueSuffix: tooltipValueSuffix,
            pointFormat: pointFormat,
            shared:true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}





var initChartsAreaspLine=function(chartsId, title, subTitle, categories, yTitle ,pointFormat, tooltipValueSuffix, series,closeNoData) {
    //closeNoData为true时关闭noData的屏蔽罩
    if(!closeNoData && !noData(chartsId,series)){
        return;
    }
    $('#' + chartsId).highcharts({
        chart: {
            type: 'areaspline',
            backgroundColor: '#FCFCFC'// transparent
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
/*            labels:{
                format:'{value}'+yAppend
            },*/
            title: {
                text: yTitle
            },
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ],
            type:'linear'
        },
        tooltip: {
            valueSuffix: tooltipValueSuffix,
            pointFormat: pointFormat,
            shared:true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}
var initChartsPie=function(chartsId, title, subTitle , tooltipValueSuffix, series) {
    $('#' + chartsId).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: title,
            x: -20
            // center
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        tooltip: {
            pointFormat: '{series.name}<br><b>数值</b>: {point.y:.2f} <br><b>占比: </b>{point.percentage:.2f}%</b>'
        },
        series: series,
        credits:{
            enabled:false
        }
    });
}
function initHighChartsBar(chartsId, title, subTitle, categories, yAxisTitle, series,closeNoData) {
    //closeNoData为true时关闭noData的屏蔽罩
    if(!closeNoData && !noData(chartsId,series)){
        return;
    }
    $('#' + chartsId).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: title
        },
        subtitle: {
            text: subTitle
        },
        xAxis: {
            categories: categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisTitle,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -100,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: series
    });
}



function initHighChartsBarNew(chartsId, title, subTitle, categories, yAxisTitle, series ,mymap) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            categories: categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            max:100,
            title: {
                text: null
            }, labels: {
                formatter: function () {
                    return this.value + "%";
                }
            }
        },
        tooltip: {
            formatter:function(){
                return this.x+'<br><span style="color:lightskyblue">'+this.series.name+'  </span><br><b>数值</b>：'+mymap[this.x] +' <br><b>占比</b>：'+this.y.toFixed(2)+'%';
            }
        },
//        plotOptions: {
//            bar: {
//                dataLabels: {
//                    enabled: true
//                }
//            }
//        },
//        legend: {
//            layout: 'vertical',
//            align: 'right',
//            verticalAlign: 'top',
//            x: -100,
//            y: 100,
//            floating: true,
//            borderWidth: 1,
//            backgroundColor: '#FFFFFF',
//            shadow: true
//        },
//        credits: {
//            enabled: false
//        },
        series: series
    });
}

/*
function initHighChartsColumn(chartsId, title, subTitle, categories, yAxisTitle, series) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#FCFCFC' // transparent
        },
        title: {
            text: title
        },
        subtitle: {
            text: subTitle
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: yAxisTitle
            }
        },
        tooltip: {
            // headerFormat: '<span
            // style="font-size:10px">{point.key}</span><table>',
            // pointFormat: '<tr><td
            // style="color:{series.color};padding:0">{series.name}: </td>' +
            // '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            // footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
}*/

// 初始化运营商
function initProviderSel(id, providerList) {
    var options = "";
    for (var i = 0; i < providerList.length; i++) {
        var provider = providerList[i];
        options += "<option value='" + provider.provider_id + "'>"
            + provider.provider_name + "</option>";
    }
    $("#" + id).html(options);
    return options;
}

//初始化运营商带全部
function initProviderWithAllSel(id, providerList) {
    var options = "<option value='all'>全部</option>";
    for (var i = 0; i < providerList.length; i++) {
        var provider = providerList[i];
        options += "<option value='" + provider.provider_id + "'>"
            + provider.provider_name + "</option>";
    }
    $("#" + id).html(options);
    return options;
}

// 初始化服务器
function initServerSel(id, serverList) {
    var options = "<option value='all'>全部</option>";
    // var options = "";
    var providerServerList = getInitServerList();
    for (var i = 0; i < providerServerList.length; i++) {
        var server = providerServerList[i];
        options += "<option value='" + server.groupName + "'>" + server.alias
            + "</option>";
    }
    $("#" + id).html(options);
    return options;
}
function getInitServerList() {
    var serverLsit = null;
    var option = {
        url: gamePath + 'gameincome/dailyreport/initProvidersAndServers',
        type: "post",
        dataType: "json",
        async: false,
        data: {},
        success: function (records) {
            serverLsit = records.serverLsit;
        },
        error: function () {

        }
    };
    $.ajax(option);

    return serverLsit;
}

// 运营商与服务器联动:
// provider：运营商值
// gameServerId:服务器ID
function providerAndServerLinkChange(provider, gameServerId) {
    var option = {
        url: gamePath + 'gameincome/dailyreport/initQueryCondition',
        type: "post",
        dataType: "json",
        data: {
            gameId: gameId,
            provider: provider
        },
        success: function (records) {
            var servers = records.servers;
            initProviderServerSel(gameServerId, servers);
        },
        error: function () {

        }
    };
    $.ajax(option);
}

function initProviderServerSel(id, serverList) {
    var options = "<option value='all'>全服</option>";
    // var options = "";
    for (var i = 0; i < serverList.length; i++) {
        var server = serverList[i];
        options += "<option value='" + server.groupName + "'>" + server.alias
            + "</option>";
    }
    $("#" + id).html(options);
    return options;
}

function getGraphServerList() {
    var graphServerList = null;
    var option = {
        url: gamePath + 'gameincome/dailyreport/initProvidersAndServers',
        type: "post",
        dataType: "json",
        async: false,
        data: {},
        success: function (records) {
            graphServerList = records.graphServerList;
        },
        error: function () {

        }
    };
    $.ajax(option);

    return graphServerList;
}

function initGraphProviderServerSel(serverList) {
    var options = "";
    for (var i = 0; i < serverList.length; i++) {
        var server = serverList[i];
        options += "<option value='" + server.groupName + "'>" + server.alias
            + "</option>";
    }
    return options;
}

function formatNumber(n) {
    var j = ",";
    var s = n + "";
    var l = s.length;
    var m = l % 3;
    if (m == l)
        return s;
    else if (m == 0)
        return (s.substring(m).match(/\d{3}/g)).join(j);
    else
        return [ s.substr(0, m) ].concat(s.substring(m).match(/\d{3}/g))
            .join(j);
}

// 格式化日期
function formatDateStr(datestr) {
    var time = datestr.split("-");
    var now = new Date(time[0], time[1] - 1, time[2]);
    var day = now.getDay();
    var week;
    switch (day) {
        case 0:
            week = "星期日";
            break;
        case 1:
            week = "星期一";
            break;
        case 2:
            week = "星期二";
            break;
        case 3:
            week = "星期三";
            break;
        case 4:
            week = "星期四";
            break;
        case 5:
            week = "星期五";
            break;
        case 6:
            week = "星期六";
            break;
        default:
            break;
    }
    return datestr + "( " + week + " )";
}

// 通用函数：格式化数据为%号格式显示
function formatPercent(n) {
    return (n * 100).toFixed(2) + '%';
}

function formatDouble(n) {
    return n.toFixed(2);
}
// 自动换行
function strAutoBr(data, type, row) {
    var oldstr = data;
    var newstr = '';
    var max = 50;
    if (oldstr.length > max) {
        var i = oldstr.length % max == 0 ? parseInt(oldstr.length / max)
            : (parseInt(oldstr.length / max) + 1);
        for (var j = 0; j < i; j++) {
            newstr += oldstr.substr(j * 50, max) + '<br>';
        }
    } else {
        newstr = oldstr + "";
    }

    return newstr;
}

// 初始化入口标识
function initClientSel(id) {
    var options = "<option value='QB'>全部</option>"
        + "<option value='WZD'>完整端</option>"
        + "<option value='WD'>微端</option>"
        + "<option value='WYD'>网页端</option>";
    $("#" + id).html(options);
}

function initClientSelByFlag(id, isClient) {
    if (isClient == 1) { //分端
        initClientSel(id);
    } else {
        var options = "<option value='QB'>全部</option>";
        $("#" + id).html(options);
    }
}

//格式化入口
function formatClient(data) {
    var re = "全部";
    if (data == 'WZD') re = "完整端";
    if (data == 'WD') re = "微端";
    if (data == 'WYD') re = "网页端";
    return re;
}

function initHighchartsStackedColumn(chartsId, title, categories, yAxisTitle, series, unit, max) {
    $('#' + chartsId)
        .highcharts(
        {
            chart: {
                type: 'column',
                backgroundColor: '#FCFCFC' // transparent
            },
            title: {
                text: title
            },
            xAxis: {
                categories: categories
            },
            yAxis: {
                min: 0,
                max: max,
                title: {
                    text: yAxisTitle
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor)
                            || 'gray'
                    }
                },
                labels: {
                    formatter: function () {
                        return this.value + unit;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>'
                        + this.series.name + ': ' + this.y
                        + unit + '<br/>' + 'Total: '
                        + this.point.stackTotal + unit;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor)
                            || 'white',
                        formatter: function () {
                            return this.y + unit;
                        }
                    }
                }
            },
            series: series
        });
}

function isInteger(str) {
    var regex = /^\d+$/;
    return regex.test(str);
}

function initHighChartsLineDetails(chartsId, title, subTitle, categories, yTitle, tooltipValueSuffix, series, min, max, unit, xTitle) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'line',
            backgroundColor: '#FCFCFC' // transparent
        },
        title: {
            text: title,
            x: -20
            // center
        },
        subtitle: {
            text: subTitle,
            x: -20
        },
        xAxis: {
            categories: categories,
            labels: {
                rotation: -45,
                align: 'right'
            },
            title: {
                text: xTitle
            }
        },
        yAxis: {
            min: min,
            title: {
                text: yTitle
            },
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ],
            labels: {
                formatter: function () {
                    return this.value + unit;
                }
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>'
                    + this.series.name + ': ' + this.y
                    + unit;
            },
            valueSuffix: tooltipValueSuffix
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 100,
            borderWidth: 0
        },
        series: series
    });
}

function initHighChartsColumnDetails(chartsId, title, subTitle, categories, yAxisTitle, series, min, max, unit, xTitle) {
    $('#' + chartsId).highcharts({
        chart: {
            type: 'column',
            backgroundColor: '#FCFCFC' // transparent
        },
        title: {
            text: title
        },
        subtitle: {
            text: subTitle
        },
        xAxis: {
            categories: categories,
            title: {
                text: xTitle
            },
            labels: {
                rotation: -45,
                align: 'right'
            }
        },
        yAxis: {
            min: min,
            title: {
                text: yAxisTitle
            }, labels: {
                formatter: function () {
                    return this.value + unit;
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}' + unit + '</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
}

var get1HourLabels=function() {
    var h = new Date(serverDate).getHours().toString();
    var m = new Date(serverDate).getMinutes();
    var x_labels = new Array(6);
    for (var i = 0; i < 6; i++) {
        if(m-i*10<0) {
            x_labels[5 - i] =h+':'+ (m  - i * 10+60).toString();
        }else {
            x_labels[5 - i] =h+':'+ (m  - i * 10).toString();
        }
    }
    return x_labels;
};
var get8HourLabels=function(){
    var date = new Date(serverDate).getHours();
    var x_labels = new Array(8);
    for (var i = 0; i < 8; i++) {
        if(date-i>=0) {
            x_labels[7-i] = date-i;
        }else {
            x_labels[7 - i] = date - i + 24;
        }
    }
    return x_labels;
};
/*实时数据 应用需求*/
var get8HourLabelsLater10Min=function(){
    var date = new Date(serverDate).getHours();
    var min = new Date(serverDate).getMinutes();
    var x_labels = new Array(8);
    if(min>=10){
        for (var i = 0; i < 8; i++) {
            if(date-i>=0) {
                x_labels[7-i] = date-i;
            }else {
                x_labels[7 - i] = date - i + 24;
            }
        }
    }else{
        for (var k = 0; k < 8; k++) {
            if(date-k>=0) {
                x_labels[7-k] = date-k-1;
            }else {
                x_labels[7 - k] = date - k-1 + 24;
            }
        }
    }
    return x_labels;
};
var getDailyLabels=function(num) {
    var date = new Date(serverDate).getTime();
    var x_labels = new Array(num);
    for (var i = 0; i < x_labels.length; i++) {
        // x_labels[num - i] = $.format.date(new Date(serverDate).setTime(date-(i+1)*24*60*60*1000), "MM-dd");
        x_labels[num - i] = new Date(date-(i+1)*24*60*60*1000).Format("MM-dd");
    }
    return x_labels;
};
//返回n天前的时间
var getPreDays = function (n) {
    if(n==undefined || n==null){
        n=0;
    }
   return new Date(new Date(serverDate).getTime()-n*24*60*60*1000).Format("yyyy-MM-dd");
};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date(serverDate)).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date(serverDate)).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

var showOneLine= function (canvas_id,data,x_labels) {
    var data = {
        labels:x_labels ,
        datasets: [
            {
                label: "test1",
                fillColor: "rgba(0,0,0,0.5)",
                strokeColor: "rgba(0,220,220,1)",
                pointColor: "rgba(0,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill : "#fff",
                pointHighlightStoke:"rgba(0,220,220,1)",
                data: data
            }
        ]
    };


    var options = {

        //Boolean - If we show the scale above the chart data
        scaleOverlay : false,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride : false,

        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 2,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : null,
        //Number - The scale starting value
        scaleStartValue : null,

        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        scaleLineWidth : 1,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,

        //Interpolated JS string - can access value
        //scaleLabel : "111",

        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",

        //Number - Scale label font size in pixels
        scaleFontSize : 12,

        //String - Scale label font weight style
        scaleFontStyle : "normal",

        //String - Scale label font colour
        scaleFontColor : "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,.05,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 2,

        //Boolean - Whether the line is curved between points
        bezierCurve : false,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 8,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 2,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //Boolean - Whether to animate the chart
        animation : true,

        //Number - Number of animation steps
        animationSteps : 60,

        //String - Animation easing effect
        animationEasing : "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete : null

    }

    var ctx = $(canvas_id).get(0).getContext("2d");

    var Line=new Chart(ctx).Line(data,options);
}
var showLine= function (canvas_id,data) {

    var options = {

        //Boolean - If we show the scale above the chart data
        scaleOverlay : false,

        //Boolean - If we want to override with a hard coded scale
        scaleOverride : false,

        //** Required if scaleOverride is true **
        //Number - The number of steps in a hard coded scale
        scaleSteps : 2,
        //Number - The value jump in the hard coded scale
        scaleStepWidth : null,
        //Number - The scale starting value
        scaleStartValue : null,

        //String - Colour of the scale line
        scaleLineColor : "rgba(0,0,0,.1)",

        //Number - Pixel width of the scale line
        scaleLineWidth : 1,

        //Boolean - Whether to show labels on the scale
        scaleShowLabels : true,

        //Interpolated JS string - can access value
        //scaleLabel : "111",

        //String - Scale label font declaration for the scale label
        scaleFontFamily : "'Arial'",

        //Number - Scale label font size in pixels
        scaleFontSize : 12,

        //String - Scale label font weight style
        scaleFontStyle : "normal",

        //String - Scale label font colour
        scaleFontColor : "#666",

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,.05,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth : 2,

        //Boolean - Whether the line is curved between points
        bezierCurve : false,

        //Boolean - Whether to show a dot for each point
        pointDot : true,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 8,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 2,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        //Boolean - Whether to animate the chart
        animation : true,

        //Number - Number of animation steps
        animationSteps : 60,

        //String - Animation easing effect
        animationEasing : "easeOutQuart",

        //Function - Fires when the animation is complete
        onAnimationComplete : null

    }

    var ctx = $(canvas_id).get(0).getContext("2d");

    var Line=new Chart(ctx).Line(data,options);
}
var getBeginToEndLabels = function (begin, end) {
    var x_labels = new Array();
    var beginDate = new Date(begin.replace(/-/ig, '/'));
    var endDate = new Date(end.replace(/-/ig, '/'));
    var time = new Date(endDate - beginDate)/(24*60*60*1000);
    for (var i = 0; i <= time; i++) {
        x_labels[i] = moment(new Date(begin.replace(/-/ig, '/')).setDate(beginDate.getDate()+i)).format("MM-DD");
    }
    return x_labels;
};

var getBeginToEndHourSLabels = function () {
    var x_labels = new Array();
    for (var k = 0; k <= 23; k++) {
        x_labels[k] = k;
    }
    return x_labels;
};

var oneday = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"];
function number_format(number, decimals, dec_point, thousands_sep) {
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }    return s.join(dec);
}
var top10color=['#3993CD','#7866CD','#cd6bb3','#cd4a59','#cd531b','#cd9341'
    ,'#c5cd3d','#6ecd2f','#3acd8d','#0500aa','#233333'];

function NewDate(str) { 
	str = str.split('-'); 
	var date = new Date(serverDate); 
	date.setUTCFullYear(str[0], str[1] - 1, str[2]); 
	date.setUTCHours(0, 0, 0, 0); 
	return date; 
}
/**
 * 刷新highchart布局
 */
function reflow(){
	$(".highcharts-container").each(function(){
    	var chartId = $(this).parent().attr("id");
    	$("#"+chartId).highcharts().reflow();
    });

    if(myChart!=null){
        myChart.resize();
    }
}

//百度Echarts折线图展示
function showEchartsLine(divId,titleText,legend,xLabel,seriesData){
     myChart = echarts.init(document.getElementById(divId));
    myChart.setOption(
        option = {
            //图例颜色
            color:['#FF7F27','#00A2E8','#6E7074'],
            //标题设置
            title:{
                left:"center",
                text:titleText
            },
            //图例
            legend:{
                data:legend
            },
            //折线图点信息显示
            tooltip: {
                trigger: 'axis'
            },
            //x轴设置
            xAxis: {
                data: xLabel,

                axisLine:{
                    show:false
                }

            },

            //y轴设置
            yAxis: {
                splitLine: {
                    show: true
                },
                axisLabel:{
                    color:'red'
                },
                axisLine:{
                    show:false
                }
            },
            //x轴可拖拽 滑动设置
            toolbox: {
                show:true,
                left: 'right',
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            dataZoom: [{
                startValue: '2015-01-01'
            }, {
                type: 'inside'
            }],
            //y轴数据 名称等设置
            series: seriesData,
            //分割线设置
            markLine: {
                silent: true,
                data: [{
                    yAxis: 50
                }, {
                    yAxis: 100
                }, {
                    yAxis: 150
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }]
            }
        });

        //window窗口变化时折线图自适应
        window.onresize = function(){
            myChart.resize();
        }

}


//----  date range picker start ----//

//date range picker 初始化
function initDateRangePicker(option){
    var DATE_RANGE_LOCALE = {
        "showWeekNumbers":true,
        "inline":true,
        "format": 'YYYY-MM-DD',
        "separator": " to ",
        "applyLabel": "确定",
        "cancelLabel": "取消",
        "fromLabel": "起始时间",
        "toLabel": "结束时间'",
        "customRangeLabel": "自定义",
        "weekLabel": "周",
        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
        "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "firstDay": 1
    };

    var DATE_RANGE_RANGES = {
        '昨天': [moment(serverDate).subtract(1, 'days'), moment(serverDate).subtract(1, 'days')],
        '前7天': [moment(serverDate).subtract(7, 'days'), moment(serverDate).subtract(1, 'days')],
        '前30天': [moment(serverDate).subtract(30, 'days'), moment(serverDate).subtract(1, 'days')],
        // '上上周': [moment(serverDate).subtract(2, 'week').startOf('isoWeek'), moment(serverDate).subtract(2, 'week').endOf('isoWeek')],
        '上周': [moment(serverDate).subtract(1, 'week').startOf('isoWeek'), moment(serverDate).subtract(1, 'week').endOf('isoWeek')],
        '上个月': [moment(serverDate).subtract(1, 'month').startOf('month'), moment(serverDate).subtract(1, 'month').endOf('month')],
        '本月': [moment(serverDate).startOf('month'), moment(serverDate).endOf('month')]
    }

    var DATE_RANGE_OPTIONS = {
        locale:DATE_RANGE_LOCALE,
        maxDate:moment(serverDate).subtract(1, 'days'),
        startDate:moment(serverDate).subtract(7, 'days'),
        endDate:moment(serverDate).subtract(1, 'days'),
        alwaysShowCalendars:true,
        ranges:DATE_RANGE_RANGES,
        linkedCalendars:false,
        showWeekNumbers:true
        // autoApply:true
        // singleDatePicker:true,
        // showDropdowns:true
    };
    var tmp = DATE_RANGE_OPTIONS;
    if(option){
        for(var key in option){
            if(tmp[key]){
                tmp[key] = option[key];
            }
        }
    }
    
    $("input[name='date-range']").daterangepicker(tmp);
}
//----  date range picker end ----//

//----  date range single start ----//

/**
 * 单日期插件
 * @param option
 */
function initDateSinglePicker(id,option) {
    var local = {
        "showWeekNumbers":true,
        "inline":true,
        "format": 'YYYY-MM-DD',
        "weekLabel": "周",
        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
        "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "firstDay": 1
    };
    var tmp = {
        locale:local,
        maxDate:moment(serverDate).subtract(1, 'days'),
        startDate:moment(serverDate).subtract(1, 'days'),
        endDate:moment(serverDate).subtract(1, 'days'),
        singleDatePicker:true,
        showDropdowns:true,
        alwaysShowCalenders:true,
        showWeekNumbers:true
    };

    if(option){
        for(var key in option){
            if(tmp[key]){
                tmp[key] = option[key];
            }
        }
    }
    $("#" + id).daterangepicker(tmp);
}

/**
 * 单日期插件
 * @param option
 */
function initDateSinglePickerToday(id,option) {
    var local = {
        "showWeekNumbers":true,
        "inline":true,
        "format": 'YYYY-MM-DD',
        "weekLabel": "周",
        "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
        "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        "firstDay": 1
    };
    var tmp = {
        locale:local,
        maxDate:moment(serverDate),
        startDate:moment(serverDate),
        endDate:moment(serverDate),
        singleDatePicker:true,
        showDropdowns:true,
        showWeekNumbers:true
    };

    if(option){
        for(var key in option){
            if(tmp[key]){
                tmp[key] = option[key];
            }
        }
    }
    $("#" + id).daterangepicker(tmp);
}
//----  date range single end ----//

//--------- no data start --------//
/**
 * 暂无数据div
 * @type {string}
 */
var NO_DATA_DIV = "<div name='no-data' tyle='margin:auto;width:300px;height:120px;' class='text-center'>" +
    "<h4 style='padding-top: 40px;padding-bottom: 40px'>对不起，查询不到任何相关数据</h4>" +
    "</div>"

/**
 * 暂无数据
 * @param loadingId
 * @param data
 * @returns {boolean}
 */
function noData(loadingId,data) {
    var json = JSON.stringify(data);
    var replace = $("#"+loadingId).parents(".tab-content");
    var no_div = $(replace).parent().find("[name='no-data']");
    if(json=="" || json=="null"|| json.indexOf("[]")>=0){
        $(replace).children(".tab-pane").css("display","none");
        if($(no_div).length==0){
            $(replace).after(NO_DATA_DIV);
        }else{
            $(no_div).css("display","");
        }
        return false;
    }else{
        $(no_div).css("display","none");;
        $(replace).css("display","");
    }
    return true;
}

/**
 * 关闭nodata
 * @param divId
 */
function closeNodata(divId) {
    //获得父div
    var parent = $("#"+divId).parents(".tab-content");
    //显示父类
    $(parent).children().css("display","");
    var length = $(parent).next("[name='no-data']").length;
    //如果之前加载过noData
    if(length != 0 && $(parent).next("[name='no-data']").css("display")!="none"){
        //隐藏noData
        $(parent).next("[name='no-data']").css("display","none");
        //删除divId下面的子元素
        $("#"+divId).children().remove();
    }
}


