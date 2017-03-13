<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="include/taglib.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>用户登录</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Joychao <joy@joychao.cc>">
<style type="text/css">
    *{margin:0;padding: 0;}
    body{background: #444 url(/img/carbon_fibre_big.png);font-family:"宋体";}
    .loginBox{width:420px;height:230px;padding:0 20px;border:1px solid #fff; color:#000; margin-top:40px; border-radius:8px;background: white;box-shadow:0 0 15px #222; background: -moz-linear-gradient(top, #fff, #efefef 8%);background: -webkit-gradient(linear, 0 0, 0 100%, from(#f6f6f6), to(#f4f4f4));font:11px/1.5em 'Microsoft YaHei' ;position: absolute;left:50%;top:50%;margin-left:-210px;margin-top:-115px;}
    .loginBox h2{height:45px;font-size:20px;font-weight:normal;}
    .loginBox .left{border-right:1px solid #ccc;height:100%;padding-right: 20px; }
    .regBtn{margin-top:21px;}
</style>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script type="text/javascript" src="/js/libs/html5.js"></script>
<![endif]-->
<link class="bootstrap library" rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">
<script class="bootstrap library" src="/js/libs/jquery-2.1.1.min.js" type="text/javascript"></script>
<script class="bootstrap library" src="/js/bootstrap/bootstrap.js" type="text/javascript"></script>
</head>
<body>
<div class="container">
    <section class="loginBox row-fluid">
        <section class="span7" style="padding-left: 100px">
            <h2>登录</h2>
            <p><input type="text" id="user" name="username" placeholder="用户名"/></p>
            <p><input type="password" id="pw" name="password" placeholder="密码"/></p>
            <section class="row-fluid">
                <section class="span8 lh30"><label><input type="checkbox" name="rememberme" />记住密码</label></section>
                <section class="span1"><input type="button" id="submit" value=" 登录 " class="btn btn-primary"></section>
            </section>
        </section>

    </section><!-- /loginBox -->
</div> <!-- /container -->
<script  src="/js/views/login.js" type="text/javascript"></script>
</body>
</html>