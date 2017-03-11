/**
 * Created by machaozhe on 2016-07-15.
 */

/**
 * 初始化查询条件
 * @param load 开关，是否重新加载查询条件
 * @param showMap 控制查询的显示 例如想隐藏 server,country， 传入{"server":"none","country":"none"}
 * @param disabledMap  控制查询的使能 例如不让server选择,而显示国家 传入{"server":true,"country":false}
 */
function initSearchConditionForData(load,showMap,disabledMap){
    //初始化时间
    if(showMap!=null){
        for(var key in showMap){
            showConditionForData(key,"display",showMap[key])
        }
    }
    if(disabledMap!=null){
        for (var key in disabledMap) {
            disabledConditionForData(key,"disabled", disabledMap[key])
        }
    }
    if(load){
        //初始化平台
        initPlatForData();
        //初始化区服
        initServerForData();
        //初始化国家
        initCountryForData();
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
function showConditionForData(id, name, value) {
    $("#" + id + "_selectData").css(name, value);
}

/**
 * 查询条件是否使能
 * @param id
 * @param name
 * @param value
 */
function disabledConditionForData(id, name, value) {
    $("#" + id + "_selectData").find("select").attr(name, value);
}

/**
 *
 * @param dayOrMonth 用于初始是日还是月
 * @param beginDate  初始时间 可传入两个参数 {"day":num,"format":"xxx"}。默认为 {"day":7,"format":"yyyy-MM-dd"}
 * @param endDate    结束时间 可传入两个参数 {"day":num,"format":"xxx"}  默认为 {"day":1,"format":"yyyy-MM-dd"}
 */
function initDate(dayOrMonth,beginDate,endDate){

    var now = new Date(serverDate);
    dealDate("begin",now, dayOrMonth,beginDate);
    dealDate("end",now, dayOrMonth,endDate);
    if (dayOrMonth == "month") {
        initMonthPicker();
    } else if(dayOrMonth == "day"){
        initDatePicker();
    } else {
        initRealTimeDatePicker();
    }
}

/**
 *
 * @param id
 * @param now
 * @param dateMap
 */
function dealDate(id,now,dayOrMonth,dateMap){
    var num = id=="end"?1:7;
    if (dateMap == null) {
        showCondition(id, "display", "");
        $("#"+id+"-date").val($.format.date(now.getTime() - num * 24 * 60 * 60 * 1000, "yyyy-MM-dd"));
    } else {
        if (dateMap["display"] == "none") {
            showCondition(id, "display", "none")
        } else {
            showCondition(id, "display", "");
            if(dayOrMonth == "month"){
                $("#" + id + "-date").val($.format.date(now.getMonth() - parseInt(dateMap["month"]), dateMap["format"]));
            }
            else{
                $("#" + id + "-date").val($.format.date(now.getTime() - parseInt(dateMap["day"])* 24 * 60 * 60 * 1000, dateMap["format"]));
            }
        }
    }
}


/**
 * 平台下拉数据
 */
function initPlatForData() {
    if($("#plat_selectData").css("display")=="none"){
        return;
    }
    dealForData("get_plat_condition", null, "all_platData","", "全部平台");
};

/**
 * 2级联动 平台--渠道
 * @param queryCode 下拉选中的值
 */
function casecadeSelectData(queryCode) {
    if($("#channel_selectData").css("display")=="none"){
        return;
    }
    dealChannelForData("get_channel_condition", {"plat": queryCode}, "all_channelData", "选择渠道", "全部渠道",true);
}

/**
 * 区服下拉数据
 */
function initServerForData() {
    if($("#server_selectData").css("display")=="none"){
        return;
    }
    dealForData("get_server_condition", null, "all_serverData",  "选择区服","全部区服");
};

/**
 * 国家下拉数据
 */
function initCountryForData() {
    if($("#country_selectData").css("display")=="none"){
        return;
    }
    dealForData("get_country_condition", null, "all_countryData", "","全部国家");
};


/**
 *
 * @param url 请求的URL
 * @param data  请求传入的数据，没有为null
 * @param id  下拉框Id
 * @param initSearch  初始化选择
 * @param showName  显示的名字
 */
function dealForData(url, data, id,initSearch, showName){
    var optionStr ;
    if(initSearch!='' && initSearch!=null){
        optionStr = "<option value=''>"+initSearch+"</option><option value='-1'>"+showName+"</option>";
    }else{
        optionStr = "<option value=''>"+showName+"</option>";
    }
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
            });
            $('#'+id).html(optionStr);
        }
    });
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