/**
 * Created by wangyong on 2016/6/23
 * Editor by zj
 */
var windowWidth;
$(function(){
    windowWidth = window.screen.width;
    var $styleIcon = $('#styleIcon1');
    // 处理左侧菜单的css格式问题
    $styleIcon.attr("class","l-basic-laptop");
    $('#styleIcon2').attr("class","l-ecommerce-graph2");
    $('#styleIcon3').attr("class","l-basic-server2");
    $('#styleIcon4').attr("class","l-ecommerce-graph1");
    $('#styleIcon5').attr("class","l-software-layers2");
    $('#styleIcon6').attr("class","l-basic-tablet");
    $('#styleIcon7').attr("class","l-basic-webpage");
    $('#styleIcon8').attr("class","l-basic-mixer2");
    $('#styleIcon9').attr("class","l-basic-settings");

    //左侧子菜单点击事件绑定
    bindLeftMenuClick();

    //目录菜单栏点击事件
    $(".test").on("click",function () {
        var navcla=this.getAttribute("class");
        var navNext=$(this).siblings('ul');
        if (navcla.indexOf("notExpand")!=-1){
            //alert("当未展开的菜单被点击");
            //当未展开的菜单被点击时，所有的其他菜单均关闭
            var allEx=$(".nav").find(".expand");
            allEx.siblings('ul').slideUp(plugin.settings.sideNav.subCloseSpeed, plugin.settings.sideNav.animationEasing);
            allEx.siblings('ul').find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
            allEx.attr("class","test notExpand");
            allEx.siblings('ul').css("class","sub");
            allEx.closest('li.hasSub').removeClass('highlight-menu');
            allEx.parent('li').removeClass('highlight-menu');
            $('highlight-menu').css("class","hasSub");
            allEx.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
            //$(".nav").find('li').removeClass('highlight-menu');
            this.setAttribute("class","test expand ");
            navNext.slideDown(plugin.settings.sideNav.subOpenSpeed, plugin.settings.sideNav.animationEasing);
            navNext.find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
            navNext.css("class","sub show");
            $(this).closest('li.hasSub').addClass('highlight-menu');
            $(this).closest('.sub').addClass('highlight-menu');
            $(this).find('.sideNav-arrow').removeClass('rotate0').addClass('rotate90');
        } else if(navcla.indexOf("expand")!=-1){
            this.setAttribute("class","test notExpand ");
            navNext.slideUp(plugin.settings.sideNav.subCloseSpeed, plugin.settings.sideNav.animationEasing);
            navNext.find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
            navNext.css("class","sub");
            $(this).closest('li.hasSub').removeClass('highlight-menu');
            $(this).parent('li').removeClass('highlight-menu');
            $(this).find('.sideNav-arrow').removeClass('rotate90').addClass('rotate0');
        }
    });
    $styleIcon.parents("a").click();
});

function bindLeftMenuClick() {
    var $cliType = $(".cli-type");
    //绑定左侧子菜单url点击事件
    $(".sub li a").on("click",function () {
        $cliType.removeClass('active');
        $cliType.css("color","#737d83");
        var url = $(this).attr("path");
        $(this).addClass('active');
        $(this).css("background","#1c202a");
        $(this).css("color","#fff");
        //数据报表页面由于屏幕分辨率问题 隐藏左侧菜单以便显示全部
        if(windowWidth <=1300 && url.indexOf("dataReport")>=0){
            $('.toggle-sidebar>a').trigger("click");
        }
        $.ajax({
            type: "post",
            url: '/authc/checkSession',
            data: {url:url,r:Math.random()},
            dataType: "json",
            success: function(result){
                if(result.status==-1){
                    window.location.href = url;
                }else{
                    $("#innerPage").load(url);
                }
            },
            error: function(){
                window.location.href = url;
            }
        });
    });
    $cliType.on("mouseover",function () {
        $(this).css("color","#fff");
    });
    $cliType.on("mouseout",function () {
        if($(this).hasClass("active")!==true){
            $(this).css("color","#8b929a");
        }
    });
}
