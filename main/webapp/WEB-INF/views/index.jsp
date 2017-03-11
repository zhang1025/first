<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="include/taglib.jsp" %>
<%@ include file="include/reference.jsp" %>
<script src="<c:url value="/js/views/common/jquery.data.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/views/common/common.js"/> "></script>
<script src="${ctx}/js/views/common/main.js"></script>
<!doctype html>
<!--[if lt IE 8]><html class="no-js lt-ie8"> <![endif]-->
<html class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>数据管理系统</title>
    <!-- Mobile specific metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no">
    <!-- Force IE9 to render in normal mode -->
    <!--[if IE]><meta http-equiv="x-ua-compatible" content="IE=9" /><![endif]-->
    <!-- Windows8 touch icon ( http://www.buildmypinnedsite.com/ )-->
    <meta name="msapplication-TileColor" content="#3399cc" />
</head>
<body>
<!--[if lt IE 9]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
<![endif]-->
<!-- header start -->
<%@ include file="common/header.jsp" %>
<!-- header end -->

<!-- #wrapper -->
<div id="wrapper">
    <!-- .page-sidebar -->
    <div id="leftMenu">
        <%@ include file="common/leftMenu.jsp" %>
    </div>
    <!-- / page-sidebar -->
    <!-- Start #right-sidebar -->
    <aside id="right-sidebar" class="right-sidebar hidden-md hidden-sm hidden-xs hide-sidebar">
        <!-- Start .sidebar-inner -->
        <div class="sidebar-inner">
            <!-- Start .sidebar-scrollarea -->
            <div class="sidebar-scrollarea">
                <div class="tabs">
                    <!-- Start .rs tabs -->
                    <ul id="rstab" class="nav nav-tabs nav-justified">
                        <li class="active">
                            <a href="#china" data-toggle="tab" aria-expanded="true"><i class="fa fa-cny"></i> 国内 </a>
                        </li>
                        <li class="">
                            <a href="#abroad" data-toggle="tab" aria-expanded="false"><i class="glyphicon glyphicon-usd"></i>海外</a>
                        </li>
                    </ul>
                    <div id="rstab-content" class="tab-content">
                        <div  id="china" class="tab-pane fade active in">
                            <div class="chat-user-list">
                                <ul class="user-list list-group" id="right_tab_1">
                                </ul>
                            </div>
                        </div>
                        <div  id="abroad" class="tab-pane fade">
                            <div class="chat-user-list">
                                <ul class="user-list list-group" id="right_tab_2">
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End .rs tabs -->
            </div>
            <!-- End .sidebar-scrollarea -->
        </div>
        <!-- End .sidebar-inner -->
    </aside>
    <!-- End #right-sidebar -->

    <!-- .page-content  所有innerPage都需要用<div class="ledo">包最外一层，界面渲染使用 -->
    <div id="innerPage">
    </div>
    <!-- / page-content -->
</div>
<!-- / #wrapper -->

<!-- Start #footer  -->
<%@include file="common/footer.jsp"%>
<!-- End #footer  -->

<!-- Back to top -->
<div id="back-to-top"><a href="#">Back to Top</a>
</div>
<script type="text/javascript">
    $(function () {
        //加载主界面
        initLoadPage();
    });

    //初始化加载页面
    function initLoadPage() {
        $("#innerPage").load("/liaoyuan/main");
        $(".sub li:first a").attr("class", "cli-type active").css("background", "#1c202a");
    }
</script>
</body>
</html>