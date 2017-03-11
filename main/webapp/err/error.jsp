<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>错误信息</title>
</head>
<body>
错误码：${requestScope.errorInfo.resInfo.errorCode}
错误信息：${requestScope.errorInfo.resInfo.errorMsg}
错误类别：${requestScope.errorInfo.resInfo.errorType}
</body>
</html>
