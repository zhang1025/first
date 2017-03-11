<%@ page language="java" contentType="text/html;charset=UTF-8"  pageEncoding="UTF-8"%>
<style type="text/css">
  .btn-xs{
    height:20px;
  }
  .page-sidebar .user-info img {
    border-radius: 1px;
    float: left;
    margin-right: 1px;
    width: 40px;
  }
</style>
<aside id="sidebar" class="page-sidebar hidden-md hidden-sm hidden-xs">
  <!-- Start .sidebar-inner -->
  <div class="sidebar-inner">
    <!-- Start .sidebar-scrollarea -->
    <div class="sidebar-scrollarea">
      <!--  .sidebar-panel -->
      <div class="sidebar-panel">
        <h5 class="sidebar-panel-title">登录信息</h5>
      </div>
      <!-- / .sidebar-panel -->
      <div class="user-info clearfix">
        <span class="name">欢迎您 : </span>
        <span class="name">admin</span>
      </div>
      <!--  .sidebar-panel -->
      <div class="sidebar-panel">
        <h5 class="sidebar-panel-title">菜单</h5>
      </div>
      <!-- / .sidebar-panel -->
      <!-- .side-nav -->
      <div class="side-nav">
        <ul class="nav">
          <%--<c:if test="${not empty menuMap[gameId]}">--%>
          <%--<c:forEach items="${menuMap[gameId]}" var="menuEntityMap" varStatus="status">--%>
            <%--<li><a href="#" class="test"><i class="" id="styleIcon${status.count}"></i><span class="txt"><c:out value="${menuEntityMap.key}" /></span></a>--%>
              <%--<ul class="sub">--%>
                <%--<c:forEach items="${menuEntityMap.value}" var="menuBean">--%>
                <%--<li style="background: #1c2028"><a href="#" class="cli-type "  path="<c:url value='${menuBean.resourceUrl}'/>"><span class="txt"><c:out value="${menuBean.resourceName}" /></span></a></li>--%>
                <%--</c:forEach>--%>
              <%--</ul>--%>
            <%--</li>--%>
          <%--</c:forEach>--%>
          <%--</c:if>--%>




            <li><a href="#" class="test"><i class="" id="styleIcon1"></i><span class="txt">欢迎页</span></a>
              <ul class="sub">
                <li style="background: #1c2028"><a href="#" class="cli-type "  path="/liaoyuan/main"><span class="txt">欢迎页</span></a></li>
              </ul>
            </li>
            <li><a href="#" class="test"><i class="" id="styleIcon2"></i><span class="txt">财务组</span></a>
              <ul class="sub">
                  <li style="background: #1c2028"><a href="#" class="cli-type "  path="/liaoyuan/data"><span class="txt">数据table</span></a></li>
              </ul>
            </li>
            <li><a href="#" class="test"><i class="" id="styleIcon3"></i><span class="txt">财务组</span></a>
              <ul class="sub">
                <li style="background: #1c2028"><a href="#" class="cli-type "  path="/liaoyuan/data"><span class="txt">数据table</span></a></li>
              </ul>
            </li>
        </ul>
      </div>
      <!-- / side-nav -->
      <!--  .sidebar-panel -->
    </div>
    <!-- End .sidebar-scrollarea -->
  </div>
  <!-- End .sidebar-inner -->
  <script src="${ctx}/js/views/common/leftMenu.js"></script>
</aside>