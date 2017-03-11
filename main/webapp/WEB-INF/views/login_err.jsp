<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2016/7/6
  Time: 16:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<html>
<head>
    <meta charset="utf-8">
    <title>ERROR-权限</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1 user-scalable=no">
    <link href="<c:url value="/css/icons.css"/>" rel="stylesheet" />
    <link href="<c:url value="/css/bootstrap.css"/>" rel="stylesheet" />
    <link href="<c:url value="/css/plugins.css"/>" rel="stylesheet" />
    <link href="<c:url value="/css/main.css"/>" rel="stylesheet" />
    <link href="<c:url value="/css/custom.css"/>" rel="stylesheet" />
    <meta name="msapplication-TileColor" content="#3399cc" />
</head>
<body class="error-page">
<div class="container error-container">
    <div class="error-panel panel panel-default plain animated bounceIn">
        <!-- Start .panel -->
        <div class="panel-heading">
            <h4 class="panel-title text-center">
            </h4>
        </div>
        <div class="panel-body">
            <div><img src="<c:url value="/img/authc.jpg"/>" style="width: 420px;text-align: center" alt="权限异常"/></div>

        </div>
    </div>
</div>
<!-- Javascripts -->
<script src="<c:url value="/js/libs/jquery-2.1.1.min.js"/> "></script>
<script>
    window.jQuery || document.write('<script src="<c:url value="/js/libs/jquery-2.1.1.min.js"/>">\x3C/script>')
</script>
<script src="${ctx}/js/libs/jquery-ui-1.10.4.min.js"></script>
<script>
    window.jQuery || document.write('<script src="<c:url value="/js/libs/jquery-ui-1.10.4.min.js"/> ">\x3C/script>')
</script>
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx}/js/libs/excanvas.min.js"></script>
<script type="text/javascript" src="${ctx}/js/libs/html5.js"></script>
<script type="text/javascript" src="${ctx}/js/libs/respond.min.js"></script>
<![endif]-->
<!-- Bootstrap plugins -->
<script src="<c:url value="/js/bootstrap/bootstrap.js"/>"></script>
</body>
</html>
