
/**
 jQuery Ajax封装通用类
 wangyong
 */
$(function(){
    /**
     * ajax封装，默认请求异步
     * url 发送请求的地址
     * type 请求类型 get 或 post
     * data 发送到服务器的数据
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     */
    jQuery.goAjax=function(type, url, data, successfn) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            dataType: "json",
            success: function(result){
                if(result.resCode=="SUCCESS"||result.resCode==""||result.resCode==null){
                    successfn(result.resInfo);
                } else {
                    //无权限访问
                    if(result.resCode =="1000") {
                        $("#"+data.divId).parent().css("overflow","hidden");
                        $("#"+data.divId).html("<img src='/img/authc.jpg'>");
                        return;
                    }
                    //若请求出现问题则统一处理并展示错误码，错误信息
                    playErrorNotification(result.resCode,result.resMsg);
                }
            },
            error: function(result){

            }
        });
    };
    /**
     * ajax封装，设定请求同步
     * type 请求类型 get 或 post
     * url 发送请求的地址
     * data 发送到服务器的数据
     * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * successfn 成功回调函数
     */
    jQuery.goAjaxSync=function(type, url, data, successfn) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            async: false,
            dataType: "json",
            success: function(result){
                if(result.resCode=="SUCCESS"||result.resCode==""||result.resCode==null){
                    successfn(result.resInfo);
                } else {
                    //无权限访问
                    if(result.resCode =="1000") {
                        $("#"+data.divId).parent().css("overflow","hidden");
                        $("#"+data.divId).html("<img src='/img/authc.jpg'>");
                        return;
                    }
                    //若请求出现问题则统一处理并展示错误码，错误信息
                    playErrorNotification(result.resCode,result.resMsg);
                }
            },
            error: function(result){

            }
        });
    };
    /**
     * 展示错误信息notifications
     */
    function playErrorNotification(resCode,resMsg) {
        $.extend($.gritter.options,{
            position:'bottom-right',
        });
        $.gritter.add({
            title: 'Error',
            text: '<strong>错误信息</strong>：'+dealMsg(resMsg)+'['+resCode+']' ,
            time: '10000',
            close_icon: 'l-arrows-remove s16',
            icon: 'glyphicon glyphicon-exclamation-sign',
            class_name:'error-notice'
        }) ;
    }

    /**
     * 字符限制最大长度
     * @type {number}
     */
    var MAX_LENGTH = 100;

    /**
     *  错误信息太长处理
     * @param resMsg
     * @returns {string}
     */
    function dealMsg(resMsg) {
        if(resMsg!="" && resMsg!=null){
            if(resMsg.length>MAX_LENGTH){
                return "<span title='"+resMsg+"' class='tip'>"+resMsg.substring(0,MAX_LENGTH)+"...</span>";
            }else{
                return "<span title='"+resMsg+"' class='tip'>"+resMsg+"</span>";
            }
        }
    }
});