/**
 * Created by pengyang@ledo.com on 2016/10/25.
 */
$(document).ready(function() {
    $("body").ledo();
    //初始化访问人数和访问量
    initVisitorsAndViews();
    //初始化时间平台、渠道、区服、国家
    if(isClient==2){
        initSearchCondition(true,{"end":"","country": ""})
    }else{
        initSearchCondition(true,{"end":""})
    }
    //初始化时间(新单日期插件)
    initSingleDate();

    //修改标签名字
    $("#end_select .input-group-addon").eq(0).html("时间");

    //查询按钮点击操作
    $("#searBtn").click(function(){
        //查询等级分布数据
        queryPlayerLevel();
    });

    queryPlayerLevel();

})


//查询玩家等级分布
function queryPlayerLevel(){
    var begin = $("#end-date").val();
    var plat = $("#all_plat").val();
    var channel = $("#all_channel").val();
    var server = $("#all_server").val();

    //参数json串
    var data = {jsonStr:"{\"begin\":\""+begin+"\",\"channel\":\""+channel+"\",\"server\":\""+server+"\"}"};
    var url = "player_level_chart";

    //柱状图图例名称
    var labelName = $("#playerLevelChart a[levelChart]").html();
    //柱状图div id
    var chartId = $("#playerLevelChart a").attr("levelChart");
    playLoadingWithoutTime(chartId);

    //ajax请求折线图数据
    $.goAjax("POST",url,data,function (results) {
        var levelData = results;
        if(levelData!=null){
            var result = new Array();
            var x_labels = new Array();
            var mymap = new Object();
            for(var i=0;i<levelData.length;i++){

                var Level = levelData[i];
                x_labels[i] = Level.level;
                result[i] = Level.rate*100;
                mymap[Level.level] = Level.playerNum;
            }
            initHighChartsColumn(chartId,"", "",x_labels,"",[{name:labelName, data:result}],mymap);
            hideLoading(chartId) ;
        }
    });
}

