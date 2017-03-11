/**
 * Created by machaozhe on 2016-07-15.
 */

/**
 * 初始化查询条件
 * @param load 开关，是否重新加载查询条件
 * @param showMap 控制查询的显示 例如想隐藏 server,country， 传入{"server":"none","country":"none"}
 * @param disabledMap  控制查询的使能 例如不让server选择,而显示国家 传入{"server":true,"country":false}
 */
function initSearchCondition(load,showMap,disabledMap){
    //初始化时间
    if(showMap!=null){
        for(var key in showMap){
            showCondition(key,"display",showMap[key])
        }
    }
    if(disabledMap!=null){
        for (var key in disabledMap) {
            disabledCondition(key,"disabled", disabledMap[key])
        }
    }
    if(load){
        //初始化平台
        initPlatData();
        //初始化区服
        initServerData();
        //初始化国家
        initCountryData();
        $(".select2").select2({
            width:"100%",
            dropdownAutoWidth:true
        });
    }
}

/**
 * 查询条件是否显示
 * @param id
 * @param name
 * @param value
 */
function showCondition(id, name, value) {
    $("#" + id + "_select").css(name, value);
}

/**
 * 查询条件是否使能
 * @param id
 * @param name
 * @param value
 */
function disabledCondition(id, name, value) {
    $("#" + id + "_select").find("select").attr(name, value);
}


/**
 * dateRangePicker的单日历使用(目前只支持日期,不支持月)
 * @param beginMap
 * @param endMap
 */
function initSingleDate(beginMap,endMap) {
    dealSingleDate("begin-date",beginMap);
    dealSingleDate("end-date",beginMap);

}

/**
 * single处理
 * @param id
 * @param dateMap
 */
function dealSingleDate(id,dateMap) {
    var num = id=="end-date"?1:7;
    var option = {maxDate:moment(serverDate).subtract(1, 'days'),startDate:moment(serverDate).subtract(num, 'days'),endDate:moment(serverDate).subtract(num, 'days')}
    if(dateMap){
        for(var key in dateMap){
            if(option[key]){
                option[key] = moment(serverDate).subtract(dateMap[key],"days");
            }else{
                option[key] = dateMap[key];
            };
        }
    }
    initDateSinglePicker(id,option);
}


/**
 *
 * @param dayOrMonth 用于初始是日还是月
 * @param beginDate  初始时间 可传入两个参数 {"day":num,"format":"xxx"}。默认为 {"day":7,"format":"yyyy-MM-dd"}
 * @param endDate    结束时间 可传入两个参数 {"day":num,"format":"xxx"}  默认为 {"day":1,"format":"yyyy-MM-dd"}
 */
// function initDate(dayOrMonth,beginDate,endDate){
//
//     var now = new Date(serverDate);
//     dealDate("begin",now, dayOrMonth,beginDate);
//     dealDate("end",now, dayOrMonth,endDate);
//     if (dayOrMonth == "month") {
//         initMonthPicker();
//     } else if(dayOrMonth == "day"){
//         initDatePicker();
//     } else {
//         initRealTimeDatePicker();
//     }
// }

/**
 *
 * @param id
 * @param now
 * @param dateMap
 */
// function dealDate(id,now,dayOrMonth,dateMap){
//     var num = id=="end"?1:7;
//     if (dateMap == null) {
//         showCondition(id, "display", "")
//         $("#"+id+"-date").val($.format.date(now.getTime() - num * 24 * 60 * 60 * 1000, "yyyy-MM-dd"));
//     } else {
//         if (dateMap["display"] == "none") {
//             showCondition(id, "display", "none")
//         } else {
//             showCondition(id, "display", "")
//             if(dayOrMonth == "month"){
//                 $("#" + id + "-date").val($.format.date(now.getMonth() - parseInt(dateMap["month"]), dateMap["format"]));
//             }
//             else{
//                 $("#" + id + "-date").val($.format.date(now.getTime() - parseInt(dateMap["day"])* 24 * 60 * 60 * 1000, dateMap["format"]));
//             }
//         }
//     }
// }


/**
 * 平台下拉数据
 */
function initPlatData() {
    if($("#plat_select").css("display")=="none"){
        return;
    }
    dealData("get_plat_condition", null, "all_plat", "全部平台");
};

/**
 * 2级联动 平台--渠道
 * @param queryCode 下拉选中的值
 */
function casecadeSelect(queryCode,type) {
    if($("#channel_select").css("display")=="none"){
        return;
    }
    dealChannelData("get_channel_condition", {"plat": queryCode}, "all_channel", "全部渠道",true);
}

/**
 * 区服下拉数据
 */
function initServerData() {
    if($("#server_select").css("display")=="none"){
        return;
    }
    dealData("get_server_condition", null, "all_server", "全部区服");
};

/**
 * 国家下拉数据
 */
function initCountryData() {
    if($("#country_select").css("display")=="none"){
        return;
    }
    dealData("get_country_condition", null, "all_country", "全部国家");
};


/**
 *
 * @param url 请求的URL
 * @param data  请求传入的数据，没有为null
 * @param id  下拉框Id
 * @param showName  显示的名字
 */
function dealData(url, data, id, showName){
    var optionStr = "<option value=''>"+showName+"</option>";
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        async: false,
        success: function (result) {
            $.each(result.resInfo, function (i, bean) {
                var option = "<option value='" + bean.code + "' >" + bean.name + "</option>";
                optionStr = optionStr + option;
            })
            $('#'+id).html(optionStr);
        }
    });
}

function dealChannelData(url, data, id, showName,excludes){
    var optionStr='';
    $.ajax({
        url: url,
        data: data,
        type: "POST",
        dataType: "json",
        async: false,
        success: function (result) {
            if(excludes){
                if(data["plat"]=="" || result.resInfo.length!=0 ){
                    optionStr = "<option value=''>"+showName+"</option>";
                }else {
                    optionStr = "<option value='-1'>无</option>";
                }
            }else{
                optionStr = "<option value=''>"+showName+"</option>";
            }
            $.each(result.resInfo, function (i, bean) {
                var option = "<option value='" + bean.code + "' >" + bean.name + "</option>";
                optionStr = optionStr + option;
            })
            $('#'+id).html(optionStr);
        }
    });
}