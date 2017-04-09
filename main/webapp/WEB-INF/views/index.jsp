<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="include/taglib.jsp" %>
<%@ include file="include/reference.jsp" %>
<c:set  var="menuMap" value="<%=menuMap%>" scope="page"/>
<script src="<c:url value="/js/views/common/jquery.data.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/views/common/common.js"/> "></script>
<script src="${ctx}/js/views/common/main.js"></script>
<!doctype html>
<!--[if lt IE 8]><html class="no-js lt-ie8"> <![endif]-->
<html class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>辽源煤矿后台管理系统</title>
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
    <!-- .page-content  所有innerPage都需要用<div class="ledo">包最外一层，界面渲染使用 -->
    <div id="innerPage">
    </div>
    <!-- / page-content -->
</div>
<!-- / #wrapper -->

<!-- Start #footer  -->
<%--<%@include file="common/footer.jsp"%>--%>
<!-- End #footer  -->

<!-- Back to top -->
<div id="back-to-top"><a href="#">Back to Top</a>
</div>

<script type="text/javascript">
    $(function () {
        //加载主界面
        $("#innerPage").load("/general/welcome");
        $("#updatePw").on("click",function () {
            $("#innerPage").load("/general/updatePwPage");
        });
    });

</script>
<script src="<c:url value="/js/views/common/jquery.data.js"/> "></script>
</body>
</html>