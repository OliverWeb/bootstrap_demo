<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>microservice-config</title>
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
	src="${pageContext.request.contextPath}/js/microservice-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<style>
html,body{margin: 0;padding:0}
</style>
</head>
<body>

		<div style="width: 100%; text-align:center;">
			<div style="text-align:center;white-space: nowrap;"><b style="color:blue"><font color="red"  size="5px">[微服务列表]</font></b></div>
			<div style="text-align:left;white-space: nowrap;">	
				<a style="color: blue; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="updateing" onclick="window.parent.Open('微服务配置待审核','microservicecheck.jsp')"></a>
				<a style="color: blue; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="ipupdateing" onclick="window.parent.Open('微服务节点配置待审核','microserviceipcheck.jsp')"></a>
				<a style="color: blue; text-decoration:none;font-size: 15px;"href="javascript:void(0)"  id="methodupdateing" onclick="window.parent.Open('微服务方法配置待审核','microservicemethodcheck.jsp')"></a></br>	
			</div>
		</div>
		</br>
		<div id="tb">
				<a style="text-align:right;"href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-reload" plain="true"
					onclick="javascript:window.location.reload()"><font   size="2px">刷新</font></a>
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
$(function(){ 
	window.parent.refreshmicroservice();
	window.parent.refreshmicroservicemethod();
	window.parent.refreshmicroserviceip();
	$("#updateing").text("服务配置待更新未审核("+window.parent.serviceupdatelist.length+")");
	$("#ipupdateing").text("服务节点配置待更新未审核("+window.parent.serviceipupdatelist.length+")");
	 $("#methodupdateing").text("服务方法配置待更新未审核("+window.parent.methodupdatelist.length+")");
	load();
}); 

function load()
{
	if(window.parent.ismicroinit)
	{
		$.ajax({
	        type: "GET",
	        url: "../etcd/list?prefix=/services",
	        async: false,
	        success: function (result) {          
	        		refresh(result);
	        }			
	    });
	}
	else
	{
		init();
		window.parent.ismicroinit=true;	
	}	
}
</script>