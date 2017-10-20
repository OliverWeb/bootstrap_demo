<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>gateway-edit</title>
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/default/easyui.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/themes/icon.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/jquery-easyui-1.5/demo/demo.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/select2.min.css">
<link rel="stylesheet" type="text/css"
	href="${pageContext.request.contextPath}/css/xcConfirm.css">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/jquery-easyui-1.5/constant.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/gateway-config.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/select2.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/js/xcConfirm.js"></script>
<style>
input[type="text"]{
margin-left:20px;margin-top:20px;text-align:center;width:300px;height:25px;
}
 td{ white-space: nowrap;}
</style>
</head>
<body>
		<div style="width: 100%; text-align:center;">
			<div style="text-align:center;white-space: nowrap;"><b style="color:blue"><font color="red"  size="5px">[公网网关服务配置]</font></b></div>
			<div style="text-align:right;">
				<a style="text-align:right;"href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-reload" plain="true"
					onclick="javascript:window.location.reload()">刷新</a>
				<a href="javascript:void(0)" class="easyui-linkbutton"
					iconcls="icon-back" plain="true"
					onclick="javascript:window.history.back();">回退</a>
			</div>
		</div>
		
			<center>
			<table width="80%" border="0" cellspacing="0" cellpadding="0" align="center">
					<tr style="height:20px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">公网网关服务名</font></td>
							<td ><input type="text"  value=""  name='name' readonly> </td>
					</tr>
					<tr style="height:50px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">路由微服务名版本</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select class="select_gallery"  name='nameandversion'  ></select><font color="red"   size="2px">*</font> </td>			
					</tr>
					<tr style="height:50px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">路由微服务方法名</font></td>
							<td style="vertical-align:bottom;padding-left:20px;"><select class="select_gallery"  name='servicemethod' style="width:250px;" ></select><font color="red"   size="2px">*</font> </td>			
					</tr>
					<tr style="height:20px;">
							<td style="text-align:right;vertical-align:bottom;width:35%;"><font  size="3px">流量限制(单节点)</font></td>
							<td style="padding-left:10px;"><input type="text"  value=""   style="margin-left:10px;"  onkeyup="value=value.replace(/[^\d]/g,'')" onafterpaste="this.value=this.value.replace(/[^\d]g,'')" onblur = "this.value=this.value.replace(/[^\d]/g,'')"name='qps' id="qps"><font color="red"   size="2px">(设为0则不限流)</font>  </td>			
					</tr>
					<tr style="height:50px;"><td colspan="2" style="text-align:center;vertical-align:bottom;"><input type="button" value="更新" onclick="update();" /></tr>
			</table>
			</center>
</body>
</html>
<script type="text/javascript">
$(function(){ 
	var data=window.parent.gatewaydata;
	var map=window.parent.parentmap;
	var dataId = getUrlParam("dataId");
	for(key in map)
		{
			var nameandversion= $.parseJSON(map[key][0]).name+":"+$.parseJSON(map[key][0]).version;
			$("select[name='nameandversion']").append("<option style='width:500px' value="+nameandversion +">"+nameandversion+"</option>");
		}
	
	$("input[name='name']").val(data[dataId].name);
	
	$("select[name='group']").val(data[dataId].group);
	$("select[name='nameandversion']").val(data[dataId].servicenameandversion);
	$("input[name='qps']").val(data[dataId].qps/window.parent.gatewayipLen);
	$(".select_gallery").select2();
	setselect(data[dataId].servicenameandversion,data[dataId].servicemethod);
	$("select[name='nameandversion']").change(function(){ 
		$("select[name='servicemethod']").empty();
		var key=$("select[name='nameandversion']").val();
		setselect(key);
	});
}); 
</script>