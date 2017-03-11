/**
 * IP查询的js
 *
 * Created by machaozhe on 2016-10-25.
 */
var rule=/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
var default_ip="10.237.181.83";
var flag = true;
$(function () {
	$("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();

    $("#change_ul li").click(function(){
        $("#change_ul li").each(function(){
            if(!$(this).hasClass("active")){
                $(this).addClass("active")
            }else{
                $(this).removeClass("active")
            }
        })
        if($(this).attr("id")=="ipLi"){
            $("#searchDiv").css("display","");
            $("#search_cond").css("display","");
            $("#restAPI").css("display","none");
        }else{
            $("#searchDiv").css("display","none");
            $("#search_cond").css("display","none");
            $("#restAPI").css("display","");
        }
    });
     queryIP();
    //绑定查询按钮
    $("#searchBtn").click(searchData);
});

/**
 * 查询所有数据
 */
function searchData(){
	//防止重复提交
	$('#searchBtn').button('loading');
    queryIP();
    $('#searchBtn').button('reset');
}

/**
 * 查询IP
 */
function queryIP(){
    var ip = default_ip;
    if(flag){
        flag = false;
    }else{
        ip = $.trim($("#ip_input").val());
    }
    if(!ipCheck(ip)){
        swal("fail","IP格式错误","warning");
        return false;
    }
    playLoadingWithoutTime("dataTable_div");
    $.goAjax("post","match",{"ip":ip}, function (records) {
        $("table tbody tr").children().remove();
        $("table tbody tr").append(records);
        hideLoading("dataTable_div");
    });
}

/**
 * ip检测
 * @param ip
 * @returns
 */
function ipCheck(ip){
    return rule.test(ip)
}
