<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>microservicemethodcheck</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/xcConfirm.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/microservicemethodcheck.js"></script>
<style>
html,body{margin: 0;padding:0}
</style>
</head>
<body>
		<div style="width: 100%; text-align:center;">
			<div style="text-align:center;white-space: nowrap;"><b style="color:blue"><font color="red"  size="5px">[微服务方法配置待审核列表]</font></b></div>
		</div>
		</br>
		<div id="tb">
				<a style="text-align:right;"href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-reload" plain="true"
					onclick="javascript:window.location.reload()"><font   size="2px">刷新</font></a>
				<a style="text-align:right;"href="JavaScript:void(0);" class="easyui-linkbutton"
					iconcls="icon-ok" plain="true"
					id="pass"><font   size="2px">审核通过</font></a>			
				<a style="text-align:right;"href="JavaScript:void(0);" class="easyui-linkbutton"
					iconcls="icon-undo" plain="true"
					id="delete"><font   size="2px">撤销</font></a>		
				 <div  style="float: right;">  
                    <input id="ss" class="easyui-searchbox"  
                        searcher="doSearch" prompt="请输入搜索内容"  
                        style="width: 300px; vertical-align: middle;"></input>   
                </div>  
			</div>
		</div>

		<table id="dg"></table>

</body>
</html>
 <script type="text/javascript">   
 if(!window.parent.isLogin)
 {
 	$("#pass").hide();
 	$("#delete").hide();
 }
 </script>  