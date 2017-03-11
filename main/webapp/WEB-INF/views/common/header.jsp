<%@ page language="java" contentType="text/html;charset=UTF-8"  pageEncoding="UTF-8"%>
<!-- .page-navbar -->
<div id="header" class="page-navbar">
  <!-- .navbar-brand -->
  <a href="index.html" class="navbar-brand hidden-xs hidden-sm">
    <img src="${ctx}/img/logo.png" class="logo hidden-xs" alt="Dynamic logo">
    <img src="${ctx}/img/logosm.png" class="logo-sm hidden-lg hidden-md" alt="Dynamic logo">
  </a>
  <!-- / navbar-brand -->
  <!-- .no-collapse -->
  <div id="navbar-no-collapse" class="navbar-no-collapse">
    <!-- top left nav -->
    <ul class="nav navbar-nav">
      <li class="toggle-sidebar">
        <a href="#" class="toggle_new">
          <i class="fa fa-reorder"></i>
          <span class="sr-only">Collapse sidebar</span>
        </a>
      </li>
      <li>
        <a href="#" class="reset-layout tipB" title="界面布局重置"><i class="fa fa-history"></i></a>
      </li>

    </ul>
    <!-- / top left nav -->
    <!-- top right nav -->
    <ul class="nav navbar-nav navbar-right">

      <li>
        <a href="${ctx}?logout=logout" class="tipB" title="注销">
          <i class="fa fa-power-off"></i>
          <span class="sr-only">Logout</span>
        </a>
      </li>
      <%--<li>--%>
        <%--<a id="toggle-right-sidebar" href="#">--%>
          <%--<i class="l-software-layout-sidebar-right"></i>--%>
          <%--<span class="sr-only">Toggle right sidebar</span>--%>
        <%--</a>--%>
      <%--</li>--%>
    </ul>
    <!-- / top right nav -->
  </div>
  <!-- / collapse -->
</div>


<!-- / page-navbar -->