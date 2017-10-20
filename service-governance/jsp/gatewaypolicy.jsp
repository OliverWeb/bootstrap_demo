<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>gatewaypolicy</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/kingTable.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/gateway-config.js"></script>
<style>
input[type="text"]{
margin-left:20px;margin-top:20px;text-align:center;width:250px;height:25px;
}
</style>
</head>
<body>

<!-- 		<div style="width: 100%; text-align: right;">
			
		</div> -->
		<div style="width: 100%; text-align: center;">
			<div style="text-align:center;"><b><font color="red"  size="5px">[公网网关客户端配置]</font></b></div>
			<div style="text-align:right;">
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-back" plain="true"
					onclick="javascript:window.history.back();">回退</a>
			</div>		
		</div>
			<div style="margin-left:360px;position:relative;">
				<font  size="3px" style="margin-left:35px;">总并发限制</font>
				<input type="text"  value=""  name='maxConnections' > 
				<font  color="red" size="2px">(默认为512)</font>
			</div>
			<div style="margin-left:300px;position:relative;">
				<font  size="3px">公网网关单服务并发限制</font>
				<input type="text"  value=""  name='maxConnectionsPerMethod' > 
				<font color="red" size="2px">(默认为64)</font>
			</div>
			<div style="margin-left:344px;position:relative;">
				<font  size="3px">连接超时时间(ms)</font>
				<input type="text"  value=""  style="margin-left:16px;" name='connectTimeout'> 
				<font color="red"  size="2px">(默认为3000)</font>
			</div>
			<div style="margin-left:344px;position:relative;">
				<font  size="3px">请求超时时间(ms)</font>
				<input type="text"  value=""   style="margin-left:16px;" name='requestTimeout'> 
				<font color="red" size="2px">(默认为3000)</font>
			</div>
			<div style="margin-left:312px;">
				<font  size="3px">响应读取超时时间(ms)</font>
				<input type="text"  value=""   style="margin-left:15px;" name='readTimeout'> 
				<font color="red" size="2px">(默认为3000)</font>
			</div>
			<br /> <br /> 
			<div style="width: 100%; text-align:center;"><input type="button" value="更新" onclick="updatePolicy();javascript:window.location.reload();" /></div>
</body>
</html>
<script type="text/javascript">
$(function(){ 
	$.get("../etcd/list?prefix=/gateway/front/public/services/client",function(result){
		initPolicy(result);
	});
}); 
</script>