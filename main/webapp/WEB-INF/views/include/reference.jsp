<%@ page import="java.util.*" %>
<%@ page import="org.springframework.web.util.WebUtils" %>
<%@ page import="com.liaoyuan.web.utils.JodaUtil" %>
<%@ page import="com.liaoyuan.web.entity.Permission" %>
<%@ page import="com.liaoyuan.web.entity.SessionUser" %>
<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Cache-Control" content="no-cache">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
<%
    SessionUser sessionUser = (SessionUser) WebUtils.getSessionAttribute(request, SessionUser.SESSION_ROOT_KEY);
    if(null==sessionUser|| null==sessionUser.getBean()){
        return ;
    }
    String account = sessionUser.getBean().getAccount();
    Map<String,List<Permission>> menuMap = sessionUser.getMenuMap();

    //服务器时间
    String serverDate = JodaUtil.formatDate(new Date(),JodaUtil.YYYYMMDD);
%>
<script type="text/javascript">
    var account = "<%=account%>";
    var serverDate = "<%=serverDate%>";
</script>
<!-- 公共引用CSS，JS文件区域 -->
<!-- Css files -->
<!-- Icons -->
<link href="<c:url value="/css/icons.css"/>" rel="stylesheet" />
<!-- Bootstrap stylesheets (included template modifications) -->
<link href="<c:url value="/css/bootstrap.css"/>" rel="stylesheet" />
<!-- Plugins stylesheets (all plugin custom css) -->
<link href="<c:url value="/css/plugins.css"/>" rel="stylesheet" />
<!-- Main stylesheets (template main css file) -->
<link href="<c:url value="/css/main.css"/>" rel="stylesheet" />
<!-- Custom stylesheets ( Put your own changes here ) -->
<link href="<c:url value="/css/custom.css"/>" rel="stylesheet" />
<!-- js files -->

<!-- Javascripts -->
<!-- Load pace first -->
<script src="<c:url value="/plugins/core/pace/pace.min.js"/>"></script>
<!-- Important javascript libs(put in all pages) -->
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
<!-- Core plugins ( not remove ) -->
<script src="<c:url value="/js/libs/modernizr.custom.js"/> "></script>
<!-- Handle responsive view functions -->
<script src="<c:url value="/js/views/jRespond.min.js"/> "></script>
<!-- Custom scroll for sidebars,tables and etc. -->
<script src="<c:url value="/plugins/core/slimscroll/jquery.slimscroll.min.js"/> "></script>
<script src="<c:url value="/plugins/core/slimscroll/jquery.slimscroll.horizontal.min.js"/> "></script>
<!-- Remove click delay in touch -->
<script src="<c:url value="/plugins/core/fastclick/fastclick.js"/>"></script>
<!-- Increase jquery animation speed -->
<script src="<c:url value="/plugins/core/velocity/jquery.velocity.min.js"/>"></script>
<!-- Quick search plugin (fast search for many widgets) -->
<script src="<c:url value="/plugins/core/quicksearch/jquery.quicksearch.js"/>"></script>
<!-- Bootbox fast bootstrap modals -->
<script src="<c:url value="/plugins/ui/bootbox/bootbox.js"/>"></script>
<!-- Other plugins ( load only nessesary plugins for every page) -->
<script src="<c:url value="/js/libs/date.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.canvas.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.pie.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.resize.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.time.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.growraf.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.categories.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.stack.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.orderBars.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.tooltip.min.js"/>"></script>
<script src="<c:url value="/plugins/charts/flot/jquery.flot.curvedLines.js"/>"></script>
<script src="<c:url value="/plugins/charts/sparklines/jquery.sparkline.js"/>"></script>
<script src="<c:url value="/plugins/core/fastclick/fastclick.js"/>"></script>
<script src="<c:url value="/plugins/charts/progressbars/progressbar.js"/>"></script>
<script src="<c:url value="/plugins/ui/waypoint/waypoints.js"/>"></script>
<script src="<c:url value="/plugins/ui/weather/skyicons.js"/>"></script>
<script src="<c:url value="/plugins/ui/notify/jquery.gritter.js"/>"></script>
<script src="<c:url value="/plugins/ui/bootstrap-sweetalert/sweet-alert.js"/>"></script>
<script src="<c:url value="/plugins/misc/vectormaps/jquery-jvectormap-1.2.2.min.js"/>"></script>
<script src="<c:url value="/plugins/misc/vectormaps/maps/jquery-jvectormap-world-mill-en.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/jquery.json-2.2-min.js"/>"></script>
<script src="<c:url value="/plugins/misc/countTo/jquery.countTo.js"/>"></script>
<script src="<c:url value="/js/views/common/jquery.goAjax.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/highcharts/highcharts.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/echarts/echarts.js"/> "></script>

<!-- dateRangePicker -->
<link rel="stylesheet" href="<c:url value="/js/bootstrap-daterangepicker/daterangepicker.css"/> "/>
<script type="text/javascript" src="<c:url value="/js/bootstrap-daterangepicker/moment.min.js"/> "></script>
<script type="text/javascript" src="<c:url value="/js/bootstrap-daterangepicker/daterangepicker.js"/> "></script>

<script type="text/javascript" src="<c:url value="/plugins/forms/validation/jquery.validate.js"/> "></script>

<!-- datapicker and zh-CN plugins-->
<script src="<c:url value="/js/libs/jquery.dateFormat.js"/> "></script>
<script src="<c:url value="/plugins/forms/bootstrap-datepicker/bootstrap-datepicker.js"/> "></script>
<script src="<c:url value="/plugins/forms/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.js"/> "></script>

<!-- common -->
<script type="text/javascript" src="<c:url value="/js/views/common/common.js"/> "></script>

<!-- select2 -->
<script type="text/javascript" src="<c:url value="/plugins/forms/select2/select2.js"/> "></script>
<script type="text/javascript" src="<c:url value="/plugins/forms/select2/_locale/select2_locale_zh-CN.js"/> "></script>

<!-- datatable -->
<script type="text/javascript" src="<c:url value="/plugins/tables/datatables/jquery.dataTables.js"/> "></script>
<script type="text/javascript" src="<c:url value="/plugins/tables/datatables/dataTables.tableTools.js"/> "></script>
<script type="text/javascript" src="<c:url value="/plugins/tables/datatables/dataTables.bootstrap.js"/> "></script>

<!-- bootstrap switch -->
<link rel="stylesheet" type="text/css" href="<c:url value="/js/bootstrap-switch/bootstrap-switch.css"/>">
<script src="<c:url value="/js/bootstrap-switch/bootstrap-switch.js"/>"></script>

<script src="<c:url value="/plugins/ui/sweet-alert.js"/>"></script>
