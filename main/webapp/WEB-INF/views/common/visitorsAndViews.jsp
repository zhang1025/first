<%--
  Created by IntelliJ IDEA.
  User: machaozhe
  Date: 2016-08-16
  Time: 17:34
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../include/taglib.jsp" %>
<div class="header-stats">
    <div class="spark clearfix">
        <div class="spark-info"><span class="number">${visitors_visitors}</span><spring:message code='visitors' /></div>
        <div id="spark-visitors" class="sparkline"></div>
    </div>
    <div class="spark clearfix">
        <div class="spark-info"><span class="number">${views_views}</span><spring:message code='views' /></div>
        <div id="spark-templateviews" class="sparkline"></div>
    </div>
    <%--<div class="spark clearfix">--%>
        <%--<div class="spark-info"><span class="number">3700$</span>Sales</div>--%>
        <%--<div id="spark-sales" class="sparkline"></div>--%>
    <%--</div>--%>
</div>