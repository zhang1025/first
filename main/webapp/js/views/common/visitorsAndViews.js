/**
 *  访问人数和访问量的公共方法
 *  Created by machaozhe on 2016-08-16.
 */

function initVisitorsAndViews(){
    //获取url(根据激活的菜单)
    var path = $("a.cli-type.active").attr("path");
    var url = "/general";
    if(path){
        url = path.substring(path.lastIndexOf("/"),path.length);
    }
    // alert(url);
    $.goAjax("post",'get_visitors_views',{url:url},function(result){
        $('#spark-visitors').sparkline(result.visitorsUrl, {
            type: 'bar',
            width: '100%',
            height: '20px',
            barColor: '#dfe2e7',
            zeroAxis: false
        });

        $('#spark-templateviews').sparkline(result.viewsUrl, {
            type: 'bar',
            width: '100%',
            height: '20px',
            barColor: '#dfe2e7',
            zeroAxis: false
        });
    });

}
